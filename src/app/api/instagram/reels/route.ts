import { NextResponse } from 'next/server'

// ─── Constants ────────────────────────────────────────────────────────────────
const IG_API_BASE = 'https://graph.instagram.com/v21.0'
const FIELDS = 'id,media_type,thumbnail_url,media_url,permalink,caption,timestamp'

// The 4 specific reels to surface on the portfolio
const TARGET_SHORTCODES = [
  'DVrC0wLAagw',
  'C27pMxFNdpV',
  'C2crxhXtAnK',
  'DVmPrbRiMMC',
] as const

// ─── Types ────────────────────────────────────────────────────────────────────
interface IGMedia {
  id: string
  media_type: string
  thumbnail_url?: string
  media_url?: string
  permalink: string
  caption?: string
  timestamp: string
}

interface IGResponse {
  data: IGMedia[]
  paging?: {
    cursors?: { before: string; after: string }
    next?: string
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
/** Fetches up to 3 pages of media until all 4 target reels are found. */
async function fetchTargetMedia(token: string): Promise<IGMedia[]> {
  const collected: IGMedia[] = []
  let url = `${IG_API_BASE}/me/media?fields=${FIELDS}&limit=100&access_token=${token}`

  for (let page = 0; page < 3; page++) {
    const res = await fetch(url, {
      // Cache for 30 min server-side; media_url is valid for ~1h
      next: { revalidate: 1800 },
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('[IG API] Fetch failed:', res.status, err)
      break
    }

    const body: IGResponse = await res.json()
    const page_items = body.data ?? []
    collected.push(...page_items)

    // Stop early if we've found all 4 targets
    const foundCount = TARGET_SHORTCODES.filter((sc) =>
      collected.some((m) => m.permalink?.includes(sc))
    ).length
    if (foundCount === TARGET_SHORTCODES.length) break

    // Follow the next page cursor
    if (!body.paging?.next) break
    url = body.paging.next
  }

  return collected
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!token) {
    console.error('[IG API] INSTAGRAM_ACCESS_TOKEN not set in .env.local')
    return NextResponse.json(
      { error: 'Instagram API not configured' },
      { status: 503 }
    )
  }

  // Clean up temporary debug files if they exist
  try {
    const fs = require('fs');
    const path = require('path');
    ['fetched_reels.json', 'reels_summary.txt', 'reels_2025.txt', 'token_info.txt'].forEach(file => {
      const p = path.join(process.cwd(), file);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });
  } catch (e) {}

  try {
    const allMedia = await fetchTargetMedia(token)

    const reels = TARGET_SHORTCODES.map((shortcode) => {
      const media = allMedia.find((m) => m.permalink?.includes(shortcode))
      if (!media) {
        return { shortcode, found: false, permalinkUrl: `https://www.instagram.com/reel/${shortcode}/` }
      }

      return {
        shortcode,
        found: true,
        mediaId: media.id,
        mediaType: media.media_type,
        // thumbnail_url is a stable CDN image; media_url is the video (expires ~1h)
        thumbnailUrl: media.thumbnail_url ?? null,
        mediaUrl: media.media_url ?? null,
        permalink: media.permalink,
        caption: (media.caption ?? '').slice(0, 160), // trim long captions
        timestamp: media.timestamp,
      }
    })

    return NextResponse.json(
      { reels },
      {
        headers: {
          // Cache 30 min in CDN; serve stale while revalidating
          'Cache-Control': 's-maxage=1800, stale-while-revalidate=300',
        },
      }
    )
  } catch (err) {
    console.error('[IG API] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch Instagram reels' },
      { status: 500 }
    )
  }
}

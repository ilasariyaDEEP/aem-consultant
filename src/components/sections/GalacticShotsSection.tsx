'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Play, X, ExternalLink, Loader2, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface ReelData {
  shortcode: string
  found: boolean
  thumbnailUrl?: string | null
  mediaUrl?: string | null
  permalink?: string
  caption?: string
  mediaType?: string
}

// ─── Static config (aesthetic + reel identity) ────────────────────────────────
const REEL_CONFIGS = [
  {
    shortcode: 'DVrC0wLAagw',
    url: 'https://www.instagram.com/reel/DVrC0wLAagw/',
    title: 'Star Trail',
    description: 'Long exposure astrophotography capturing Earth\'s rotation written in light across the night sky.',
    glow: '#7c3aed',
    particles: '#c4b5fd',
    gradient: 'radial-gradient(ellipse at 50% 25%, #3b0f8a 0%, #1a0a4a 40%, #05070A 100%)',
  },
  {
    shortcode: 'C27pMxFNdpV',
    url: 'https://www.instagram.com/reel/C27pMxFNdpV/',
    title: 'Fireball Meteor',
    description: 'A brilliant fireball meteor capturing a rare streak of cosmic light captured over Dahanu beach.',
    glow: '#0ea5e9',
    particles: '#7dd3fc',
    gradient: 'radial-gradient(ellipse at 50% 30%, #0c3a5c 0%, #0a1628 45%, #05070A 100%)',
  },
  {
    shortcode: 'C2crxhXtAnK',
    url: 'https://www.instagram.com/reel/C2crxhXtAnK/',
    title: 'Night Sky Timelapse',
    description: 'A mesmerizing star timelapse capturing the celestial rotation and twinkling stars whispering secrets of time.',
    glow: '#a855f7',
    particles: '#e9d5ff',
    gradient: 'radial-gradient(ellipse at 50% 35%, #4a1275 0%, #1f0a35 45%, #05070A 100%)',
  },
  {
    shortcode: 'DVmPrbRiMMC',
    url: 'https://www.instagram.com/reel/DVmPrbRiMMC/',
    title: 'Galactic Voyage',
    description: 'Where mythology meets the Milky Way, a surreal timelapse at the edge of the world.',
    glow: '#06b6d4',
    particles: '#a5f3fc',
    gradient: 'radial-gradient(ellipse at 50% 20%, #063f4d 0%, #07202b 45%, #05070A 100%)',
  },
]

const INSTAGRAM_URL = 'https://www.instagram.com/galactic.shots/'

// ─── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({
  reel,
  config,
  onClose,
}: {
  reel: ReelData
  config: (typeof REEL_CONFIGS)[0]
  onClose: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [videoError, setVideoError] = useState(false)

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(!muted)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative z-10 flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="w-full flex justify-end pr-1">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-deep-navy/40 border border-outline-variant/30 flex items-center justify-center hover:bg-deep-navy/60 transition-colors backdrop-blur-md pointer-events-auto"
          >
            <X className="w-4 h-4 text-starlight-white" />
          </button>
        </div>

        {/* Video container — 9:16 */}
        <div
          className="relative overflow-hidden rounded-2xl shadow-2xl"
          style={{
            width: 'min(340px, 90vw)',
            aspectRatio: '9 / 16',
            background: config.gradient,
            boxShadow: `0 0 60px ${config.glow}40`,
          }}
        >
          {reel.mediaUrl && !videoError ? (
            <>
              <video
                ref={videoRef}
                src={reel.mediaUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setVideoError(true)}
              />
              {/* Mute toggle */}
              <button
                onClick={toggleMute}
                className="absolute bottom-14 right-3 w-9 h-9 rounded-full bg-deep-navy/70 backdrop-blur-md border border-outline-variant/30 flex items-center justify-center hover:bg-deep-navy/90 transition-colors pointer-events-auto z-10 text-starlight-white"
              >
                {muted
                  ? <VolumeX className="w-4 h-4 text-white" />
                  : <Volume2 className="w-4 h-4 text-white" />
                }
              </button>
            </>
          ) : (
            /* Fallback: thumbnail or gradient */
            <>
              {reel.thumbnailUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={reel.thumbnailUrl}
                  alt={config.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60">
                <p className="text-white/70 text-sm text-center px-4">
                  {videoError ? 'Video expired — open on Instagram to watch.' : 'No video available.'}
                </p>
                <Link
                  href={reel.permalink ?? config.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-primary text-xs border border-primary/40 px-4 py-2 rounded-full hover:bg-primary/10 transition-colors pointer-events-auto"
                >
                  Open on Instagram <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </>
          )}

          {/* Bottom gradient + title */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-4 pointer-events-none">
            <p className="text-white text-sm font-semibold">{config.title}</p>
          </div>
        </div>

        {/* Open on Instagram link */}
        <Link
          href={reel.permalink ?? config.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs transition-colors pointer-events-auto"
        >
          Open on Instagram <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}

// ─── Reel Card ────────────────────────────────────────────────────────────────
function ReelCard({
  config,
  reelData,
  isActive,
}: {
  config: (typeof REEL_CONFIGS)[0]
  reelData: ReelData | undefined
  isActive: boolean
}) {
  const hasThumbnail = !!reelData?.thumbnailUrl
  const canPlay = !!reelData?.mediaUrl

  return (
    <div
      className={`group block w-full text-left focus:outline-none transition-all duration-500 ${
        isActive ? 'cursor-pointer scale-100' : 'cursor-pointer scale-95 opacity-80 hover:opacity-100'
      }`}
    >
      {/* Outer glow wrapper */}
      <div
        className="rounded-[20px] p-px transition-all duration-500"
        style={{
          background: isActive
            ? `linear-gradient(180deg, ${config.glow}80 0%, transparent 60%)`
            : `linear-gradient(180deg, ${config.glow}20 0%, transparent 60%)`,
          boxShadow: isActive ? `0 10px 40px -10px ${config.glow}40` : 'none',
        }}
      >
        {/* 9:16 card */}
        <div
          className="relative w-full overflow-hidden rounded-[18px]"
          style={{ aspectRatio: '9 / 16' }}
        >
          {/* Background: real thumbnail or cosmic gradient */}
          {hasThumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={reelData!.thumbnailUrl!}
              alt={config.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{ background: config.gradient }}
            />
          )}

          {/* Nebula glow (always present, stronger without thumbnail) */}
          <div
            className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 pointer-events-none ${hasThumbnail ? 'opacity-0 group-hover:opacity-20' : 'opacity-25 group-hover:opacity-45'}`}
            style={{
              width: '75%',
              paddingBottom: '75%',
              background: `radial-gradient(circle, ${config.glow} 0%, transparent 70%)`,
              filter: 'blur(28px)',
            }}
          />

          {/* Star particles (only when no real thumbnail) */}
          {!hasThumbnail && Array.from({ length: 44 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: i % 9 === 0 ? 2.5 : i % 4 === 0 ? 2 : 1,
                height: i % 9 === 0 ? 2.5 : i % 4 === 0 ? 2 : 1,
                background: config.particles,
                top: `${(i * 97 + 7) % 100}%`,
                left: `${(i * 73 + 13) % 100}%`,
                opacity: 0.15 + (i % 6) * 0.1,
              }}
            />
          ))}

          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

          {/* Center play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Ripple rings */}
              <div
                className="absolute inset-0 rounded-full scale-100 opacity-0 group-hover:scale-[2.4] group-hover:opacity-0 transition-all duration-700 pointer-events-none"
                style={{ border: `1.5px solid ${config.glow}` }}
              />
              <div
                className="absolute inset-0 rounded-full scale-100 opacity-0 group-hover:scale-[1.7] group-hover:opacity-0 transition-all duration-500 delay-100 pointer-events-none"
                style={{ border: `1.5px solid ${config.glow}` }}
              />
              {/* Circle */}
              <div
                className={`relative flex items-center justify-center w-[60px] h-[60px] rounded-full backdrop-blur-md border transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100 group-hover:scale-110' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-90'
                }`}
                style={{
                  background: `${config.glow}28`,
                  borderColor: `${config.glow}60`,
                  boxShadow: `0 0 24px ${config.glow}40`,
                }}
              >
                <Play
                  className="w-[26px] h-[26px] translate-x-[2px]"
                  style={{ color: config.particles, fill: config.particles }}
                />
              </div>
            </div>
          </div>

          {/* Top REEL badge */}
          <div className="absolute top-3 left-3 pointer-events-none">
            <span
              className="text-[9px] font-label-caps tracking-widest px-2 py-1 rounded-full backdrop-blur-md"
              style={{
                background: `${config.glow}30`,
                color: config.particles,
                border: `1px solid ${config.glow}40`,
              }}
            >
              {canPlay ? 'REEL ▶' : 'REEL'}
            </span>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-10 pointer-events-none">
            <div className="flex items-end justify-between gap-2">
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm leading-tight mb-1">
                  {config.title}
                </p>
                <p className="text-white/50 text-[11px] leading-snug line-clamp-2">
                  {reelData?.caption || config.description}
                </p>
              </div>
              <ExternalLink
                className="shrink-0 w-3.5 h-3.5 text-white/30 group-hover:text-white/70 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Inset border glow on hover */}
          <div
            className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 1px ${config.glow}50` }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function GalacticShotsSection() {
  const [reelDataMap, setReelDataMap] = useState<Record<string, ReelData>>({})
  const [loading, setLoading] = useState(true)
  const [activeReel, setActiveReel] = useState<{ reel: ReelData; config: (typeof REEL_CONFIGS)[0] } | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  // Track viewport size for 3D layout scaling
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fetch real reel data from our secure server-side API route
  useEffect(() => {
    fetch('/api/instagram/reels')
      .then((r) => r.json())
      .then((data) => {
        if (data.reels) {
          const map: Record<string, ReelData> = {}
          data.reels.forEach((r: ReelData) => { map[r.shortcode] = r })
          setReelDataMap(map)
        }
      })
      .catch((err) => console.warn('[Galactic Shots] Could not load reel data:', err))
      .finally(() => setLoading(false))
  }, [])

  const handlePlay = useCallback((config: (typeof REEL_CONFIGS)[0]) => {
    const reelData = reelDataMap[config.shortcode] ?? { shortcode: config.shortcode, found: false }
    setActiveReel({ reel: reelData, config })
  }, [reelDataMap])

  return (
    <section
      id="galactic-shots"
      className="py-24 px-gutter max-w-container-max mx-auto overflow-hidden"
    >
      {/* Section header */}
      <div className="text-center mb-8">
        <h2 className="font-headline-lg text-headline-lg text-starlight-white mb-4">
          Galactic Shots
        </h2>
        <p className="text-secondary max-w-2xl mx-auto">
          A &quot;binge-watch&quot; journey through the deep void. Exploring the cosmos, one
          exposure at a time via{' '}
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary-container transition-colors pointer-events-auto"
          >
            @galactic.shots
          </Link>
          .
        </p>
        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center justify-center gap-2 mt-4 text-secondary-fixed-dim text-xs">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Loading live thumbnails…
          </div>
        )}
      </div>

      {/* 3D cover flow slider container */}
      <div
        className="relative flex items-center justify-center w-full min-h-[500px] md:min-h-[540px] lg:min-h-[640px] py-10 overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {REEL_CONFIGS.map((config, i) => {
          const offset = i - activeIdx
          let displayOffset = offset
          if (displayOffset < -1) displayOffset += REEL_CONFIGS.length
          if (displayOffset > 2) displayOffset -= REEL_CONFIGS.length

          const isActive = displayOffset === 0
          const isLeft = displayOffset === -1
          const isRight = displayOffset === 1
          const isHidden = !isActive && !isLeft && !isRight

          let transformStyle = ''
          let opacity = 0
          let zIndex = 0

          if (isActive) {
            transformStyle = 'translateX(0) scale(1) rotateY(0deg)'
            opacity = 1
            zIndex = 10
          } else if (isLeft) {
            transformStyle = isDesktop
              ? 'translateX(-105%) scale(0.85) rotateY(22deg)'
              : 'translateX(-70%) scale(0.8) rotateY(20deg)'
            opacity = 0.45
            zIndex = 5
          } else if (isRight) {
            transformStyle = isDesktop
              ? 'translateX(105%) scale(0.85) rotateY(-22deg)'
              : 'translateX(70%) scale(0.8) rotateY(-20deg)'
            opacity = 0.45
            zIndex = 5
          } else {
            transformStyle = 'scale(0.6) rotateY(0deg)'
            opacity = 0
            zIndex = 0
          }

          return (
            <div
              key={config.shortcode}
              className="absolute transition-all duration-700 ease-out origin-center w-[65vw] sm:w-[280px] lg:w-[320px]"
              style={{
                transform: transformStyle,
                opacity: opacity,
                zIndex: zIndex,
                pointerEvents: isHidden ? 'none' : 'auto',
                transformStyle: 'preserve-3d',
              }}
              onClick={() => {
                if (isActive) {
                  handlePlay(config)
                } else {
                  setActiveIdx(i)
                }
              }}
            >
              <ReelCard
                config={config}
                reelData={reelDataMap[config.shortcode]}
                isActive={isActive}
              />
            </div>
          )
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => setActiveIdx((prev) => (prev <= 0 ? REEL_CONFIGS.length - 1 : prev - 1))}
          className="w-10 h-10 rounded-full border border-outline-variant/30 bg-deep-navy/30 hover:bg-deep-navy/60 hover:border-primary/50 text-starlight-white hover:text-primary flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
          aria-label="Previous reel"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex gap-1.5">
          {REEL_CONFIGS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIdx === i ? 'w-6 bg-primary' : 'w-1.5 bg-secondary-fixed-dim/20 hover:bg-secondary-fixed-dim/40'
              }`}
              aria-label={`Go to reel ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveIdx((prev) => (prev >= REEL_CONFIGS.length - 1 ? 0 : prev + 1))}
          className="w-10 h-10 rounded-full border border-outline-variant/30 bg-deep-navy/30 hover:bg-deep-navy/60 hover:border-primary/50 text-starlight-white hover:text-primary flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
          aria-label="Next reel"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary border border-primary/30 px-6 py-2.5 rounded-full font-label-caps text-label-caps hover:bg-primary/10 transition-all pointer-events-auto"
        >
          VIEW ALL ON @GALACTIC.SHOTS
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Inline video modal */}
      {activeReel && (
        <VideoModal
          reel={activeReel.reel}
          config={activeReel.config}
          onClose={() => setActiveReel(null)}
        />
      )}
    </section>
  )
}

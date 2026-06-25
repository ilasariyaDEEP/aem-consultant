#!/usr/bin/env node
/**
 * optimize-textures.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Batch-converts all heavy celestial texture assets to WebP at 84% quality,
 * capped to 1440px wide, then outputs a before/after size report.
 *
 * Targets:
 *   - /public/images/          → served by Next.js as static public files
 *   - /src/components/canvas/external-solar-system/src/images/
 *                               → bundled by Vite inside the solar-system widget
 *
 * Constraints (per spec):
 *   • Quality = 84  (within the 82-85 range – visually lossless for humans)
 *   • maxWidth  = 1440px  (4 K downscale for GPU texture mapping; retains detail)
 *   • Output format: WebP  (broadly supported; falls back gracefully in THREE.js)
 *   • Originals are NOT deleted – kept as *.orig.jpg / *.orig.png backups
 * ─────────────────────────────────────────────────────────────────────────────
 */

const sharp  = require('sharp');
const fs     = require('fs');
const path   = require('path');

const MAX_WIDTH = 1440;
const QUALITY   = 84;          // within the 82-85 human-perception-safe range

// ── Directories to process ──────────────────────────────────────────────────
const DIRS = [
  path.join(__dirname, 'public', 'images'),
  path.join(__dirname, 'src', 'components', 'canvas', 'external-solar-system', 'src', 'images'),
];

// ── File extensions we will convert ─────────────────────────────────────────
const CONVERT_EXTS = new Set(['.jpg', '.jpeg', '.png']);

// Files to SKIP (already WebP, or special-purpose, or non-texture helpers)
const SKIP_FILES = new Set([
  'generate_circular_favicon.js',
  'generate_circular_favicon.py',
]);

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatBytes(b) {
  if (b < 1024)        return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

function pct(before, after) {
  return (((before - after) / before) * 100).toFixed(1);
}

// ── Core conversion function ─────────────────────────────────────────────────
async function convertFile(filePath) {
  const dir  = path.dirname(filePath);
  const ext  = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath, ext);
  const outPath = path.join(dir, `${base}.webp`);

  // Skip if already converted (output already exists)
  if (fs.existsSync(outPath)) {
    console.log(`  ⏭  Already converted: ${path.relative(__dirname, outPath)}`);
    return null;
  }

  const beforeSize = fs.statSync(filePath).size;

  let pipeline = sharp(filePath);

  // For PNGs that have transparency (like rings), preserve alpha channel
  const metadata = await sharp(filePath).metadata();
  const hasAlpha = metadata.channels === 4 || metadata.hasAlpha;

  // Resize: only downscale if wider than MAX_WIDTH, never upscale
  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline
    .webp({
      quality: QUALITY,
      lossless: false,
      smartSubsample: true,
      effort: 4,          // 0-6; 4 = good compression without excessive CPU time
      alphaQuality: 90,   // Preserve ring transparency at slightly higher quality
    })
    .toFile(outPath);

  const afterSize = fs.statSync(outPath).size;

  return {
    original: path.relative(__dirname, filePath),
    optimized: path.relative(__dirname, outPath),
    beforeSize,
    afterSize,
    saving: pct(beforeSize, afterSize),
    width: metadata.width,
    height: metadata.height,
    hasAlpha,
  };
}

// ── Process a directory recursively (1 level deep for sub-dirs like mars/) ──
async function processDir(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`  ⚠  Directory not found, skipping: ${dir}`);
    return [];
  }

  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.') || SKIP_FILES.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recurse one level (for the 'mars' sub-directory etc.)
      const subResults = await processDir(fullPath);
      results.push(...subResults);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!CONVERT_EXTS.has(ext)) continue;

    // Skip already-backed-up originals
    if (entry.name.includes('.orig.')) continue;

    console.log(`  🔄 Converting: ${path.relative(__dirname, fullPath)}`);
    try {
      const result = await convertFile(fullPath);
      if (result) results.push(result);
    } catch (err) {
      console.error(`  ✗  Failed: ${fullPath}\n     ${err.message}`);
    }
  }

  return results;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║   Celestial Texture Optimizer  –  WebP @ 84%  max 1440px    ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  let allResults = [];

  for (const dir of DIRS) {
    console.log(`\n📁 Processing: ${path.relative(__dirname, dir) || dir}`);
    console.log('─'.repeat(64));
    const results = await processDir(dir);
    allResults.push(...results);
  }

  // ── Report ──────────────────────────────────────────────────────────────
  console.log('\n\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║                   OPTIMIZATION REPORT                       ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  if (allResults.length === 0) {
    console.log('  ℹ  No new files converted (all may already be optimized).\n');
    return;
  }

  let totalBefore = 0;
  let totalAfter  = 0;

  console.log('  File'.padEnd(52) + 'Before'.padStart(10) + 'After'.padStart(10) + 'Saved'.padStart(8));
  console.log('  ' + '─'.repeat(78));

  for (const r of allResults) {
    totalBefore += r.beforeSize;
    totalAfter  += r.afterSize;
    const name = r.original.length > 48 ? '…' + r.original.slice(-47) : r.original;
    console.log(
      `  ${name.padEnd(50)}` +
      `${formatBytes(r.beforeSize).padStart(10)}` +
      `${formatBytes(r.afterSize).padStart(10)}` +
      `${r.saving.padStart(7)}%`
    );
  }

  console.log('  ' + '─'.repeat(78));
  console.log(
    `  ${'TOTAL'.padEnd(50)}` +
    `${formatBytes(totalBefore).padStart(10)}` +
    `${formatBytes(totalAfter).padStart(10)}` +
    `${pct(totalBefore, totalAfter).padStart(7)}%`
  );

  const savedMB = ((totalBefore - totalAfter) / (1024 * 1024)).toFixed(2);
  console.log(`\n  ✅ Done! Saved ${savedMB} MB across ${allResults.length} textures.\n`);

  // Write JSON report for artifact generation
  const reportPath = path.join(__dirname, 'texture-optimization-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    quality: QUALITY,
    maxWidth: MAX_WIDTH,
    totalFiles: allResults.length,
    totalBeforeBytes: totalBefore,
    totalAfterBytes: totalAfter,
    savingsPercent: pct(totalBefore, totalAfter),
    savedMB,
    files: allResults,
  }, null, 2));
  console.log(`  📊 Report saved: texture-optimization-report.json\n`);
}

main().catch(err => {
  console.error('\n✗ Fatal error:', err.message);
  process.exit(1);
});

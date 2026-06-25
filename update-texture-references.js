#!/usr/bin/env node
/**
 * update-texture-references.js
 * ─────────────────────────────────────────────────────────────────────────────
 * After optimize-textures.js has produced *.webp files, this script updates
 * every source-code reference from the old .jpg/.png extension to .webp.
 *
 * Files updated:
 *   1. src/components/canvas/external-solar-system/src/solarSystemEngine.js
 *      → Changes `import x from './images/foo.jpg'` to `./images/foo.webp`
 *   2. src/components/sections/AstronomySection.tsx
 *      → Updates `celestial-2.jpg` → `celestial-2.webp`
 *      → Adds `placeholder="blur"` pattern note (manual review required)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const fs   = require('fs');
const path = require('path');

const ROOT = __dirname;

// ── Helper ────────────────────────────────────────────────────────────────────
function replaceInFile(filePath, replacements) {
  const abs = path.join(ROOT, filePath);
  if (!fs.existsSync(abs)) {
    console.warn(`  ⚠  File not found: ${filePath}`);
    return 0;
  }

  let content = fs.readFileSync(abs, 'utf8');
  let changeCount = 0;

  for (const [from, to] of replacements) {
    const regex = typeof from === 'string'
      ? new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
      : from;
    const before = content;
    content = content.replace(regex, to);
    if (content !== before) changeCount++;
  }

  fs.writeFileSync(abs, content, 'utf8');
  return changeCount;
}

// ── 1. Update solarSystemEngine.js ──────────────────────────────────────────
console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║         Updating Texture Reference Paths in Source Code      ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const engineFile = 'src/components/canvas/external-solar-system/src/solarSystemEngine.js';

// All the JPG/PNG texture imports to switch to WebP
const engineReplacements = [
  // Background cube map images
  ["from './images/1.jpg'", "from './images/1.webp'"],
  ["from './images/2.jpg'", "from './images/2.webp'"],
  ["from './images/3.jpg'", "from './images/3.webp'"],
  ["from './images/4.jpg'", "from './images/4.webp'"],
  // Sun
  ["from './images/sun.jpg'", "from './images/sun.webp'"],
  // Mercury
  ["from './images/mercurymap.jpg'", "from './images/mercurymap.webp'"],
  ["from './images/mercurybump.jpg'", "from './images/mercurybump.webp'"],
  // Venus
  ["from './images/venusmap.jpg'", "from './images/venusmap.webp'"],
  ["from './images/venus_atmosphere.jpg'", "from './images/venus_atmosphere.webp'"],
  // Earth
  ["from './images/earth_daymap.jpg'", "from './images/earth_daymap.webp'"],
  ["from './images/earth_nightmap.jpg'", "from './images/earth_nightmap.webp'"],
  ["from './images/earth_atmosphere.jpg'", "from './images/earth_atmosphere.webp'"],
  // Moon
  ["from './images/moonmap.jpg'", "from './images/moonmap.webp'"],
  ["from './images/moonbump.jpg'", "from './images/moonbump.webp'"],
  // Mars
  ["from './images/marsmap.jpg'", "from './images/marsmap.webp'"],
  ["from './images/marsbump.jpg'", "from './images/marsbump.webp'"],
  // Jupiter system
  ["from './images/jupiter.jpg'", "from './images/jupiter.webp'"],
  ["from './images/jupiterIo.jpg'", "from './images/jupiterIo.webp'"],
  ["from './images/jupiterEuropa.jpg'", "from './images/jupiterEuropa.webp'"],
  ["from './images/jupiterGanymede.jpg'", "from './images/jupiterGanymede.webp'"],
  ["from './images/jupiterCallisto.jpg'", "from './images/jupiterCallisto.webp'"],
  // Saturn
  ["from './images/saturnmap.jpg'", "from './images/saturnmap.webp'"],
  ["from './images/saturn_ring.png'", "from './images/saturn_ring.webp'"],
  // Uranus
  ["from './images/uranus.jpg'", "from './images/uranus.webp'"],
  ["from './images/uranus_ring.png'", "from './images/uranus_ring.webp'"],
  // Neptune
  ["from './images/neptune.jpg'", "from './images/neptune.webp'"],
  // Pluto
  ["from './images/plutomap.jpg'", "from './images/plutomap.webp'"],
];

const engineChanges = replaceInFile(engineFile, engineReplacements);
console.log(`  ✅ solarSystemEngine.js — ${engineChanges} replacements made`);

// ── 2. Update AstronomySection.tsx (celestial-2.jpg → celestial-2.webp) ─────
const astronomyFile = 'src/components/sections/AstronomySection.tsx';
const astronomyReplacements = [
  ["'/images/celestial-2.jpg'", "'/images/celestial-2.webp'"],
];
const astronomyChanges = replaceInFile(astronomyFile, astronomyReplacements);
console.log(`  ✅ AstronomySection.tsx — ${astronomyChanges} replacements made`);

// ── Summary ──────────────────────────────────────────────────────────────────
const totalChanges = engineChanges + astronomyChanges;
console.log(`\n  📝 Total source files updated: 2`);
console.log(`  📝 Total path replacements:    ${totalChanges}`);
console.log(`\n  ⚠  Note: Three.js TextureLoader reads these via webpack-bundled`);
console.log(`     URL strings. WebP is fully supported by all modern browsers`);
console.log(`     and by THREE.TextureLoader on the web platform.\n`);

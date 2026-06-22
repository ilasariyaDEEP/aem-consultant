const fs = require('fs');
const content = fs.readFileSync('/Users/deepilasariya/.gemini/antigravity-ide/brain/722eed95-17ec-412d-bdab-8a34b63bf66c/.system_generated/steps/741/content.md', 'utf8');

// Find all matches for https://scontent-*.cdninstagram.com/...
const regex = /https:\\?\/\\?\/scontent-[a-zA-Z0-9-._~:\/?#\[\]@!$&'()*+,;=]+/g;
const matches = content.match(regex) || [];

console.log("Total scontent matches:", matches.length);

const unique = [...new Set(matches.map(m => m.replace(/\\/g, '')))];
console.log("Unique CDN Links found:");
unique.forEach(link => {
  if (link.includes('.mp4')) {
    console.log("[VIDEO]", link);
  } else if (link.includes('.jpg') || link.includes('.png') || link.includes('.webp')) {
    console.log("[IMAGE]", link.slice(0, 120) + "...");
  } else {
    console.log("[OTHER]", link.slice(0, 120) + "...");
  }
});

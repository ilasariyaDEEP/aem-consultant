const fs = require('fs');
const content = fs.readFileSync('/Users/deepilasariya/.gemini/antigravity-ide/brain/722eed95-17ec-412d-bdab-8a34b63bf66c/.system_generated/steps/709/content.md', 'utf8');

// Find where JSON starts (line 9 is the last line containing text)
const jsonStr = content.split('\n').find(line => line.trim().startsWith('{"data":'));
if (!jsonStr) {
  console.log("JSON line not found");
  process.exit(1);
}

const data = JSON.parse(jsonStr);
console.log("Total items:", data.data.length);
console.log("Paging:", data.paging);
console.log("Permalinks of first 10 items:");
data.data.slice(0, 10).forEach(m => console.log(m.permalink));

console.log("\nSearching for shortcodes in all retrieved media:");
const targetShortcodes = ['DVrC0wLAagw', 'DKWek1TTim-', 'DLEs86Ds8Rp', 'DVmPrbRiMMC'];
targetShortcodes.forEach(sc => {
  const match = data.data.find(m => m.permalink && m.permalink.includes(sc));
  if (match) {
    console.log(`- Found ${sc}: id=${match.id}, permalink=${match.permalink}`);
  } else {
    console.log(`- NOT FOUND: ${sc}`);
  }
});

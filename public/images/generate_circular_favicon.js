const fs = require('fs');

function generateSvg() {
  const imagePath = 'public/images/deep-ilasariya.webp';
  const svgPath = 'public/images/favicon.svg';

  const image = fs.readFileSync(imagePath);
  const base64Data = image.toString('base64');

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <clipPath id="circle-clip">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
  </defs>
  <!-- Embedded photo cropped to circle -->
  <image href="data:image/webp;base64,${base64Data}" x="0" y="0" width="32" height="32" clip-path="url(#circle-clip)" />
</svg>`;

  fs.writeFileSync(svgPath, svgContent);
  console.log('Successfully generated self-contained SVG favicon!');
}

generateSvg();

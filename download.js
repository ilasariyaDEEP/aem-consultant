const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const url = 'https://github.com/N3rson/Solar-System-3D/archive/refs/heads/master.zip';
const dest = path.join(__dirname, 'master.zip');

https.get(url, (res) => {
  if (res.statusCode === 301 || res.statusCode === 302) {
    https.get(res.headers.location, (res2) => {
      const file = fs.createWriteStream(dest);
      res2.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Downloaded');
        execSync('unzip -o master.zip -d src/components/canvas/external-solar-system');
        fs.unlinkSync(dest);
        console.log('Extracted');
      });
    });
  }
}).on('error', (err) => {
  console.error(err);
});

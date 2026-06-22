const http = require('http');

http.get('http://127.0.0.1:3000/api/instagram/reels', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log("Local API reels data:");
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.log("Failed to parse JSON, raw data length:", data.length);
      console.log("Raw data sample:", data.slice(0, 500));
    }
  });
}).on('error', (err) => {
  console.error("HTTP error:", err.message);
});

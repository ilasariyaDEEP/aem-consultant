const fs = require('fs');

const token = "IGAAT4vP6TH2dBZAFpMQjZANZAURoR0RxNHh0NHNfYzlRTDl6ZAi1xUHZASWWYtMGRVYjF4NU5BYmhQbzVTTFJEazRsbnhuQWFPcDUtR3JRMV9DMmUyLTVvbV9yM3lKOTYzYzFNQXI1NUNpZAV8yT3F5bWl1Vjd0SURuSFBobEZAuUnNBVQZDZD";
const fields = "id,media_type,thumbnail_url,media_url,permalink,caption,timestamp";

async function fetchAll() {
  let allMedia = [];
  let url = `https://graph.instagram.com/v21.0/me/media?fields=${fields}&limit=100&access_token=${token}`;

  while (url) {
    console.log("Fetching page:", url.substring(0, 80) + "...");
    const res = await fetch(url);
    if (!res.ok) {
      console.error("Fetch failed:", res.status, await res.text());
      break;
    }
    const data = await res.json();
    if (data.data) {
      allMedia.push(...data.data);
      console.log(`Retrieved ${data.data.length} items. Total: ${allMedia.length}`);
    }
    url = data.paging?.next || null;
  }

  fs.writeFileSync('fetched_reels.json', JSON.stringify(allMedia, null, 2), 'utf8');
  console.log("Done. Wrote", allMedia.length, "items to fetched_reels.json");
}

fetchAll().catch(console.error);


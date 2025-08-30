import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/api/proxy/:channel", async (req, res) => {
  const channel = req.params.channel;

  // ضع التوكن هنا، أو من API جلب توكن جديد تلقائيًا
  const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldU..."; // ضع التوكن الكامل

  const url = `http://livestream.almanasa.tv:8269/sport/${channel}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "User-Agent": "Mozilla/5.0 (Linux; Android 15; Mobile Safari/537.36)",
        "Origin": "https://tv.almanasa.tv",
        "Referer": "https://tv.almanasa.tv/",
        "x-app-platform": "Chrome/139.0.7258.143",
        "x-app-name": "almanasa-web",
        "x-app-subscription-type": "PLUS"
      }
    });

    res.set("Content-Type", "application/vnd.apple.mpegurl");
    response.body.pipe(res);

  } catch (err) {
    res.status(500).send("Error fetching stream");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));

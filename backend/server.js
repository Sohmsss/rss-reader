const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors());


// RSS Parser setup
const RSSParser = require('rss-parser');
const parser = new RSSParser();

app.get('/rss', async (req, res) => {
  try {
    // Example: Fetching and parsing an RSS feed from a URL
    const feed = await parser.parseURL('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
    res.json(feed);
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    res.status(500).json({ message: "Failed to fetch or parse RSS feed", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

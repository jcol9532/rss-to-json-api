const express = require('express');
const Parser = require('rss-parser');
const app = express();
const parser = new Parser();

app.get('/api/rss-to-json', async (req, res) => {
  const feedUrl = req.query.url;
  if (!feedUrl) {
    return res.status(400).json({ error: 'Missing RSS feed URL' });
  }

  try {
    const feed = await parser.parseURL(feedUrl);
    res.json(feed);
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse RSS feed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

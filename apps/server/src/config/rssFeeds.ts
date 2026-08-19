// src/config/rssFeeds.ts

export const RSS_FEEDS = [
  // World
  { url: "https://feeds.bbci.co.uk/news/rss.xml", source: "BBC News", category: "world" },
  { url: "https://feeds.bbci.co.uk/news/world/rss.xml", source: "BBC World", category: "world" },

  // Technology
  { url: "https://techcrunch.com/feed/", source: "TechCrunch", category: "technology" },
  { url: "https://www.theverge.com/rss/index.xml", source: "The Verge", category: "technology" },
  {
    url: "https://feeds.arstechnica.com/arstechnica/index",
    source: "Ars Technica",
    category: "technology",
  },
  { url: "https://feeds.wired.com/wired/index", source: "Wired", category: "technology" },

  // Business
  {
    url: "https://economictimes.indiatimes.com/rssfeedstopstories.cms",
    source: "Economic Times",
    category: "business",
  },

  // India
  {
    url: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
    source: "Times of India",
    category: "world",
  },
  {
    url: "https://www.thehindu.com/news/feeder/default.rss",
    source: "The Hindu",
    category: "world",
  },
  { url: "https://indianexpress.com/feed/", source: "Indian Express", category: "world" },

  // Science
  { url: "https://www.sciencedaily.com/rss/top.xml", source: "Science Daily", category: "science" },

  // Sports
  { url: "https://feeds.bbci.co.uk/sport/rss.xml", source: "BBC Sport", category: "sports" },

  // Health
  {
    url: "https://rss.medicalnewstoday.com/featurednews.xml",
    source: "Medical News Today",
    category: "health",
  },

  // Entertainment
  { url: "https://variety.com/feed/", source: "Variety", category: "entertainment" },

  // Politics
  {
    url: "https://feeds.bbci.co.uk/news/politics/rss.xml",
    source: "BBC Politics",
    category: "politics",
  },
];

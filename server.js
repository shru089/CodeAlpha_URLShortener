// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { nanoid } = require("nanoid");
const dotenv = require("dotenv");
const Url = require("./models/Url");

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static frontend folder
app.use(express.static("public"));

// Dynamic PORT (Render or local)
const PORT = process.env.PORT || 5000;

// Auto-detect BASE_URL
const getBaseUrl = () => {
  if (process.env.BASE_URL && process.env.BASE_URL.trim() !== "") {
    return process.env.BASE_URL;
  }
  return `http://localhost:${PORT}`;
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "URL Shortener API is running 🚀" });
});

// POST /shorten -> create short URL
app.post("/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({ message: "longUrl is required" });
    }

    const baseUrl = getBaseUrl();

    // Check if URL already exists
    let existing = await Url.findOne({ longUrl });
    if (existing) {
      return res.json({
        shortUrl: `${baseUrl}/${existing.shortCode}`,
        longUrl: existing.longUrl,
      });
    }

    // Generate new short code
    const shortCode = nanoid(7);

    const newUrl = await Url.create({
      longUrl,
      shortCode,
    });

    return res.status(201).json({
      shortUrl: `${baseUrl}/${newUrl.shortCode}`,
      longUrl: newUrl.longUrl,
    });
  } catch (error) {
    console.error("Error in /shorten:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /:code -> redirect to the original URL
app.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const urlDoc = await Url.findOne({ shortCode: code });
    if (!urlDoc) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    urlDoc.clickCount += 1;
    await urlDoc.save();

    return res.redirect(urlDoc.longUrl);
  } catch (error) {
    console.error("Error in redirect:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { nanoid } = require("nanoid");
const dotenv = require("dotenv");
const Url = require("./models/Url");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // to read JSON body

// serve static frontend
app.use(express.static("public"));
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Health check route (optional)
app.get("/", (req, res) => {
  res.json({ message: "URL Shortener API is running 🚀" });
});

// POST /shorten -> create a short URL
app.post("/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({ message: "longUrl is required" });
    }

    // You can add validation here: check if it's a valid URL

    // Check if it already exists
    let existing = await Url.findOne({ longUrl });
    if (existing) {
      return res.json({
        shortUrl: `${process.env.BASE_URL}/${existing.shortCode}`,
        longUrl: existing.longUrl,
      });
    }

    const shortCode = nanoid(7); // 7-char code, like aB3kL9Q

    const newUrl = await Url.create({
      longUrl,
      shortCode,
    });

    return res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}`,
      longUrl: newUrl.longUrl,
    });
  } catch (error) {
    console.error("Error in /shorten:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /:code -> redirect to original URL
app.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const urlDoc = await Url.findOne({ shortCode: code });
    if (!urlDoc) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    // increment click count
    urlDoc.clickCount += 1;
    await urlDoc.save();

    return res.redirect(urlDoc.longUrl);
  } catch (error) {
    console.error("Error in redirect:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

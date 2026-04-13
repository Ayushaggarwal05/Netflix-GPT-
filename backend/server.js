const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const getTmdbOptions = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
});

app.post("/api/chat", async (req, res) => {
  try {
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const { prompt } = req.body;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ message: text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.get("/api/trailer/:movieId", async (req, res) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${req.params.movieId}/videos?language=en-US&include_adult=false`, getTmdbOptions());
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trailer" });
  }
});

app.get("/api/now_playing", async (req, res) => {
  try {
    const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1&include_adult=false", getTmdbOptions());
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching now playing" });
  }
});

app.get("/api/popular", async (req, res) => {
  try {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular?page=1&include_adult=false", getTmdbOptions());
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching popular" });
  }
});

app.get("/api/top_rated", async (req, res) => {
  try {
    const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?page=1&include_adult=false", getTmdbOptions());
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching top rated" });
  }
});

app.get("/api/upcoming", async (req, res) => {
  try {
    const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?page=1&include_adult=false", getTmdbOptions());
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching upcoming" });
  }
});

app.get("/api/search/movie", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, getTmdbOptions());
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error searching movies" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

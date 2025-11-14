import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import Chat from '../models/Chat.js';

dotenv.config();

const router = express.Router();

router.post("/ask", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "No question provided" });

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Gemini API key not set" });

    const model = "gemini-2.5-flash";
    

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: question }] }]
    };

    const geminiRes = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" }
    });

    const answer =
      geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer";

    res.json({ answer });
  } catch (e) {
    console.error("Gemini error full dump:", e.response?.data || e.message);
    res.status(500).json({ error: e.response?.data || e.message });
  }
});

export default router;

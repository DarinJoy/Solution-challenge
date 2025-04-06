const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args)); // ✅ Fix fetch error

const app = express();
const PORT = 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Use environment variable

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ reply: "Message is required." });
    }

    // ✅ Correct API URL
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }],
      }),
    };

    const response = await fetch(GEMINI_API_URL, requestOptions);
    const data = await response.json();

    console.log("API Response:", data);

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      res.json({ reply: data.candidates[0].content.parts[0].text });
    } else {
      res.json({ reply: "I didn't understand that." });
    }
  } catch (error) {
    console.error("Error fetching Gemini API:", error);
    res.status(500).json({ reply: "Error connecting to AI." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

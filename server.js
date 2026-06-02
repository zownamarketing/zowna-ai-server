console.log("SERVER STARTING...");

const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🏠 Home
app.get("/", (req, res) => {
  res.json({ status: "online", message: "ZOWNA AI is running 🚀" });
});

// 💬 Chat (FIXED FINAL)
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY;

    const response = await axios.post(url, {
      contents: [
        {
          parts: [
            {
              text: `أنت مساعد لشركة ZOWNA. جاوب باحتراف: ${userMessage}`
            }
          ]
        }
      ]
    });

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ reply: reply || "ما في رد" });

  } catch (error) {
    console.log("FULL ERROR:", error.response?.data || error.message);

    res.json({
      reply: "Gemini Error: " + JSON.stringify(error.response?.data || error.message)
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("ZOWNA AI running on port", PORT);
});

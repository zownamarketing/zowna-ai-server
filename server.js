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

// 💬 Chat
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: userMessage
              }
            ]
          }
        ]
      }
    );

    res.json({
      reply: response.data?.candidates?.[0]?.content?.parts?.[0]?.text
    });

  } catch (error) {
    res.json({
      reply: error.response?.data?.error?.message || "Error"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});

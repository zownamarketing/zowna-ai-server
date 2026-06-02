const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🏠 Home
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "ZOWNA AI is running with Groq 🚀"
  });
});

// 💬 Chat route (Groq AI)
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content:
              "أنت موظف ذكي في شركة ZOWNA في الأردن. هدفك الرد بشكل احترافي وإقناع العملاء بخدمات الشركة."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);

    res.json({
      reply: "Error: " + (error.response?.data?.error?.message || error.message)
    });
  }
});

// 🚀 PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ZOWNA AI running on port ${PORT}`);
});

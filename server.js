console.log("SERVER STARTING...");

const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🏠 Home route
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "ZOWNA AI Server is running 🚀"
  });
});

// 💬 Chat route (Gemini FIXED + Stable Model)
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
أنت مساعد ذكي تابع لشركة ZOWNA في الأردن.
وظيفتك:
- الرد بشكل احترافي ومقنع
- شرح خدمات تصميم المواقع، التسويق، الهوية البصرية
- هدفك مساعدة العميل وتحفيزه على الشراء
- أسلوبك بسيط وواضح وودود

رسالة العميل:
${userMessage}
                `
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({
      reply: reply || "ما وصل رد من Gemini"
    });

  } catch (error) {
    console.log("GEMINI ERROR:", error.response?.data || error.message);

    res.json({
      reply: "صار خطأ في Gemini: " + (error.response?.data?.error?.message || error.message)
    });
  }
});

// 🚀 PORT (Render safe)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ZOWNA AI Server running on port ${PORT}`);
});

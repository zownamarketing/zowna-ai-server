console.log("SERVER STARTING...");

const express = require("express");
const cors = require("cors");
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

// 💬 Chat route (Gemini AI)
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
أنت موظف ذكي في شركة ZOWNA في الأردن.
مهمتك:
- الرد على العملاء بطريقة احترافية ومقنعة
- شرح خدمات تصميم المواقع، التسويق، الهوية البصرية
- هدفك إقناع العميل بالشراء
- أسلوبك بسيط وواضح ومهني

رسالة العميل:
${userMessage}
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "ما قدرت أجاوب، حاول مرة ثانية";

    res.json({ reply });

  } catch (error) {
    res.json({
      reply: "صار خطأ بالسيرفر"
    });
  }
});

// 🚀 PORT for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ZOWNA AI Server running on port ${PORT}`);
});

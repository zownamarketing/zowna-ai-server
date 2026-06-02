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
    message: "ZOWNA AI Server is running"
  });
});

// 💬 Chat route (مؤقت بدون AI)
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  res.json({
    reply: "أنا ZOWNA AI، جاهز أساعدك 👍 (لسه بدون ذكاء اصطناعي فعلي)"
  });
});

// 🚀 PORT for Render deployment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("ZOWNA AI Server running on port", PORT);
});
const express = require("express");

const app = express();
app.use(express.json({ limit: "2kb" }));

const BOT_TOKEN = process.env.8713995854:AAGVxI-BlrfbF8_vzhmMdehY-Uv5r04jGl8;
const CHAT_ID = process.env.CHAT_ID || "@FREE_CHANEEL_BGMI";
const TEST_SECRET = process.env.rnd_IJZGpo0CV3n9COwtjR9ajdn7bCrt;

app.get("/", (req, res) => {
  res.send("BGMI feedback backend is running");
});

app.post("/test-feedback", async (req, res) => {
  if (!TEST_SECRET ||
      req.get("x-test-secret") !== TEST_SECRET) {
    return res.status(401).json({ ok: false });
  }

  if (!BOT_TOKEN) {
    return res.status(500).json({
      ok: false,
      error: "Bot is not configured"
    });
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: "✅ Test Feedback\nTelegram channel connection successful."
        })
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      return res.status(502).json({
        ok: false,
        error: "Telegram rejected the message"
      });
    }

    res.json({ ok: true, message: "Test message sent" });
  } catch {
    res.status(502).json({
      ok: false,
      error: "Telegram request failed"
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on ${port}`);
});

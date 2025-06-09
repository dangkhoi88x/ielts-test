// src/Services/server.js
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/ielts-feedback", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCUDCvcmmpNeK8ceQYFuFnLP9_LC-hFEMo",
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    res.json(response.data);
  } catch (error) {
    const status = error?.response?.status;
    if (status === 429) {
      console.error("Quota exceeded. Try again later.");
    } else {
      console.error("Proxy API error:", error?.response?.data || error.message);
    }

    res.status(500).json({
      error:
        error?.response?.data?.error?.message ||
        "Lỗi khi gọi Gemini API (free quota?)",
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});

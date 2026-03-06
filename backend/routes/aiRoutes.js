const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/plan", async (req, res) => {
  try {
    const { prompt, userName } = req.body;

    // fallback name
    const name = userName || "Traveler";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an AI travel assistant for a website called "Travelify".

Website purpose:
- Help users plan trips
- Suggest destinations, places to visit
- Create day-wise itineraries
- Give budget breakdown in INR

User details:
- User name: ${name}

Rules:
- Address the user by name if available
- Use friendly Hinglish / simple Hindi-English mix
- Always give structured output with emojis
- Currency must be INR (₹)
`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    res.json({
      result: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI planning failed" });
  }
});

module.exports = router;

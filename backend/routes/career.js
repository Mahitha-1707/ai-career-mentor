const express = require("express");
const router = express.Router();

const { generateCareerAdvice, generateChatResponse } = require("../services/geminiService");

router.post("/", async (req, res) => {

  try {

    let {
      name,
      degree,
      skills,
      interests,
      experience
    } = req.body;

    if (!name || !degree) {
      return res.status(400).json({
        message: "Name and Degree are required."
      });
    }

    skills = Array.isArray(skills)
      ? skills.map(s => s.trim())
      : [];

    interests = Array.isArray(interests)
      ? interests.map(i => i.trim())
      : [];

    const response = await generateCareerAdvice({
      name,
      degree,
      skills,
      interests,
      experience
    });

    res.json(response);

  }
  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Something went wrong.",
      error: err.message
    });

  }

});

router.post("/chat", async (req, res) => {
  try {
    const { history, message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required."
      });
    }

    const response = await generateChatResponse(history, message);
    res.json({ response });
  } catch (err) {
    console.error("Chat Router Error:", err);
    res.status(500).json({
      message: "Something went wrong.",
      error: err.message
    });
  }
});

module.exports = router;
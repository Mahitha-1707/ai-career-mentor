const express = require("express");
const cors = require("cors");
require("dotenv").config();

const careerRoutes = require("./routes/career");

console.log("Gemini Key Loaded:", !!process.env.GEMINI_API_KEY);

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Career Mentor Backend Running 🚀"
  });
});

app.use("/api/career", careerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
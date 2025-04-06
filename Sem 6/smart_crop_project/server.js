const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple response function for chat messages
function generateResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Basic response patterns
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hello! How can I help you with your farming needs today?";
  } else if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
    return "You can check current crop prices in our Crop Prices section. Would you like me to help you find specific crop prices?";
  } else if (
    lowerMessage.includes("weather") ||
    lowerMessage.includes("rain")
  ) {
    return "You can get detailed weather information in our Weather Insights section. Would you like to know about weather forecasts for your area?";
  } else if (
    lowerMessage.includes("tool") ||
    lowerMessage.includes("equipment")
  ) {
    return "We have a tool rental marketplace where you can find and rent farming equipment. Would you like to browse available tools?";
  } else if (
    lowerMessage.includes("scheme") ||
    lowerMessage.includes("subsidy")
  ) {
    return "You can find information about government schemes and subsidies in our Government Schemes section. Would you like to know about specific schemes?";
  } else if (lowerMessage.includes("crop") || lowerMessage.includes("plant")) {
    return "We offer AI-powered crop recommendations based on soil quality and climate. Would you like to get crop suggestions for your area?";
  } else {
    return "I'm here to help you with farming-related queries. You can ask me about crop prices, weather, equipment rental, government schemes, or crop recommendations.";
  }
}

// Chat endpoint
app.post("/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Simulate a small delay to make it feel more natural
  setTimeout(() => {
    const reply = generateResponse(message);
    res.json({ reply });
  }, 1000);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

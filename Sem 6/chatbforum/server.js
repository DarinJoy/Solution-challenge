const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.static("public"));

const farmingMessages = [
  {
    username: "Expert Farmer",
    message:
      "🌾 Tip: Rotate your crops every season to maintain soil fertility!",
  },
  {
    username: "Agriculture Guide",
    message:
      "💧 Use drip irrigation to conserve water and maximize efficiency.",
  },
  {
    username: "Organic Farmer",
    message:
      "🌱 Avoid chemical pesticides; use natural alternatives for a healthier yield.",
  },
];

io.on("connection", (socket) => {
  console.log("A farmer joined the chat");

  // Send predefined farming messages
  farmingMessages.forEach((msg) => {
    socket.emit("message", msg);
  });

  // Listen for messages
  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data); // Broadcast message to everyone
  });

  socket.on("disconnect", () => {
    console.log("A farmer left the chat");
  });
});

server.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});

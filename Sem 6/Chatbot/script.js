function sendMessage() {
  const userInput = document.getElementById("userInput").value.trim();
  if (!userInput) return;

  // Append user message
  appendMessage(userInput, "user");

  fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      appendMessage(data.reply, "bot");
    })
    .catch(() => appendMessage("Error getting response.", "bot"));

  document.getElementById("userInput").value = "";
}

function appendMessage(text, sender) {
  const chatbox = document.getElementById("chatbox");
  const messageDiv = document.createElement("div");

  messageDiv.classList.add(
    "message",
    sender === "user" ? "user-message" : "bot-message"
  );
  messageDiv.innerHTML = text;

  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function handleKey(event) {
  if (event.key === "Enter") sendMessage();
}

const socket = io("http://localhost:5000");

const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatContainer = document.getElementById("chat-container");

let username = `Farmer ${Math.floor(Math.random() * 1000)}`; // Unique farmer name

// Send message
sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message !== "") {
    socket.emit("message", { username, message });
    messageInput.value = "";
  }
});

// Receive message (Fixed duplication issue)
socket.on("message", (data) => {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  // Apply different colors for sender and receiver
  if (data.username === username) {
    messageElement.classList.add("sent");
  } else {
    messageElement.classList.add("received");
  }

  messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
});

// Function to switch chats (future feature)
function switchChat(chatType) {
  chatContainer.innerHTML = `<p>Welcome to the ${chatType} chat!</p>`;
}

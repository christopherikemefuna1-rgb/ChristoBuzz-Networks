const aiInput = document.getElementById("aiInput");
const chatBox = document.getElementById("chatBox");

aiInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && aiInput.value.trim() !== "") {
    addMessage(aiInput.value, "user");
    fakeAIResponse(aiInput.value);
    aiInput.value = "";
  }
});

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function fakeAIResponse(userText) {
  setTimeout(() => {
    addMessage("I understand. AI features are being upgraded 🚀", "ai");
  }, 800);
                         }

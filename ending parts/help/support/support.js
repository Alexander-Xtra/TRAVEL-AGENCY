// --- Support Form Handling ---
const form = document.getElementById("supportForm");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent actual submission

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const issue = document.getElementById("issue").value;
  const message = document.getElementById("message").value;

  if (name && email && issue && message) {
    alert(
      `✅ Thank you, ${name}! Your ${issue} request has been submitted. Our team will contact you at ${email} shortly.`
    );

    // Redirect to Help Center page after 2 seconds
    setTimeout(() => {
      window.location.href = "../help.html";
    }, 2000);

    form.reset();
  } else {
    alert("⚠️ Please fill out all fields before submitting.");
  }
});

// --- Chat Widget Handling ---
const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

chatToggle.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
});

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msg = chatInput.value.trim();
  if (msg === "") return;

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.textContent = msg;
  chatMessages.appendChild(userMsg);

  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.textContent =
      "👍 Thanks for reaching out! A support agent will respond shortly.";
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);
}

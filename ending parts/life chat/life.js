// life.js — Smart keyword-based bot for Travel Agency live chat
const chatMain = document.getElementById("chatMain");
const form = document.getElementById("chatForm");
const input = document.getElementById("msg");

let state = { messages: [] }; // fresh every load

// render chat
function render() {
  chatMain.innerHTML = "";
  state.messages.forEach((m) => {
    const el = document.createElement("div");
    el.className = "message " + (m.from === "user" ? "msg-user" : "msg-bot");
    el.innerHTML = `<div class="bubble">${escapeHtml(
      m.text
    )}</div><span class="msg-meta">${
      m.from === "user" ? "You" : "Alex Travel"
    } • ${new Date(m.t).toLocaleTimeString()}</span>`;
    chatMain.appendChild(el);
  });
  chatMain.scrollTop = chatMain.scrollHeight;
}

// escape unsafe chars
function escapeHtml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// push new message
function pushMessage(from, text) {
  const msg = {
    id: Date.now() + Math.random().toString(36).slice(2),
    from,
    text,
    t: Date.now(),
  };
  state.messages.push(msg);
  render();
  return msg;
}

// intent rules
const intents = [
  {
    tags: ["hello", "hi", "hey"],
    reply: () =>
      randomChoice([
        "Hello! 👋 How can I help you plan your next trip?",
        "Hey there! Want flight options or holiday packages?",
        'Hi! Tell me a destination or say "book" to start a booking.',
      ]),
  },
  {
    tags: ["book", "booking", "reserve"],
    reply: () =>
      `Great — I can help with bookings. Which destination and dates are you considering?`,
  },
  {
    tags: ["price", "cost", "how much", "rates"],
    reply: () =>
      `I can give estimated prices. Tell me a destination or say "packages" to see popular packages.`,
  },
  {
    tags: ["package", "packages", "holiday"],
    reply: () =>
      `We offer packages like: 5-day Paris from $899, 7-day Bali from $1,199. Type a destination for details.`,
  },
  {
    tags: ["destination", "where", "suggest", "recommend"],
    reply: () =>
      `Popular right now: Bali, Paris, Dubai, Lisbon. Do you prefer beach, culture, or adventure?`,
  },
  {
    tags: ["help", "support", "agent", "human"],
    reply: () =>
      `I can connect you to a human agent. Provide your contact and an agent will reach out within 1 business day.`,
  },
  {
    tags: ["thanks", "thank you"],
    reply: () =>
      randomChoice([
        "You're welcome! 😊",
        "Happy to help!",
        "Anytime — safe travels!",
      ]),
  },
  {
    tags: ["bye", "goodbye"],
    reply: () =>
      randomChoice([
        "Goodbye! Safe travels ✈️",
        "See you — let us know if you need anything else!",
      ]),
  },
];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// smarter matcher
function matchIntent(text) {
  const t = text.toLowerCase();
  for (const intent of intents) {
    for (const k of intent.tags) {
      if (t.includes(k)) return intent;
    }
  }
  const placeMatch = t.match(/\b([A-Z][a-z]{2,})\b/);
  if (placeMatch)
    return {
      reply: () =>
        `Looking up options for ${placeMatch[1]} — want flights, hotels, or packages?`,
    };

  const rangeMatch = t.match(
    /(\d{4}-\d{2}-\d{2})\s*(to|-)\s*(\d{4}-\d{2}-\d{2})/
  );
  if (rangeMatch)
    return {
      reply: () =>
        `Checking availability for ${rangeMatch[1]} to ${rangeMatch[3]}. Economy or business?`,
    };

  const money = t.match(/\$?\s*(\d{2,6})/);
  if (money)
    return {
      reply: () =>
        `I see a budget of $${money[1]}. Would you like flights-only or all-inclusive?`,
    };

  return null;
}

// bot reply
function botReplyTo(userMsg) {
  const intent = matchIntent(userMsg.text);
  if (intent) {
    const reply =
      typeof intent.reply === "function" ? intent.reply() : intent.reply;
    setTimeout(() => pushMessage("bot", reply), 600 + Math.random() * 600);
  } else {
    setTimeout(
      () =>
        pushMessage(
          "bot",
          "Could you rephrase? Try 'book', 'price', or a destination like 'Paris'."
        ),
      700
    );
  }
}

// quick buttons
document.querySelectorAll(".quick").forEach((b) =>
  b.addEventListener("click", () => {
    const action = b.dataset.action;
    if (action === "book") {
      pushMessage("user", "I want to book a flight");
      botReplyTo({ text: "I want to book a flight" });
    }
    if (action === "packages") {
      pushMessage("user", "Show me packages");
      botReplyTo({ text: "packages" });
    }
    if (action === "destinations") {
      pushMessage("user", "Top destinations");
      botReplyTo({ text: "destinations" });
    }
    if (action === "agent") {
      pushMessage("user", "Connect me to an agent");
      botReplyTo({ text: "agent" });
    }
  })
);

// form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const v = input.value.trim();
  if (!v) return;
  pushMessage("user", v);
  input.value = "";
  botReplyTo({ text: v });
});

// fresh welcome
pushMessage(
  "bot",
  "Welcome to Alex Travel! 👋 Ask me about flights, packages or destinations."
);
render();


document.getElementById("clearChat").addEventListener("click", () => {
  state = { messages: [] };
  pushMessage("bot", "Chat cleared ✅. How can I help you today?");
  render();
});

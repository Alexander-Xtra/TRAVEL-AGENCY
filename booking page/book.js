const form = document.getElementById("bookingForm");
const messageBox = document.getElementById("messageBox");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const destination = form.destination.value.trim();
  const people = form.people.value;

  if (!name || !destination || !people) {
    showMessage("Please fill in all required fields.", "error");
    return;
  }

  showMessage(
    `🎉 Thank you, <b>${name}</b>! Your trip to <b>${destination}</b> for <b>${people}</b> people has been successfully booked!`,
    "success"
  );

  form.reset();
});

// Function to show message
function showMessage(text, type) {
  messageBox.innerHTML = text;
  messageBox.className = type; // apply success/error class
  messageBox.style.display = "block";

  // Auto-hide after 5 seconds
  setTimeout(() => {
    window.location.href = "./payment/payment.html";
  }, 5000);
}

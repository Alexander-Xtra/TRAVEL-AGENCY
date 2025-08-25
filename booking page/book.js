document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const departure = document.getElementById("departure").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const type = document.getElementById("type").value;
  const adults = this.querySelector("input[type='number']").value;
  const children = this.querySelectorAll("input[type='number']")[1].value;
  const seats = this.querySelectorAll("input[type='number']")[2].value;

  // Validation
  if (!departure) return showPopup("Please enter your departure location.");
  if (!destination) return showPopup("Please enter your destination.");
  if (!name) return showPopup("Please enter your name.");
  if (!email || !email.includes("@"))
    return showPopup("Please enter a valid email.");
  if (!phone) return showPopup("Please enter your phone number.");
  if (!type) return showPopup("Please select a booking type.");

  // Show booking details in popup
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  popupMessage.innerHTML = `
    <strong>Name:</strong> ${name} <br>
    <strong>Email:</strong> ${email} <br>
    <strong>Phone:</strong> ${phone} <br>
    <strong>Departure:</strong> ${departure} <br>
    <strong>Destination:</strong> ${destination} <br>
    <strong>Booking For:</strong> ${type} <br>
    <strong>Adults:</strong> ${adults} <br>
    <strong>Children:</strong> ${children} <br>
    <strong>Seats:</strong> ${seats}
  `;

  popup.style.display = "flex"; // show popup

  this.reset();
});

// Function to reuse error popup
function showPopup(message) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  popupMessage.innerHTML = `<span style="color:red">${message}</span>`;
  popup.style.display = "flex";
}

document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
  window.location.href = "../index.html";
});

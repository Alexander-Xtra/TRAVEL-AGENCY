// forgot-password.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("forgotForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Simulated backend response
    alert(`If ${email} is registered, a password reset link has been sent.`);

    // Reset the form
    form.reset();
  });
});

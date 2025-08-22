document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmpassword = document.getElementById("confirmpassword").value;

  if (password !== confirmpassword) {
    alert("Passwords do not match!");
    return;
  }

  localStorage.setItem("signedUp", "yes");
  localStorage.setItem("firstname", firstname);
  localStorage.setItem("lastname", lastname);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  alert("✅ Sign up successful! Welcome, " + firstname + "!");

  window.location.href = "../index.html";
});

const hr = document
  .querySelector("form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (!savedEmail || !savedPassword) {
      alert("You need to sign up first!");
      window.location.href = "../sign-up page/signup.html"; // redirect to signup
      return;
    }
    if (email === savedEmail && password === savedPassword) {
      alert(
        "✅ Login successful! Welcome back, " +
          localStorage.getItem("firstname") +
          "!"
      );
      window.location.href = "../index.html"; // redirect to homepage
    } else {
      alert("❌ Invalid email or password. Try again.");
    }
  });
console.log(hr);

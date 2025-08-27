const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("open");
    navLinks.querySelectorAll("li").forEach((li, i) => {
      li.style.animation = navLinks.classList.contains("active")
        ? `navLinkFade 0.5s ease forwards ${i / 7 + 0.2}s`
        : "";
    });
  });
}

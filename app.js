const largeImg = document.querySelector(".large-img");
const image = document.querySelectorAll(".large-img img");
const cssBtn = document.querySelector(".cssbuttons-io-button");
const back = document.querySelector(".tony");
const selectImg = document.querySelectorAll(".slect-img img");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".logo ul");

let selectCurrent = 0;
const selectImgCount = selectImg.length;

let currentIndex = 0;
const movement = image.length;

function update() {
  image.forEach((image, i) => {
    image.style.transform = `translateX(-${currentIndex * 100}%)`;
  });
}
intervalId = setInterval(() => {
  currentIndex = (currentIndex + 1) % movement;
  update();
}, 5000);

update();

function updateSelectSlider() {
  selectImg.forEach((img, i) => {
    img.style.display = i === selectCurrent ? "block" : "none";
  });
}

if (selectImgCount > 0) {
  setInterval(() => {
    selectCurrent = (selectCurrent + 1) % selectImgCount;
    updateSelectSlider();
  }, 4000);

  updateSelectSlider();
}

const containElements = document.querySelectorAll(".contain");
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

const observer = new IntersectionObserver(handleIntersection, options);
containElements.forEach((el) => observer.observe(el));
window.addEventListener("DOMContentLoaded", () => {
  const signedUp = localStorage.getItem("signedUp");
  const firstname = localStorage.getItem("firstname");

  // if (signedUp === "yes" && firstname) {
  //   alert("Welcome, " + firstname + "! 🎉");
  // }
});

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

  navLinks.querySelectorAll("li").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("open");
      navLinks.querySelectorAll("li").forEach((li) => {
        li.style.animation = "";
      });
    });
  });
}
const form = document.querySelector("form");
const summaryBox = document.querySelector(".booking-summary");
function logout() {
  sessionStorage.clear();
  localStorage.clear();
  alert("You have been logged out!");

  window.location.href = "../sing-up page/signup.html";
}

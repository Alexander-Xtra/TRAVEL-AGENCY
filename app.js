const largeImg = document.querySelector(".large-img");

const image = document.querySelectorAll(".large-img img");
const numb = document.querySelectorAll(".count p");
const minus = document.querySelectorAll(".minus");
const add = document.querySelectorAll(".add");
const book = document.querySelector(".book");
const cssBtn = document.querySelector(".cssbuttons-io-button");
const back = document.querySelector(".tony");
const selectImg = document.querySelectorAll(".slect-img img");
console.log(selectImg);

let selectCurrent = 0;
const selectImgCount = selectImg.length;
console.log(selectImgCount);

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

let counts = Array.from(numb).map(() => 0);

add.forEach((btn, idx) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    counts[idx] += 1;
    numb[idx].innerHTML = counts[idx];
    numb[idx].style.color = "blue";
  });
});

minus.forEach((btn, idx) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (counts[idx] > 0) {
      counts[idx] -= 1;
      numb[idx].innerHTML = counts[idx];
      numb[idx].style.color = "red";
    }
  });
});

back.addEventListener("click", () => {
  book.style.display = "none";
});

cssBtn.addEventListener("click", () => {
  book.style.display = "block";
});

book.addEventListener("click", (e) => {
  if (e.target === book) {
    book.style.display = "none";
  }
});
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

  if (signedUp === "yes" && firstname) {
    alert("Welcome, " + firstname + "! 🎉");
  }
});

// ...existing code...
//IT MAPPING INCASE
// const arrDat = [
//   {
//     image: `./images/1722871454074.jpeg`,
//     name: `Magic Mountains`,
//     topic: `dfdfjdifdfdifdifjidfjidjfidfijdifjifdif`,
//     price: `$390`,
//     day: `10 Days Trip`,
//   },
// ];
// function Mydata(data) {
//   return `       <div class="magic">
//         <div class="magic-head">
//           <div class="magic-img">
//             <img src="${data.image}" alt="" />
//           </div>
//           <div class="magic-info">
//             <h2>${data.name}</h2>
//             <p>${data.topic}</p>
//             <div class="magic-space">
//               <h3>${data.price}</h3>
//               <p>${data.day}</p>
//             </div>
//           </div>
//         </div>
//           </div>`;
// }

// const mappingData = arrDat.map(Mydata);
// console.log(mappingData);
// const joiner = document.querySelector(".container");
// joiner.innerHTML = mappingData.join("");

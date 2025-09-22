// 헤더
let hamberger = document.querySelector(".ham_bar button");
let body = document.querySelector("body");
let nav = document.querySelector("nav");
hamberger.addEventListener("click", () => {
  hamberger.classList.toggle("on");
  if (hamberger.classList.contains("on")) {
    body.style.overflow = "hidden";
    nav.classList.add("active");
  } else {
    body.style.overflow = "auto";
    nav.classList.remove("active");
  }
});

// 헤더 반응형
function resizeW() {
  let bodyW = body.clientWidth;
  if (bodyW > 1024) {
    hamberger.classList.remove("on");
    body.style.overflow = "auto";
    nav.classList.remove("active");
  }
}
window.addEventListener("resize", resizeW);

// 메뉴연결
// let container = document.getElementById("container");
// let link = document.querySelectorAll("header a");
// let view = document.querySelectorAll(".more_view a");
// link.forEach((item) => {
//   item.addEventListener("click", () => {
//     let page = item.getAttribute("data-page");

//     fetch(page)
//       .then((response) => response.text())
//       .then((data) => {
//         container.innerHTML = data;
//       });
//   });
// });

// view.forEach((item) => {
//   item.addEventListener("click", () => {
//     let page = item.getAttribute("data-page");

//     fetch(page)
//       .then((response) => response.text())
//       .then((data) => {
//         container.innerHTML = data;
//       });
//   });
// });

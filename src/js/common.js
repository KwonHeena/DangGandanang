let container = document.getElementById("container");
let link = document.querySelectorAll(".pages");

link.forEach((item) => {
  item.addEventListener("click", () => {
    let page = item.getAttribute("data-page");

    fetch(page)
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;

        // DOM이 실제로 렌더된 다음 sub.js 실행
        fetch(page)
          .then((response) => response.text())
          .then((data) => {
            container.innerHTML = data;

            // DOM 업데이트 후 함수 호출
            setTimeout(() => {
              initSub();
            }, 0);
          });
      });
  });
});

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

// let container = document.getElementById("container");
// let link = document.querySelectorAll(".pages");
// link.forEach((item) => {
//   item.addEventListener("click", async () => {
//     await changedPages(item);
//   });
// });

// // 페이지 변환
// async function changedPages(item) {
//   const path = `./${item.getAttribute("data-page")}`;

//   try {
//     const res = await fetch(path);
//     const htmlText = await res.text();

//     // 1. HTML 파싱
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlText, "text/html");

//     // 2. 스타일 재삽입
//     doc.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
//       const newLink = document.createElement("link");
//       newLink.rel = "stylesheet";
//       newLink.href = link.getAttribute("href");

//       // 중복 방지 (이미 로드된 스타일이면 생략)
//       if (
//         ![...document.head.querySelectorAll("link")].some(
//           (l) => l.href === newLink.href
//         )
//       ) {
//         document.head.appendChild(newLink);
//       }
//     });

//     // 3. 콘텐츠 삽입
//     const container = document.getElementById("container");
//     container.innerHTML = doc.body.innerHTML;

//     // 4. 스크립트 재삽입
//     doc.querySelectorAll("script").forEach((oldScript) => {
//       const newScript = document.createElement("script");
//       if (oldScript.src) {
//         newScript.src = oldScript.src;
//       } else {
//         newScript.textContent = oldScript.textContent;
//       }
//       // container에 append (document.body 말고!)
//       container.appendChild(newScript);
//     });
//   } catch (e) {
//     console.error("페이지 로드 실패:", e);
//   }
// }

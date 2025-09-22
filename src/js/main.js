// 맛집 데이터 불러오기
fetch("../src/file/recommend.json") // JSON 불러오기
  .then((res) => res.json())
  .then((item) => {
    let ul = document.querySelector(".recommend_wrap > ul");
    item.forEach((data) => {
      let li = document.createElement("li");
      li.innerHTML = `
            <div class="img_wrap">
              <img src="../src/img/sub/restaurant/${data.img}" alt="${data.title}">
            </div>
            <div class="txt_wrap">
              <p class="name">${data.title}</p>
            </div>
      `;
      ul.appendChild(li);
    });

    let lis = ul.querySelectorAll("li");
    ul.style.width = `${lis.length * 279}px`;
    drag();
  });

const wrap = document.querySelector(".recommend_wrap");

//드래그 슬라이드
function drag() {
  let ul = document.querySelector(".recommend_wrap > ul");
  let max = ul.offsetWidth - wrap.offsetWidth;

  let isDown = false;
  let sx = 0;
  let dx = 0;
  let tx = 0;

  ul.addEventListener("mousedown", (e) => {
    isDown = true;
    ul.style.cursor = "grabbing";
    sx = e.clientX;
  });
  document.addEventListener("mouseup", () => {
    if (!isDown) return;
    isDown = false;
    ul.style.cursor = "grab";
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    dx = e.clientX - sx;
    sx = e.clientX;
    tx += dx;

    if (tx > 0) {
      tx = 0;
    }
    if (tx < -max) {
      tx = -max;
    }

    ul.style.transform = `translateX(${tx}px)`;
  });
}

function dragEffect() {
  let ul = document.querySelector(".recommend_wrap > ul");
  let effect = document.createElement("div");
  effect.innerText = "Drag";
  effect.id = "drag";

  document.querySelector("body").appendChild(effect);

  ul.addEventListener("mouseenter", () => {
    effect.style.transform = "scale(1)";
  });
  ul.addEventListener("mouseleave", () => {
    effect.style.transform = "scale(0)";
  });
  ul.addEventListener("mousemove", (e) => {
    effect.style.left = e.pageX + "px";
    effect.style.top = e.pageY + "px";
  });
}
dragEffect();

let mainSlide;
let slide_li;
let totalImg;
let index;
let step;
let originalCount;
let count = document.querySelector(".count");

function mainS() {
  mainSlide = document.querySelector(".main_slide ul");
  slide_li = document.querySelectorAll(".main_slide li");
  slide_li.forEach((item) => {
    let txt = document.createElement("div");
    txt.classList.add("txt");
    txt.innerHTML = `<p class="tit">"여행이 필요한 순간, 다낭"</p>
                    <p class="sub">푸른 바다, 맛있는 음식, 그리고 여유<br>지금 가장 완벽한 휴식을 만날 시간</p>
                  `;

    item.appendChild(txt);
  });

  originalCount = slide_li.length;

  // 첫번째 이미지, 마지막 이미지 복사
  let firstClone = slide_li[0].cloneNode(true);
  let lastClone = slide_li[slide_li.length - 1].cloneNode(true);

  mainSlide.insertBefore(lastClone, mainSlide.firstChild); // mainSlide는 DOM 구조라 unshift 안됨
  mainSlide.appendChild(firstClone);

  totalImg = originalCount + 2;
  step = 100 / totalImg;
  mainSlide.style.width = `${totalImg * 100}%`;
  index = 1;
  mainSlide.style.transform = `translateX(-${step * index}%)`;
  mainSlide.style.transition = "transform 0.9s ease";
  count.innerHTML = `${index} / ${originalCount}`;
}
mainS();

function nextB() {
  index++;
  moveSlide();
}
function prevB() {
  index--;
  moveSlide();
}

mainSlide.addEventListener("transitionend", () => {
  count.innerHTML = `${index} / ${originalCount}`;
  if (index === 0) {
    // 마지막 이미지로 순간이동
    mainSlide.style.transition = "none";
    index = totalImg - 2;
    count.innerHTML = `${index} / ${originalCount}`;
    mainSlide.style.transform = `translateX(-${step * index}%)`;
    mainSlide.offsetWidth;
    mainSlide.style.transition = "transform 0.9s ease";
  }
  if (index === totalImg - 1) {
    mainSlide.style.transition = "none";
    index = 1;
    count.innerHTML = `${index} / ${originalCount}`;
    mainSlide.style.transform = `translateX(-${step * index}%)`;
    mainSlide.offsetWidth;
    mainSlide.style.transition = "transform 0.9s ease";
  }
});

function moveSlide() {
  mainSlide.style.transform = `translateX(-${step * index}%)`;
}

// 자동 슬라이드
let slideStart = setInterval(nextB, 4000);

// 숙소 데이터 불러오기
fetch("../src/file/hotel.json") // JSON 불러오기
  .then((res) => res.json())
  .then((data) => {
    let hotel_li = document.querySelectorAll(".hetel_info ul li");
    hotel_li.forEach((item, idx) => {
      let hotel_img = item.querySelector(".img");
      let hotel_name = item.querySelector(".text");
      hotel_img.innerHTML = `<img src="../src/img/sub/hotel/${data[idx].subImg01}.jpg">`;
      hotel_name.innerHTML = `<p>${data[idx].name}</p>`;
    });
  });

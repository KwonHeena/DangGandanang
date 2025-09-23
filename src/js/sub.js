// const apiKey = "ca4cafaaee024ba60d09e4e6";
// const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/KRW`;

// fetch(url)
//   .then((res) => res.json())
//   .then((data) => {
//     let koInput = document.getElementById("ko");
//     let vnInput = document.getElementById("vnd");
//     if (data.result === "success") {
//       const rate = data.conversion_rates.VND;
//       ko = data.conversion_rates.KRW;
//       vn = data.conversion_rates.VND;

//       koInput.value = ko;
//       vnInput.value = vn;

//       document.querySelector(
//         ".exchange_wrap"
//       ).innerHTML = `1 KRW = ${rate.toLocaleString()}동`;
//     }
//   })
//   .catch((error) => {
//     console.error("API 호출 오류:", error);
//     document.querySelector(".exchange_wrap").innerText = "오류 발생";
//   });

// 숙소 json 불러오기
fetch("src/file/hotel.json")
  .then((res) => res.json())
  .then((item) => {
    let hotelList = document.getElementById("hotel_list");
    let imgList = document.querySelector(".img_list");
    let commonPop = document.querySelector(".common_pop");

    item.forEach((hotel) => {
      let hotel_li = document.createElement("li");
      hotel_li.innerHTML = `
        <a href="#none">
                  <div class="hotel_img">
                    <img src="src/img/sub/hotel/${hotel.subImg01}.jpg" alt="">
                  </div>
                  <div class="hotel_name">
                    ${hotel.name}
                  </div>                
                </a>
      `;
      hotelList.appendChild(hotel_li);

      hotel_li.addEventListener("click", () => {
        commonPop.style.display = "block";
        document.querySelector("body").style.overflow = "hidden";
        imgList.innerHTML = "";

        for (let key in hotel) {
          if (key.indexOf("subImg") === 0) {
            imgList.innerHTML += `
            <li>
              <button type="button">
                <img src="src/img/sub/hotel/${hotel[key]}.jpg" alt="">
              </button>
            </li>
              `;
          }
        }

        let lis = document.querySelectorAll(".img_list > li");
        let main_img = document.querySelector(".main_img");
        main_img.innerHTML = lis[0].querySelector("button").innerHTML;
        lis.forEach((el) => {
          el.addEventListener("click", (e) => {
            let target = e.target;
            if (!target) {
              target.classList.remove("on");
            }
            e.target.classList.add("on");
            let clickedBtn = el.querySelector("button");
            let clickedImg = clickedBtn.querySelector("img");
            let imgSrc = clickedImg.getAttribute("src");

            main_img.innerHTML = `<img src="${imgSrc}" alt="">`;
          });
        });

        let keyName = document.querySelector(".hotel_info .name");
        let keyService = document.querySelector(".hotel_info .service");
        let keySite = document.querySelector(".hotel_info .site");
        let keyInfo = document.querySelector(".hotel_info .info");

        keyName.innerHTML = `<span>숙소명 : </span>${hotel.name}`;
        keyInfo.innerHTML = `<span>숙소 정보 : </span>${hotel.info}`;
        keyService.innerHTML = `<span>부대서비스 : </span>${hotel.service}`;
        keySite.innerHTML = `<span>예약사이트 : </span><a href="${hotel.site}" target="_blank">바로가기</a>`;
      });

      let closeBtn = document.getElementById("close");
      closeBtn.addEventListener("click", () => {
        commonPop.style.display = "none";
        document.querySelector("body").style.overflow = "auto";
      });
      let pop_close = document.getElementById("btn_close");
      pop_close.addEventListener("click", () => {
        commonPop.style.display = "none";
        document.querySelector("body").style.overflow = "auto";
      });
    });
  });

// 맛집 데이터 불러오기
fetch("./src/file/recommend.json") // JSON 불러오기
  .then((res) => res.json())
  .then((file) => {
    let recoList = document.getElementById("recoList");
    let commonPop = document.querySelector(".common_pop");
    file.forEach((data) => {
      let recoli = document.createElement("li");
      recoli.innerHTML = `
      <button type="button" class="reco_ck_btn">
                <div class="res_box">
                  <div class="img_wrap">
                    <img src="./src/img/sub/restaurant/${data.img}" alt="${data.title}">
                  </div>
                  <div class="inform_wrap">
                    <ul>
                      <li><span>상호 : </span>${data.title}</li>
                      <li><span>영업시간 : </span>${data.time}</li>
                      <li><span>평균 가격 :</span>${data.price}</li>
                      <li><span>추천 메뉴 : </span>${data.menu}</li>
                      <li><span>가게 정보 : </span>${data.info}</li>
                    </ul>
                  </div>
                </div>
              </button>
            `;
      recoList.appendChild(recoli);

      recoli.addEventListener("click", () => {
        commonPop.style.display = "block";
        document.querySelector("body").style.overflow = "hidden";
        let mapBox = document.querySelector(".res_pop .map");
        let mapTit = document.querySelector(".common_pop .tit_wrap p");

        for (let key in data) {
          if (key.indexOf("ads") === 0) {
            mapBox.innerHTML = "";
            mapTit.textContent = data.title;
            mapBox.innerHTML += `
            <p>${data.map}</p>
            <iframe src="${data[key]}">
              `;
          }
        }
      });
      let closeBtn = document.getElementById("close");
      closeBtn.addEventListener("click", () => {
        commonPop.style.display = "none";
        document.querySelector("body").style.overflow = "auto";
      });
      let pop_close = document.getElementById("btn_close");
      pop_close.addEventListener("click", () => {
        commonPop.style.display = "none";
        document.querySelector("body").style.overflow = "auto";
      });
    });
  });

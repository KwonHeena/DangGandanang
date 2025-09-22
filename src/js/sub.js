const apiKey = "ca4cafaaee024ba60d09e4e6";
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/KRW`;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let koInput = document.getElementById("ko");
    let vnInput = document.getElementById("vnd");
    if (data.result === "success") {
      const rate = data.conversion_rates.VND;
      // ko = data.conversion_rates.KRW;
      // vn = data.conversion_rates.VND;

      // koInput.value = ko;
      // vnInput.value = vn;

      // document.querySelector(
      //   ".exchange_wrap"
      // ).innerHTML = `1 KRW = ${rate.toLocaleString()}동`;
    }
  })
  .catch((error) => {
    console.error("API 호출 오류:", error);
    document.querySelector(".exchange_wrap").innerText = "오류 발생";
  });

// 숙소 json 불러오기
fetch("../src/file/hotel.json")
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
                    <img src="../src/img/sub/hotel/${hotel.subImg01}.jpg" alt="">
                  </div>
                  <div class="hotel_name">
                    ${hotel.name}
                  </div>                
                </a>
      `;
      hotelList.appendChild(hotel_li);

      hotel_li.addEventListener("click", () => {
        commonPop.style.display = "block";
        imgList.innerHTML = "";

        for (let key in hotel) {
          if (key.indexOf("subImg") === 0) {
            imgList.innerHTML += `
            <li>
              <button type="button">
                <img src="../src/img/sub/hotel/${hotel[key]}.jpg" alt="">
              </button>
            </li>
              `;
            // let mainImg = document.querySelector(".main_img");
            // mainImg.innerHTML = `<img src="../src/img/sub/hotel/${
            //   hotel[key[0]]
            // }.jpg" alt="">`;
          }
        }

        let lis = document.querySelectorAll(".img_list > li");
        let main_img = document.querySelector(".main_img");
        main_img.innerHTML = lis[0].querySelector("button").innerHTML;
        lis.forEach((el) => {
          el.addEventListener("click", (e) => {
            let clickedBtn = el.querySelector("button");
            let clickedImg = clickedBtn.querySelector("img");
            let imgSrc = clickedImg.getAttribute("src");

            main_img.innerHTML = `<img src="${imgSrc}" alt="">`;
          });
        });

        let keyName = document.querySelector(".hotel_info .name");
        let keyService = document.querySelector(".hotel_info .service");
        let keySite = document.querySelector(".hotel_info .site");

        keyName.innerHTML = `<span>숙소명 : </span>${hotel.name}`;
        keyService.innerHTML = `<span>부대서비스 : </span>${hotel.service}`;
        keySite.innerHTML = `<span>예약사이트 : </span><a href="${hotel.site}" target="_blank">바로가기</a>`;
      });
    });
  });

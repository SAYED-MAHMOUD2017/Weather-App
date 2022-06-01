let inputSearch = document.querySelector("#inputSearch");
let searchBtn = document.querySelector("#searchBtn");
var locationData = [];
let mainRequest = new XMLHttpRequest();

(async function (){
  mainRequest.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=8992c034547c463188592542223005&q=cairo&days=3&aqi=no&alerts=no`);
  mainRequest.send();
  mainRequest.addEventListener("readystatechange", function() {
  if (mainRequest.readyState == 4 && mainRequest.status == 200) {
    locationData = JSON.parse(mainRequest.response);
    display();
  }
})
}())

inputSearch.addEventListener("keyup", function (e) {
  if(e.key == "Enter" || inputSearch.value != '') {
  mainRequest.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=8992c034547c463188592542223005&q=${inputSearch.value}&days=3&aqi=no&alerts=no`);
}else {
  mainRequest.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=8992c034547c463188592542223005&q=cairo&days=3&aqi=no&alerts=no`);
}
mainRequest.send();
})

function display() {
  document.getElementById("days").innerHTML = `
  <div class="col-md-4" id="firstDay">
            <div class="first-day day rounded-top">
              <p class="text-white-50 text-center p-2">${locationData.location.localtime}</p>
              <div class="content px-4 pb-4">
                  <h5 class="countryCity text-white fw-normal">${locationData.location.name} </h5>
                <div class="deg d-flex mt-4">
                  <div class="deg-text">
                  <h2 class="degHot text-white fw-bold">${locationData.current.temp_c}<sup>o</sup>C</h2>
                  </div>
                  <img src="${locationData.current.condition.icon}" class="img-deg ms-2" alt="">
                  </div>
                <span class="stutsOfWeather text-main-color my-4 d-block">${locationData.current.condition.text}</span>
                <div class="icons d-flex">
                  <span class="me-4 text-white"><img class="me-2" src="images/icon-umberella.png" alt="">${locationData.current.vis_km}%</span>
                  <span class="me-4 text-white"><img class="me-2" src="images/icon-wind.png" alt="">${locationData.current.wind_kph}km/h</span>
                  <span class="me-4 text-white"><img class="me-2" src="images/icon-compass.png" alt="">${locationData.current.wind_dir}</span>
                </div>
              </div>
            </div>
          </div>
          `
  for(let i = 1; i < locationData.forecast.forecastday.length; i++)
  document.getElementById("days").innerHTML += `
          <div class="col-md-4">
            <div class="next-day day rounded-top text-center">
              <p class="text-white-50 p-2">${locationData.forecast.forecastday[i].date}</p>
              <div class="content p-4">
                <div class="deg">
                  <img src="${locationData.forecast.forecastday[i].day.condition.icon}" class="img-deg2 ms-2" alt="">
                  <h4 class="text-white fw-bold">${locationData.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</h4>
                  <h6 class="text-white-50 fw-bold">${locationData.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>c</h6>
                </div>
                <span class="text-main-color my-4 d-block">${locationData.forecast.forecastday[i].day.condition.text}</span>
              </div>
            </div>
          </div>
  `;
}
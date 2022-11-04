//JS for time and day

let today = new Date();
let h2 = document.querySelector("h2");
let hours = today.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let time = `${hours}:${minutes}`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
h2.innerHTML = `${day} ${time}`;
//Formatting for forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//JS for forecast
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-sm-2">
        <div class="forecast">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="clear sky day" width="36"
            />
            <div class="weather-forecast-temperatures">
            <span class="forecast-max" >${Math.round(
              forecastDay.temp.max
            )}°</span> | <span class="forecast-min" >${Math.round(
          forecastDay.temp.min
        )}°</span>
            </div>
        </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//JS for searchbar and city display
function searchDisplay(response) {
  let h1 = document.querySelector(".cityHeading");
  let h3 = document.querySelector(".bigTemp");
  let wind = document.querySelector(".windSpeed");
  let description = document.querySelector(".weatherDescription");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  h1.innerHTML = response.data.name;
  h3.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} mph`;
  description.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let searchCity = searchInput.value;

  let units = "imperial";
  let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${searchCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(searchDisplay);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Forecast API
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//Current Location Button and display

function showLocationInfo(response) {
  console.log(response.data);
  let h1 = document.querySelector(".cityHeading");
  let h3 = document.querySelector(".bigTemp");
  let wind = document.querySelector(".windSpeed");
  let description = document.querySelector(".weatherDescription");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  h1.innerHTML = response.data.name;
  h3.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} mph`;
  description.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showLocationInfo);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function showCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".bigTemp");

  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");

  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = `${Math.round(celciusTemperature)}°C`;
}
function showFahrenheitTemperature(event) {
  let temperatureElement = document.querySelector(".bigTemp");

  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");

  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}

let fahrenheitTemperature = null;

let btn = document.querySelector("#locationButton");
btn.addEventListener("click", getLocation);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

displayForecast();

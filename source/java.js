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

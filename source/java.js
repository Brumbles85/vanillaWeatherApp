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
  console.log(response.data);
  let h1 = document.querySelector("h1");
  let cityName = response.data.name;
  h1.innerHTML = cityName;

  let h3 = document.querySelector("h3");
  let cityTemperature = Math.round(response.data.main.temp);
  h3.innerHTML = `${cityTemperature}°F`;

  let wind = document.querySelector(".windSpeed");
  let windSpeed = response.data.wind.speed;
  wind.innerHTML = `${windSpeed} mph`;

  let high = document.querySelector(".high");
  let highTemp = response.data.main.temp_max;
  high.innerHTML = `High Temp: ${highTemp}°F`;

  let low = document.querySelector(".low");
  let lowTemp = response.data.main.temp_min;
  low.innerHTML = `Low Temp: ${lowTemp}°F`;

  let feels = document.querySelector(".feels");
  let feelsLike = Math.round(response.data.main.feels_like);
  feels.innerHTML = `It feels about ${feelsLike} °F right now`;
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
  let h1 = document.querySelector("h1");
  let city = response.data.name;
  h1.innerHTML = city;

  let h3 = document.querySelector("h3");
  let temperature = Math.round(response.data.main.temp);
  h3.innerHTML = `${temperature}­°F`;

  let high = document.querySelector("#high");
  let highTemp = response.data.main.temp_max;
  high.innerHTML = `High Temp: ${highTemp} °F`;

  let low = document.querySelector("#low");
  let lowTemp = response.data.main.temp_min;
  low.innerHTML = `Low Temp: ${lowTemp} °F`;

  let feels = document.querySelector("#feels");
  let feelsLike = Math.round(response.data.main.feels_like);
  feels.innerHTML = `It feels about ${feelsLike} °F right now`;
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

let btn = document.querySelector("#locationButton");
btn.addEventListener("click", getLocation);

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
  let tempHighLow = document.querySelector(".highLow");
  let description = document.querySelector(".weatherDescription");
  let iconElement = document.querySelector("#icon");

  let cityName = response.data.name;
  let cityTemperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let descriptionInfo = response.data.weather[0].description;

  h1.innerHTML = cityName;
  h3.innerHTML = `${cityTemperature}°F`;
  wind.innerHTML = `Wind Speed: ${windSpeed} mph`;
  tempHighLow.innerHTML = `High°/Low°(F): ${high}°/${low}°`;
  description.innerHTML = descriptionInfo;
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
  let tempHighLow = document.querySelector(".highLow");
  let description = document.querySelector(".weatherDescription");
  let iconElement = document.querySelector("#icon");

  let cityName = response.data.name;
  let cityTemperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let descriptionInfo = response.data.weather[0].description;

  h1.innerHTML = cityName;
  h3.innerHTML = `${cityTemperature}°F`;
  wind.innerHTML = `Wind Speed: ${windSpeed} mph`;
  tempHighLow.innerHTML = `High°/Low°(F): ${high}°/${low}°`;
  description.innerHTML = descriptionInfo;
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

let btn = document.querySelector("#locationButton");
btn.addEventListener("click", getLocation);

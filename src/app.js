function getUserPosition() {
    navigator.geolocation.getCurrentPosition(handlePosition);
}
function handlePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "590447721ec9809f25311836ff52f884";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiURL).then(showInfo);
  }
  function backToLocal(event) {
    
}

function getNewCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#searchbar");
    searchInput = searchInput.value;
    let apiKey = "590447721ec9809f25311836ff52f884";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showInfo);
  
}
function showInfo(response) {
    let newCity = response.data.name;
    let newTemp = Math.round(response.data.main.temp);
    let newWeatherDesc = response.data.weather[0].description;
    let windSpeed = Math.round(response.data.wind.speed);
    let humidity = response.data.main.humidity;
    let feelsLike = response.data.main.feels_like; 
    let currentTimeDisplay = document.querySelector("#current-time");
    currentTimeDisplay.innerHTML = formatDate(response.data.dt * 1000);
    currentCity.innerHTML = newCity;
    currentTemp.innerHTML = newTemp;
    additionalInfo.innerHTML = `Humidity: ${humidity}%, Wind: ${windSpeed} km/h`;
}
function formatDate(timestamp) {
    let weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
    let date = new Date (timestamp)
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;  
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
        
    }
    let day = weekDays[date.getDay()]
    
    
    return `${day}, ${hours}:${minutes}`
}

getUserPosition();

let currentCity = document.querySelector("#current-city");
let currentTemp = document.querySelector("#current-temp");
let additionalInfo = document.querySelector("#additional-info");
let searchForm = document.querySelector("#searchbar-container");
searchForm.addEventListener("submit", getNewCity);

let crnLocationBtn = document.querySelector ("#crn-location-btn");
crnLocationBtn.addEventListener("click", getUserPosition);

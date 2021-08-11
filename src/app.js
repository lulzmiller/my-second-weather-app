function getNewCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#searchbar");
    searchInput = searchInput.value;
    let apiKey = "590447721ec9809f25311836ff52f884";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showNewInfo);
  
}
function showNewInfo(response) {
    let newCity = response.data.name;
    let newTemp = Math.round(response.data.main.temp);
    let newWeatherDesc = response.data.weather[0].description;
    let windSpeed = response.data.wind.speed;
    let humidity = response.data.main.humidity;
    let feelsLike = response.data.main.feels_like; 
    currentCity.innerHTML = newCity;
    currentTemp.innerHTML = newTemp;
    additionalInfo.innerHTML = `Humidity: ${humidity}%, Wind: ${windSpeed} km/h`;
    updateTime(newWeatherDesc);
}
function updateTime(newWeatherDesc) {
let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let now = new Date();
  let year = now.getFullYear();
  let month = months[now.getMonth()];
  let weekDay = weekDays[now.getDay()];
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let currentTime = `${weekDay} ${hour}:${minute}, ${newWeatherDesc}`;
  let currentTimeDisplay = document.querySelector("#current-time");
  currentTimeDisplay.innerHTML = `${currentTime}`;
}


let currentCity = document.querySelector("#current-city");
let currentTemp = document.querySelector("#current-temp");
let additionalInfo = document.querySelector("#additional-info");
let searchForm = document.querySelector("#searchbar-container");
searchForm.addEventListener("submit", getNewCity);



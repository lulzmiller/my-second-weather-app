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
    let newWeatherDesc = response.data.weather[0].description;
    let windSpeed = Math.round(response.data.wind.speed);
    let humidity = response.data.main.humidity;
    let feelsLike = response.data.main.feels_like; 
    let newIcon = response.data.weather[0].icon;
    let currentTimeDisplay = document.querySelector("#current-time");
    let currentWeatherDesc = document.querySelector("#weather-desc");
    let currentWeatherIcon = document.querySelector("#icon");

    celsiusTemp = Math.round(response.data.main.temp);
    currentWeatherDesc.innerHTML = `, ${newWeatherDesc}`;
    currentTimeDisplay.innerHTML = formatDate(response.data.dt * 1000);
    currentCity.innerHTML = newCity;
    currentTemp.innerHTML = celsiusTemp;
    additionalInfo.innerHTML = `Humidity: ${humidity}%, Wind: ${windSpeed} km/h`;
    currentWeatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${newIcon}@2x.png`);

    getForecast(response.data.coord);
    
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
function displayFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp");
    let fahrenheitTemperature = (celsiusTemp * 9) /5 +32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}
function displayCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp");
    temperatureElement.innerHTML = celsiusTemp;
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
}
function getForecast (coordinates) {
    let lat = coordinates.lat;
    let lon = coordinates.lon;
    let apiKey = "590447721ec9809f25311836ff52f884";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayForecast)
    
}
function displayForecast(response){
    
    let forecastContainer = document.querySelector("#forecast-container");
    let forecastHTML = `<div class="row">`;
    let forecastDays = response.data.daily;
    forecastDays
    forecastDays.forEach(function(day, index) {
        if (index < 6 && index > 0) {
            
        forecastHTML = forecastHTML + `
        
        <div class="col-2 forecast">
        <h6 class="forecast-day">
            ${formatDay(day.dt)}
        </h6>
    
            <div class="forecast-icon">
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="forecast-icon" width="100">
            </div>
            <span class="forecast-temp-max">
                ${Math.round(day.temp.max)}°
            </span>
        <span class="forecast-temp-min">
                ${Math.round(day.temp.min)}°
            </span>
        </div>
        `;
        }})
        forecastHTML = forecastHTML + `</div>`;
    forecastContainer. innerHTML = forecastHTML;
    }


function formatDay(date) {
    let weekDays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ];
    let day = new Date (date * 1000);
    day = weekDays[day.getDay()]
    return day;
}
    



getUserPosition();



let celsiusTemp = null;

let currentCity = document.querySelector("#current-city");
let currentTemp = document.querySelector("#current-temp");
let additionalInfo = document.querySelector("#additional-info");
let searchForm = document.querySelector("#searchbar-container");
searchForm.addEventListener("submit", getNewCity);

let crnLocationBtn = document.querySelector ("#crn-location-btn");
crnLocationBtn.addEventListener("click", getUserPosition);

let fahrenheitLink = document.querySelector ("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);
let celsiusLink = document.querySelector ("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

let darkModeLink = document.querySelector("#stylingSwitch");
darkModeLink.addEventListener("click", changeStyleSheet)

function changeStyleSheet(event) {
    event.preventDefault();
    let styleSheet = document.querySelector(".stylesheet");
    let stylingSwitch = document.querySelector("#stylingSwitch");
    let linkedinIcon = document.querySelector("#linkedin");
    styleSheet.setAttribute("href","src/darkMode.css");
    stylingSwitch.innerHTML = `to go back to light mode, please reload. :-)`;
    linkedinIcon.setAttribute("src","media/aboutmeDark.svg");
    
}

/* ADD DARK STYLING
let darkStyle = document.createElement("style")
darkStyle.innerHTML = 
'body {' +
    'padding:10%;' +
    'font-family: "Spartan", sans-serif; ' +
    'font-weight:400;' +
    'background: radial-gradient(rgb(51, 92, 103) 11.2%, rgb(58, 58, 58) 91.1%);' +
'section a {' +
    'text-decoration: none;'+
    'color:#1B3137;}' +

'section a:hover{'+
    'color:#9E2A2B;'
    'font-size: 18px;'
    'font-weight: 700;}'+

'footer p {'+
    'color:rgba(27, 49, 55, 0.5);'+
    'font-size: 13px;'+
    'text-align: center;'+
    'margin: 0;}'
'footer a {'+
    'text-decoration: none;'+
    'color:#9E2A2B;}'+

'footer a:hover{'+
    'color:#1B3137;'+
    'font-weight: 700;}'+

'#app-container {'+
    'background:#FFF;'+
    'box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;'+
    'width: 80%;'+
    'min-width: 300px;}'+
'#app-container,#footer {'+
    'border:1px solid transparent;'+
    'border-radius: 10px;'+
    'padding: 30px 30px;'+
    'margin: 0 auto;}'+

'#searchbar-container {'+
    'padding: 30px 10px;}'+
'#searchbar {'+
   'box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;'+
    'border: none;}'+
 
'#submit-btn, #crn-location-btn {'+
    'color:#3A3A3A;'+
    'border:none;'+
    'margin: 0 1px 0 2px;'+
    'padding: 5px 15px;'+
    'font-size: 25px;'+
    'box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;'+
    'transition: 200ms ease-in-out;}'+

'#submit-btn:hover, #crn-location-btn:hover {'+
'color: #fff;'+
'background:#3A3A3A ;}'+

'#city-container, #quote-container {'+
    'padding: 30px;}'+

'#city-container ul  {'+
'list-style: none;'+
'padding: 0;'+
'margin: 0;}'+

'#temperature-container {'+
    'font-size: 70px;'+
    'text-align: right;}'+

'#temperature-container .units {'+
    'position: relative;'+
    'bottom:45px;'+
    'right: 15px;'+
    'font-size: 15px;}'+

'#temperature-container .active:hover {'+
    'color: #9E2A2B;'+
    'font-size: 15px;'+
    'font-weight: 500;'+
    'cursor: default;}'+

'.forecast {'+
    'text-align: center;'+
    'width: 190px;'+
    'padding: 20px;}';

    let ref = document.querySelector('script');
    let parentDiv = ref.head;
    parentDiv.insertBefore(darkStyle, ref);

    */


    //Forecast


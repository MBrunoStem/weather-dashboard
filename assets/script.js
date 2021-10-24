var cityInputEl = document.querySelector('#city-input');
var searchBtnEl = document.querySelector('#search-button');
var searchHistoryEl = document.querySelector('#search-history');
var currentDayEl = document.querySelector('#current-day');
var currentDateEl = document.querySelector('#current-date');
var currentIconEl = document.querySelector('#current-icon');
var currentTempEl = document.querySelector('#current-temp');
var currentHumidityEl = document.querySelector('#current-humidity');
var currentWindEl = document.querySelector('#current-wind');
var currentUviEl = document.querySelector('#current-uvi');
var forecastEl = document.querySelector('#forecast');
var APIKey = '8106e0bea7fc031672ade780d6c17d4d';

function fetchWeather(){
    var city = cityInputEl.value;
    localStorage.setItem("recent-search", city);
    var recent = localStorage.getItem("recent-search");
    var liEl = document.createElement("li");
    liEl.innerHTML = recent
    searchHistoryEl.append(liEl);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + APIKey;
    fetch(queryURL)
    .then(res=> res.json())
    .then((data)=>{
        
        fetchForecast(data);
    })
}

function fetchForecast(data) {
    let cityName = data.name
    let {lat, lon} = data.coord
    var forecastURL = "http://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid=" + APIKey;
    fetch(forecastURL)
    .then(res => res.json())
    .then((data) => {
        console.log(data)
        renderItems(cityName, data)
    });
}

function renderForecast(cityName, data) {
    forecastEl.setAttribute("class", "content")
    for (let i = 0; i < 5; i++) {
        let forecast = data[i];
        var forecastDate = forecast.dt;
        var forecastIcon = forecast.icon;
        var forecastTemp = forecast.temp.day;
        var forecastHumidity = forecast.humidity;
        var forecastWind = forecast.wind_speed;
        var div = document.createElement("div");
        div.setAttribute("class", "forecast-card");
        forecastEl.append(div);
        var forecastDateEl = document.createElement("h3");
        forecastDateEl.innerHTML = cityName + "-- " +forecastDate;
        forecastEl.appendChild(div).append(forecastDateEl);
        var forecastIconEl = document.createElement("a");
        forecastIconEl.innerHTML = forecastIcon;
        forecastEl.appendChild(div).append(forecastIconEl);
        var forecastTempEl = document.createElement("h4");
        forecastTempEl.innerHTML = "Temperature: " + forecastTemp + "°F";
        forecastEl.appendChild(div).append(forecastTempEl);
        var forecastHumidityEl = document.createElement("h4");
        forecastHumidityEl.innerHTML = "Humidity: " + forecastHumidity + "%";
        forecastEl.appendChild(div).append(forecastHumidityEl);
        var forecastWindEl = document.createElement("h4");
        forecastWindEl.innerHTML = "Wind Speed: " + forecastWind + "mph";
        forecastEl.appendChild(div).append(forecastWindEl);
    }
}

function renderCurrentDay(cityName, data) {
    currentDayEl.setAttribute("class", "content");
    currentDateEl.innerHTML = cityName + "-- " + data.dt;
    currentIconEl.value = data.icon;
    currentTempEl.innerHTML = "Temperature: " + data.temp + "°F";
    currentHumidityEl.innerHTML = "Humidity: " + data.humidity + "%";
    currentWindEl.innerHTML = "Wind Speed: " + data.wind_speed + "mph";
    currentUviEl.innerHTML = "UV Index: " + data.uvi;
}

function renderItems(cityName, data) {
    renderCurrentDay(cityName, data.current)
    renderForecast(cityName, data.daily)
};

function fetchWeatherAgain(event){
    var city = event.target.textContent;
    localStorage.setItem("recent-search", city);
    var recent = localStorage.getItem("recent-search");
    var liEl = document.createElement("li");
    liEl.innerHTML = recent
    searchHistoryEl.append(liEl);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + APIKey;
    fetch(queryURL)
    .then(res=> res.json())
    .then((data)=>{
        
        fetchForecast(data)
    })
}

searchBtnEl.addEventListener('click', fetchWeather);
searchHistoryEl.addEventListener('click', fetchWeatherAgain);
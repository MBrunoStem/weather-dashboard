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
var pastCities = JSON.parse(localStorage.getItem("past-cities")) || [];
createHistoryBtns();

function createHistoryBtns() {
    searchHistoryEl.innerHTML = "";
    for (let i = 0; i < pastCities.length; i++) {
        var liEl = document.createElement("li");
        liEl.innerHTML = pastCities[i];
        searchHistoryEl.append(liEl);        
    }
}

function fetchWeather(city) {
    var cityExists = false;
    for (let i = 0; i < pastCities.length; i++) {
        if (city.toLowerCase() === pastCities[i].toLowerCase()) {
            cityExists = true
            break
        }
    }
    if (!cityExists) {
        pastCities.push(city)
        localStorage.setItem("past-cities", JSON.stringify(pastCities))
        createHistoryBtns();
    }
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
        .then(res => res.json())
        .then((data) => {

            fetchForecast(data);
        })
}

function fetchForecast(data) {
    let cityName = data.name
    let { lat, lon } = data.coord
    var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
    fetch(forecastURL)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            renderItems(cityName, data)
        });
}

function renderItems(cityName, data) {
    renderCurrentDay(cityName, data.current)
    renderForecast(cityName, data.daily)
};

function renderCurrentDay(cityName, data) {
    currentDayEl.setAttribute("class", "content");
    currentDateEl.innerHTML = cityName + "-- " + moment.unix(data.dt).format("MMM Do, YYYY");
    currentIconEl.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    currentTempEl.innerHTML = "Temperature: " + data.temp + "°F";
    currentHumidityEl.innerHTML = "Humidity: " + data.humidity + "%";
    currentWindEl.innerHTML = "Wind Speed: " + data.wind_speed + "mph";
    currentUviEl.innerHTML = "UV Index: " + data.uvi;
}

function renderForecast(cityName, data) {
    forecastEl.innerHTML = "";
    forecastEl.setAttribute("class", "content")
    for (let i = 0; i < 5; i++) {
        let forecast = data[i];
        var forecastDate = moment.unix(forecast.dt).format("MMM Do, YYYY");
        var forecastIcon = forecast.weather[0].icon;
        var forecastTemp = forecast.temp.day;
        var forecastHumidity = forecast.humidity;
        var forecastWind = forecast.wind_speed;
        console.log(forecastIcon);
        var div = document.createElement("div");
        div.setAttribute("class", "forecast-card");
        var forecastDateEl = document.createElement("h3");
        forecastDateEl.innerHTML = cityName + "-- " + forecastDate;
        var forecastIconEl = document.createElement("img");
        forecastIconEl.src = "https://openweathermap.org/img/w/" + forecastIcon + ".png";
        var forecastTempEl = document.createElement("h4");
        forecastTempEl.innerHTML = "Temperature: " + forecastTemp + "°F";
        var forecastHumidityEl = document.createElement("h4");
        forecastHumidityEl.innerHTML = "Humidity: " + forecastHumidity + "%";
        var forecastWindEl = document.createElement("h4");
        forecastWindEl.innerHTML = "Wind Speed: " + forecastWind + "mph";
        div.append(forecastDateEl, forecastIconEl, forecastTempEl, forecastHumidityEl, forecastWindEl);
        forecastEl.append(div);
    }
}

searchBtnEl.addEventListener('click', () => { fetchWeather(cityInputEl.value) });
searchHistoryEl.addEventListener('click', (event) => {
    if (event.target.matches("li")) {
        var city = event.target.textContent
        fetchWeather(city);
    }
});
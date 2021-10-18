var cityInputEl = document.querySelector('#city-input');
var searchBtnEl = document.querySelector('#search-button');
var searchHistoryEl = document.querySelector('#search-history');
var searchHistoryEl = document.querySelector('#current-day');
var forecastEl = document.querySelector('#forecast');
var APIKey = '8106e0bea7fc031672ade780d6c17d4d';

// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// localStorage.setItem("recent-search", JSON.stringify(city))

// function fetchWeather(){
//     var city = cityInputEl.value;
//     var APIKey = '8106e0bea7fc031672ade780d6c17d4d'
//     var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + APIKey;
//     fetch(queryURL)
//     .then(response => response.json())
//     .then(data => console.log(data))
//     localStorage.setItem("recent-search", JSON.stringify(city))
// }

function fetchWeather(){
    var city = cityInputEl.value;
    localStorage.setItem("recent-search", city);
    var recent = localStorage.getItem("recent-search");
    var liEl = document.createElement("li");
    liEl = recent
    searchHistoryEl.append(liEl);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + APIKey;
    fetch(queryURL)
    .then(response => response.json())
    .then(data => console.log(data))
}

searchBtnEl.addEventListener('click', fetchWeather);
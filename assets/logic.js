
var inputBox = document.querySelector('#inputBox');
var searchButton = document.querySelector('#searchButton');
var currentDay = document.querySelector('#currentDay');
var fiveDay = document.querySelector('#fiveDay');

var WEATHERLOCATION_API_URL = "http://api.openweathermap.org/geo/1.0/direct?limit=3&q=";
var searchContent = "";
var API_KEY = "&appid=2f82ce2bb874a38e8104a84e04719d1a"

var WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&";


searchButton.addEventListener('click', function() {
    searchContent = inputBox.value;
    fetchWeatherLocationResults();
})

function fetchWeatherLocationResults() {
    fetch (WEATHERLOCATION_API_URL+searchContent+API_KEY)
    .then(function (res) {
        if (!res.ok) throw new Error('oops got an error');
        return res.json();
    })
    .then(function (data) {
        console.log('Data :>>', data);
        fetchWeatherResults(data[0]);
    })
    .catch(function (error) {
        console.error(error);
    });
}


function fetchWeatherResults(locationData) {

    var latitude = locationData.lat;
    var longitude = locationData.lon;
    var lat_lon = "lat=" + latitude + "&" + "lon=" + longitude;


    fetch (WEATHER_API_URL+lat_lon+API_KEY)
    .then(function (res) {
        if (!res.ok) throw new Error('oops got an error');
        return res.json();
    })
    .then(function (data) {
        console.log('Data :>>', data);
        renderWeatherData(data)
        // renderDrinkResults(data);
    })
    .catch(function (error) {
        console.error(error);
    });
}

function renderWeatherData(data) {
    currentDay.textContent = " ";

    var curCity = document.createElement('h2');
    curCity.textContent = searchContent;
    currentDay.append(curCity);

    // NEED DATE !!!!! 

    var icon = document.createElement('img');
    var iconCode = data.list[0].weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
    icon.setAttribute('src', iconUrl);
    currentDay.append(icon);


    var temp = document.createElement('p');
    temp.textContent = "Temp: " + data.list[0].main.temp + "°F";
    currentDay.append(temp);

    var wind = document.createElement('p');
    wind.textContent = "Wind: " + data.list[0].wind.speed + "MPH";
    currentDay.append(wind);

    var humidity = document.createElement('p');
    humidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
    currentDay.append(humidity);
}
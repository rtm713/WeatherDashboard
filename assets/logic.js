
var inputBox = document.querySelector('#inputBox');
var searchButton = document.querySelector('#searchButton');
var currentDay = document.querySelector('#currentDay');
var fiveDay = document.querySelector('#fiveDay');
var searchContainer = document.querySelector('#searchContainer');
var previousSearches = document.querySelector('#previousSearches');

var WEATHERLOCATION_API_URL = "http://api.openweathermap.org/geo/1.0/direct?limit=3&q=";
var searchContent = "";
var API_KEY = "&appid=2f82ce2bb874a38e8104a84e04719d1a"

var WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&";

renderSearchButtons();

var previousSearchButton = document.querySelectorAll(".previousSearchButton");

searchButton.addEventListener('click', function() {
    searchContent = inputBox.value;
    fetchWeatherLocationResults(searchContent);
})

previousSearches.addEventListener('click', function(event) {
    if (event.target && event.target.matches('button.previousSearchButton')) {
        var buttonContent = event.target.textContent;
        searchContent = buttonContent;
        fetchWeatherLocationResults(buttonContent);
    }
});


function fetchWeatherLocationResults(DATA) {
    fetch (WEATHERLOCATION_API_URL+DATA+API_KEY)
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
        renderCurrentWeatherData(data);
        renderFiveDayWeatherData(data);
        saveSearchData();
    })
    .catch(function (error) {
        console.error(error);
    });
}

function renderCurrentWeatherData(data) {
    currentDay.textContent = " ";

    var curCity = document.createElement('h2');
    curCity.textContent = searchContent;
    currentDay.append(curCity);

    var date = document.createElement('h3');
    date.textContent = dayjs(data.list[0].dt_txt).format('MM/DD/YYYY');
    currentDay.append(date);

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

function renderFiveDayWeatherData(data) {
    fiveDay.textContent = " ";
    var dayData = [3,12,20,28,36];

    for (var i=0; i<dayData.length; i++) {
        var dayDiv = document.createElement('div');

        var date = document.createElement('h3');
        date.textContent = dayjs(data.list[dayData[i]].dt_txt).format('MM/DD/YYYY');
        dayDiv.append(date);

        var icon = document.createElement('img');
        var iconCode = data.list[dayData[i]].weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
        icon.setAttribute('src', iconUrl);
        dayDiv.append(icon);


        var temp = document.createElement('p');
        temp.textContent = "Temp: " + data.list[dayData[i]].main.temp + "°F";
        dayDiv.append(temp);

        var wind = document.createElement('p');
        wind.textContent = "Wind: " + data.list[dayData[i]].wind.speed + "MPH";
        dayDiv.append(wind);

        var humidity = document.createElement('p');
        humidity.textContent = "Humidity: " + data.list[dayData[i]].main.humidity + "%";
        dayDiv.append(humidity);

        fiveDay.append(dayDiv);
    }
}

function saveSearchData() {

    var savedSearches = {
        search: searchContent,
    };

    var saveSearch = localStorage.getItem('saveSearch');
    if (saveSearch === null) {
        saveSearch = [];
     } else {
        saveSearch = JSON.parse(saveSearch);
    }
    saveSearch.push(savedSearches);
    var thisSearch = JSON.stringify(saveSearch);
    localStorage.setItem("saveSearch", thisSearch);

    renderSearchButtons();

}

function renderSearchButtons() {

    previousSearches.textContent = " ";

    var saveSearch = localStorage.getItem('saveSearch');
    if (saveSearch === null) {
        return;
     } else {
        saveSearch = JSON.parse(saveSearch);
    }
    for (var i=0; i<saveSearch.length; i++) {
        var savedSearch = document.createElement('button');
        savedSearch.setAttribute('class', "previousSearchButton")
        savedSearch.textContent = saveSearch[i].search;
        previousSearches.append(savedSearch);
    }
}

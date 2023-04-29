
var inputBox = document.querySelector('#inputBox');
var searchButton = document.querySelector('#searchButton');

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

        // renderDrinkResults(data);
    })
    .catch(function (error) {
        console.error(error);
    });
}
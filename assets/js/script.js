var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city-name");
var city = "";
var apiKey = "a42035ac268e1618342dba6f73c69192";
var index = "";
var latAndLon = ""


var getLocation = function() {
    var locationApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
    fetch(locationApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // console.log(data);
                // console.log(data[0].lat, data[0].lon);
                latAndLon = data[0]
            });
        } else {
            alert("Error: City Not Found");
            return false;
        }
    });
};

var getForecast = function() {
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latAndLon.lat + "&lon=" + latAndLon.lon + "&exclude=minutely,hourly&appid=" + apiKey;
    fetch(weatherApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert("Error: Forecast Not Found");
            return false;
        }
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    city = cityInputEl.value.trim();
    var pastSearchesEl = document.createElement("button");
    pastSearchesEl.textcontet = city;
    if (city) {
        getLocation(city);
        // city.value = "";

        if (latAndLon) {
            getForecast();
        }
    } else {
        alert("Please enter a city");
    }
    // console.log(event);
};

cityFormEl.addEventListener("submit", formSubmitHandler);



//test apis w hardcoded data
//get location lat/lon from city search 
//get weather data based on lat/lon geocode api
//display current weather data in top box
//display 5 day forecast in cards below
//save previous searches to localstorage
//display previous searches below search area
//change uv index color based on index #s
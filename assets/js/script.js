var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city-name");
var currentWeather = document.querySelector("#current-weather");
var fiveDayIcon = document.querySelector("#five-day-icon");
var forecastCardsContainerEl = document.querySelector("#forecast-cards");
var city = "";
var apiKey = "a42035ac268e1618342dba6f73c69192";
var index = "";
var latAndLon = "";
var weatherInfo = "";


var getLocation = async function() {
    var locationApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
    await fetch(locationApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // console.log(data);
                // console.log(data[0].lat, data[0].lon);
                latAndLon = data[0]
                getForecast();
            });
        } else {
            alert("Error: City Not Found");
            return false;
        }
    });
};

var getForecast = function() {
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latAndLon.lat + "&lon=" + latAndLon.lon + "&exclude=minutely,hourly&units=imperial&appid=" + apiKey;
    fetch(weatherApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                weatherInfo = data;
                displayCurrentWeather();
                displayFiveDayWeather();

            });
        } else {
            alert("Error: Forecast Not Found");
            return false;
        }
    });
};

var setCurrentText = function(id, text) {
    document.getElementById(`current-${id}`).textContent = text

}
var displayCurrentWeather = function() {
    setCurrentText("city-name", `The Current Weather in ${latAndLon.name}, ${latAndLon.state}, ${latAndLon.country}`);
    setCurrentText("temp", "Temp: " + weatherInfo.current.temp + "°F");
    setCurrentText("wind", "Wind: " + weatherInfo.current.wind_speed + " MPH");
    setCurrentText("humidity", "Humidity: " + weatherInfo.current.humidity + "%");
    setCurrentText("uv", "UV Index: " + weatherInfo.current.uvi);
}

// var setFiveDayText = function(id, text) {
//     document.getElementById(`five-day-${id}`).textContent = text
// }

var displayFiveDayWeather = function() {
        forecastCardsContainerEl.innerHTML = `
        ${weatherInfo.daily.map((forecastDay, index) => {
            if (index < 5) {
        return `<div class="card col-2 m-1 p-1">
            <span>${new Date(forecastDay.dt * 1000).toDateString()}</span>
            <img width="50" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png"/>
            <span>Temp: ${forecastDay.temp.day}°F</span>
            <span>Wind: ${forecastDay.wind_speed} MPH</span>
            <span>Humidity: ${forecastDay.humidity}%</span>
        </div>`}
        }).join('')}`;


        // if () {
        // fiveDayIcon.setAttribute("class", "")
        // }
        // setFiveDayText("temp", "Temp: " + weatherInfo.current.temp + "°F");
        // setFiveDayText("wind", "Wind: " + weatherInfo.current.wind_speed + " MPH");
        // setFiveDayText("humidity", "Humidity: " + weatherInfo.current.humidity + "%");
    
}


var formSubmitHandler = async function(event) {
    event.preventDefault();
    // get value from input element
    city = cityInputEl.value.trim();
    var pastSearchesEl = document.createElement("button");
    pastSearchesEl.textcontet = city;
    if (city) {
        await getLocation(city).then(() => {
            console.log(latAndLon);
            // getForecast();
            // displayCurrentWeather();
        });
        // city.value = "";
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
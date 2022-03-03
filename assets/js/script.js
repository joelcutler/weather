var getWeatherInfo = function() {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=a42035ac268e1618342dba6f73c69192";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data);
            });
        } else {
            alert("Error: Weather Data Not Found");
        }
    });
};

getWeatherInfo();
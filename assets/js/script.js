var getWeatherInfo = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";

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
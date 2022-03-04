var apiKey = "a42035ac268e1618342dba6f73c69192";
var locationApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=Salt Lake City&limit=5&appid=" + apiKey;
var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=" + apiKey;

var getLocation = function() {

    fetch(locationApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert("Error: City Not Found");
            return false;
        }
    });
};

getLocation();
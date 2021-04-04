var city = "";
var currentEl = document.querySelector("#current");

$("button").click(function() {
    debugger;
    var searchCity = $("input[id='city'").val();
    city = searchCity;
    getWeather(city);
});

var getWeather = function (city) {
    debugger;
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather/?q=" + city + "&units=metric" + "&appid=81e7518916e98ea8c25fc5e8ce330a50";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayWeather(data);
                getForecast(data);
            });
        }
    });
};

var getForecast = function (geo) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + geo.coord.lat + "&lon=" + geo.coord.lat + "&appid=81e7518916e98ea8c25fc5e8ce330a50";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayForecast(data);
            })
        }
    });
};

var displayForecast = function (forecast) {
    debugger;
    for (i = 1; i < forecast.daily.length; i++) {
        var forecastEl = document.createElement("div");
        forecastEl.classList.add("card");
        $(".card-group").append(forecastEl);
        var dailyEl = document.createElement("h3");
        forecastEl.appendChild(dailyEl);
        var bodyEl = document.createElement("div");
        bodyEl.classList.add("card-body");
        forecastEl.appendChild(bodyEl);

        var date = forecast.daily[i].dt * 1000;
        console.log(date);

        dailyEl.classList.add("card-title");
        dailyEl.textContent = moment(date).format("MMMM Do YYYY");
    
        var tempEl = document.createElement("p");
        tempEl.textContent = "Temp: " + forecast.daily[i].temp.max + "℃";
        bodyEl.appendChild(tempEl);
    
        var windEl = document.createElement("p");
        windEl.textContent = "Wind: " + forecast.daily[i].wind_speed + " km/h"
        bodyEl.appendChild(windEl);
    
        var humidEl = document.createElement("p");
        humidEl.textContent = "Humidity: " + forecast.daily[i].humidity; + "%"
        bodyEl.appendChild(humidEl);
    };

    var uviEl = document.createElement("p");
    uviEl.textContent = "UV: " + forecast.current.uvi;
    currentEl.appendChild(uviEl);
};

var displayWeather = function (weather) {
    var cityEl = document.createElement("h4");
    cityEl.classList = "card-title";
    cityEl.textContent = weather.name + " - " + moment().format('MMMM Do YYYY');
    currentEl.appendChild(cityEl);

    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + weather.main.temp + "℃";
    currentEl.appendChild(tempEl);

    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + weather.wind.speed + " km/h"
    currentEl.appendChild(windEl);

    var humidEl = document.createElement("p");
    humidEl.textContent = "Humidity: " + weather.main.humidity;
    currentEl.appendChild(humidEl);
};



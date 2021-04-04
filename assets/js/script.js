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
                getUvi(data);
            });
        }
    });
};

var getUvi = function (geo) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + geo.coord.lat + "&lon=" + geo.coord.lat + "&appid=81e7518916e98ea8c25fc5e8ce330a50";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayUvi(data);
                console.log(data);
            })
        }
    });
};

var displayUvi = function (uvi) {
    var uviEl = document.createElement("p");
    uviEl.textContent = "UV: " + uvi.current.uvi;
    currentEl.appendChild(uviEl);
};

var displayWeather = function (weather) {
    debugger;
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



var APIKEY = "d3a12671db6118879d34ab823b945d7d";
var inputEl = document.getElementById("cityInput");
var searchBtn = document.getElementById("submit");
var cityList = document.getElementById("savedCities");
var cityContainter = $("#savedCities");
var prevCities = [];
var city;
var todayDate = moment().format("MMMM Do, YYYY");
var weatherContainer = document.getElementById("weatherContainer");
var nameAndDate = $("#whereWhen");
var todayIconEl = $("#todayIcon");
var todayTempEl = $("#todayTemp");
var todayWindEl = $("#todayWind");
var todayHumidEl = $("#todayHumid");
var nextForecast = [];
var futureForecast;
var futureContainer = $("#fiveDayForecast");
var futureTempEl = $(".futureTemp")
var futureIconEl = $(".futureIcon");
var futureWindEl = $(".futureWind");
var futureHumidEl = $(".futureHumid");
var futureDateEl = $(".futureDay")

var futureArray = [];

searchBtn.addEventListener("click", saveSearch);
cityContainter.on("click", "button", showPrevCity);

async function getAPI() {
    var myUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        APIKEY +
        "&units=imperial";
    let endData = await fetch(myUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            todayWeather = {
                todayIcon: data.weather[0].icon,
                todayTemp: data.main.temp,
                todayWind: data.wind.speed,
                todayHumid: data.main.humidity,
            };

            return todayWeather;
        });
    return endData;
}

async function saveSearch(event) {
    event.preventDefault();
    var cityText = inputEl.value.trim();
    if (cityText !== "") {
        prevCities.push(cityText);
    }
    city = cityText;
    storeCities();
    renderCities();
    getAPI().then(function (res) {
    });
}

function storeCities() {
    localStorage.setItem("mySavedCities", JSON.stringify(prevCities));
}
function renderCities() {
    cityList.innerHTML = "";

    for (var i = 0; i < prevCities.length; i++) {
        var searchText = prevCities[i];

        var cityBtn = document.createElement("button");
        var btnContainer = document.createElement("li");

        cityBtn.textContent = searchText;
        btnContainer.appendChild(cityBtn);
        cityList.appendChild(btnContainer);
    }
}
function init() {
    if (!localStorage.getItem("mySavedCities")) {
        prevCities = [];
    } else {
        prevCities = JSON.parse(localStorage.getItem("mySavedCities"));
    }
    renderCities();
}
function extractCity(event) {
    var cityInput = event.currentTarget.innerHTML;
    city = cityInput;
    return city;
}
var todayWeather;
function showPrevCity(event) {
    extractCity(event);
    getAPI();

    showWeather();
}

// futureAPI()
var testBtn = document.getElementById("test");
testBtn.addEventListener("click", runFuture);
var futureList;
function runFuture() {
    futureAPI().then(function (res) {
        displayFuture(res);
    });
}
async function futureAPI() {
    var futureURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=Atlanta&appid=" +
        APIKEY +
        "&units=imperial";
    let someData = await fetch(futureURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            futureList = data.list;
            return futureList;
        });
    return someData;
}


function displayFuture(res) {
    for (var i = 0; i < res.length; i++) {
        if (i % 8 == 0) {
            nextForecast.push(res[i]);
        }
    }

    for (var a = 0; a < nextForecast.length; a++) {
        futureForecast = {
            futureDate: nextForecast[a].dt_txt,
            futureTemp: nextForecast[a].main.temp,
            futureIcon: nextForecast[a].weather[0].icon,
            futureWind: nextForecast[a].wind.speed,
            futureHumid: nextForecast[a].main.humidity,
        };
        console.log(futureForecast.futureDate);
        futureArray.push(futureForecast);
    }
    console.log("now to put the text content");
    for (var j = 0; j < 5; j++) {

        var futureIconURL = "http://openweathermap.org/img/wn/" + (futureArray[j].futureIcon) + ".png";
        futureDateEl[j].textContent = moment(futureArray[j].futureDate, "YYYY MM Do HH:mm:ss").format("MM Do YY")
        futureIconEl[j].setAttribute('src', futureIconURL)
        futureTempEl[j].textContent = ("Temp: " + futureArray[j].futureTemp + "\u00B0F");
        futureWindEl[j].textContent = ("Wind: " + futureArray[j].futureWind + "mph");
        futureHumidEl[j].textContent = ("Humidity: " + futureArray[j].futureHumid + "%");
    }
}

function showWeather() {
    var iconURL =
        "http://openweathermap.org/img/wn/" + todayWeather.todayIcon + ".png";

    nameAndDate.text(city + " " + todayDate);
    todayIconEl.attr("src", iconURL);
    todayTempEl.text("Temp: " + todayWeather.todayTemp + "\u00B0F");
    todayWindEl.text("Wind: " + todayWeather.todayWind + "mph");
    todayHumidEl.text("Humidity: " + todayWeather.todayHumid + "%");
    weatherContainer.style.visibility = "visible";
}
init();

// /;ets build out the functions to call the weather
//lat and long from this don't match whats in the CUrrent Weather API
// var city = "Atlanta";
// var myLat;
// var myLong;
// var locationurl =
//     "http://api.openweathermap.org/geo/1.0/direct?q=" +
//     city +
//     "&limit=5&appid=" +
//     APIKEY;
// function locationAPI() {
//     fetch(locationurl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             myLat = data[0].lat;
//             myLong = data[0].lon;
//             console.log(myLat);
//             console.log(myLong);
//             return myLat, myLong;
//             //this return will pull it out of th efunciton and have it available
//         });
// }
// locationAPI();

// var aURL =
//     "https://api.openweathermap.org/data/2.5/onecall?lat=33.7489924&lon=-84.3902644&units=imperial&exclude=minutely,hourly&appid=" +
//     APIKEY;
// function test() {
//     fetch(aURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             return data;
//         });
// }

// test();
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&units=imperial&exclude=minutely,hourly&appid={weatherApiKey}






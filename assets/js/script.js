var APIKEY = "d3a12671db6118879d34ab823b945d7d";
var inputEl = document.getElementById("cityInput");
var searchBtn = document.getElementById("submit");
var cityList = document.getElementById("savedCities")
var cityContainter = $("#savedCities")
var prevCities = []
var city;
var todayDate = moment().format("MMMM Do, YYYY")
var weatherContainer = document.getElementById("weatherContainer")
var nameAndDate = $("#whereWhen");
var todayIconEl = $("#todayIcon")
var todayTempEl = $("#todayTemp");
var todayWindEl = $("#todayWind");
var todayHumidEl = $("#todayHumid");

searchBtn.addEventListener("click", saveSearch)
cityContainter.on("click", "button", showPrevCity)

function saveSearch(event) {
    event.preventDefault();
    var cityText = inputEl.value.trim();
    if (cityText !== '') {
        prevCities.push(cityText)
    }
    city = cityText;
    storeCities()
    renderCities()
    getAPI()

}
function storeCities() {
    localStorage.setItem("mySavedCities", JSON.stringify(prevCities))
}
function renderCities() {
    cityList.innerHTML = '';

    for (var i = 0; i < prevCities.length; i++) {
        var searchText = prevCities[i]

        var cityBtn = document.createElement("button");
        var btnContainer = document.createElement("li");

        cityBtn.textContent = searchText;
        btnContainer.appendChild(cityBtn)
        cityList.appendChild(btnContainer);
    }
}
function init() {
    if (!(localStorage.getItem("mySavedCities"))) {
        prevCities = [];
    } else { prevCities = JSON.parse(localStorage.getItem("mySavedCities")) }
    renderCities()
}
function extractCity(event) {
    var cityInput = event.currentTarget.innerHTML
    city = cityInput
    return city

}
var todayWeather;
function showPrevCity(event) {
    extractCity(event)
    getAPI()

    showWeather()
}
function getAPI() {
    var myUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKEY + "&units=imperial";

    //var myURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.749&lon=-84.388&appid=d3a12671db6118879d34ab823b945d7d"
    fetch(myUrl)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            todayWeather = {
                todayIcon: data.weather[0].icon,
                todayTemp: data.main.temp,
                todayWind: data.wind.speed,
                todayHumid: data.main.humidity
            }

            return data, todayWeather
        })
}
// futureAPI()
var testBtn = document.getElementById("test")
testBtn.addEventListener("click", runFuture)
var futureList;
function runFuture() {
    futureAPI()
    displayFuture()
}
function futureAPI() {
    var futureURL = "https://api.openweathermap.org/data/2.5/forecast?q=Atlanta&appid=" + APIKEY + "&units=imperial";
    fetch(futureURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // futureList = {
            //     nextTemp: data.list.main.temp
            // }
            futureList = data.list;
            // console.log(futureList)
            return futureList, data;
        })
}
var nextForecast = []
var futureForecast;
var futureContainer = $("#fiveDayForecast")
console.log(futureContainer)
// var futureTempEl = $(".futureTemp")
var futureTempEl = document.getElementById("fiveDayForecast").querySelectorAll(".futureTemp")
// var futureTempEl = document.getElementById("fiveDayForecast").querySelector(".futureTemp")

var futureIconEl = $(".futureIcon")
var futureWindEl = $(".futureWind")
var futureHumidEl = $(".futureHumid")
var futureArray = []

function displayFuture() {
    for (var i = 0; i < futureList.length; i++) {
        if (i % 8 == 0) {
            nextForecast.push(futureList[i])
        }
    }

    for (var a = 0; a < nextForecast.length; a++) {
        futureForecast = {
            futureDate: nextForecast[a].dt_txt,
            futureTemp: nextForecast[a].main.temp,
            futureIcon: nextForecast[a].weather[0].icon,
            futureWind: nextForecast[a].wind.speed,
            futureHumid: nextForecast[a].main.humidity
        }
        console.log(futureForecast.futureIcon)
        futureArray.push(futureForecast)

    }
    console.log("now to put the text content")
    for (var j = 0; j < 5; j++) {
        console.log(futureTempEl[j])
        console.log(futureTempEl)
        // var futureIconURL = "http://openweathermap.org/img/wn/" + (futureArray[j].futureIcon) + ".png"
        // futureIconEl[j].attr('src', futureIconURL)
        futureTempEl[j].textContent("Temp: " + futureArray[j].futureTemp + "\u00B0F");
        // futureWindEl.text("Wind: " + futureArray[j].futureWind + "mph");
        // futureHumidEl.text("Humidity: " + futureArray[j].futureHumid + "%");
    }
}


function showWeather() {

    var iconURL = "http://openweathermap.org/img/wn/" + todayWeather.todayIcon + ".png"

    nameAndDate.text(city + " " + todayDate)
    todayIconEl.attr('src', iconURL);
    todayTempEl.text("Temp: " + todayWeather.todayTemp + "\u00B0F")
    todayWindEl.text("Wind: " + todayWeather.todayWind + "mph");
    todayHumidEl.text("Humidity: " + todayWeather.todayHumid + "%")
    weatherContainer.style.visibility = 'visible'

}
init()


// /;ets build out the functions to call the weather
//lat and long from this don't match whats in the CUrrent Weather API
var city = "Atlanta"
var myLat;
var myLong;
var locationurl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIKEY;
function locationAPI() {
    fetch(locationurl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            myLat = data[0].lat;
            myLong = data[0].lon;
            console.log(myLat)
            console.log(myLong)
            return myLat, myLong
            //this return will pull it out of th efunciton and have it available
        })
}
locationAPI()

var aURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.7489924&lon=-84.3902644&units=imperial&exclude=minutely,hourly&appid=" + APIKEY;
function test() {
    fetch(aURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            return data
        })
}

test()
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&units=imperial&exclude=minutely,hourly&appid={weatherApiKey}
var APIKEY = "d3a12671db6118879d34ab823b945d7d";
var inputEl = document.getElementById("cityInput");
var searchBtn = document.getElementById("submit");
// var cityList = document.getElementById("savedCities")
var cityList = document.getElementById("savedCities")
var cityContainter = $("#savedCities")
searchBtn.addEventListener("click", saveSearch)
cityContainter.on("click", "button", showWeather)
var prevCities = []
var todayDate = moment().format("MMMM Do, YYYY")
function saveSearch(event) {
    event.preventDefault();
    var cityText = inputEl.value.trim();
    if (cityText !== '') {
        prevCities.push(cityText)
    }
    storeCities()
    renderCities()
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
init()
//;ets build out the functions to call the weather
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
var todayWeather;
var city;
city = "Atlanta"
function getAPI() {

    // var requesturl = "https://api.openweathermap.org/data/2.5/weather?lat=" + myLat + "&lon=" + myLong + "&appid=" + APIKEY + "&units = imperial";
    var myUrl = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=" + APIKEY + "&units=imperial";

    //var myURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.749&lon=-84.388&appid=d3a12671db6118879d34ab823b945d7d"
    fetch(myUrl)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            todayWeather = {

                todayTemp: data.main.temp,
                todayWind: data.wind.speed,
                todayHumid: data.main.humidity
            }
            var todayIcon = data.weather[0].icon
            return data, todayWeather, todayIcon
        })
}
getAPI()

var nameAndDate = $("#whereWhen");
var todayIconEl = $("#todayIcon")
var todayTempEl = $("#todayTemp");
var todayWindEl = $("#todayWind");
var todayHumidEl = $("#todayHumid");

function showWeather() {


    console.log(todayWeather)
    console.log("icon " + todayIcon)
    var iconURL = "http://openweathermap.org/img/w/" + todayIcon + ".png"
    todayIconEl.attr('src', iconURL);
    todayTempEl.text("Temp: " + todayWeather.todayTemp + "\u00B0F")
    todayWindEl.text("Wind: " + todayWeather.todayWind + "mph");
    todayHumidEl.text("Humidity: " + todayWeather.todayHumid + "%")

}
nameAndDate.text(city + " " + todayDate)

var APIKEY = "d3a12671db6118879d34ab823b945d7d";
var inputEl = document.getElementById("cityInput");
var searchBtn = document.getElementById("submit");
var cityList = document.getElementById("savedCities")
searchBtn.addEventListener("click", saveSearch)
var prevCities = []
function saveSearch(event) {
    event.preventDefault();
    var cityText = inputEl.value.trim();
    console.log("my" + cityText)
    console.log(typeof cityText)

    prevCities.push(cityText)
    localStorage.setItem("mySavedCities", JSON.stringify(prevCities))

    renderCities()
}
function renderCities() {
    cityList.innerHTML = '';

    for (var i = 0; i < prevCities.length; i++) {

        var cityText = prevCities[i]
        var cityBtn = document.createElement("button");
        cityBtn.textContent = cityText;
        cityList.appendChild(cityBtn);
    }
}
function init() {
    var storedCities = JSON.parse(localStorage.getItem("mySavedCities"))
    if (storedCities !== null) {
        prevCities = storedCities;
    }
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

function getAPI() {
    var city;
    var todayTemp;
    var todayWind;
    city = "Atlanta"
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
            todayTemp = data.temp
            return data
        })
}
getAPI()


//city search geocode gives me lat and lon

//make variables and put them in full url for weather

//lat: 
// 33.749
// lon
// : 
// -84.388

//display weather 
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
var futureForecast;
var futureContainer = $("#fiveDayForecast");
var futureTempEl = $(".futureTemp")
var futureIconEl = $(".futureIcon");
var futureWindEl = $(".futureWind");
var futureHumidEl = $(".futureHumid");
var futureDateEl = $(".futureDay")
var nextForecast = [];
var futureArray = [];

searchBtn.addEventListener("click", saveSearch);
cityContainter.on("click", "button", showPrevCity);

//calling the API asynchronously to optimize the calling of the API before running the functoin tha will actually display the information
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
            //lets store all of today's data into an object so we can call it later
            todayWeather = {
                todayIcon: data.weather[0].icon,
                todayTemp: data.main.temp,
                todayWind: data.wind.speed,
                todayHumid: data.main.humidity,
            };

            //now lets show the weather
            showWeather(todayWeather)
            return todayWeather;
        });
    return endData;
}
function showWeather(todayWeather) {
    //establishes the url for the icon to display and show users the weather conditions
    var iconURL = "http://openweathermap.org/img/wn/" + todayWeather.todayIcon + ".png";
    //lets show all the data for the current day
    nameAndDate.text(city + " " + todayDate);
    todayIconEl.attr("src", iconURL);
    todayTempEl.text("Temp: " + todayWeather.todayTemp + "\u00B0F");
    todayWindEl.text("Wind: " + todayWeather.todayWind + "mph");
    todayHumidEl.text("Humidity: " + todayWeather.todayHumid + "%");
    weatherContainer.style.visibility = "visible";
}
async function saveSearch(event) {
    //when we save we don't want something to be removed from the search bar
    event.preventDefault();
    //now we want to save the data and also send the data to an array and display it
    var cityText = inputEl.value.trim();
    if (cityText !== "") {
        prevCities.push(cityText);
    }
    city = cityText;
    //We want to clear these variables so that they are empty if we call a new city
    nextForecast = [];
    futureArray = [];
    storeCities();
    renderCities();
    getAPI().then(function (res) {
    });
    runFuture();

}

function storeCities() {
    //lets store them locally so when we reload the page they'll still be here
    localStorage.setItem("mySavedCities", JSON.stringify(prevCities));
}
function renderCities() {
    cityList.innerHTML = "";

    for (var i = 0; i < prevCities.length; i++) {
        //lets add the all of the previous cities as buttons
        var searchText = prevCities[i];

        var cityBtn = document.createElement("button");
        var btnContainer = document.createElement("li");

        cityBtn.textContent = searchText;
        cityBtn.classList.add('w-100')
        btnContainer.appendChild(cityBtn);
        cityList.appendChild(btnContainer);
    }
}
function init() {
    //when the page loads we hide the weather display since they have yet to search for things
    //we also will call down items from local storage, and then we will render the cities
    weatherContainer.style.visibility = "hidden";

    if (!localStorage.getItem("mySavedCities")) {
        prevCities = [];
    } else {
        prevCities = JSON.parse(localStorage.getItem("mySavedCities"));
    }
    renderCities();
}
function extractCity(event) {
    //if they pick a previously searched city we want to extract whatever information is in the button they selected
    var cityInput = event.currentTarget.innerHTML;
    city = cityInput;
    return city;
}
var todayWeather;
function showPrevCity(event) {
    //if they want to see a previous city we will first extract the info and then run the same info that would happen if they just search for it
    extractCity(event);
    //We want to clear these variables so that they are empty if we call a new city
    nextForecast = [];
    futureArray = [];
    getAPI();
    runFuture()
}


var futureList;
function runFuture() {
    //single function for the two functions involved in showing the future forecast
    futureAPI().then(function (res) {
        displayFuture(res);
    });
}
async function futureAPI() {
    var futureURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" +
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
        //lets filter for the first instance of each day for the next 5 days, as the API gives me 3 hour intervals for 5 days
        if (futureList[i].dt_txt.includes('12:00:00')) {
            nextForecast.push(res[i]);
        }
    }
    //now lets store the information into an array of objects
    for (var a = 0; a < nextForecast.length; a++) {
        futureForecast = {
            futureDate: nextForecast[a].dt_txt,
            futureTemp: nextForecast[a].main.temp,
            futureIcon: nextForecast[a].weather[0].icon,
            futureWind: nextForecast[a].wind.speed,
            futureHumid: nextForecast[a].main.humidity,
        };
        futureArray.push(futureForecast);
    }

    //holds the information to later display
    for (var j = 0; j < 5; j++) {
        //lets do the same things and display the info
        var futureIconURL = "http://openweathermap.org/img/wn/" + (futureArray[j].futureIcon) + ".png";
        futureDateEl[j].textContent = moment().add([j + 1], 'days').format('MM/DD/YYYY')
        futureIconEl[j].setAttribute('src', futureIconURL)
        futureTempEl[j].textContent = ("Temp: " + futureArray[j].futureTemp + "\u00B0F");
        futureWindEl[j].textContent = ("Wind: " + futureArray[j].futureWind + "mph");
        futureHumidEl[j].textContent = ("Humidity: " + futureArray[j].futureHumid + "%");
    }
}


init();





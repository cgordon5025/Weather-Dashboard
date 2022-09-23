var APIKEY = "7b88ca919d61277db63b2f682f6e432e";
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
        var li = document.createElement("li");
        li.textContent = cityText;
        cityList.appendChild(li);
    }
}
function init() {
    var storedCities = JSON.parse(localStorage.getItem("mySavedCities"))
    prevCities = storedCities;
    renderCities()
}
init()
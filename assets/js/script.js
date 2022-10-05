// Variables
var inputValue = $("#inputValue");
var searchBtn = document.querySelector("#searchBtn");
var saveSearch = "#search";


var locationContainer = document.querySelector(".location-container");

var cardDeck = document.querySelector(".card-deck");

var searchHistory = document.querySelector('#history');
var clearHistory = document.querySelector('#cityBtn');

var citiesArray



//API Varibales
var APIKey = "f6862802cdafd2f8859444a3108a7a22";

function weatherHistory(event) {
  event.preventDefault()
  var input
  if (event.target.matches(".citiesBtn")) {
    console.dir(event.target)
    input = event.target.innerText
  }else{
    input = inputValue.val().trim();
  }
  console.log(input)
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    input +
    "&appid=" +
    APIKey +
    "&units=imperial";

  console.log(queryURL);
  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showCurrentWeather(data);
      showFiveDay(data.coord.lat, data.coord.lon);
      saveCity(input)
    })

    .catch((err) => {
      console.log(err);
    });
    inputValue.val("")
};



// event listner and fetch for current Forcast
searchBtn.addEventListener("click", weatherHistory);


function showCurrentWeather(data) {
  locationContainer.innerHTML = "";
  var cityNameContainer = document.createElement("div")
  var cityName = document.createElement("h2");
  var date = document.createElement("div");
  var mainIcon = document.createElement("img");
  var mainTemp = document.createElement("p");
  var mainWind = document.createElement("p");
  var mainHumid = document.createElement("p");

  cityName.textContent = data.name;
  var todayDate = new Date(data.dt*1000)
  date.textContent = todayDate.toLocaleDateString("en-US");
  mainIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  mainTemp.textContent = "Temp: " + data.main.temp;
  mainWind.textContent = "Wind: " + data.wind.speed;
  mainHumid.textContent = "Humidity: " + data.main.humidity;

  cityNameContainer.append(cityName, date, mainIcon);
  locationContainer.append(cityNameContainer, mainTemp, mainWind, mainHumid);
}

// event listner and fetch for 5-day Forcast
function showFiveDay(lat, lon) {
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  console.log(queryURL);
  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cardDeck.innerHTML = "";
      for (let i = 7; i < data.list.length; i += 7) {
        var card = document.createElement("div");
        card.className += "card-body";
        var date = document.createElement("h5");
        var mainIcon = document.createElement("img");
        var mainTemp = document.createElement("p");
        var mainWind = document.createElement("p");
        var mainHumid = document.createElement("p");

        date.textContent = data.list[i].dt;
        mainIcon.src = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
        mainTemp.textContent = "Temp: " + data.list[i].main.temp;
        mainWind.textContent = "Wind: " + data.list[i].wind.speed;
        mainHumid.textContent = "Humidity: " + data.list[i].main.humidity;

        card.append(date, mainIcon, mainTemp, mainWind, mainHumid);
        cardDeck.append(card);
      }
      console.log(card);
    })
    .catch((err) => console.log(err));
}

function saveCity(city) {
  for (let i = 0; i < citiesArray.length; i++) {
    if (citiesArray[i] === city) {
      return
    }
  }
  citiesArray.push(city)
  displaySavedCities()
  localStorage.setItem("cities", JSON.stringify(citiesArray));
}

function displaySavedCities() {
  searchHistory.innerHTML = "";
  for (let i = 0; i < citiesArray.length; i++) {
    var cityEl = document.createElement("button");
    cityEl.textContent = citiesArray[i];
    cityEl.classList.add("btn", "btn-secondary", "btn-block", "citiesBtn");
    searchHistory.append(cityEl);
    cityEl.addEventListener("click", weatherHistory)
  }
}

// Getting the Data from Local Storage
function getHistory() {
  citiesArray = localStorage.getItem("cities")
  if (citiesArray) {
    citiesArray = JSON.parse(citiesArray)
  }else {
    citiesArray = []
  }
  console.log("cities")
  displaySavedCities()
}

getHistory()
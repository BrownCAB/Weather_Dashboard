// Variables
var inputValue = $("#inputValue");
var searchBtn = document.querySelector("#searchBtn");
var saveSearch = "#search";

var locationContainer = document.querySelector(".location-container");

var cardDeck = document.querySelector(".card-deck");

var searchHistory = document.getElementById("citiesHistory");

var clearCities = document.getElementById('clearBtn');

var citiesArray;


//API Varibales
var APIKey = "f6862802cdafd2f8859444a3108a7a22";

function weatherHistory(event) {
  event.preventDefault();
  var input;
  if (event.target.matches(".citiesBtn")) {
    console.dir(event.target);
    input = event.target.innerText;
  } else {
    input = inputValue.val().trim();
  }
  var queryURL =
    `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APIKey}&units=imperial`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      showCurrentWeather(data);
      showFiveDay(data.coord.lat, data.coord.lon);
      saveCity(input);
    })

    .catch((err) => {
    });
  inputValue.val("");
}

// Eventlistner for searchBtn 
$('#aside').on('click', '#searchBtn', weatherHistory)

// Fetch for current Forcast
function showCurrentWeather(data) {
  locationContainer.innerHTML = "";
  var cityNameContainer = document.createElement("div");
  var cityName = document.createElement("h2");
  var date = document.createElement("h5");
  var mainIcon = document.createElement("img");
  var mainTemp = document.createElement("p");
  var mainWind = document.createElement("p");
  var mainHumid = document.createElement("p");

  cityName.textContent = data.name;
  var todayDate = new Date(data.dt * 1000);
  date.textContent = todayDate.toLocaleDateString("en-US");
  mainIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  mainTemp.textContent = `Temp: ${data.main.temp.toFixed()}°F`;
  mainWind.textContent = `Wind: ${data.wind.speed.toFixed()} mph`;
  mainHumid.textContent = `Humidity: ${data.main.humidity}%`;

  cityNameContainer.append(cityName, date, mainIcon);
  locationContainer.append(cityNameContainer, mainTemp, mainWind, mainHumid);
}

// Eventlistner and fetch for 5-day Forcast
function showFiveDay(lat, lon) {
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      cardDeck.innerHTML = "";
      for (let i = 7; i < data.list.length; i += 7) {
        var card = document.createElement("div");
        card.className += "card-body";
        var date = document.createElement("h5");
        var mainIcon = document.createElement("img");
        var mainTemp = document.createElement("p");
        var mainWind = document.createElement("p");
        var mainHumid = document.createElement("p");

        var fiveDates = new Date(data.list[i].dt * 1000);
        date.textContent = fiveDates.toLocaleDateString("en-US");
        mainIcon.src = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
        mainTemp.textContent = `Temp: ${data.list[i].main.temp.toFixed()}°F` ;
        mainWind.textContent = `Wind: ${data.list[i].wind.speed.toFixed()} mph`;
        mainHumid.textContent = `Humidity: ${data.list[i].main.humidity}%`;

        card.append(date, mainIcon, mainTemp, mainWind, mainHumid);
        cardDeck.append(card);
      }
    })
    .catch((err) => console.log(err));
}

// Save city to Array
function saveCity(city) {
  for (let i = 0; i < citiesArray.length; i++) {
    if (citiesArray[i] === city) {
      return;
    }
  }
  citiesArray.push(city);
  displaySavedCities();
  localStorage.setItem("cities", JSON.stringify(citiesArray));
}

// Display Array as buttons
function displaySavedCities() {
  searchHistory.innerHTML = "";
  for (let i = 0; i < citiesArray.length; i++) {
    var cityEl = document.createElement("button");
    cityEl.textContent = citiesArray[i];
    cityEl.classList.add("btn", "btn-secondary", "btn-block", "citiesBtn");
    searchHistory.append(cityEl);
    cityEl.addEventListener("click", weatherHistory);
  }
}

// Getting the Data from Local Storage
function getHistory() {
  citiesArray = localStorage.getItem("cities");
  if (citiesArray) {
    citiesArray = JSON.parse(citiesArray);
  } else {
    citiesArray = [];
  }
  displaySavedCities();
}

getHistory();

// Eventlistener to clear cities from local storage
function removeEl() {
	localStorage.removeItem('cities');
	citiesArray = [];
	searchHistory.innerHTML = '';
}

$('#aside').on('click', '#clearBtn', removeEl)


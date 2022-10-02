// Variables
var inputValue = $("#inputValue");
var searchBtn = document.querySelector("#searchBtn");
var saveSearch = "#search";

var cityNameContainer = document.querySelector(".cityName");
var locationContainer = document.querySelector(".location-container");

var cardDeck = document.querySelector(".card-deck");

//API Varibales
var APIKey = "f6862802cdafd2f8859444a3108a7a22";

// event listner and fetch for current Forcast
searchBtn.addEventListener("click", function () {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    inputValue.val() +
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
    })

    .catch((err) => {
      console.log(err);
    });
});

function showCurrentWeather(data) {
  var cityName = document.createElement("div");
  var date = document.createElement("div");
  var mainIcon = document.createElement("img");
  var mainTemp = document.createElement("p");
  var mainWind = document.createElement("p");
  var mainHumid = document.createElement("p");
  var mainUv = document.createElement("p");
  cityName.textContent = data.name;
  date.textContent = data.dt;
  mainIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  mainTemp.textContent = data.main.temp;
  mainWind.textContent = data.wind.speed;
  mainHumid.textContent = data.main.humidity;

  cityNameContainer.append(cityName, date, mainIcon);
  locationContainer.append(mainTemp, mainWind, mainHumid);
}

// event listner and fetch for 5-day Forcast
function showFiveDay(lat, lon) {
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  console.log(queryURL);
  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 7; i < data.list.length; i += 7) {
        var card = document.createElement("div");
        var date = document.createElement("div");
        var mainIcon = document.createElement("img");
        var mainTemp = document.createElement("p");
        var mainWind = document.createElement("p");
        var mainHumid = document.createElement("p");

        date.textContent = data.list[i].dt;
        mainIcon.src = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
        mainTemp.textContent = data.list[i].main.temp;
        mainWind.textContent = data.list[i].wind.speed;
        mainHumid.textContent = data.list[i].main.humidity;

        card.append(date, mainIcon, mainTemp, mainWind, mainHumid);
        cardDeck.append(card);
      }
      console.log(card);
    })
    .catch((err) => console.log(err));
}

// Save data into Local Storage

//

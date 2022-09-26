// Variables

var searchBtn = document.querySelector('#searchBtn');
var inputValue = document.querySelector('#inputValue')
var saveSearch = ('#search');

var cityName = document.querySelector('.cityName');
var mainDate = '';
var mainIcon = document.querySelector('mainIcon'); 
var mainTemp = document.querySelector('.mainTemp');
var mainWind = document.querySelector('.mainWind');
var mainHumid = document.querySelector('.mainHumid');
var mainUv = document.querySelector('.mainUv');

var date = ('.date');
var icon = ('.icon');
var temp = ('.temp');
var wind = ('.wind');
var humid = ('.humid');
 

//API Varibales
var APIKey = 'f6862802cdafd2f8859444a3108a7a22'; 

var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=' + APIKey;


// event listner and fetch
searchBtn.addEventListener('click', function() {
    fetch(queryURL).then(response => response.json())
    .then(data => {
        cityNameValue = data['name'];
        mainTempValue = data['main']['temp'];

    })
    
    .catch(err => alert("Not A City Name!"))
})






// Search Data is saved to local storage 



// local storage data is accessed from the local storageg



// Loads current forcast



// Loads future 5 Day forcast



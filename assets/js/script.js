// Variables
var button = document.querySelector('.btn');
var saveSearch = ('#search');

var mainLocal = document.querySelector('.city');
var mainDate = '';
var mainIcon = ('mainIcon'); 
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

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// fetch
fetch(queryURL)


//Search input



// Search Data is saved to local storage 



// local storage data is accessed from the local storageg



// Loads current forcast



// Loads future 5 Day forcast



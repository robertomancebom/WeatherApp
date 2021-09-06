const key = config.API_KEY;
const baseURL = 'https://api.openweathermap.org/data/2.5/'

const search = document.querySelector("#search");
search.addEventListener('keypress', setQuery);

const location_el = document.querySelector("#location");
const temperature_el = document.querySelector("#temperature");
const date_el = document.querySelector("#date");
const weather_el = document.querySelector("#weather");
const min_max_el = document.querySelector("#min-max");
const image = document.querySelector("#weather_icon");

const metric = "ºC";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function setQuery (evt) {
    if(evt.keyCode == 13){
        console.log(search.value);
        getResults(search.value);
    }
}

function getResults (query) {
    fetch(`${baseURL}weather?q=${query}&units=metric&APPID=${key}`)
    .then(weather => {
        return weather.json();
    }).then(showResults)
}
function showResults (weather) {
    console.log(weather);
    var d = new Date();
    location_el.innerHTML = weather.name + ", " + weather.sys.country;
    temperature_el.innerHTML = Math.round(weather.main.temp) + metric;
    date_el.innerHTML = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} `; 
    weather_el.innerHTML = weather.weather[0].main;
    min_max_el.innerHTML = Math.round(weather.main.temp_min) + metric + "/" + 
    Math.round(weather.main.temp_max) + metric;
    image.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
}
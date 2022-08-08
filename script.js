const search = document.getElementById("search");
const button = document.getElementById("search-button");
const form = document.getElementById("form");
const temp = document.getElementById("temp");
const locationName = document.getElementById("locationName");
const weatherCondition = document.getElementById("weatherCondition");
const cityTime = document.getElementById("cityTime");
const cityDate = document.getElementById("cityDate");
const cityDay = document.getElementById("cityDay");
const weatherIcon = document.getElementById("weatherIcon");
const weatherCard = document.getElementById("weatherCard");

let cityName = "tokyo";
updateWeatherData();

form.addEventListener('submit', e => {
    console.log('submitted')
    if (search.value.length == 0) {
        alert("Enter A City Name");
    }
    else {
        cityName = search.value;
        updateWeatherData()
        search.value = '';
        console.log(cityName);
    }
    e.preventDefault();
})

function getday(dd, mm, yy) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(yy, mm - 1, dd).getDay()];
}

function updateWeatherData() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=67897a08b2444554b97123735222806&q=${cityName}&aqi=yes`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            temp.innerHTML = data.current.temp_c + '&#8451';
            locationName.innerHTML = data.location.name;
            weatherCondition.innerHTML = data.current.condition.text;
            cityTime.innerHTML = data.location.localtime.substring(11);
            cityDate.innerHTML = data.location.localtime.substring(0, 10);
            let dd = data.location.localtime.substring(8, 10);
            let mm = data.location.localtime.substring(5, 7);
            let yy = data.location.localtime.substring(0, 4);
            cityDay.innerHTML = getday(dd, mm, yy);
            weatherIcon.src = data.current.condition.icon;
        })
        .catch(err => alert("Enter a valid name"));
}












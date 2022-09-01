import events from "./mediator.js";

import("./mediator.js");

//cache DOM
const city = document.getElementById("city");
const country = document.getElementById("country");
const sky = document.getElementById("sky");
const temp = document.getElementById("temp-main");
const feelsLike = document.getElementById("feels-like");
const tempHigh = document.getElementById("temp-high");
const tempLow = document.getElementById("temp-low");
const humidity = document.getElementById("humidity");
const form = document.getElementById("form");
const content = document.getElementById("content");

function updateDOM(stats) {
  city.innerHTML = stats.city;
  country.innerHTML = stats.country;
  sky.innerHTML = stats.sky;
  temp.innerHTML = stats.temp;
  feelsLike.innerHTML = `Feels like: ${stats.feelsLike}`;
  tempHigh.innerHTML = `Today's High: ${stats.tempHigh}`;
  tempLow.innerHTML = `Today's Low: ${stats.tempLow}`;
  humidity.innerHTML = `Humidity: ${stats.humidity}%`;
}

//sends query to fetch
function searchWeather() {
  const query = document.getElementById("query").value;
  events.publish("cityChanged", query);
}

//functions to convert units F / C

//function to change visibility of cards
function show(section) {
  if (section === form) {
    form.className = "visible";
    content.className = "";
  } else if (section === content) {
    form.className = "";
    content.className = "visible";
  }
}

//submits form on enter
function checkEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    submit.click();
  }
}

//alerts error and displays form again
function showError(err) {
  alert(err);
  show(content);
}

//bind events
const submit = document.getElementById("submit");
submit.addEventListener("click", searchWeather);

const query = document.getElementById("query");
query.addEventListener("keypress", checkEnter);
events.subscribe("weatherStats", updateDOM);

events.subscribe("notFound", showError);
/* function button {
    gets update that button class was changed
    sends message to change units of dom / stats
}
*/

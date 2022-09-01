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

//updates content with
function updateContent(stats) {
  city.innerHTML = stats.city;
  country.innerHTML = stats.country;
  sky.innerHTML = stats.sky;
  temp.innerHTML = stats.temp;
  feelsLike.innerHTML = `Feels like: ${stats.feelsLike}`;
  tempHigh.innerHTML = `Today's High: ${stats.tempHigh}`;
  tempLow.innerHTML = `Today's Low: ${stats.tempLow}`;
  humidity.innerHTML = `Humidity: ${stats.humidity}%`;

  show(content);
}

//sends query to fetch
function searchWeather() {
  const query = document.getElementById("query").value;
  events.publish("cityQueried", query);
}

//functions to convert units F / C
function changeUnits(e) {
  e.target.classList.toggle("metric");
  events.publish("unitsChanged"); //send out whether metric or imperial
}

/* function button {
    gets update that button class was changed
    sends message to change units of dom / stats
}
*/

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

function backToForm() {
  show(form);
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
  show(form);
}

//bind events
const submit = document.getElementById("submit");
submit.addEventListener("click", searchWeather);

const query = document.getElementById("query");
query.addEventListener("keypress", checkEnter);

const back = document.getElementById("back");
back.addEventListener("click", backToForm);

const unitsBtn = document.getElementById("units");
unitsBtn.addEventListener("click", changeUnits);

events.subscribe("weatherStats", updateContent);
events.subscribe("notFound", showError);

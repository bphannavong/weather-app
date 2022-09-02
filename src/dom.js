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
const unitsBtn = document.getElementById("units");
unitsBtn.addEventListener("click", changeUnits);

//updates content with
function updateContent(stats) {
  city.innerHTML = stats.city;
  country.innerHTML = stats.country;
  sky.innerHTML = capitalize(stats.sky);
  temp.innerHTML = `${stats.temp}º`;
  feelsLike.innerHTML = `Feels like: ${stats.feelsLike}º`;
  tempHigh.innerHTML = `Today's High: ${stats.tempHigh}º`;
  tempLow.innerHTML = `Today's Low: ${stats.tempLow}º`;
  humidity.innerHTML = `Humidity: ${stats.humidity}%`;
  unitsBtn.className = stats.units;

  show(content);
}

//sends query to fetch
function searchWeather() {
  const query = document.getElementById("query").value;
  events.publish("cityQueried", query);
}

//functions to convert units F / C
function changeUnits(e) {
  let newUnit;
  if (e.target.classList.contains("imperial")) {
    newUnit = "metric";
  } else if (e.target.classList.contains("metric")) {
    newUnit = "imperial";
  }
  e.target.className = newUnit;
  events.publish("unitsChanged", newUnit); //send out whether metric or imperial
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

function capitalize(str) {
  const lower = str.toLowerCase().split(" ");
  return lower
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
//bind events
const submit = document.getElementById("submit");
submit.addEventListener("click", searchWeather);

const query = document.getElementById("query");
query.addEventListener("keypress", checkEnter);

const back = document.getElementById("back");
back.addEventListener("click", backToForm);

events.subscribe("weatherStats", updateContent);
events.subscribe("notFound", showError);

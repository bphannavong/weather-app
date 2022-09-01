import events from "./mediator.js";

import("./mediator.js");

const city = document.getElementById("city");
const sky = document.getElementById("sky");
const temp = document.getElementById("temp-main");
const feelsLike = document.getElementById("feels-like");
const tempHigh = document.getElementById("temp-high");
const tempLow = document.getElementById("temp-low");
const humidity = document.getElementById("humidity");

function updateDOM(stats) {
  console.log("hi");
  city.innerHTML = stats.city;
  sky.innerHTML = stats.sky;
  temp.innerHTML = stats.temp;
  feelsLike.innerHTML = stats.feelsLike;
  tempHigh.innerHTML = stats.tempHigh;
  tempLow.innerHTML = stats.tempLow;
  humidity.innerHTML = stats.humidity;
}

function searchWeather() {
  const query = document.getElementById("query").value;
  events.publish("cityChanged", query);
}

const submit = document.getElementById("submit");
submit.addEventListener("click", searchWeather);

events.subscribe("weatherStats", updateDOM);
/* function button {
    gets update that button class was changed
    sends message to change units of dom / stats
}
*/

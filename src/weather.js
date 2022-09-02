import events from "./mediator.js";

import("./mediator.js");

//global variables
let stats;
let units = "imperial";

function processStats(data) {
  //take data from fetch and turn into display data
  const sky = data.weather[0].description;
  const city = data.name;
  const country = data.sys.country;
  const temp = data.main.temp;
  const feelsLike = data.main.feels_like;
  const tempHigh = data.main.temp_max;
  const tempLow = data.main.temp_min;
  const humidity = data.main.humidity;

  return {
    sky,
    city,
    country,
    temp,
    feelsLike,
    tempHigh,
    tempLow,
    humidity,
  };
}

async function getStats(query) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=ecd26b108dfa2ef49786d327842bf4b9`,
      {
        mode: "cors",
      }
    );
    const reply = await response.json();
    stats = await processStats(reply);
    sendStats();
  } catch {
    events.publish("notFound", "No matching city found");
  }
}

//convert Kelvin to Fahrenheit
function kToF(temp) {
  return ((temp - 273.15) * 9) / 5 + 32;
}

//convert Kelvin to Celsius
function kToC(temp) {
  return temp - 273.15;
}

//convert global K stats to units
function convertStats(system) {
  let copy = structuredClone(stats);
  let fn;

  if (system === "imperial") {
    //return stats -> temps converted to imp
    fn = kToF;
  } else if (system === "metric") {
    //return stats -> temps converted to metric
    fn = kToC;
  }

  copy.temp = Math.round(fn(copy.temp));
  copy.feelsLike = Math.round(fn(copy.feelsLike));
  copy.tempHigh = Math.round(fn(copy.tempHigh));
  copy.tempLow = Math.round(fn(copy.tempLow));
  copy.units = system;

  return copy;
}

//publish stats after converting
function sendStats() {
  const converted = convertStats(units);
  events.publish("weatherStats", converted);
}

//change global units system and publish
function changeUnits(system) {
  units = system;
  sendStats();
}

//bind events
events.subscribe("cityQueried", getStats);
events.subscribe("unitsChanged", changeUnits);

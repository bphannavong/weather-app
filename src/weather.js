import events from "./mediator.js";

import("./mediator.js");

async function processStats(stats) {
  //take data from fetch and turn into display data
  const sky = stats.weather[0].description;
  const city = stats.name;
  const country = stats.sys.country;
  const temp = Math.round(stats.main.temp);
  const feelsLike = Math.round(stats.main.feels_like);
  const tempHigh = Math.round(stats.main.temp_max);
  const tempLow = Math.round(stats.main.temp_min);
  const humidity = stats.main.humidity;

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

async function getStats(city) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ecd26b108dfa2ef49786d327842bf4b9&units=imperial`,
      {
        mode: "cors",
      }
    );
    const stats = await response.json();
    console.log(stats);
    const processedStats = await processStats(stats);
    console.log(processedStats);
    events.publish("weatherStats", processedStats);
  } catch {
    events.publish("notFound", "No matching city found");
  }
}

events.subscribe("cityChanged", getStats);

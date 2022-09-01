import events from "./mediator.js";

import("./mediator.js");

async function processStats(stats) {
  //take data from fetch and turn into display data
  const sky = stats.weather[0].description;
  const city = stats.name;
  const temp = stats.main.temp;
  const feelsLike = stats.main.feels_like;
  const tempHigh = stats.main.temp_max;
  const tempLow = stats.main.temp_min;
  const humidity = stats.main.humidity;

  return await {
    sky,
    city,
    temp,
    feelsLike,
    tempHigh,
    tempLow,
    humidity,
  };
}

async function getStats(city) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ecd26b108dfa2ef49786d327842bf4b9&units=imperial`,
    {
      mode: "cors",
    }
  );
  const stats = await response.json();
  console.log(stats);
  const processedStats = processStats(stats);
  processedStats.then((data) => {
    console.log(data);
    events.publish("weatherStats", data);
  });
}

events.subscribe("cityChanged", getStats);

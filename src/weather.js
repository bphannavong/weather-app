async function getWeather(city) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ecd26b108dfa2ef49786d327842bf4b9`,
    {
      mode: "cors",
    }
  );
  const stats = await response.json();
  console.log(stats);
  return stats;
}

function processStats(stats) {
  //take data from fetch and turn into display data
}

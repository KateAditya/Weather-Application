const apikey = "Enter Your Api Key";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatheIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".error");

async function weathercheck(city) {
  const response = await fetch(`${url}${city}&appid=${apikey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".City").innerHTML = data.name; // Fixed class name
    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".Wind").innerHTML = data.wind.speed + " km/h"; // Fixed class name

    if (data.weather[0].main == "Clouds") {
      weatheIcon.src = "images/cloudy.jpg";
    } else if (data.weather[0].main == "Rain") {
      weatheIcon.src = "images/heavy-rain.jpg";
    } else if (data.weather[0].main == "Clear") {
      weatheIcon.src = "images/sunny.jpg";
    } else if (data.weather[0].main == "Snow") {
      weatheIcon.src = "images/snow.jpg";
    } else if (data.weather[0].main == "Thunderstorm") {
      weatheIcon.src = "images/thunder-rain.jpg";
    } else if (data.weather[0].main == "Light Rain") {
      weatheIcon.src = "images/light-rain.jpg";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Event listener for button click
searchbtn.addEventListener("click", () => {
  weathercheck(searchbox.value);
});

// Event listener for "Enter" key press
searchbox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    weathercheck(searchbox.value);
  }
});

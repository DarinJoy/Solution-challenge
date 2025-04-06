const apiKey = "28866e92f1134f6888123101252302"; // Replace with your WeatherAPI key

// Detect User Location on Page Load
window.onload = function () {
  detectLocation();
};

// Detect User Location
function detectLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(`${lat},${lon}`);
      },
      () => {
        alert("Location access denied. Using default location (Pune).");
        fetchWeather("Pune");
      }
    );
  } else {
    alert("Geolocation not supported. Using default location (Pune).");
    fetchWeather("Pune");
  }
}

// Fetch weather data based on user input
function getWeather() {
  const location = document.getElementById("locationInput").value || "Pune";
  fetchWeather(location);
}

// Fetch weather from API
async function fetchWeather(location) {
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&alerts=yes`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.location) {
      document.getElementById("weather").innerHTML =
        "<p>Location not found.</p>";
      return;
    }

    // Update location display
    const locationDisplay = document.getElementById("currentLocation");
    locationDisplay.textContent = `${data.location.name}, ${data.location.country}`;

    // Show Weather Alerts
    if (data.alerts && data.alerts.alert.length > 0) {
      document.getElementById(
        "alerts"
      ).innerHTML = `<h3>⚠️ Alert: ${data.alerts.alert[0].headline}</h3><p>${data.alerts.alert[0].msg}</p>`;
    } else {
      document.getElementById("alerts").innerHTML = "";
    }

    // Update Current Weather
    const current = data.current;
    const currentWeather = document.querySelector(
      ".weather-info:first-child .weather-details"
    );
    currentWeather.innerHTML = `
      <div class="weather-detail-item">
        <span>Temperature</span>
        <strong>${current.temp_c}°C</strong>
      </div>
      <div class="weather-detail-item">
        <span>Humidity</span>
        <strong>${current.humidity}%</strong>
      </div>
      <div class="weather-detail-item">
        <span>Wind Speed</span>
        <strong>${current.wind_kph} km/h</strong>
      </div>
      <div class="weather-detail-item">
        <span>Conditions</span>
        <strong>${current.condition.text}</strong>
      </div>
    `;

    // Update 7-Day Forecast
    const forecast = data.forecast.forecastday;
    const forecastContainer = document.querySelector(
      ".weather-info:last-child"
    );
    const dailyPredictions =
      forecastContainer.querySelectorAll(".daily-prediction");

    dailyPredictions.forEach((prediction, index) => {
      if (index < forecast.length) {
        const day = forecast[index];
        const date = new Date(day.date);
        const dayNames = ["Tomorrow"];

        // Format the date
        const options = { weekday: "long", month: "short", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);

        // Use "Tomorrow" for the first day, otherwise use the formatted date
        const displayDate = index === 0 ? "Tomorrow" : formattedDate;

        prediction.querySelector("h4").textContent = displayDate;
        prediction.querySelector(".weather-details").innerHTML = `
          <div class="weather-detail-item">
            <span>Temperature</span>
            <strong>${day.day.avgtemp_c}°C</strong>
          </div>
          <div class="weather-detail-item">
            <span>Humidity</span>
            <strong>${day.day.avghumidity}%</strong>
          </div>
          <div class="weather-detail-item">
            <span>Wind Speed</span>
            <strong>${day.day.maxwind_kph} km/h</strong>
          </div>
          <div class="weather-detail-item">
            <span>Conditions</span>
            <strong>${day.day.condition.text}</strong>
          </div>
        `;
      }
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("weather").innerHTML =
      "<p>Failed to load weather data.</p>";
  }
}

// Crop Recommendations Based on Weather Conditions
const cropSuggestions = {
  rain: "🌾 Rice, 🌽 Maize, 🥦 Leafy Greens",
  sunny: "🌻 Sunflowers, 🌾 Wheat, 🥕 Carrots",
  cloudy: "🍇 Grapes, 🍉 Melons, 🥔 Potatoes",
  cold: "🥬 Spinach, 🥕 Carrots, 🥦 Broccoli",
  hot: "🌶️ Chili, 🍅 Tomatoes, 🥭 Mango",
};

// Function to Get Recommended Crops
function getCropRecommendation(condition) {
  if (condition.includes("rain") || condition.includes("drizzle"))
    return cropSuggestions["rain"];
  if (condition.includes("sun")) return cropSuggestions["sunny"];
  if (condition.includes("cloud") || condition.includes("overcast"))
    return cropSuggestions["cloudy"];
  if (condition.includes("cold") || condition.includes("snow"))
    return cropSuggestions["cold"];
  if (condition.includes("hot") || condition.includes("heat"))
    return cropSuggestions["hot"];
  return "No specific recommendation";
}

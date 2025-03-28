// OpenWeatherMap API Key
const srch=document.getElementById("srch");
const API_KEY = "6c89ab04e55d060a6a9793a26640d21f"; // Replace with your OpenWeatherMap API Key

// Initialize the map
let map = L.map('map').setView([20, 77], 4);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to get weather data and display on the map
async function getWeather() {
    const cityName = document.getElementById('cityInput').value;
    if (!cityName) {
        alert('Please enter a city name.');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            alert('City not found. Please enter a valid city name.');
            return;
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
srch.onclick=()=>{
    getWeather();
    
}

// Function to display weather info and map marker
function displayWeather(data) {
    const { name, main, weather, coord } = data;
    const lat = coord.lat;
    const lon = coord.lon;

    // Display weather info
    document.getElementById('weather-info').innerHTML = `
        <h3>Weather in ${name}</h3>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Condition:</strong> ${weather[0].description}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
    `;

    // Set map view and add marker
    map.setView([lat, lon], 10);
    L.marker([lat, lon]).addTo(map)
        .bindPopup(`<b>${name}</b><br>${weather[0].description}, ${main.temp}°C`)
        .openPopup();
}
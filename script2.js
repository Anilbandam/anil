function getWeatherData(city) {
    const apiKey = '6c89ab04e55d060a6a9793a26640d21f'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert('City not found! Please try again.');
                return;
            }

            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const weatherIcon = data.weather[0].icon;
            const cityName = data.name;
            const weather = data.weather
            // Store weather data in localStorage
            localStorage.setItem('weatherData', JSON.stringify({
                cityName,
                temperature,
                humidity,
                windSpeed,
                weatherIcon,
                weather
            }));

            // Redirect to result page
            window.location.href = 'result.html';
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });
}

// Event listener for form submission
document.getElementById('sub-btn').addEventListener('click', function () {
    // e.preventDefault();
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});
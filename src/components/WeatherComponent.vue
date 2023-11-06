<template>
  <div>
    <!-- Display weather data if it's available -->
    <div v-if="weatherData">
      <div class="flex justify-center items-center">
        <!-- Display weather icon -->
        <img class="w-[100px] h-[100px]" :src="`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`"
          alt="Weather icon">
        <div class="ml-5">
          <!-- Display temperature in Celsius -->
          <p class="text-4xl font-bold">{{ Math.round(weatherData.main.temp) }}°C</p>
          <!-- Display city name -->
          <h2 class="text-2xl font-bold">Rome</h2>
        </div>
      </div>
    </div>

    <!-- Display error message if there's an error -->
    <div v-if="error">
      <p class="text-center font-bold">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'WeatherComponent',
  setup() {
    // Define reactive variables
    const weatherData = ref(null);
    const error = ref(null);

    return {
      weatherData,
      error
    }
  },
  mounted() {
    // Fetch weather data from API
    const fetchWeatherData = async () => {
      try {
        // Use API key from environment variable
        const apiKey = process.env.VUE_APP_API_KEY;
        // Construct API URL
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rome&units=metric&appid=${apiKey}`;
        // Send API request
        const weatherResponse = await axios.get(weatherUrl);

        // Handle non-200 status codes
        if (weatherResponse.status !== 200) {
          throw new Error(`Data request error: ${weatherResponse.status} ${weatherResponse.statusText}`);
        }

        // Update weatherData with API response
        this.weatherData = weatherResponse.data;
      } catch (error) {
        // Update error message
        this.error = `An error has occurred: ${error.message}`;
      }
    };

    // Call fetchWeatherData function
    fetchWeatherData();
  }
}
</script>

<template>
  <div>
    <!-- Weather data loaded -->
    <div v-if="weatherData">
      <div class="d-flex align-center ga-4">
        <div class="weather-icon-wrapper">
          <img
            :src="`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`"
            alt="Weather icon"
            width="70"
            height="70"
          />
        </div>
        <div>
          <div class="text-h3 font-weight-bold mb-0">
            {{ Math.round(weatherData.main.temp) }}°<span class="text-h5 font-weight-medium text-medium-emphasis">C</span>
          </div>
          <div class="text-body-1 font-weight-medium text-capitalize">
            {{ weatherData.weather[0].description }}
          </div>
          <div class="d-flex ga-3 mt-2">
            <div class="d-flex align-center ga-1 text-caption text-medium-emphasis">
              <v-icon size="14">mdi-water-percent</v-icon>
              {{ weatherData.main.humidity }}%
            </div>
            <div class="d-flex align-center ga-1 text-caption text-medium-emphasis">
              <v-icon size="14">mdi-weather-windy</v-icon>
              {{ Math.round(weatherData.wind.speed) }} m/s
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error">
      <div class="d-flex align-center ga-2 text-error text-body-2">
        <v-icon size="18" color="error">mdi-weather-cloudy-alert</v-icon>
        Meteo non disponibile
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="d-flex align-center ga-3">
      <v-skeleton-loader type="avatar" width="70" height="70" color="surface" />
      <div>
        <v-skeleton-loader type="text" width="80" color="surface" class="mb-1" />
        <v-skeleton-loader type="text" width="120" color="surface" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'WeatherComponent',
  setup() {
    const weatherData = ref(null);
    const error = ref(null);
    return { weatherData, error };
  },
  mounted() {
    const fetchWeatherData = async () => {
      try {
        const apiKey = process.env.VUE_APP_API_KEY;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rome&units=metric&lang=it&appid=${apiKey}`;
        const weatherResponse = await axios.get(weatherUrl);
        if (weatherResponse.status !== 200) {
          throw new Error(`Errore: ${weatherResponse.status} ${weatherResponse.statusText}`);
        }
        this.weatherData = weatherResponse.data;
      } catch (err) {
        this.error = err.message;
      }
    };
    fetchWeatherData();
  }
}
</script>

<style scoped>
.weather-icon-wrapper {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

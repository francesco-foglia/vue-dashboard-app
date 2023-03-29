<template>
  <div>
    <!-- Display data if it's available -->
    <div v-if="data">
      <h1 class="text-3xl font-bold mb-2">Dashboard</h1>

      <div class="flex flex-wrap mb-5">
        <div class="w-full lg:w-2/3 flex flex-wrap">
          <!-- Display power production -->
          <div class="w-full md:w-1/2">
            <p class="bg-slate-200 p-2 rounded mb-2 md:mr-2">
              <span class="mb-2 block">Power Production</span>
              <span class="font-bold text-4xl block">{{ data['power-production'] }} kW</span>
            </p>
          </div>
          <!-- Display month energy -->
          <div class="w-full md:w-1/2">
            <p class="bg-slate-200 p-2 rounded mb-2 lg:mr-2">
              <span class="mb-2 block">Month Energy</span>
              <span class="font-bold text-4xl block">{{ data['month-energy'] }} kWh</span>
            </p>
          </div>
          <!-- Display today energy -->
          <div class="w-full md:w-1/2">
            <p class="bg-slate-200 p-2 rounded mb-2 lg:mb-0 md:mr-2">
              <span class="mb-2 block">Today Energy</span>
              <span class="font-bold text-4xl block">{{ (data['today-energy'] / 100).toFixed(0) }} kWh</span>
            </p>
          </div>
          <!-- Display left time energy -->
          <div class="w-full md:w-1/2">
            <p class="bg-slate-200 p-2 rounded mb-2 lg:mb-0 lg:mr-2">
              <span class="mb-2 block">Left Time Energy</span>
              <span class="font-bold text-4xl block">{{ data['left-time-energy'] }} kWh</span>
            </p>
          </div>
        </div>

        <div class="w-full lg:w-1/3 rounded bg-slate-400 p-2">
          <div class="flex flex-col justify-evenly items-start md:items-center h-full">

            <div class="m-2">
              <!-- Display weather component -->
              <WeatherComponent />
            </div>

            <div class="m-2">
              <div class="my-auto ml-0">
                <!-- Display today energy in a dynamic counter -->
                <span v-for="digit in todayEnergy.toFixed(0).padStart(9, '0').split('')" :key="digit"
                  class="bg-white p-1 sm:p-2 border border-black font-extrabold">
                  {{ digit }}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Display logs -->
      <h2 class="text-2xl font-bold mb-2">Logs</h2>
      <ul>
        <li v-for="(log, index) in data.logs" :key="index" class="flex flex-wrap mb-2 p-2 rounded bg-slate-200"
          :class="log.type">
          <span class="w-full lg:w-[33%] block mb-2 lg:mb-0 font-bold">{{ log.date }}</span>
          <span class="w-full lg:w-[67%] block">{{ log.text }}</span>
        </li>
      </ul>
    </div>

    <!-- Display error message if there's an error -->
    <div v-if="error">
      <p class="text-center font-bold">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import WeatherComponent from './WeatherComponent.vue';

export default {
  components: {
    WeatherComponent
  },
  name: 'PowerComponent',
  setup() {
    // Define reactive variables
    const data = ref(null);
    const todayEnergy = ref(null);
    const error = ref(null);

    return {
      data,
      todayEnergy,
      error,
    };
  },
  mounted() {
    // Fetch data from API
    const fetchData = async () => {
      try {
        // API URL
        const dataUrl = "https://ott-fogliata.github.io/vuejs-s2i-repository/solar-panels.json";
        // Send API request
        const response = await axios.get(dataUrl);

        // Handle non-200 status codes
        if (response.status !== 200) {
          throw new Error(`Data request error: ${response.status} ${response.statusText}`);
        }

        // Update data with API response
        this.data = response.data;
        // Update today energy with local storage value
        const todayEnergyFromLocalStorage = localStorage.getItem("today-energy");
        // If today energy is not in local storage, use the value from API
        this.todayEnergy = todayEnergyFromLocalStorage ? parseFloat(todayEnergyFromLocalStorage) : this.data["today-energy"];

        // Update today energy every second and save it in local storage
        setInterval(() => {
          this.todayEnergy += 1;
          localStorage.setItem("today-energy", this.todayEnergy);
        }, 1000);
      } catch (error) {
        // Update error message
        this.error = `An error has occurred: ${error.message}`;
      }
    };

    // Call fetchData function
    fetchData();
  }
}
</script>

<style scoped>
/* Info, warning and error messages colors */
.info {
  color: #17A2B8;
}

.warning {
  color: #E0A800;
}

.error {
  color: #C82333;
}
</style>

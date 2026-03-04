<template>
  <div>
    <!-- Main dashboard content -->
    <div v-if="data">

      <!-- Page header -->
      <div class="mb-4 mb-md-6">
        <p class="text-body-2 text-medium-emphasis mb-1">Panoramica impianto fotovoltaico</p>
        <h1 class="page-title font-weight-bold">Monitor Energetico</h1>
      </div>

      <v-row dense>
        <!-- Left column: metric cards -->
        <v-col cols="12" lg="8">
          <v-row dense>

            <!-- Power Production Card -->
            <v-col cols="12" sm="6">
              <v-card rounded="xl" variant="tonal" color="primary" class="metric-card pa-3 pa-sm-4 pa-md-5" elevation="0">
                <div class="d-flex align-center justify-space-between mb-3">
                  <v-icon size="24" color="primary">mdi-lightning-bolt</v-icon>
                  <v-chip size="x-small" color="primary" variant="flat">In tempo reale</v-chip>
                </div>
                <div class="text-body-2 text-medium-emphasis mb-1">Produzione Corrente</div>
                <div class="metric-value font-weight-bold text-primary mb-1">
                  {{ data['power-production'] }}
                  <span class="metric-unit font-weight-regular text-medium-emphasis">kW</span>
                </div>
                <v-progress-linear
                  :model-value="productionPercent"
                  color="primary"
                  rounded
                  height="4"
                  class="mt-3"
                  bg-color="rgba(0,200,83,0.15)"
                />
              </v-card>
            </v-col>

            <!-- Month Energy Card -->
            <v-col cols="12" sm="6">
              <v-card rounded="xl" color="surface-variant" class="metric-card pa-3 pa-sm-4 pa-md-5" elevation="0">
                <div class="d-flex align-center justify-space-between mb-3">
                  <v-icon size="24" color="secondary">mdi-calendar-month</v-icon>
                  <v-chip size="x-small" color="secondary" variant="tonal">Mensile</v-chip>
                </div>
                <div class="text-body-2 text-medium-emphasis mb-1">Energia del Mese</div>
                <div class="metric-value font-weight-bold mb-1">
                  {{ data['month-energy'] }}
                  <span class="metric-unit font-weight-regular text-medium-emphasis">kWh</span>
                </div>
                <v-progress-linear
                  :model-value="60"
                  color="secondary"
                  rounded
                  height="4"
                  class="mt-3"
                  bg-color="rgba(29,233,182,0.1)"
                />
              </v-card>
            </v-col>

            <!-- Today Energy Card -->
            <v-col cols="12" sm="6">
              <v-card rounded="xl" color="surface-variant" class="metric-card pa-3 pa-sm-4 pa-md-5" elevation="0">
                <div class="d-flex align-center justify-space-between mb-3">
                  <v-icon size="24" color="warning">mdi-weather-sunny</v-icon>
                  <v-chip size="x-small" color="warning" variant="tonal">Oggi</v-chip>
                </div>
                <div class="text-body-2 text-medium-emphasis mb-1">Energia di Oggi</div>
                <div class="metric-value font-weight-bold mb-1">
                  {{ (data['today-energy'] / 100).toFixed(0) }}
                  <span class="metric-unit font-weight-regular text-medium-emphasis">kWh</span>
                </div>
                <v-progress-linear
                  :model-value="45"
                  color="warning"
                  rounded
                  height="4"
                  class="mt-3"
                  bg-color="rgba(255,167,38,0.1)"
                />
              </v-card>
            </v-col>

            <!-- Left Time Energy Card -->
            <v-col cols="12" sm="6">
              <v-card rounded="xl" color="surface-variant" class="metric-card pa-3 pa-sm-4 pa-md-5" elevation="0">
                <div class="d-flex align-center justify-space-between mb-3">
                  <v-icon size="24" color="info">mdi-battery-clock</v-icon>
                  <v-chip size="x-small" color="info" variant="tonal">Residuo</v-chip>
                </div>
                <div class="text-body-2 text-medium-emphasis mb-1">Energia Residua</div>
                <div class="metric-value font-weight-bold mb-1">
                  {{ data['left-time-energy'] }}
                  <span class="metric-unit font-weight-regular text-medium-emphasis">kWh</span>
                </div>
                <v-progress-linear
                  :model-value="78"
                  color="info"
                  rounded
                  height="4"
                  class="mt-3"
                  bg-color="rgba(41,182,246,0.1)"
                />
              </v-card>
            </v-col>

          </v-row>
        </v-col>

        <!-- Right column: weather + counter -->
        <v-col cols="12" lg="4">
          <v-card rounded="xl" color="surface-variant" elevation="0" class="pa-3 pa-sm-4 pa-md-5">
            <div class="text-overline text-medium-emphasis mb-3">
              <v-icon size="16" class="mr-1">mdi-map-marker</v-icon>Roma, IT
            </div>

            <!-- Weather widget -->
            <WeatherComponent />

            <v-divider class="my-4" opacity="0.1" />

            <!-- Energy counter -->
            <div class="text-overline text-medium-emphasis mb-2">
              <v-icon size="16" class="mr-1" color="primary">mdi-counter</v-icon>
              Contatore Energia
            </div>
            <!-- Digit counter: flex-wrap + clamp to prevent overflow -->
            <div class="digit-row">
              <span
                v-for="(digit, index) in todayEnergy.toFixed(0).padStart(9, '0').split('')"
                :key="index"
                class="digit-cell"
              >{{ digit }}</span>
            </div>
            <div class="text-center text-caption text-medium-emphasis mt-2">Wh totali oggi</div>
          </v-card>
        </v-col>

      </v-row>

      <!-- Logs section -->
      <v-row class="mt-2" dense>
        <v-col cols="12">
          <div class="d-flex align-center ga-2 mb-3 mb-md-4">
            <v-icon color="primary">mdi-format-list-bulleted-square</v-icon>
            <h2 class="log-title font-weight-bold">Log di Sistema</h2>
            <v-chip size="x-small" variant="tonal" color="primary">{{ data.logs.length }}</v-chip>
          </div>

          <v-card
            v-for="(log, index) in data.logs"
            :key="index"
            rounded="lg"
            variant="tonal"
            :color="logColor(log.type)"
            class="mb-2 px-3 px-sm-4 py-3"
            elevation="0"
          >
            <!-- Log row: stack vertically on xs, horizontally from sm -->
            <div class="log-row">
              <div class="d-flex align-center ga-2 log-meta">
                <v-icon :color="logColor(log.type)" size="16">{{ logIcon(log.type) }}</v-icon>
                <v-chip
                  :color="logColor(log.type)"
                  size="x-small"
                  variant="flat"
                  class="text-uppercase font-weight-bold flex-shrink-0"
                >{{ log.type }}</v-chip>
                <span class="text-body-2 font-weight-medium text-no-wrap">{{ log.date }}</span>
              </div>
              <span class="text-body-2 text-medium-emphasis log-text">{{ log.text }}</span>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Error state -->
    <div v-if="error">
      <v-alert type="error" rounded="xl" variant="tonal" :text="error" />
    </div>

    <!-- Loading state -->
    <div v-if="!data && !error" class="d-flex justify-center align-center" style="min-height:60vh;">
      <div class="text-center">
        <v-progress-circular indeterminate color="primary" size="56" class="mb-4" />
        <div class="text-body-1 text-medium-emphasis">Caricamento dati...</div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import WeatherComponent from './WeatherComponent.vue';

export default {
  components: { WeatherComponent },
  name: 'PowerComponent',
  setup() {
    const data = ref(null);
    const todayEnergy = ref(0);
    const error = ref(null);
    return { data, todayEnergy, error };
  },
  computed: {
    productionPercent() {
      if (!this.data) return 0;
      const maxKw = 10;
      return Math.min((this.data['power-production'] / maxKw) * 100, 100);
    }
  },
  methods: {
    logColor(type) {
      return { info: 'info', warning: 'warning', error: 'error' }[type] || 'primary';
    },
    logIcon(type) {
      return {
        info: 'mdi-information-outline',
        warning: 'mdi-alert-outline',
        error: 'mdi-close-circle-outline',
      }[type] || 'mdi-circle-small';
    }
  },
  mounted() {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data.json');
        if (response.status !== 200) {
          throw new Error(`Errore: ${response.status} ${response.statusText}`);
        }
        this.data = response.data;
        const saved = localStorage.getItem('today-energy');
        this.todayEnergy = saved ? parseFloat(saved) : this.data['today-energy'];
        setInterval(() => {
          this.todayEnergy += 1;
          localStorage.setItem('today-energy', this.todayEnergy);
        }, 1000);
      } catch (err) {
        this.error = `Si è verificato un errore: ${err.message}`;
      }
    };
    fetchData();
  }
}
</script>

<style scoped>
/* Responsive page title */
.page-title {
  font-size: clamp(1.3rem, 5vw, 2rem);
  line-height: 1.2;
}

.log-title {
  font-size: clamp(1rem, 4vw, 1.5rem);
}

/* Metrics: large and responsive numeric value */
.metric-value {
  font-size: clamp(1.6rem, 7vw, 2.8rem);
  line-height: 1.1;
}

.metric-unit {
  font-size: clamp(0.85rem, 3vw, 1.15rem);
}

/* Card: adaptive min-height */
.metric-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 130px;
}

.metric-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(0, 200, 83, 0.12) !important;
}

/* Digital counter: distribute cells across available width */
.digit-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
}

/* Responsive log: column on xs, row from sm */
.log-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

@media (min-width: 600px) {
  .log-row {
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }
  .log-text {
    margin-left: auto;
    text-align: right;
  }
}

.log-meta {
  flex-shrink: 0;
}

.log-text {
  word-break: break-word;
}
</style>

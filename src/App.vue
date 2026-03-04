<template>
  <v-app>
    <!-- Material App Bar -->
    <v-app-bar elevation="0" color="surface" border="b">
      <v-app-bar-title>
        <div class="d-flex align-center ga-2">
          <v-icon color="primary" size="24">mdi-solar-power</v-icon>
          <span class="app-title font-weight-bold">Solar Dashboard</span>
        </div>
      </v-app-bar-title>
      <template #append>
        <div class="d-flex align-center ga-1 ga-sm-2 pr-2 pr-sm-4">
          <v-chip color="success" size="small" prepend-icon="mdi-circle" variant="tonal">
            Live
          </v-chip>
          <!-- Clock hidden below 400px to avoid overflow -->
          <span class="text-body-2 text-medium-emphasis d-none d-sm-inline">{{ currentTime }}</span>
        </div>
      </template>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-2 pa-sm-4 pa-md-6">
        <PowerComponent />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PowerComponent from './components/PowerComponent.vue';

export default {
  components: { PowerComponent },
  data() {
    return {
      currentTime: '',
    };
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString('it-IT', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    }
  }
}
</script>

<style scoped>
.app-title {
  font-size: clamp(0.9rem, 4vw, 1.15rem);
  letter-spacing: 0.03em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

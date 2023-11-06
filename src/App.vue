<template>
  <div class="min-h-screen flex container mx-auto py-5 px-[5%] overflow-x-hidden">
    <div class="m-auto container">
      <PowerComponent />
    </div>
  </div>
</template>

<script>
import PowerComponent from './components/PowerComponent.vue';

export default {
  components: {
    PowerComponent
  }
}
</script>

<template>
  <template v-if="initialising">
    <div class="spinner-border" role="status"></div>
  </template>
  <template v-if="!initialising">
    <div class="venues-container">
      <VenuesTable :venues="venues"></VenuesTable>
    </div>
  </template>
</template>

<script>
import VenuesTable from "@/features/venues/components/VenuesTable";
import {Api} from "@/services/ApiService";

export default {
  name: "Venues",
  components: {
    VenuesTable,
  },
  data() {
    return {
      initialising: true,
      venues: [],
    };
  },
  mounted() {
    Api.getVenues().then(venues => {
      this.venues = venues;
      this.initialising = false;
    });
  }
}
</script>

<style scoped>
.venues-container {
  padding: 2rem;
  width: 100%;
}
</style>

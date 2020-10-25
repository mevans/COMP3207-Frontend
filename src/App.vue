<template>
  <div id="app-container" class="d-flex">
    <template v-if="initialising">
      <div class="spinner-border" role="status"></div>
    </template>
    <template v-else>
      <Sidebar></Sidebar>
      <router-view/>
      <Toasts></Toasts>
      <Modals></Modals>
    </template>
  </div>
</template>

<script>
import Sidebar from "@/core/sidebar/Sidebar";
import Toasts from "@/core/Toasts";
import Modals from "@/core/Modals";
import {Selectors, Store} from "@/shared/services/Store";
import {ApiService} from "@/shared/services/ApiService";

export default {
  name: "App",
  components: {
    Sidebar,
    Toasts,
    Modals,
  },
  setup() {
    return {
      initialising: Selectors.initialising,
    }
  },
  mounted() {
    Store.initialise();
    ApiService.addListener('users', Store.refreshUsers);
    ApiService.addListener('venues', Store.refreshVenues);
    ApiService.addListener('checkins', Store.refreshCheckins);
  },
}
</script>

<style>
#app-container {
  height: 100%;
}
</style>

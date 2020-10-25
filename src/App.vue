<template>
  <div id="app-container" class="d-flex">
    <Sidebar></Sidebar>
    <router-view/>
    <Toasts></Toasts>
    <Modals></Modals>
  </div>
</template>

<script>
import Sidebar from "@/core/sidebar/Sidebar";
import Toasts from "@/core/Toasts";
import Modals from "@/core/Modals";

export default {
  name: "App",
  components: {
    Sidebar,
    Toasts,
    Modals,
  },
}
</script>

<style>
#app-container {
  height: 100%;
}
</style>

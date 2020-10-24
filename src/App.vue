<template>
  <div id="app-container" class="d-flex">
    <Sidebar></Sidebar>
    <router-view/>
    <Toasts></Toasts>
    <Modals></Modals>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Toasts from "@/components/Toasts";
import Modals from "@/components/Modals";

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

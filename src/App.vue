<template>
  <div id="app-container" class="d-flex">
    <Sidebar></Sidebar>
    <router-view/>
    <Toasts></Toasts>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Toasts from "@/components/Toasts";

export default {
  name: "App",
  components: {
    Sidebar,
    Toasts,
  },
}
</script>

<style>
#app-container {
  height: 100%;
}
</style>

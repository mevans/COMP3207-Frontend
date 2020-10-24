<template>
  <div id="app-container" class="d-flex">
    <Sidebar></Sidebar>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
  name: "App",
  components: {
    Sidebar,
  }
}
</script>

<style>
#app-container {
  height: 100%;
}
</style>

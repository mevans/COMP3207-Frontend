<template>
  <div class="sidebar bg-light border-right">
    <h2 class="header">Trace & Test</h2>
    <div class="list-group list-group-flush">
      <router-link class="list-group-item list-group-item-action" exact-active-class="active" to="/home">
        Home
      </router-link>
      <router-link class="list-group-item list-group-item-action" exact-active-class="active" to="/users">
        Users
      </router-link>
      <router-link class="list-group-item list-group-item-action" exact-active-class="active" to="/venues">
        Venues
      </router-link>
    </div>
    <div class="report-container">
      <button class="btn btn-primary report-button">Report Positive</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  min-width: 250px;
}

.header {
  padding: 1rem 3rem;
}

.report-container {
  width: 100%;
  padding: 1rem 0;
}

.report-button {
  display: block;
  margin: 0 auto;
}
</style>

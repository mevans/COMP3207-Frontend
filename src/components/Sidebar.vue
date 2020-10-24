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
    <div class="button-container">
      <button class="btn btn-outline-primary">Check in Group</button>
      <button class="btn btn-danger">Report Positive</button>
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
  display: flex;
  flex-direction: column;
}

.sidebar .list-group {
  flex-grow: 1;
}

.header {
  width: 100%;
  text-align: center;
  padding: 1rem 0;
}

.button-container {
  width: 100%;
  padding: 1rem 0;
}

.button-container button {
  display: block;
  margin: 0 auto 0.5rem;
  width: 80%;
}
</style>

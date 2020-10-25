<template>
  <table class="table table-striped table-bordered table-hover">
    <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Venue</th>
      <th scope="col">User</th>
      <th scope="col">Arrive</th>
      <th scope="col">Leave</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="checkin in checkins" v-bind:key="checkin.id">
      <th scope="row">{{ checkin.id }}</th>
      <td>{{ checkin.venue.name }}</td>
      <td>{{ checkin.user?.name }}</td>
      <td>{{ checkin.arrive }}</td>
      <td>{{ checkin.leave }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "CheckinsTable",
  props: {
    checkins: {
      type: Array,
      default: () => [],
    }
  }
}
</script>

<style scoped>

</style>

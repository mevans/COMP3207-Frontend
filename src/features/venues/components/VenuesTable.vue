<!-- Table to display list of venues -->
<template>
  <table class="table table-striped table-bordered table-hover">
    <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="venue in venues" v-bind:key="venue.id">
      <th scope="row">{{ venue.id }}</th>
      <td>{{ venue.name }}</td>
      <td class="button-cell">
        <router-link :to="{name: 'Checkins', query: {venue: venue.id}}" class="btn btn-outline-primary" tag="button">
          Visitors
        </router-link>
        <button :disabled="deletesInProgress.includes(venue.id)" class="btn btn-outline-danger"
                @click="$emit('delete', venue.id)">Delete
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "VenuesTable",
  emits: ['delete'],
  props: {
    venues: {
      type: Array,
      default: () => [],
    },
    deletesInProgress: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.button-cell * {
  margin-right: 1rem;
}

.button-cell button:last-child {
  margin-right: 0;
}
</style>

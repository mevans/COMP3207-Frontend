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
      <!--      <td class="button-cell">-->
      <!--        <button class="btn btn-outline-primary">Checkins</button>-->
      <!--        <router-link :to="{ name: 'EditUser', params: { id: user.id }}" class="btn btn-outline-dark" tag="button">-->
      <!--          Edit-->
      <!--        </router-link>-->
      <!--        <button :disabled="deletesInProgress.includes(user.id)" class="btn btn-outline-danger"-->
      <!--                @click="$emit('delete', user.id)">Delete-->
      <!--        </button>-->
      <!--      </td>-->
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "VenuesTable",
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

</style>

<template>
  <table class="table table-striped table-bordered table-hover">
    <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" v-bind:key="user.rowKey">
      <th scope="row">{{ user.rowKey }}</th>
      <td>{{ user.FirstName }}</td>
      <td>{{ user.LastName }}</td>
      <td class="button-cell">
        <router-link :to="{ name: 'EditUser', params: { id: user.rowKey }}" class="btn btn-outline-info" tag="button">
          Edit
        </router-link>
        <button class="btn btn-outline-danger" @click="$emit('delete', user.rowKey)">Delete</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "UsersTable",
  emits: ['delete'],
  props: {
    users: {
      type: Array,
      default: () => [],
    }
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

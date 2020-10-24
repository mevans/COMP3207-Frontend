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
    <tr v-for="user in users" v-bind:key="user.id">
      <th scope="row">{{ user.id }}</th>
      <td>{{ user.first_name }}</td>
      <td>{{ user.last_name }}</td>
      <td class="button-cell">
        <button class="btn btn-outline-primary">Checkins</button>
        <button class="btn btn-outline-dark" @click="$emit('edit', user)">Edit</button>
        <button :disabled="deletesInProgress.includes(user.id)" class="btn btn-outline-danger"
                @click="$emit('delete', user.id)">Delete
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "UsersTable",
  emits: ['edit', 'delete'],
  props: {
    users: {
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

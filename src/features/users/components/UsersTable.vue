<!-- Table to dismiss list of users-->
<template>
  <table class="table table-striped table-bordered table-hover">
    <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" v-bind:key="user.id">
      <th scope="row">{{ user.id }}</th>
      <td>{{ user.name }}</td>
      <td class="button-cell">
        <router-link :to="{name: 'Checkins', query: {user: user.id}}" class="btn btn-outline-primary" tag="button">
          Checkins
        </router-link>
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

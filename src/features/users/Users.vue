<template>
  <div v-if="initialising">
    <div class="spinner-border" role="status"></div>
  </div>
  <template v-if="!initialising">
    <div class="users-container">
      <UsersTable :users="users"></UsersTable>
      <router-link class="btn btn-primary" tag="button" to="/users/create">
        Create New
      </router-link>
    </div>
  </template>
</template>
<script>
import UsersTable from "@/features/users/components/UsersTable";
import {Api} from "@/services/ApiService";

export default {
  name: "Users",
  components: {
    UsersTable,
  },
  data() {
    return {
      initialising: true,
      users: [],
    }
  },
  mounted() {
    Api.getUsers().then(users => {
      this.users = users;
      this.initialising = false;
    });
  }
}
</script>

<style scoped>
.users-container {
  padding: 2rem;
  width: 100%;
}
</style>

<template>
  <div v-if="initialising">
    <div class="spinner-border" role="status"></div>
  </div>
  <template v-if="!initialising">
    <div class="users-container">
      <UsersTable :deletes-in-progress="deletesInProgress" :users="users" @delete="deleteUser"></UsersTable>
      <router-link class="btn btn-primary" tag="button" to="/users/create">
        Create New
      </router-link>
    </div>
  </template>
</template>
<script>
import UsersTable from "@/features/users/components/UsersTable";
import {Api} from "@/services/ApiService";
import {ToastService} from "@/services/ToastService";

export default {
  name: "Users",
  components: {
    UsersTable,
  },
  data() {
    return {
      initialising: true,
      users: [],
      deletesInProgress: [],
    }
  },
  mounted() {
    Api.getUsers().then(users => {
      this.users = users;
      this.initialising = false;
    });
  },
  methods: {
    deleteUser(id) {
      ToastService.createToast({text: 'User deleted: ' + id, title: 'Users'});
      // Api.deleteUser(id)
      //     .then(() => {
      //       this.users = this.users.filter(user => user.rowKey !== id);
      //       this.deletesInProgress = this.deletesInProgress.filter(i => i !== id);
      //     });
    }
  }
}
</script>

<style scoped>
.users-container {
  padding: 2rem;
  width: 100%;
}
</style>

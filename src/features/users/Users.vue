<template>
  <template v-if="initialising">
    <div class="spinner-border" role="status"></div>
  </template>
  <template v-if="!initialising">
    <div class="users-container">
      <div class="input-group mb-3 search">
        <input id="userSearch" v-model="search" class="form-control" placeholder="Search...">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="clearSearch">Clear</button>
        </div>
      </div>
      <UsersTable :deletes-in-progress="deletesInProgress" :users="filteredUsers" @delete="deleteUser"></UsersTable>
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
import {identity, pickBy} from 'lodash';

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
      search: '',
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => Object.values(user).toString().toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  mounted() {
    this.search = this.$route.query['search'] || '';
    Api.getUsers().then(users => {
      this.users = users;
      this.initialising = false;
    });
  },
  methods: {
    deleteUser(id) {
      this.deletesInProgress.push(id);
      Api.deleteUser(id)
          .then(() => {
            this.users = this.users.filter(user => user.id !== id);
            this.deletesInProgress = this.deletesInProgress.filter(i => i !== id);
            ToastService.createToast({text: 'User successfully deleted', title: 'Users'});
          });
    },
    clearSearch() {
      this.search = '';
    }
  },
  watch: {
    search(v) {
      const query = pickBy({...this.$route.query, search: v}, identity);
      this.$router.replace({query});
    },
  }
}
</script>

<style scoped>
.users-container {
  padding: 2rem;
  width: 100%;
}

.search {
  margin-bottom: 1rem;
}
</style>

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
      <UsersTable
          :deletes-in-progress="deletesInProgress"
          :users="filteredUsers"
          @delete="deleteUser"
          @edit="edit">
      </UsersTable>
      <button class="btn btn-primary" @click="createNew()">Create New</button>
    </div>
  </template>
</template>
<script>
import UsersTable from "@/features/users/components/UsersTable";
import {Api} from "@/shared/services/ApiService";
import {ToastService} from "@/shared/services/ToastService";
import {identity, pickBy} from 'lodash';
import {ModalService} from "@/shared/services/ModalService";
import UserModal from "@/features/users/components/UserModal";

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
    },
    edit(user) {
      ModalService.showModal(UserModal, {user})
          .then(user => {
            if (user) return Api.updateUser(user);
            return Promise.reject();
          })
          .then(user => {
            this.users = [...this.users.filter(u => u.id !== user.id), user];
            ToastService.createToast({title: 'Users', text: 'User successfully updated'});
          });
    },
    createNew() {
      ModalService.showModal(UserModal)
          .then(user => {
            if (user) return Api.createUser(user);
            return Promise.reject();
          })
          .then(user => {
            this.users.push(user);
            ToastService.createToast({title: 'Users', text: 'User successfully created'});
          });
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

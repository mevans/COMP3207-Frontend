<template>
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
<script>
import UsersTable from "@/features/users/components/UsersTable";
import {ToastService} from "@/shared/services/ToastService";
import {identity, pickBy} from 'lodash';
import {ModalService} from "@/shared/services/ModalService";
import UserModal from "@/features/users/components/UserModal";
import {Selectors} from "@/shared/services/Store";
import {ApiService} from "@/shared/services/ApiService";

export default {
  name: "Users",
  components: {
    UsersTable,
  },
  setup() {
    return {
      users: Selectors.users,
    };
  },
  data() {
    return {
      deletesInProgress: [],
      search: '',
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => user.name.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  mounted() {
    this.search = this.$route.query['search'] || '';
  },
  methods: {
    async deleteUser(id) {
      this.deletesInProgress.push(id);
      const confirm = await ModalService.showConfirmationModal({message: 'Are you sure you want to delete this user?'});
      if (confirm) {
        await ApiService.deleteUser(id);
        ToastService.createToast({text: 'User successfully deleted', title: 'Users'});
      }
      this.deletesInProgress = this.deletesInProgress.filter(i => i !== id);
    },
    async edit(user) {
      const userUpdate = await ModalService.showModal(UserModal, {user});
      if (!userUpdate) return;
      await ApiService.updateUser(userUpdate);
      ToastService.createToast({title: 'Users', text: 'User successfully updated'});
    },
    async createNew() {
      const userCreate = await ModalService.showModal(UserModal);
      if (!userCreate) return;
      await ApiService.createUser(userCreate);
      ToastService.createToast({title: 'Users', text: 'User successfully created'});
    },
    clearSearch() {
      this.search = '';
    },
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

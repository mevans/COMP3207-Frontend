<!-- Page to display list of users -->
<template>
  <div class="container">
    <SearchBar v-model="search" class="mb-3"></SearchBar>
    <Table :columns="tableColumns" :items="sortedItems" :key-fn="user => user.id" :sort="this.sort" sortable
           @col="toggleSortByCol">
      <template v-slot:actions="{item: user}">
        <router-link
            :to="{name: 'Checkins', query: {user: user.id}}"
            class="btn btn-outline-primary"
            tag="button">
          Checkins
        </router-link>
        <button class="btn btn-outline-dark" @click="edit(user)">Edit</button>
        <button class="btn btn-outline-danger" @click="deleteUser(user.id)">Delete</button>
      </template>
    </Table>
    <button class="btn btn-primary" @click="createNew()">Create New</button>
  </div>
</template>

<script>
import {ToastService} from "@/shared/services/ToastService";
import {ModalService} from "@/shared/services/ModalService";
import UserModal from "@/features/users/components/UserModal";
import {Selectors} from "@/shared/services/Store";
import {ApiService} from "@/shared/services/ApiService";
import {basicSearchQueryMixin} from "@/shared/mixins/BasicSearchQuery";
import {sortQueryMixin} from "@/shared/mixins/SortQuery";

export default {
  name: "Users",
  mixins: [
    basicSearchQueryMixin,
    sortQueryMixin,
  ],
  setup() {
    return {
      users: Selectors.users,
    };
  },
  data() {
    return {
      tableColumns: [
        {id: 'name', header: 'Name', fn: i => i.name},
        {id: 'email', header: 'Email', fn: i => i.email},
        {id: 'phone', header: 'Phone', fn: i => i.phone},
        {id: 'address', header: 'Address', fn: i => i.address},
      ],
    }
  },
  computed: {
    itemsToSort() {
      return this.users.filter(user => user.name.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  methods: {
    // Show a confirmation and then delete if they ok it
    async deleteUser(id) {
      const confirm = await ModalService.showConfirmationModal({message: 'Are you sure you want to delete this user?'});
      if (!confirm) return;
      await ApiService.deleteUser(id);
      ToastService.createToast({text: 'User successfully deleted', title: 'Users'});
    },
    // Show modal and update
    async edit(user) {
      const userUpdate = await ModalService.showModal(UserModal, {user});
      if (!userUpdate) return;
      await ApiService.updateUser(userUpdate);
      ToastService.createToast({title: 'Users', text: 'User successfully updated'});
    },
    // Show modal and create
    async createNew() {
      const userCreate = await ModalService.showModal(UserModal);
      if (!userCreate) return;
      await ApiService.createUser(userCreate);
      ToastService.createToast({title: 'Users', text: 'User successfully created'});
    },
  },
}
</script>

<style scoped>
</style>

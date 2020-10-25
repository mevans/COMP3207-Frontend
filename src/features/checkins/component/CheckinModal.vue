<template>
  <ModalTemplate class="modal-lg">
    <template v-slot:title>Check in Group</template>
    <template v-slot:body>
      <template v-if="initialising">
        <div class="spinner-border" role="status"></div>
      </template>
      <template v-else>
        <div class="container">
          <div class="row">
            <div class="col-7">
              <h2>Users</h2>
              <ul class="list-group selected-users-list">
                <li v-for="user in checkedInUsers" v-bind:key="user.id"
                    class="list-group-item d-flex justify-content-between">
                  {{ user.first_name }}
                  <button class="btn btn-danger btn-sm" @click="removeUser(user.id)">&minus;</button>
                </li>
              </ul>
              <SearchSelect
                  :display-fn="user => user.first_name"
                  :items="filteredUsers"
                  :key-fn="user => user.id"
                  placeholder="Search User..."
                  @select="onSelect">
              </SearchSelect>
            </div>
            <div class="col">
              <h2>Info</h2>
            </div>
          </div>
        </div>
      </template>
    </template>
  </ModalTemplate>
</template>

<script>
import ModalTemplate from "@/shared/components/ModalTemplate";
import {Api} from "@/shared/services/ApiService";
import SearchSelect from "@/shared/components/SearchSelect";

export default {
  name: "CheckinModal",
  components: {
    ModalTemplate,
    SearchSelect,
  },
  data() {
    return {
      initialising: true,
      users: [],
      venues: [],
      checkedInUserIds: [],
      userInputFocused: false,
    };
  },
  mounted() {
    Promise.all([
      Api.getUsers(),
      Api.getVenues(),
    ]).then(([users, venues]) => {
      this.users = users;
      this.venues = venues;
      this.initialising = false;
    });
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => !this.checkedInUserIds.includes(user.id));
    },
    checkedInUsers() {
      return this.checkedInUserIds.map(id => this.users.find(u => u.id === id)).filter(v => !!v);
    },
  },
  methods: {
    onSelect(user) {
      this.checkedInUserIds.push(user.id);
    },
    removeUser(id) {
      this.checkedInUserIds = this.checkedInUserIds.filter(i => i !== id);
    },
  }
}
</script>

<style scoped>
.selected-users-list {
  margin-bottom: 1rem;
}

.selected-users-list .list-group-item {
  align-items: baseline;
}
</style>

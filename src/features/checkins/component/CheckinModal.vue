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
              <div class="input-group">
                <input
                    v-model="userSearch"
                    class="form-control"
                    placeholder="Search User..."
                    type="text"
                    @focusin="userInputFocused = true"
                    @focusout="userInputFocused = false">
              </div>
              <div ref="userDropdown" :style="dropdownStyle" aria-labelledby="dropdownMenuButton" class="dropdown-menu">
                <a v-for="user in filteredUsers"
                   v-bind:key="user.id"
                   class="dropdown-item"
                   href="#"
                   @click="selectUser(user)">
                  {{ user.first_name }}
                </a>
                <a v-if="filteredUsers.length === 0" class="dropdown-item disabled">No results</a>
              </div>
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

export default {
  name: "CheckinModal",
  components: {
    ModalTemplate,
  },
  data() {
    return {
      initialising: true,
      users: [],
      venues: [],
      userSearch: '',
      selectedUser: undefined,
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
      return this.users.filter(user =>
          !this.checkedInUserIds.includes(user.id)
          && Object.values(user).toString().toLowerCase().includes(this.userSearch.toLowerCase())
      );
    },
    checkedInUsers() {
      return this.checkedInUserIds.map(id => this.users.find(u => u.id === id)).filter(v => !!v);
    },
    dropdownStyle() {
      const show = this.userSearch;
      return {display: show ? 'block' : 'none'};
    }
  },
  methods: {
    selectUser(user) {
      this.checkedInUserIds.push(user.id);
      this.userSearch = '';
    },
    removeUser(id) {
      this.checkedInUserIds = this.checkedInUserIds.filter(i => i !== id);
    },
  }
}
</script>

<style scoped>
.dropdown-menu {
  top: unset;
  left: unset;
}

.selected-users-list {
  margin-bottom: 1rem;
}

.selected-users-list .list-group-item {
  align-items: baseline;
}
</style>

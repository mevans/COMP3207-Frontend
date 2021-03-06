<!-- Modal for checking in multiple users into a venue with a arrive/leave date -->
<template>
  <form @submit.prevent="submit">
    <ModalTemplate class="modal-lg">
      <template v-slot:title>Check in Group</template>
      <template v-slot:body>
        <div class="row">
          <div class="col-7">
            <h2>Users</h2>
            <ul class="list-group selected-users-list">
              <li v-for="user in checkedInUsers" v-bind:key="user.id"
                  class="list-group-item d-flex justify-content-between">
                {{ user.name }}
                <button class="btn btn-danger btn-sm" @click="removeUser(user.id)">&minus;</button>
              </li>
            </ul>
            <SearchSelect
                v-model="currentUser"
                :display-fn="user => user.name"
                :items="filteredUsers"
                :key-fn="user => user.id"
                class="mb-3"
                placeholder="Search Users...">
            </SearchSelect>
            <button :disabled="!currentUser" class="btn btn-primary w-100" type="button" @click="add">Add</button>
            <div class="small text-muted mt-2">To include multiple users in the check in, select a user and click the
              Add button, to add them to the group
            </div>
          </div>
          <div class="col">
            <h2>Info</h2>
            <div class="form-group">
              <label class="form-label" for="venueSelect">Venue</label>
              <SearchSelect
                  id="venueSelect"
                  v-model="selectedVenue"
                  :display-fn="venue => venue.name"
                  :items="venues"
                  :key-fn="venue => venue.id"
                  :required="true"
                  placeholder="Search Venues...">
              </SearchSelect>
            </div>
            <div class="form-group">
              <label class="form-label" for="startDate">Arrive Date</label>
              <input id="startDate" v-model="arriveDate" class="form-control" required type="date">
            </div>
            <div class="form-group">
              <label class="form-label" for="leaveDate">Leave Date</label>
              <input id="leaveDate" v-model="leaveDate" class="form-control" required type="date">
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button :disabled="checkedInUserIds.length === 0 && !currentUser" class="btn btn-primary" type="submit">
          Check in <span v-if="usersToCheckin.length">{{ usersToCheckin.length }} user(s)</span>
        </button>
        <button class="btn btn-secondary" type="button" @click="close">Close</button>
      </template>
    </ModalTemplate>
  </form>
</template>

<script>
import ModalTemplate from "@/shared/components/ModalTemplate";
import {ModalService} from "@/shared/services/ModalService";
import {Selectors} from "@/shared/services/Store";
import SearchSelect from "@/shared/components/SearchSelect";

export default {
  name: "CheckinModal",
  components: {
    ModalTemplate,
    SearchSelect,
  },
  setup() {
    return {
      users: Selectors.users,
      venues: Selectors.venues,
    }
  },
  data() {
    return {
      checkedInUserIds: [],
      currentUser: undefined,
      selectedVenue: undefined,
      arriveDate: undefined,
      leaveDate: undefined,
    };
  },
  computed: {
    filteredUsers() {
      // Dont show the already added users in the dropdown
      return this.users.filter(user => !this.checkedInUserIds.includes(user.id));
    },
    checkedInUsers() {
      // Transform user ids to user objects
      return this.checkedInUserIds.map(id => this.users.find(u => u.id === id)).filter(v => !!v);
    },
    usersToCheckin() {
      if (this.checkedInUserIds.length) return this.checkedInUserIds;
      if (this.currentUser) return [this.currentUser];
      return [];
    },
  },
  methods: {
    // Add the user in the dropdown to the list of added users
    add() {
      if (!this.currentUser) return;
      this.checkedInUserIds.push(this.currentUser);
      this.currentUser = undefined;
    },
    // Remove them
    removeUser(id) {
      this.checkedInUserIds = this.checkedInUserIds.filter(i => i !== id);
    },
    // Construct the checkin object and dismiss
    submit() {
      // If there is a list of users to checkin, use that. Otherwise use the currently selected user
      const users = this.usersToCheckin;
      const checkin = {
        users,
        venue: this.selectedVenue,
        arrive: this.arriveDate,
        leave: this.leaveDate,
      };
      ModalService.dismiss(checkin);
    },
    close() {
      ModalService.dismiss();
    }
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

.form-group {
  margin-bottom: 1rem;
}
</style>

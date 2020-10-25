<template>
  <form>
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
                    @select="onUserSelect">
                </SearchSelect>
              </div>
              <div class="col">
                <h2>Info</h2>
                <div class="form-group">
                  <label for="venueSelect">Venue</label>
                  <select id="venueSelect" v-model="selectedVenue" class="form-select">
                    <option v-for="venue in venues" v-bind:key="venue.id" :value="venue.id">{{ venue.name }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="startDate">Arrive Date</label>
                  <input id="startDate" v-model="arriveDate" class="form-control" type="date">
                </div>
                <div class="form-group">
                  <label for="leaveDate">Leave Date</label>
                  <input id="leaveDate" v-model="leaveDate" class="form-control" type="date">
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary" type="submit" @click.prevent="checkin">Check in</button>
        <button class="btn btn-secondary" type="button" @click="close">Close</button>
      </template>
    </ModalTemplate>
  </form>
</template>

<script>
import ModalTemplate from "@/shared/components/ModalTemplate";
import {Api} from "@/shared/services/ApiService";
import SearchSelect from "@/shared/components/SearchSelect";
import {ModalService} from "@/shared/services/ModalService";

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
      selectedVenue: undefined,
      arriveDate: undefined,
      leaveDate: undefined,
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
    onUserSelect(user) {
      this.checkedInUserIds.push(user.id);
    },
    removeUser(id) {
      this.checkedInUserIds = this.checkedInUserIds.filter(i => i !== id);
    },
    checkin() {
      const checkin = {
        users: this.checkedInUserIds,
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
</style>

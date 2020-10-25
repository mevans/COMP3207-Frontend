<template>
  <div class="checkins-container">
    <div class="filter border border-bottom-0">
      <div class="row">
        <div class="col">
          <label for="venueSelect">Venue</label>
          <select id="venueSelect" v-model="filterVenue" class="form-select">
            <option v-for="venue in venues" v-bind:key="venue.id" :value="venue.id">{{ venue.name }}</option>
          </select>
        </div>
        <div class="col">
          <label for="userSelect">User</label>
          <select id="userSelect" v-model="filterUser" class="form-select">
            <option v-for="user in users" v-bind:key="user.id" :value="user.id">{{ user.name }}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button class="btn btn-outline-secondary" @click="resetFilter">Reset filters</button>
        </div>
      </div>
    </div>
    <CheckinsTable :checkins="checkins"></CheckinsTable>
  </div>
</template>

<script>
import {Selectors} from "@/shared/services/Store";
import CheckinsTable from "@/features/checkins/component/CheckinsTable";
import {identity, pickBy} from "lodash";

export default {
  name: "Checkins",
  components: {
    CheckinsTable,
  },
  setup() {
    return {
      checkins: Selectors.nestedCheckins,
      venues: Selectors.venues,
      users: Selectors.users,
    }
  },
  data() {
    return {
      filterVenue: undefined,
      filterUser: undefined,
    }
  },
  mounted() {
    this.filterVenue = this.$route.query['venue'];
    this.filterUser = this.$route.query['user'];
  },
  watch: {
    filterVenue(venue) {
      this.updateQueryParams({venue});
    },
    filterUser(user) {
      this.updateQueryParams({user});
    }
  },
  methods: {
    updateQueryParams(data) {
      const query = pickBy({...this.$route.query, ...data}, identity);
      this.$router.replace({query});
    },
    resetFilter() {
      this.filterVenue = undefined;
      this.filterUser = undefined;
    }
  }
}
</script>

<style scoped>
.checkins-container {
  padding: 2rem;
  width: 100%;
}

.filter {
  padding: 1rem;
}

.filter .row {
  margin-bottom: 1rem;
}

.filter .row:last-child {
  margin-bottom: 0;
}
</style>

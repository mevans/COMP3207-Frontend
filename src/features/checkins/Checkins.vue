<template>
  <div class="container checkins-container">
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
          <div class="form-group">
            <label for="startDate">Start Date</label>
            <input id="startDate" v-model="filterStartDate" class="form-control" type="date">
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="endDate">End Date</label>
            <input id="endDate" v-model="filterEndDate" class="form-control" type="date">
          </div>
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-secondary reset-filters" @click="resetFilter">Reset filters</button>
        </div>
      </div>
    </div>
    <CheckinsTable :checkins="filteredCheckins"></CheckinsTable>
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
      filterStartDate: undefined,
      filterEndDate: undefined,
    }
  },
  mounted() {
    this.filterVenue = this.$route.query['venue'];
    this.filterUser = this.$route.query['user'];
    this.filterStartDate = this.$route.query['start'];
    this.filterEndDate = this.$route.query['end'];
  },
  computed: {
    filteredCheckins() {
      return this.checkins.filter(checkin => {
        const venueCorrect = !this.filterVenue || checkin.venue.id === this.filterVenue;
        const userCorrect = !this.filterUser || checkin.user.id === this.filterUser;
        const emptyDates = (!this.filterStartDate || !this.filterEndDate);
        const dateCorrect = emptyDates || (new Date(checkin.arrive) >= new Date(this.filterStartDate) && new Date(checkin.leave) <= new Date(this.filterEndDate));
        return venueCorrect && userCorrect && dateCorrect;
      });
    }
  },
  watch: {
    filterVenue() {
      this.updateQueryParams();
    },
    filterUser() {
      this.updateQueryParams();
    },
    filterStartDate() {
      this.updateQueryParams();
    },
    filterEndDate() {
      this.updateQueryParams();
    },
  },
  methods: {
    updateQueryParams() {
      const query = pickBy({
        ...this.$route.query, ...{
          venue: this.filterVenue,
          user: this.filterUser,
          start: this.filterStartDate,
          end: this.filterEndDate,
        },
      }, identity);
      this.$router.replace({query});
    },
    resetFilter() {
      this.filterVenue = undefined;
      this.filterUser = undefined;
      this.filterStartDate = undefined;
      this.filterEndDate = undefined;
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

.reset-filters {
  height: 100%;
}
</style>

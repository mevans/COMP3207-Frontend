<!-- Page to display list of checkins, and allow them to be filtered-->
<template>
  <div class="container">
    <div class="filter border border-bottom-0">
      <div class="row">
        <div class="col">
          <label class="form-label" for="venueSelect">Venue</label>
          <SearchSelect id="venueSelect" v-model="filterVenue" :display-fn="venue => venue.name" :items="venues"
                        :key-fn="venue => venue.id"></SearchSelect>
        </div>
        <div class="col">
          <label class="form-label" for="userSelect">User</label>
          <SearchSelect id="userSelect" v-model="filterUser" :display-fn="user => user.name" :items="users"
                        :key-fn="user => user.id"></SearchSelect>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label class="form-label" for="startDate">Start Date</label>
          <input id="startDate" v-model="filterStartDate" class="form-control" type="date">
        </div>
        <div class="col">
          <label class="form-label" for="endDate">End Date</label>
          <input id="endDate" v-model="filterEndDate" class="form-control" type="date">
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-secondary reset-filters" @click="resetFilter">Reset filters</button>
        </div>
      </div>
    </div>
    <CheckinsTable :checkins="filteredCheckins" :sort="sort" @col="toggleSortByCol"></CheckinsTable>
  </div>
</template>

<script>
import {Selectors} from "@/shared/services/Store";
import CheckinsTable from "@/features/checkins/component/CheckinsTable";
import {identity, orderBy, pickBy} from "lodash";
import {sortQueryMixin} from "@/shared/mixins/SortQuery";

export default {
  name: "Checkins",
  components: {
    CheckinsTable,
  },
  mixins: [
    sortQueryMixin,
  ],
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
    // Initialise variables with data from query params
    this.filterVenue = this.$route.query['venue'];
    this.filterUser = this.$route.query['user'];
    this.filterStartDate = this.$route.query['start'];
    this.filterEndDate = this.$route.query['end'];
  },
  computed: {
    // Filter checkins by filter data
    filteredCheckins() {
      const filteredCheckins = this.checkins.filter(checkin => {
        const venueCorrect = !this.filterVenue || checkin.venue.id === this.filterVenue;
        const userCorrect = !this.filterUser || checkin.user.id === this.filterUser;
        const emptyDates = (!this.filterStartDate || !this.filterEndDate);
        const dateCorrect = emptyDates || (new Date(checkin.arrive) >= new Date(this.filterStartDate) && new Date(checkin.leave) <= new Date(this.filterEndDate));
        return venueCorrect && userCorrect && dateCorrect;
      });
      const flattenedCheckins = filteredCheckins.map(checkin => ({
        ...checkin,
        venue: checkin.venue.name,
        user: checkin.user.name,
      }));
      if (!this.sort) return flattenedCheckins;
      return orderBy(flattenedCheckins, [this.sortField], [this.sortOrder]);
    }
  },
  watch: {
    // If any of these variables change, update the query params
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
    // Put the variables into the query params
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
    // Clear the filter
    resetFilter() {
      this.filterVenue = undefined;
      this.filterUser = undefined;
      this.filterStartDate = undefined;
      this.filterEndDate = undefined;
    },
  }
}
</script>

<style scoped>
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

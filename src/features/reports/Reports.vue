<template>
  <div class="container">
    <h1 class="mb-5">Users to self isolate
      <button class="btn btn-primary ml-3" @click="fetchReports">Refresh</button>
    </h1>
    <template v-if="initialising">
      <div class="position-absolute top-50 left-50 translate-middle">
        <div class="spinner-border loading-spinner" role="status"></div>
      </div>
    </template>
    <template v-else>
      <SearchBar v-model="search" class="mb-3"></SearchBar>
      <Table :columns="tableColumns" :items="sortedItems" :key-fn="i => i.id" :sort="this.sort" sortable
             @col="toggleSortByCol"></Table>
    </template>
  </div>
</template>

<script>
import {ApiService} from "@/shared/services/ApiService";
import {Selectors} from "@/shared/services/Store";
import {basicSearchQueryMixin} from "@/shared/mixins/BasicSearchQuery";
import {sortQueryMixin} from "@/shared/mixins/SortQuery";

export default {
  name: "Reports",
  mixins: [
    basicSearchQueryMixin,
    sortQueryMixin,
  ],
  setup() {
    return {
      users: Selectors.users,
    }
  },
  data() {
    return {
      initialising: true,
      userIds: [],
      tableColumns: [
        {id: 'name', header: 'Name', fn: i => i.name},
        {id: 'email', header: 'Email', fn: i => i.email},
        {id: 'phone', header: 'Phone', fn: i => i.phone},
        {id: 'address', header: 'Address', fn: i => i.address},
      ]
    }
  },
  mounted() {
    this.fetchReports();
  },
  computed: {
    itemsToSort() {
      return this.userIds.map(id => this.users.find(u => u.id === id))
          .filter(u => !!u)
          .filter(u => Object.values(u).toString().toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    fetchReports() {
      this.initialising = true;
      ApiService.getReports().then(({users}) => {
        this.userIds = users;
        this.initialising = false;
      });
    },
  },
}
</script>

<style scoped>
</style>

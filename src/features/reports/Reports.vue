<template>
  <div class="container reports-container">
    <template v-if="initialising">
      <div class="position-absolute top-50 left-50 translate-middle">
        <div class="spinner-border loading-spinner" role="status"></div>
      </div>
    </template>
    <template v-else>
      <h1 class="mb-5">Users to self isolate
        <button class="btn btn-primary ml-3" @click="fetchReports">Refresh</button>
      </h1>
      <SearchBar v-model="search" class="mb-3"></SearchBar>
      <Table :columns="tableColumns" :items="usersToIsolate" :key-fn="i => i.id"></Table>
    </template>
  </div>
</template>

<script>
import {ApiService} from "@/shared/services/ApiService";
import {Selectors} from "@/shared/services/Store";
import {basicSearchQueryMixin} from "@/shared/mixins/BasicSearchQuery";

export default {
  name: "Reports",
  mixins: [
    basicSearchQueryMixin,
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
    usersToIsolate() {
      return this.userIds.map(id => this.users.find(u => u.id === id)).filter(u => !!u);
    }
  },
  methods: {
    fetchReports() {
      ApiService.getReports().then(({users}) => {
        this.userIds = users;
        this.initialising = false;
      });
    },
  },
}
</script>

<style scoped>
.reports-container {
  padding: 2rem;
  width: 100%;
}
</style>

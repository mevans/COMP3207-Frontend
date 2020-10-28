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
      <Table :columns="tableColumns" :items="usersToIsolate" :key-fn="i => i.id"></Table>
    </template>
  </div>
</template>

<script>
import {ApiService} from "@/shared/services/ApiService";
import {Selectors} from "@/shared/services/Store";
import Table from "@/shared/components/Table";

export default {
  name: "Reports",
  components: {
    Table,
  },
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
        {id: 'id', header: 'Id', fn: i => i.id},
        {id: 'name', header: 'Name', fn: i => i.name},
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

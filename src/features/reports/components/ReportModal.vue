<!-- Modal to report a positive test of COVID -->
<template>
  <form @submit.prevent="report">
    <ModalTemplate>
      <template v-slot:title>Report Positive Test</template>
      <template v-slot:body>
        <div class="form-group">
          <SearchSelect id="userSelect" v-model="selectedUser" :display-fn="user => user.name" :items="users"
                        :key-fn="user => user.id" placeholder="Search User..."></SearchSelect>
        </div>
        <div class="form-group">
          <label class="form-label" for="reportDateInput">Report Date</label>
          <input id="reportDateInput" v-model="date" class="form-control" required type="date">
        </div>
      </template>
      <template v-slot:footer>
        <button :disabled="!selectedUser" class="btn btn-danger" type="submit">Report</button>
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
  name: "ReportModal",
  components: {
    ModalTemplate,
    SearchSelect,
  },
  setup() {
    return {
      users: Selectors.users,
    };
  },
  data() {
    return {
      selectedUser: undefined,
      date: undefined,
    };
  },
  mounted() {
    this.date = new Date().toISOString().split('T')[0];
  },
  methods: {
    report() {
      const report = {
        user: this.selectedUser,
        date: this.date,
      };
      // Dismiss with the user and the date
      ModalService.dismiss(report);
    },
    close() {
      ModalService.dismiss();
    },
  }
}
</script>

<style scoped>

</style>

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
    };
  },
  methods: {
    report() {
      // Dismiss with the selected user, if no user is selected this is the same as cancelling
      ModalService.dismiss(this.selectedUser);
    },
    close() {
      ModalService.dismiss();
    },
  }
}
</script>

<style scoped>

</style>

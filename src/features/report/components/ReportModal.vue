<template>
  <ModalTemplate>
    <template v-slot:title>Report Positive Test</template>
    <template v-slot:body>
      <div class="form-group">
        <label class="form-label" for="userSelect">User</label>
        <select id="userSelect" v-model="selectedUser" class="form-select">
          <option v-for="user in users" v-bind:key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
    </template>
    <template v-slot:footer>
      <button class="btn btn-danger" type="button" @click="report">Report</button>
      <button class="btn btn-secondary" type="button" @click="close">Close</button>
    </template>
  </ModalTemplate>
</template>

<script>
import ModalTemplate from "@/shared/components/ModalTemplate";
import {ModalService} from "@/shared/services/ModalService";
import {Selectors} from "@/shared/services/Store";

export default {
  name: "ReportModal",
  components: {
    ModalTemplate,
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

<template>
  <div class="sidebar bg-light border-right">
    <h2 class="header">Trace & Test</h2>
    <div class="list-group list-group-flush">
      <Nav></Nav>
    </div>
    <div class="button-container">
      <button class="btn btn-outline-primary" @click="checkinGroup">Check in Group</button>
      <button class="btn btn-danger">Report Positive</button>
    </div>
  </div>
</template>

<script>
import Nav from "@/core/sidebar/Nav";
import {ModalService} from "@/shared/services/ModalService";
import CheckinModal from "@/features/checkins/component/CheckinModal";
import {ApiService} from "@/shared/services/ApiService";

export default {
  name: "Sidebar",
  components: {
    Nav,
  },
  methods: {
    async checkinGroup() {
      const checkin = await ModalService.showModal(CheckinModal);
      if (!checkin) return;
      await ApiService.createCheckin(checkin);
    },
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
}

.sidebar .list-group {
  flex-grow: 1;
}

.header {
  width: 100%;
  text-align: center;
  padding: 1rem 0;
}

.button-container {
  width: 100%;
  padding: 1rem 0;
}

.button-container button {
  display: block;
  margin: 0 auto 0.5rem;
  width: 80%;
}
</style>

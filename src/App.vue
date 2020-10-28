<template>
  <div id="app-container" class="d-flex">
    <template v-if="initialising">
      <div class="spinner-border" role="status"></div>
    </template>
    <template v-else>
      <Sidebar @checkin="checkin" @report="report"></Sidebar>
      <main>
        <router-view/>
      </main>
      <Toasts></Toasts>
      <Modals></Modals>
    </template>
  </div>
</template>

<script>
import Sidebar from "@/core/sidebar/Sidebar";
import Toasts from "@/core/Toasts";
import Modals from "@/core/Modals";
import {Selectors, Store} from "@/shared/services/Store";
import {ApiService} from "@/shared/services/ApiService";
import {ModalService} from "@/shared/services/ModalService";
import CheckinModal from "@/features/checkins/component/CheckinModal";
import ReportModal from "@/features/report/components/ReportModal";
import {ToastService} from "@/shared/services/ToastService";

export default {
  name: "App",
  components: {
    Sidebar,
    Toasts,
    Modals,
  },
  setup() {
    return {
      initialising: Selectors.initialising,
    }
  },
  mounted() {
    Store.initialise();
    ApiService.addListener('users', Store.refreshUsers);
    ApiService.addListener('venues', Store.refreshVenues);
    ApiService.addListener('checkins', Store.refreshCheckins);
  },
  methods: {
    async checkin() {
      const checkin = await ModalService.showModal(CheckinModal);
      if (!checkin) return;
      await ApiService.createCheckin(checkin);
      ToastService.createToast({
        title: 'Checkins',
        text: `Checkin with ${checkin.users.length} user(s) successfully created`
      })
    },
    async report() {
      const user = await ModalService.showModal(ReportModal);
      if (!user) return;
      await ApiService.reportUser(user);
      ToastService.createToast({title: 'Reported Positive', text: 'User successfully reported positive for COVID-19'});
    }
  }
}
</script>

<style>
#app-container {
  height: 100%;
}

.form-group {
  margin-bottom: 1rem;
}

main {
  width: 100%;
  overflow-y: auto;
}
</style>

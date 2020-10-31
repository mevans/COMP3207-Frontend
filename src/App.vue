<!-- Main app component-->
<template>
  <div id="app-container" class="d-flex">
    <template v-if="initialising">
      <div class="position-absolute top-50 left-50 translate-middle">
        <div class="spinner-border loading-spinner" role="status"></div>
        <h4 class="text-center loading-text">If you're reading this then azure is probably taking a while to warm
          up...</h4>
      </div>
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
import ReportModal from "@/features/reports/components/ReportModal";
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
    // When an api call finishes with this topic, do this with the store..
    ApiService.addListener('users', Store.refreshUsers);
    ApiService.addListener('venues', Store.refreshVenues);
    ApiService.addListener('checkins', Store.refreshCheckins);
  },
  methods: {
    async checkin() {
      // Show the checkin modal, create if modal not dismissed and show toast
      const checkin = await ModalService.showModal(CheckinModal);
      if (!checkin) return;
      await ApiService.createCheckin(checkin);
      ToastService.createToast({
        title: 'Checkins',
        text: `Checkin with ${checkin.users.length} user(s) successfully created`
      })
    },
    async report() {
      // Show the report modal, create if modal not dismissed and show toast
      const report = await ModalService.showModal(ReportModal);
      if (!report) return;
      await ApiService.reportUser(report);
      ToastService.createToast({title: 'Reported Positive', text: 'User successfully reported positive for COVID-19'});
    }
  }
}
</script>

<style>
#app-container {
  height: 100%;
  position: relative;
}

.form-group {
  margin-bottom: 1rem;
}

main {
  width: 100%;
  overflow-y: auto;
}

.loading-text {
  max-width: 400px;
}

.loading-spinner {
  display: block;
  margin: 0 auto 1rem;
  color: var(--bs-primary);
  width: 50px;
  height: 50px;
}

.container {
  padding: 2rem;
}
</style>

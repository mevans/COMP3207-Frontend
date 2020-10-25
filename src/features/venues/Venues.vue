<template>
  <div class="venues-container">
    <VenuesTable :deletes-in-progress="deletesInProgress" :venues="venues" @delete="deleteVenue"></VenuesTable>
    <button class="btn btn-primary" @click="createNew">Create New</button>
  </div>
</template>

<script>
import VenuesTable from "@/features/venues/components/VenuesTable";
import {ToastService} from "@/shared/services/ToastService";
import {ModalService} from "@/shared/services/ModalService";
import VenueModal from "@/features/venues/components/VenueModal";
import {Selectors} from "@/shared/services/Store";
import {ApiService} from "@/shared/services/ApiService";

export default {
  name: "Venues",
  components: {
    VenuesTable,
  },
  setup() {
    return {
      venues: Selectors.venues,
    }
  },
  data() {
    return {
      deletesInProgress: [],
    };
  },
  methods: {
    deleteVenue(id) {
      this.deletesInProgress.push(id);
      ApiService.deleteVenue(id)
          .then(() => {
            this.deletesInProgress = this.deletesInProgress.filter(i => i !== id);
            ToastService.createToast({text: 'Venue successfully deleted', title: 'Venues'});
          });
    },
    createNew() {
      ModalService.showModal(VenueModal)
          .then(venue => {
            if (venue) {
              ToastService.createToast({title: 'Venues', text: 'Venue successfully created'});
              return ApiService.createVenue(venue);
            }
          });
    }
  }
}
</script>

<style scoped>
.venues-container {
  padding: 2rem;
  width: 100%;
}
</style>

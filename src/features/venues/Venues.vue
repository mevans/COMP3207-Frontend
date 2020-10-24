<template>
  <template v-if="initialising">
    <div class="spinner-border" role="status"></div>
  </template>
  <template v-if="!initialising">
    <div class="venues-container">
      <VenuesTable :deletes-in-progress="deletesInProgress" :venues="venues" @delete="deleteVenue"></VenuesTable>
      <button class="btn btn-primary" @click="openModal()">Create New</button>
    </div>
  </template>
</template>

<script>
import VenuesTable from "@/features/venues/components/VenuesTable";
import {Api} from "@/services/ApiService";
import {ToastService} from "@/services/ToastService";
import {ModalService} from "@/services/ModalService";
import VenueModal from "@/features/venues/components/VenueModal";

export default {
  name: "Venues",
  components: {
    VenuesTable,
  },
  data() {
    return {
      initialising: true,
      venues: [],
      deletesInProgress: [],
    };
  },
  mounted() {
    Api.getVenues().then(venues => {
      this.venues = venues;
      this.initialising = false;
    });
  },
  methods: {
    deleteVenue(id) {
      this.deletesInProgress.push(id);
      Api.deleteVenue(id)
          .then(() => {
            this.venues = this.venues.filter(user => user.id !== id);
            this.deletesInProgress = this.deletesInProgress.filter(i => i !== id);
            ToastService.createToast({text: 'Venue successfully deleted', title: 'Venues'});
          });
    },
    openModal: function (venue) {
      ModalService.showModal(VenueModal, {venue})
          .then(venue => Api.createVenue(venue))
          .then(venue => {
            this.venues.push(venue);
            ToastService.createToast({title: 'Venues', text: 'Venue successfully created'});
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

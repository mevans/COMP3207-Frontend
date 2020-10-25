<template>
  <div class="container venues-container">
    <div class="input-group mb-3">
      <input id="venueSearch" v-model="search" class="form-control" placeholder="Search...">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="clearSearch">Clear</button>
      </div>
    </div>
    <VenuesTable :deletes-in-progress="deletesInProgress" :venues="filteredVenues" @delete="deleteVenue"></VenuesTable>
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
import {identity, pickBy} from "lodash";

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
      search: '',
    };
  },
  computed: {
    filteredVenues() {
      return this.venues.filter(venue => venue.name.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  mounted() {
    this.search = this.$route.query['search'] || '';
  },
  methods: {
    async deleteVenue(id) {
      this.deletesInProgress.push(id);
      const confirm = await ModalService.showConfirmationModal({message: 'Are you sure you want to delete this venue?'});
      if (confirm) {
        await ApiService.deleteVenue(id);
        ToastService.createToast({text: 'Venue successfully deleted', title: 'Venues'});
      }
      this.deletesInProgress = this.deletesInProgress.filter(i => i !== id);
    },
    async createNew() {
      const venueCreate = await ModalService.showModal(VenueModal);
      if (!venueCreate) return;
      await ApiService.createVenue(venueCreate);
      ToastService.createToast({title: 'Venues', text: 'Venue successfully created'});
    },
    clearSearch() {
      this.search = '';
    },
  },
  watch: {
    search(v) {
      const query = pickBy({...this.$route.query, search: v}, identity);
      this.$router.replace({query});
    },
  }
}
</script>

<style scoped>
.venues-container {
  padding: 2rem;
  width: 100%;
}
</style>

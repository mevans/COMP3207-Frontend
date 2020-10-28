<!-- Page to display list of venues -->
<template>
  <div class="container venues-container">
    <div class="input-group mb-3">
      <input id="venueSearch" v-model="search" class="form-control" placeholder="Search...">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="clearSearch">Clear</button>
      </div>
    </div>
    <Table :columns="tableColumns" :items="filteredVenues" :key-fn="venue => venue.id">
      <template v-slot:actions="{item: venue}">
        <router-link
            :to="{name: 'Checkins', query: {venue: venue.id}}"
            class="btn btn-outline-primary"
            tag="button">
          Visitors
        </router-link>
        <button class="btn btn-outline-danger" @click="deleteVenue(venue.id)">Delete</button>
      </template>
    </Table>
    <button class="btn btn-primary" @click="createNew">Create New</button>
  </div>
</template>

<script>
import {ToastService} from "@/shared/services/ToastService";
import {ModalService} from "@/shared/services/ModalService";
import VenueModal from "@/features/venues/components/VenueModal";
import {Selectors} from "@/shared/services/Store";
import {ApiService} from "@/shared/services/ApiService";
import {identity, pickBy} from "lodash";
import Table from "@/shared/components/Table";

export default {
  name: "Venues",
  components: {
    Table,
  },
  setup() {
    return {
      venues: Selectors.venues,
    }
  },
  data() {
    return {
      search: '',
      tableColumns: [
        {id: 'id', header: 'Id', fn: i => i.id},
        {id: 'name', header: 'Name', fn: i => i.name},
      ],
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
    // Show a confirmation and then delete if ok
    async deleteVenue(id) {
      const confirm = await ModalService.showConfirmationModal({message: 'Are you sure you want to delete this venue?'});
      if (!confirm) return;
      await ApiService.deleteVenue(id);
      ToastService.createToast({text: 'Venue successfully deleted', title: 'Venues'});
    },
    // Show modal and create
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
    // When the search value changes, add it to the query params
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

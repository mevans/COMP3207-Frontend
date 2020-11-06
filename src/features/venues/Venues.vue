<!-- Page to display list of venues -->
<template>
  <div class="container">
    <SearchBar v-model="search" class="mb-3"></SearchBar>
    <Table :columns="tableColumns" :items="sortedItems" :key-fn="venue => venue.id" :sort="this.sort" sortable
           @col="toggleSortByCol">
      <template v-slot:actions="{item: venue}">
        <router-link
            :to="{name: 'Checkins', query: {venue: venue.id}}"
            class="btn btn-outline-primary"
            tag="button">
          Visitors
        </router-link>
        <button class="btn btn-outline-dark" @click="edit(venue)">Edit</button>
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
import {basicSearchQueryMixin} from "@/shared/mixins/BasicSearchQuery";
import {sortQueryMixin} from "@/shared/mixins/SortQuery";

export default {
  name: "Venues",
  mixins: [
    basicSearchQueryMixin,
    sortQueryMixin,
  ],
  setup() {
    return {
      venues: Selectors.venues,
    }
  },
  data() {
    return {
      tableColumns: [
        {id: 'name', header: 'Name', fn: i => i.name},
        {id: 'address', header: 'Address', fn: i => i.address},
        {id: 'postcode', header: 'Postcode', fn: i => i.postcode},
      ],
    };
  },
  computed: {
    itemsToSort() {
      return this.venues.filter(venue => venue.name.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    // Show a confirmation and then delete if ok
    async deleteVenue(id) {
      const confirm = await ModalService.showConfirmationModal({message: 'Are you sure you want to delete this venue?'});
      if (!confirm) return;
      await ApiService.deleteVenue(id);
      ToastService.createToast({text: 'Venue successfully deleted', title: 'Venues'});
    },
    // Show modal and update
    async edit(venue) {
      const venueUpdate = await ModalService.showModal(VenueModal, {venue});
      if (!venueUpdate) return;
      await ApiService.updateVenue(venueUpdate);
      ToastService.createToast({title: 'Venues', text: 'Venue successfully updated'});
    },
    // Show modal and create
    async createNew() {
      const venueCreate = await ModalService.showModal(VenueModal);
      if (!venueCreate) return;
      await ApiService.createVenue(venueCreate);
      ToastService.createToast({title: 'Venues', text: 'Venue successfully created'});
    },
  },
}
</script>

<style scoped>
</style>

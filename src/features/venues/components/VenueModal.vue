<!-- Modal to create a venue -->
<template>
  <form @submit.prevent="submit">
    <ModalTemplate>
      <template v-slot:title>{{ titleText }}</template>
      <template v-slot:body>
        <div class="form-group">
          <label class="form-label" for="nameInput">Name</label>
          <input id="nameInput" v-model="name" class="form-control" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="addressInput">Address</label>
          <input id="addressInput" v-model="address" class="form-control" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="postcodeInput">Postcode</label>
          <input id="postcodeInput" v-model="postcode" class="form-control" required>
        </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary" type="submit">{{ buttonText }}</button>
        <button class="btn btn-secondary" type="button" @click="close">Close</button>
      </template>
    </ModalTemplate>
  </form>
</template>

<script>
import {ModalService} from "@/shared/services/ModalService";
import ModalTemplate from "@/shared/components/ModalTemplate";

export default {
  name: "VenueModal",
  components: {
    ModalTemplate,
  },
  props: ['venue'],
  data() {
    return {
      create: undefined,
      name: undefined,
      address: undefined,
      postcode: undefined,
    };
  },
  mounted() {
    this.create = !this.venue;
    if (!this.create) {
      this.id = this.venue.id;
      this.name = this.venue.name;
      this.address = this.venue.address;
      this.postcode = this.venue.postcode;
    }
  },
  computed: {
    titleText() {
      return this.create ? 'Create Venue' : 'Update Venue';
    },
    buttonText() {
      return this.create ? 'Create' : 'Update';
    }
  },
  methods: {
    submit() {
      // Construct venue object and dismiss
      const venue = {
        id: this.id,
        name: this.name,
        address: this.address,
        postcode: this.postcode,
      };
      ModalService.dismiss(venue);
    },
    close() {
      ModalService.dismiss();
    },
  },
}
</script>

<style scoped>

</style>

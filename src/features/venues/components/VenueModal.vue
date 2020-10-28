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
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary" type="submit">{{ buttonText }}</button>
        <button class="btn btn-secondary" type="button" @click="close">Close</button>
      </template>
    </ModalTemplate>
  </form>
</template>

<script>
import ModalTemplate from "@/shared/components/ModalTemplate";
import {ModalService} from "@/shared/services/ModalService";

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
    };
  },
  mounted() {
    this.create = !this.venue;
    if (!this.create) {
      this.name = this.venue.name;
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
      const venue = {name: this.name};
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

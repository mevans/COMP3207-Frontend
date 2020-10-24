<template>
  <form>
    <ModalTemplate>
      <template v-slot:title>{{ titleText }}</template>
      <template v-slot:body>
        <div class="form-group">
          <label for="nameInput">Name</label>
          <input id="nameInput" v-model="name" class="form-control">
        </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary" type="submit" @click.prevent="action">{{ buttonText }}</button>
        <button class="btn btn-secondary" type="button" @click="close">Close</button>
      </template>
    </ModalTemplate>
  </form>
</template>

<script>
import ModalTemplate from "@/components/ModalTemplate";
import {ModalService} from "@/services/ModalService";

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
    action() {
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

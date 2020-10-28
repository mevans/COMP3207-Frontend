<!-- Modal to create/edit a user -->
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
          <label class="form-label" for="emailInput">Email</label>
          <input id="emailInput" v-model="email" class="form-control" required type="email">
        </div>
        <div class="form-group">
          <label class="form-label" for="phoneInput">Phone</label>
          <input id="phoneInput" v-model="phone" class="form-control" required type="tel">
        </div>
        <div class="form-group">
          <label class="form-label" for="addressInput">Address</label>
          <input id="addressInput" v-model="address" class="form-control" required>
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

export default {
  name: "UserModal",
  props: ['user'],
  data() {
    return {
      create: undefined,
      id: undefined,
      name: undefined,
      email: undefined,
      phone: undefined,
      address: undefined,
    };
  },
  mounted() {
    this.create = !this.user;
    // If a user is being edited, initialise the fields with the user data
    if (!this.create) {
      this.id = this.user.id;
      this.name = this.user.name;
      this.email = this.user.email;
      this.phone = this.user.phone;
      this.address = this.user.address;
    }
  },
  computed: {
    titleText() {
      return this.create ? 'Create User' : 'Update User';
    },
    buttonText() {
      return this.create ? 'Create' : 'Update';
    }
  },
  methods: {
    // Construct user object and dismiss
    submit() {
      const user = {
        id: this.id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
      };
      ModalService.dismiss(user);
    },
    close() {
      ModalService.dismiss();
    },
  },
}
</script>

<style scoped>

</style>

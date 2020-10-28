<!-- Modal to create/edit a user -->
<template>
  <form @submit.prevent="submit">
    <ModalTemplate>
      <template v-slot:title>{{ titleText }}</template>
      <template v-slot:body>
        <div class="form-group">
          <label class="form-label" for="idInput">Id</label>
          <input id="idInput" v-model="id" :disabled="true" class="form-control">
        </div>
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
  name: "UserModal",
  components: {
    ModalTemplate,
  },
  props: ['user'],
  data() {
    return {
      create: undefined,
      id: undefined,
      name: undefined,
    };
  },
  mounted() {
    this.create = !this.user;
    // If a user is being edited, initialise the fields with the user data
    if (!this.create) {
      this.id = this.user.id;
      this.name = this.user.name;
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
      const user = {id: this.id, name: this.name};
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

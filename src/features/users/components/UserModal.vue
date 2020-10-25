<template>
  <form>
    <ModalTemplate>
      <template v-slot:title>{{ titleText }}</template>
      <template v-slot:body>
        <div class="form-group">
          <label for="idInput">Id</label>
          <input id="idInput" v-model="id" :disabled="true" class="form-control">
        </div>
        <div class="form-group">
          <label for="firstNameInput">First Name</label>
          <input id="firstNameInput" v-model="firstName" class="form-control">
        </div>
        <div class="form-group">
          <label for="lastNameInput">Last Name</label>
          <input id="lastNameInput" v-model="lastName" class="form-control">
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
      firstName: undefined,
      lastName: undefined,
    };
  },
  mounted() {
    this.create = !this.user;
    if (!this.create) {
      this.id = this.user.id;
      this.firstName = this.user.first_name;
      this.lastName = this.user.last_name;
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
    action() {
      const user = {id: this.id, first_name: this.firstName, last_name: this.lastName};
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

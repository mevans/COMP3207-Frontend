<template>
  <div>
    <h2>{{ titleText }}</h2>
    <div v-if="initialising">
      <div class="spinner-border" role="status"></div>
    </div>
    <form v-else @submit.prevent="submit">
      <div class="form-group">
        <label for="firstNameInput">First Name</label>
        <input id="firstNameInput" v-model="firstName" class="form-control">
      </div>
      <div class="form-group">
        <label for="lastNameInput">Last Name</label>
        <input id="lastNameInput" v-model="lastName" class="form-control">
      </div>
      <button :disabled="actioning" class="btn btn-primary" type="submit">{{ buttonText }}</button>
    </form>
  </div>
</template>

<script>
import {Api} from "@/services/ApiService";
import {ToastService} from "@/services/ToastService";

export default {
  name: "CreateEditUser",
  props: ['id'],
  data() {
    return {
      create: undefined,
      initialising: true,
      user: undefined,
      firstName: undefined,
      lastName: undefined,
      actioning: false,
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
  mounted() {
    this.create = !this.id;
    this.initialising = !this.create; // Only has to fetch data if editing
    if (this.initialising) this.fetchUser();
  },
  methods: {
    fetchUser() {
      Api.getUser(this.id)
          .then(user => {
            this.user = user;
            this.initialising = false;
            this.setupForm(user);
          });
    },
    setupForm(user) {
      this.firstName = user.FirstName;
      this.lastName = user.LastName;
    },
    submit() {
      this.actioning = true;
      // Create user
      if (this.create) {
        const user = {first_name: this.firstName, last_name: this.lastName};
        Api.createUser(user)
            .then(() => {
              ToastService.createToast({title: 'Users', text: 'User successfully created'});
              this.navigateBack();
            });
      } else { // Update user
        const user = {...this.user, FirstName: this.firstName, LastName: this.lastName};
        Api.updateUser(user)
            .then(() => {
              ToastService.createToast({title: 'Users', text: 'User successfully updated'});
              this.navigateBack();
            });
      }
    },
    navigateBack() {
      this.$router.push({name: 'UserList'});
    }
  },
}
</script>

<style scoped>

</style>

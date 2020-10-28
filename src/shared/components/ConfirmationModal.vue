<!-- Standardised Confirmation Modal eg. are you sure you want to...? yes / no -->
<template>
  <ModalTemplate>
    <template v-slot:title>{{ title }}</template>
    <template v-slot:body>{{ message }}</template>
    <template v-slot:footer>
      <button class="btn btn-primary" type="button" @click="ok">{{ okText }}</button>
      <button class="btn btn-secondary" type="button" @click="cancel">Cancel</button>
    </template>
  </ModalTemplate>
</template>

<script>
import ModalTemplate from "@/shared/components/ModalTemplate";
import {ModalService} from "@/shared/services/ModalService";

export default {
  name: "ConfirmationModal",
  components: {
    ModalTemplate,
  },
  props: {
    title: {
      type: String,
      default: () => 'Confirmation Dialog'
    },
    message: {
      type: String,
      default: () => 'Are you sure you want to...'
    },
    okText: {
      type: String,
      default: () => 'Ok',
    },
  },
  methods: {
    ok() {
      ModalService.dismiss(true);
    },
    cancel() {
      ModalService.dismiss(false);
    }
  }
}
</script>

<style scoped>

</style>

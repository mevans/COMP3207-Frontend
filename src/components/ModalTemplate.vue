<template>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
          <slot name="title"></slot>
        </h5>
        <button aria-label="Close" class="btn-close" data-dismiss="modal" type="button" @click="close">
        </button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {ModalService} from "@/services/ModalService";

export default {
  name: "ModalTemplate",
  methods: {
    close() {
      ModalService.dismiss();
    }
  }
}
</script>

<style scoped>
</style>

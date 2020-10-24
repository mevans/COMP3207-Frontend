<template>
  <div id="modals-container"></div>
</template>

<script>
import {ModalService} from "@/services/ModalService";
import {render} from "@vue/runtime-dom";
import {createVNode} from "@vue/runtime-core";

export default {
  name: "Modals",
  data() {
    return {
      containerElement: undefined,
      modal: undefined,
    }
  },
  mounted() {
    ModalService.initialise(this.show, this.dismiss);

    this.containerElement = document.getElementById('modals-container');
  },
  methods: {
    show(modal) {
      this.containerElement.style.display = 'block';
      const vNode = createVNode(modal);
      const modalContainer = document.createElement('div');
      modalContainer.classList.add('modal-backdrop');
      modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      const el = this.containerElement.appendChild(modalContainer);
      render(vNode, el);
      this.modal = el;
    },
    dismiss() {
      this.containerElement.style.display = 'none';
      render(null, this.modal);
      this.modal.remove();
    }
  }
}
</script>

<style scoped>
#modals-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

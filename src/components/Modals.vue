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

    document.addEventListener('keydown', (e) => {
      if (this.modal && e.key === 'Escape') {
        ModalService.dismiss();
      }
    });
  },
  methods: {
    show(modal, props) {
      this.containerElement.style.display = 'block';
      const vNode = createVNode(modal, props);
      const modalBackdrop = document.createElement('div');
      modalBackdrop.classList.add('modal-backdrop');
      modalBackdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      modalBackdrop.onclick = () => ModalService.dismiss();
      const el = this.containerElement.appendChild(modalBackdrop);
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
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

<!-- Modals controller component - puts callbacks into modal service and handles showing/dismissing modals-->
<template>
  <div id="modals-container"></div>
</template>

<script>
import {ModalService} from "@/shared/services/ModalService";
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
    // Initialise the service with the show/dismiss methods
    ModalService.initialise(this.show, this.dismiss);

    this.containerElement = document.getElementById('modals-container');

    // If a model is shown and the key is escape, then dismiss the modal
    document.addEventListener('keydown', e => {
      if (this.modal && e.key === 'Escape') {
        ModalService.dismiss();
      }
    });
    // If the backdrop is clicked, then dismiss the modal
    document.addEventListener('click', e => {
      if (e.target.classList.contains('modal-backdrop')) {
        ModalService.dismiss();
      }
    });
  },
  methods: {
    show(modal, props) {
      // Create the modal component, add styling / modal backdrop and render it
      this.containerElement.style.display = 'block';
      const vNode = createVNode(modal, props);
      const modalBackdrop = document.createElement('div');
      modalBackdrop.classList.add('modal-backdrop');
      modalBackdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      const el = this.containerElement.appendChild(modalBackdrop);
      render(vNode, el);
      this.modal = el;
    },
    dismiss() {
      // Remove the elements
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

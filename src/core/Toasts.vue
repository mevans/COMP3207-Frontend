<!-- Toast controller component - puts callbacks into toast service and handles displaying / hiding toasts -->
<template>
  <div id="toasts-container"></div>
</template>

<script>
import {ToastService} from "@/shared/services/ToastService";
import {createVNode} from "@vue/runtime-core";
import {render} from "@vue/runtime-dom";
import Toast from "@/shared/components/Toast";

export default {
  name: "Toasts",
  data() {
    return {
      containerElement: undefined,
      // Store a map of toast ids to their html elements
      toastElements: {},
    }
  },
  mounted() {
    // Initialise the service with the callbacks
    ToastService.initialise(this.onAdd, this.onRemove);
    this.containerElement = document.getElementById('toasts-container');
  },
  methods: {
    onAdd(toast) {
      // Create a toast component with the toast, add a callback to remove if the close button is clicked
      const vNode = createVNode(Toast, {
        toast,
        onClose: () => this.onRemove(toast.id),
      });
      const toastContainer = document.createElement('div');
      toastContainer.style.marginBottom = '0.6rem';
      const el = this.containerElement.appendChild(toastContainer);
      render(vNode, el);
      this.toastElements[toast.id] = el;
    },
    onRemove(id) {
      // Remove the toast element
      const el = this.toastElements[id];
      render(null, el);
      el.remove();
    },
  }
}
</script>

<style scoped>
#toasts-container {
  position: absolute;
  top: 1rem;
  right: 2rem;
  z-index: 999;
}
</style>

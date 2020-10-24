<template>
  <div id="toasts-container"></div>
</template>

<script>
import {ToastService} from "@/services/ToastService";
import {createVNode, h} from "@vue/runtime-core";
import {render} from "@vue/runtime-dom";

export default {
  name: "Toasts",
  data() {
    return {
      containerElement: undefined,
      toastElements: {},
    }
  },
  mounted() {
    ToastService.initialise(this.onAdd, this.onRemove);

    this.containerElement = document.getElementById('toasts-container');
  },
  methods: {
    onAdd(toast) {
      const vNode = createVNode({
        render() {
          return h('div', {class: 'toast', role: 'alert', style: 'opacity:1; z-index:1'}, [
            h('div', {class: 'toast-header'}, [
              h('strong', {class: 'mr-auto'}, toast.title),
              h('button', {
                class: 'ml-2 mb-1 btn-close', type: 'button', 'onclick'() {
                  ToastService.removeToast(toast.id);
                }
              })
            ]),
            h('div', {class: 'toast-body'}, toast.text),
          ]);
        }
      });
      const toastContainer = document.createElement('div');
      toastContainer.style.marginBottom = '0.6rem';
      const el = this.containerElement.appendChild(toastContainer);
      render(vNode, el);
      this.toastElements[toast.id] = el;
    },
    onRemove(id) {
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

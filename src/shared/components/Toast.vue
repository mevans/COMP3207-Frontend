<!-- Toast component used by the toast controller component-->
<template>
  <div class="toast" role="alert">
    <div class="toast-header">
      <strong class="mr-auto">{{ toast.title }}</strong>
      <button class="ml-2 mb-1 btn-close" type="button" @click="onClose"></button>
    </div>
    <div class="toast-body">
      {{ toast.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // onClose is a callback to call when the close button is clicked
  props: ['toast', 'onClose'],
}
</script>

<style scoped>
.toast {
  opacity: 1;
  z-index: 1;
}
</style>

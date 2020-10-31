<!-- Basic search bar component with clear button -->
<template>
  <div class="input-group">
    <input :placeholder="placeholder" :value="modelValue" class="form-control"
           @input="$emit('update:modelValue', $event.target.value)">
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" @click="clear">&times;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    placeholder: {
      type: String,
      default: () => 'Search...',
    },
    // modelValue is a reserved name by the framework so this component can be used like a normal form element
    modelValue: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    clear() {
      this.$emit('update:modelValue', '');
    },
  },
}
</script>

<style scoped>

</style>

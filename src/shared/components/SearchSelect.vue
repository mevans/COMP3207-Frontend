<template>
  <div class="input-group">
    <input
        v-model="search"
        :placeholder="placeholder"
        class="form-control"
        type="text">
  </div>
  <div :style="dropdownStyle" aria-labelledby="dropdownMenuButton" class="dropdown-menu">
    <a v-for="item in filteredItems"
       v-bind:key="keyFn(item)"
       class="dropdown-item"
       href="#"
       @click="onSelect(item)">
      {{ displayFn(item) }}
    </a>
    <a v-if="filteredItems.length === 0" class="dropdown-item disabled">No results</a>
  </div>
</template>

<script>
export default {
  name: "SearchSelect",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: () => 'Search...',
    },
    keyFn: {
      type: Function,
      default: () => i => i.id,
    },
    displayFn: {
      type: Function,
      default: () => i => i.toString(),
    }
  },
  emits: ['select'],
  data() {
    return {
      search: '',
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => Object.values(item).toString().toLowerCase().includes(this.search.toLowerCase()));
    },
    dropdownStyle() {
      const show = this.search;
      return {display: show ? 'block' : 'none'};
    }
  },
  methods: {
    onSelect(item) {
      this.search = '';
      this.$emit('select', item);
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  top: unset;
  left: unset;
}
</style>

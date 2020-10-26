<template>
  <div class="input-group">
    <input
        v-model="search"
        :placeholder="placeholder"
        class="form-control"
        type="text"
        @focusin="hasFocus = true"
        @focusout="hasFocus = false">
    <div v-if="selected" class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" @click="clearSelection">
        &times;
      </button>
    </div>
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
  name: "SearchSelector",
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
  data() {
    return {
      selected: undefined,
      search: '',
      hasFocus: false,
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => Object.values(item).toString().toLowerCase().includes(this.search.toLowerCase()));
    },
    dropdownStyle() {
      const show = (this.hasFocus) || (!this.hasFocus && this.search) || this.dropdownStyle.display === 'block';
      return {display: show ? 'block' : 'none'};
    }
  },
  watch: {
    search() {
      if (this.selected && this.displayFn(this.selected) !== this.search) {
        this.selected = undefined;
      }
    }
  },
  methods: {
    onSelect(item) {
      this.selected = item;
      this.search = this.displayFn(item);
    },
    clearSelection() {
      this.selected = undefined;
      this.search = '';
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

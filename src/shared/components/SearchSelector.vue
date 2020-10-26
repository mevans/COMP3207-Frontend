<template>
  <div>
    <div class="input-group">
      <input
          ref="search"
          v-model="search"
          :placeholder="placeholder"
          class="form-control"
          type="text"
          @focusin="dropdownOpen = true"
          @keypress.enter.passive="onEnter">
      <div v-if="selected || search" class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="clearSelection">
          &times;
        </button>
      </div>
    </div>
    <div ref="dropdown" :style="{ 'display': dropdownOpen ? 'block' : 'none' }" aria-labelledby="dropdownMenuButton"
         class="dropdown-menu">
      <a v-for="item in filteredItems"
         v-bind:key="keyFn(item)"
         class="dropdown-item"
         href="#"
         @click="onSelect(item)">
        {{ displayFn(item) }}
      </a>
      <a v-if="filteredItems.length === 0" class="dropdown-item disabled">No results</a>
    </div>
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
    },
    modelValue: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      selected: undefined,
      search: '',
      dropdownOpen: false,
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => Object.values(item).toString().toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  watch: {
    search() {
      // If something is selected, and they don't search for the selected item, then deselect
      if (this.selected && this.displayFn(this.selected) !== this.search) {
        this.selected = undefined;
      }
    },
    dropdownOpen() {
      // If they close the dropdown without selecting, then clear
      if (!this.dropdownOpen && !this.selected) {
        this.search = '';
        this.selected = undefined;
      }
    },
    selected(i) {
      const id = i ? this.keyFn(i) : undefined;
      this.$emit('update:modelValue', id);
    },
    modelValue(n) {
      if (!n) this.clearSelection();
      const item = this.items.find(i => this.keyFn(i) === n);
      if (item) this.onSelect(item);
    }
  },
  mounted() {
    document.addEventListener('click', e => {
      // If the click is not on the input or the dropdown, then close the dropdown
      const clickedOn = e.target === this.$refs.search || e.target === this.$refs.dropdown;
      if (!clickedOn) {
        this.dropdownOpen = false;
      }
    });
  },
  methods: {
    onSelect(item) {
      this.selected = item;
      this.search = this.displayFn(item);
      this.dropdownOpen = false;
    },
    clearSelection() {
      this.selected = undefined;
      this.search = '';
    },
    onEnter() {
      if (this.filteredItems.length > 1) return;
      // Select the only item in the list
      this.onSelect(this.filteredItems[0]);
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

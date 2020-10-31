<!-- Shared component for displaying a customisable table, used for users, venues, and reports-->
<template>
  <table class="table table-striped table-bordered table-hover table-responsive">
    <thead>
    <tr>
      <th v-for="column in columns" v-bind:key="column.id" scope="col">{{ column.header }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items" v-bind:key="keyFn(item)">
      <td v-for="column in columns" v-bind:key="column.id">
        <!-- This slot elements allows a custom builder to be specified for a specific column for the table eg. could put a button rather than text-->
        <slot :item="item" :name="column.id + '-builder'">
          {{ column.fn(item) }}
        </slot>
      </td>
      <!-- Actions can also be added to this table, which are just a list of buttons-->
      <td v-if="$slots.actions" class="button-cell table-shrink">
        <slot :item="item" name="actions"></slot>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    // List of items
    items: {
      type: Array,
      default: () => [],
    },
    // How to uniquely identify an item
    keyFn: {
      type: Function,
      default: () => i => i.id,
    },
    // List of columns, which all have an id, a header, and a function for getting the data
    columns: {
      type: Array,
      default: () => [
        {id: 'example', header: 'Example column header', fn: i => i.name},
      ],
    }
  }
}
</script>

<style>
.button-cell * {
  margin-right: 1rem;
}

.button-cell button:last-child {
  margin-right: 0;
}

table td.table-shrink {
  white-space: nowrap;
  width: 1%;
}
</style>

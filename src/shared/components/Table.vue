<template>
  <table class="table table-striped table-bordered table-hover">
    <thead>
    <tr>
      <th v-for="column in columns" v-bind:key="column.id" scope="col">{{ column.header }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items" v-bind:key="keyFn(item)">
      <td v-for="column in columns" v-bind:key="column.id">
        <slot :item="item" :name="column.id + '-builder'">
          {{ column.fn(item) }}
        </slot>
      </td>
      <td v-if="$slots.actions" class="button-cell">
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
    items: {
      type: Array,
      default: () => [],
    },
    keyFn: {
      type: Function,
      default: () => i => i.id,
    },
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
</style>

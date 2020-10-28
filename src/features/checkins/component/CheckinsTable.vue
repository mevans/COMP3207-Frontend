<!-- Table to display list of checkins -->
<template>
  <table class="table table-striped table-bordered table-hover">
    <thead>
    <tr>
      <th v-for="header of headers" v-bind:key="header.id" class="sortable-header" @click="$emit('col', header.id)">
        {{ header.title }}
        <div v-if="sort === ''">-</div>
        <div v-if="sort === header.id">∧</div>
        <div v-if="sort === '-' + header.id">∨</div>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="checkin in checkins" v-bind:key="checkin.id">
      <th scope="row">{{ checkin.id }}</th>
      <td>{{ checkin.venue }}</td>
      <td>{{ checkin.user }}</td>
      <td>{{ checkin.arrive }}</td>
      <td>{{ checkin.leave }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "CheckinsTable",
  props: {
    checkins: {
      type: Array,
      default: () => [],
    },
    sort: {
      type: String,
      default: () => '',
    }
  },
  emits: ['col'],
  data() {
    return {
      headers: [
        {id: 'id', title: 'Id'},
        {id: 'venue', title: 'Venue'},
        {id: 'user', title: 'User'},
        {id: 'arrive', title: 'Arrive'},
        {id: 'leave', title: 'Leave'},
      ]
    }
  }
}
</script>

<style scoped>
.sortable-header {
  cursor: pointer;
}

.sortable-header div {
  float: right;
}
</style>

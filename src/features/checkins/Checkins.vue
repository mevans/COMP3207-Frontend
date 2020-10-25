<template>
  <div class="checkins-container">
    <CheckinsTable :checkins="checkins"></CheckinsTable>
  </div>
</template>

<script>
import {Selectors} from "@/shared/services/Store";
import CheckinsTable from "@/features/checkins/component/CheckinsTable";

export default {
  name: "Checkins",
  components: {
    CheckinsTable,
  },
  setup() {
    return {
      checkins: Selectors.nestedCheckins,
    }
  }
}
</script>

<style scoped>
.checkins-container {
  padding: 2rem;
  width: 100%;
}
</style>

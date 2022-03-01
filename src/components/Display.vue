<template>
  <div v-for="item in minorItems" :key="item.type">
    {{ item.type }} {{ item.total }}
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Display",
  computed: {
    ...mapState("items", {
      minorItems: (state) => state.minorItems,
    }),
  },
};
</script>
<style>
.display {
  position: absolute;
}
</style>

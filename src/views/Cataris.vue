<template>
  <div class="cataris">
    <div
      v-for="(location, index) in locations"
      :key="location.area"
      class="toggle_box"
      :style="[location.top, location.left]"
    >
      <label
        :for="location.area"
        :key="locationStates[index].shown"
        v-if="locationStates[index].shown"
      >
        <input
          type="checkbox"
          :id="location.area"
          v-model="location.checked"
          v-on:click="checked()"
        />
        <span class="toggle_switch"></span>
      </label>
      <label
        :for="location.area"
        :key="locationStates[index].shown + 'no'"
        v-else
      >
        <input
          type="checkbox"
          :id="location.area"
          v-model="location.checked"
          v-on:click="checked()"
        />
        <span class="toggle_switch_noLogic"></span>
      </label>
    </div>
  </div>
</template>

<script>
//Need to enter
//Morph Ball
//Charge Beam
import { mapState, mapGetters } from "vuex";
import { pickupIndexFor } from "@/logic/pickupMatch.js";
export default {
  computed: {
    ...mapState("cataris", {
      locations: (state) => state.locations,
    }),
    ...mapGetters("logic", ["inLogicPickups"]),
    locationStates() {
      return this.locations.map((location, i) => {
        const pi = pickupIndexFor("cataris", i);
        const shown = this.inLogicPickups.has(pi);
        return { shown };
      });
    },
  },
  methods: {
    checked() {
      // Location checkboxes are completion markers only — they do NOT change
      // inventory (item placement is randomized). Recompute keeps colors fresh
      // and triggers the persistence snapshot of the checked locations.
      this.$store.dispatch("logic/recompute");
    },
  },
};
</script>

<style>
.cataris {
  background-image: url("../assets/CatarisMap1.jpg");
  width: 1080px;
  height: 499px;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>

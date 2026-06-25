<template>
  <div class="artaria">
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
      <!-- <span v-else>{{ clickLocation() }}</span> -->
    </div>
  </div>
</template>
//TODO lava ice runs
<script>
import { mapState, mapGetters } from "vuex";
import { pickupIndexFor } from "@/logic/pickupMatch.js";
export default {
  computed: {
    ...mapState("artaria", {
      locations: (state) => state.locations,
    }),
    ...mapGetters("logic", ["inLogicPickups"]),
    locationStates() {
      return this.locations.map((location, i) => {
        const pi = pickupIndexFor("artaria", i);
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
.artaria {
  background-image: url("../assets/ArtariaMap1.jpg");
  width: 1080px;
  height: 395px;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>

<template>
  <div class="burenia">
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
          v-on:click="checked(location.checked, location.type, location.amount)"
        />
        <span
          class="toggle_switch"
          v-if="!locationStates[index].softlock"
        ></span>
        <span class="toggle_switch_softlock" v-else></span>
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
          v-on:click="checked(location.checked, location.type, location.amount)"
        />
        <span class="toggle_switch_noLogic"></span>
      </label>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { pickupIndexFor } from "@/logic/pickupMatch.js";
export default {
  computed: {
    ...mapState("burenia", {
      locations: (state) => state.locations,
    }),
    ...mapGetters("logic", [
      "inLogicPickups",
      "energyRisk",
    ]),
    locationStates() {
      return this.locations.map((location, i) => {
        const pi = pickupIndexFor("burenia", i);
        const softlock = this.energyRisk.has(pi);
        const shown = softlock || this.inLogicPickups.has(pi);
        return { shown, softlock };
      });
    },
  },
  methods: {
    addAbility(amount, type) {
      this.$store.dispatch("updateAbility", { amount, type });
    },
    checked(check, type, amount) {
      if (!check) {
        this.addAbility(amount, type);
      } else {
        this.addAbility(-amount, type);
      }
    },
  },
};
</script>

<style>
.burenia {
  background-image: url("../assets/BureniaMap1.jpg");
  width: 809px;
  height: 853px;
  background-repeat: no-repeat;
  background-size: 100%;
  display: inline-block;
}
</style>

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
    ...mapGetters("logic", [
      "useRandovaniaLogic",
      "inLogicPickups",
      "energyRisk",
    ]),
    locationStates() {
      return this.locations.map((location, i) => {
        if (!this.useRandovaniaLogic) {
          // Flag OFF: reproduce today's legacy behavior exactly (no engine involvement)
          return {
            shown: location.inLogic,
            softlock: location.softlock,
          };
        }
        // Flag ON: derive from new engine via pickupIndexFor
        const pi = pickupIndexFor("cataris", i);
        const softlock = this.energyRisk.has(pi);
        const shown = softlock || this.inLogicPickups.has(pi);
        return { shown, softlock };
      });
    },
    parityWarnings() {
      // Dev parity warning (D-04): only when flag is ON.
      // This computed is side-effect-bearing (console.warn) — acceptable per plan.
      if (!this.useRandovaniaLogic) return [];
      const warnings = [];
      this.locations.forEach((location, i) => {
        const pi = pickupIndexFor("cataris", i);
        const newShown = this.energyRisk.has(pi) || this.inLogicPickups.has(pi);
        const oldShown = location.inLogic;
        if (oldShown !== newShown) {
          const msg = `rdv parity: location ${i} (${location.area}): old=${oldShown}, new=${newShown}`;
          console.warn(msg);
          warnings.push(msg);
        }
      });
      return warnings;
    },
  },
  watch: {
    inLogicPickups() {
      // Trigger parityWarnings recompute after each engine recompute
      // eslint-disable-next-line no-unused-expressions
      this.parityWarnings;
    },
  },
  mounted() {
    this.$store.dispatch("cataris/checkLogic");
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
.cataris {
  background-image: url("../assets/CatarisMap1.jpg");
  width: 1080px;
  height: 499px;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>

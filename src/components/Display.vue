<template>
  <div class="hudDisplay">
    <div class="missilesIcon"></div>
    <div class="missiles">{{ missileTotal }}</div>
    <div class="powerBombIcon"></div>
    <div class="powerBomb">{{ powerBombTotal }}</div>
    <div class="energyPartIcon">
      <span class="energyGrid" v-for="ep in energyPart" :key="ep"></span>
    </div>
    <br />
    <br />
    <div class="energy" v-for="energy in energyFull" :key="energy"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Display",
  computed: {
    // Single source of truth: the root-store counters (also read by the logic
    // engine and persisted to localStorage). missiles/powerBomb are collected
    // deltas; the preset's starting ammo is added back for display.
    ...mapState(["missiles", "energyPart", "energyFull", "powerBomb"]),
    ...mapState("logic", {
      settings: (state) => state.settings,
    }),
    missileTotal() {
      const start =
        (this.settings &&
          this.settings.startingItems &&
          this.settings.startingItems.MissileAmmo) ||
        0;
      return start + this.missiles;
    },
    powerBombTotal() {
      const start =
        (this.settings &&
          this.settings.startingItems &&
          this.settings.startingItems.PBAmmo) ||
        0;
      return start + this.powerBomb;
    },
  },
};
</script>
<style>
.hudDisplay {
  position: absolute;
  color: #92a5b8;
}
.missilesIcon {
  background-image: url("../assets/missiles.png");
  height: 30px;
  width: 30px;
  background-size: 100%;
  display: inline-block;
}
.powerBombIcon {
  background-image: url("../assets/powerBomb.png");
  height: 30px;
  width: 30px;
  background-size: 100%;
  display: inline-block;
  margin-right: 5px;
}
.missiles {
  display: inline-block;
  width: 70px;
}
.powerBomb {
  display: inline-block;
  width: 70px;
}
.energy {
  background-image: url("../assets/energyBlock.png");
  display: inline-block;
  height: 40px;
  width: 15px;
  background-size: 100%;
}
.energyPartIcon {
  height: 10px;
  display: inline-grid;
  grid-template-areas: "a a";
  gap: 2px;
  grid-auto-columns: 10px;
  width: 10px;
  grid-auto-rows: 10px;
}
.energyGrid {
  border: 1px solid white;
}
</style>

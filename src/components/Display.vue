<template>
  <div class="hudDisplay">
    <div class="missilesIcon"></div>
    <div class="missiles">{{ minorItems[0].total }}</div>
    <div class="powerBombIcon"></div>
    <div class="powerBomb">{{ minorItems[4].total }}</div>
    <div class="energyPartIcon">
      <span
        class="energyGrid"
        v-for="ep in minorItems[2].total"
        :key="ep"
      ></span>
    </div>
    <br />
    <br />
    <div
      class="energy"
      v-for="energy in minorItems[3].total"
      :key="energy"
    ></div>
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

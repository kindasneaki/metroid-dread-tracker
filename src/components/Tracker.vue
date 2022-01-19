<template>
  <div class="tracker">
    <div class="tracker-grid">
      <div>missiles {{ missiles }}</div>
      <div>energyPart {{ energyPart }}</div>
      <div>energyFull {{ energyFull }}</div>
      <div>powerBomb {{ powerBomb }}</div>
      <!-- <div><button>Charge Beam</button></div>
      <div><button>Morph Ball</button></div>
      <div><button>Varia Suit</button></div>
      <div><button>Bomb</button></div>
      <div><button>Gravity Suit</button></div>
      <div><button>Spider Magnet</button></div>
      <div><button>Grapple Beam</button></div>
      <div><button>Phantom Cloak</button></div>
      <div><button>Diffusion Beam</button></div>
      <div><button>Wide Beam</button></div>
      <div><button>Speed Booster</button></div>
      <div><button>Flash Shift</button></div>
      <div><button>Storm Missiles</button></div>
      <div><button>Super Missiles</button></div>
      <div><button>Pulse Radar</button></div>
      <div><button>Ice Missiles</button></div>
      <div><button>Cross Bomb</button></div>
      <div><button>Spin Boost</button></div>
      <div><button>Wave Beam</button></div>
      <div><button>Plasma Beam</button></div>
      <div><button>Space Jump</button></div> -->
    </div>

    <!-- <button v-on:click="addMissiles(smallMissiles)">missile tank 2</button>
    <button v-on:click="addMissiles(bigMissiles)">missiles tank 10</button> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Tracker",
  props: {
    msg: String,
  },
  computed: {
    ...mapState([
      "missiles",
      "energyPart",
      "energyFull",
      "powerBomb",
      "chargeBeam",
      "morphBall",
      "variaSuit",
      "bomb",
      "gravitySuit",
      "spiderMagnet",
      "grabbleBeam",
      "phantomCloak",
      "diffusionBeam",
      "wideBeam",
      "speedBooster",
      "flashShift",
      "stormMissiles",
      "superMissiles",
      "pulseRadar",
      "iceMissiles",
      "crossBomb",
      "spinBoost",
      "waveBeam",
      "plasmaBeam",
      "spaceJump",
    ]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.tracker {
  height: 200px;
  width: 240px;
  align-items: center;
  z-index: -1;
  margin-top: 1px;
}
.tracker-grid {
  position: absolute;
  height: 100px;
  width: 1080px;
  /* display: flex;
  text-align: left; */
  z-index: -1;
  color: #92a5b8;
}
.tracker-grid > div {
  /* box-sizing: border-box; */
  /* border: 2px solid #8c8c8c; */
  width: 100px;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
}
</style>

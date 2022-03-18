<template>
  <div class="tracker">
    <div class="tracker-grid">
      <div v-for="item in minorItems" :key="item.type" class="active">
        <!-- <span :class="{ active: item.checked }" /> -->
        <label :for="item.type" :class="[item.type, 'icon']"
          ><input
            type="button"
            :id="item.type"
            class="button"
            @contextmenu="rightClick($event, item)"
            v-on:click="minorChecked(item.type, item.amount)"
          />
        </label>
      </div>
      <div
        v-for="item in items"
        :key="item.type"
        :class="item.checked ? 'active' : 'notActive'"
      >
        <!-- <span :class="{ active: item.checked }" /> -->
        <label :for="item.type" :class="[item.type, 'icon']"
          ><input
            type="checkbox"
            :id="item.type"
            v-model="item.checked"
            v-on:click="checked(item.type)"
          />
        </label>
      </div>
      <div>
        <label :for="xDefeated.type" class="xDefeated icon"
          ><input
            type="checkbox"
            :id="xDefeated.type"
            v-model="xDefeated.checked"
            v-on:click="checkX()"
          />
          X
        </label>
      </div>

      <!-- <div>
        <button class="icon" v-on:click="addMissiles(smallMissiles)">
          missile tank 2
        </button>
      </div>
      <div>
        <button class="icon" v-on:click="addMissiles(bigMissiles)">
          missiles tank 10
        </button>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Tracker",
  computed: {
    ...mapState(["missiles", "energyPart", "energyFull", "powerBomb"]),
    ...mapState("items", {
      items: (state) => state.items,
      minorItems: (state) => state.minorItems,
      xDefeated: (state) => state.xDefeated,
    }),
  },
  methods: {
    rightClick(event, item) {
      event.preventDefault();
      let amount = item.amount * -1;
      this.minorChecked(item.type, amount);
    },
    toggleAbility(item, route) {
      const index = item.index;
      const type = item.type;
      this.$store.dispatch("items/updateArea", {
        index,
        route,
      });
      this.$store.dispatch("items/checkProgressive", type);
    },
    toggleLogic(route, type) {
      this.$store.dispatch(route + "/updateArea", type);
    },
    // toggleAbility(logic) {
    // this.$store.dispatch("updateAbility", { logic });
    // },
    checked(name) {
      if (name === "powerBomb") {
        if (!this.items[4].checked) {
          this.toggleMinor(4, 2);
        } else {
          this.toggleMinor(4, -2);
        }
      }
      const route = this.$router.currentRoute.value.name;
      let item = this.items;
      item.find((value, index) => {
        if (value.type === name) {
          item = { type: name, index: index };
          return true;
        }
      });
      this.toggleAbility(item, route);
      // this.toggleLogic(route, item.type);
    },
    minorChecked(type, amount) {
      let item = this.minorItems;
      let i = 0;
      item.find((value, index) => {
        if (value.type === type) {
          i = index;
          return true;
        }
      });
      this.toggleMinor(i, amount);
    },
    checkX() {
      this.$store.dispatch("items/updateX");
      this.$store.dispatch("ghavoran/checkLogic");
    },
    toggleMinor(index, amount) {
      this.$store.dispatch("items/updateMinor", { index, amount });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.tracker {
  /* height: 1080px;
  width: 1080px; */
  align-items: center;
  z-index: 2;
  /* bottom: 1px;
  right: 1px; */
  position: absolute;
  font-size: 11px;
  display: inline-block;
}
.tracker-grid {
  position: absolute;
  height: 400px;
  width: 1080px;
  display: grid;
  text-align: left;
  z-index: -1;
  color: #92a5b8;
  grid-template-columns: [first] 4.6% [line2] 4.55% [line3] 4.6% [col4-start] 4.55% [five] 4.6% [end];
  grid-template-rows: [first] 12.4% [line2] 12.4% [line3] 12.3% [col4-start] 12.4% [line5] 12.4% [end];
}
.tracker-grid > div {
  box-sizing: border-box;
  border: 1px solid #92a5b8;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
}
.icon {
  /* background-image: url("../assets/logo.png"); */
  height: 50px;
  width: 50px;
  background-size: 100%;
}
.active {
  /* border: 1px solid blue; */
  height: 100%;
  width: 100%;
  opacity: 1;
}
.notActive {
  /* border: 1px solid red; */
  height: 100%;
  width: 100%;
  opacity: 0.4;
}
.button {
  background-color: #0b131a00;
  color: white;
  width: 100%;
  height: 100;
  height: 100%;
  border: 0px;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.smallMissiles {
  background-image: url("../assets/missiles.png");
}
.bigMissiles {
  background-image: url("../assets/bigMissiles.png");
}
.energyPart {
  background-image: url("../assets/energyPart.png");
}
.energyFull {
  background-image: url("../assets/energyFull.png");
}
.smallPowerBomb {
  background-image: url("../assets/smallPowerBomb.png");
}
.chargeBeam {
  background-image: url("../assets/chargeBeam.png");
}

.variaSuit {
  background-image: url("../assets/variaSuit.png");
}
.morphBall {
  background-image: url("../assets/morphBall.png");
}
.bomb {
  background-image: url("../assets/bomb.png");
}
.gravitySuit {
  background-image: url("../assets/gravitySuit.png");
}
.spiderMagnet {
  background-image: url("../assets/spiderMagnet.png");
}
.grappleBeam {
  background-image: url("../assets/grappleBeam.png");
}
.phantomCloak {
  background-image: url("../assets/phantomCloak.png");
}
.diffusionBeam {
  background-image: url("../assets/diffusionBeam.png");
}
.wideBeam {
  background-image: url("../assets/wideBeam.png");
}
.speedBooster {
  background-image: url("../assets/speedBooster.png");
}
.flashShift {
  background-image: url("../assets/flashShift.png");
}
.stormMissiles {
  background-image: url("../assets/stormMissiles.png");
}
.superMissiles {
  background-image: url("../assets/superMissiles.png");
}
.pulseRadar {
  background-image: url("../assets/pulseRadar.png");
}
.iceMissiles {
  background-image: url("../assets/iceMissiles.png");
}
.crossBomb {
  background-image: url("../assets/crossBomb.png");
}
.spinBoost {
  background-image: url("../assets/spinBoost.png");
}
.waveBeam {
  background-image: url("../assets/waveBeam.png");
}
.plasmaBeam {
  background-image: url("../assets/plasmaBeam.png");
}
.spaceJump {
  background-image: url("../assets/spaceJump.png");
}
.screwAttack {
  background-image: url("../assets/screwAttack.png");
}
.slide {
  background-image: url("../assets/slide.png");
}
.powerBomb {
  background-image: url("../assets/powerBomb.png");
}
.xDefeated {
  font-size: 20px;
  text-align: center;
}
</style>

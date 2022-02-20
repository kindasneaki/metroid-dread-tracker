<template>
  <div class="tracker">
    <div class="tracker-grid">
      <div v-for="item in items" :key="item.type">
        <label :for="item.type" class="icon"
          ><input
            type="checkbox"
            :id="item.type"
            v-model="item.checked"
            v-on:click="checked(item.type)"
          />{{ item.checked }}
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
    }),
  },
  methods: {
    toggleAbility(index, route) {
      this.$store.dispatch("items/updateArea", {
        index,
        route,
      });
    },
    toggleLogic(route, type) {
      this.$store.dispatch(route + "/updateArea", type);
    },
    // toggleAbility(logic) {
    // this.$store.dispatch("updateAbility", { logic });
    // },
    checked(name) {
      const route = this.$router.currentRoute.value.name;
      let item = this.items;
      item.find((value, index) => {
        if (value.type === name) {
          item = { type: name, index: index };
          return true;
        }
      });
      this.toggleAbility(item.index, route);
      this.toggleLogic(route, item.type);
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
}
.tracker-grid {
  position: absolute;
  height: 400px;
  width: 1080px;
  display: grid;
  text-align: left;
  z-index: -1;
  color: #92a5b8;
  grid-template-columns: [first] 4% [line2] 4% [line3] 4% [col4-start] 4% [five] 4% [end];
  grid-template-rows: [first] 10% [line2] 10% [line3] 10% [col4-start] 10% [end];
}
.tracker-grid > div {
  box-sizing: border-box;
  border: 1px solid #8c8c8c;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon {
  background-image: url("../assets/logo.png");
  height: 25px;
  width: 25px;
}
.test {
  height: 25px;
  width: 25px;
}
</style>

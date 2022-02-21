<template>
  <div class="artaria">
    <div
      v-for="location in locations"
      :key="location.area"
      class="toggle_box"
      :style="[location.top, location.left]"
    >
      <label :for="location.area" v-if="location.inLogic">
        <input
          type="checkbox"
          :id="location.area"
          v-model="location.checked"
          v-on:click="checked(location.checked, location.type, location.amount)"
        />
        <span class="toggle_switch" v-if="!location.softlock"></span>
        <span class="toggle_switch_softlock" v-else></span>
      </label>
      <!-- <span v-else>{{ clickLocation() }}</span> -->
    </div>
  </div>
</template>
//TODO lava ice runs
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("artaria", {
      locations: (state) => state.locations,
      // locations() {
      //   return this.$store["artaria/locations"];
      // },
    }),
  },
  mounted() {
    this.$store.dispatch("artaria/checkLogic");
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
    clickLocation() {
      console.log("test");
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

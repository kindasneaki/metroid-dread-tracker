<template>
  <div class="cataris">
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
      <label :for="location.area" :key="location.inLogic" v-else>
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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("cataris", {
      locations: (state) => state.locations,
      // locations() {
      //   return this.$store["artaria/locations"];
      // },
    }),
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
    clickLocation(event) {
      console.log(event);
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

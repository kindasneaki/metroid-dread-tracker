<template>
  <div class="ghavoran">
    <div
      v-for="location in locations"
      :key="location.area"
      class="toggle_box"
      :style="[location.top, location.left]"
    >
      <label :for="location.area">
        <input
          type="checkbox"
          :id="location.area"
          v-model="location.checked"
          v-on:click="checked(location.checked, location.type, location.amount)"
        />
        <span class="toggle_switch"></span>
      </label>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("ghavoran", {
      locations: (state) => state.locations,
      // locations() {
      //   return this.$store["artaria/locations"];
      // },
    }),
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
.ghavoran {
  background-image: url("../assets/GhavoranMap1.jpg");
  width: 1080px;
  height: 458px;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>

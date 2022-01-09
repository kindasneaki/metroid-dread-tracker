<template>
  <div class="cataris">
    <h1>Cataris</h1>
    <div v-for="location in locations" :key="location.area">
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
  data() {
    return {
      smallMissiles: 2,
      bigMissiles: 10,
      currentState: false,
    };
  },
  computed: {
    ...mapState("cataris", {
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
  },
};
</script>

<style></style>

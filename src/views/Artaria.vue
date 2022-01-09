<template>
  <div class="artaria">
    <h1>Artaria</h1>
    <div v-for="location in locations" :key="location.area">
      <label :for="location.area">
        <input
          type="checkbox"
          :id="location.area"
          v-model="location.checked"
          v-on:click="checked(location.checked)"
        />
        <span class="toggle_switch"></span>
      </label>
    </div>
    <div>{{ missiles }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smallMissiles: 2,
      bigMissiles: 10,
      currentState: false,
    };
  },
  computed: {
    missiles() {
      return this.$store.state.missiles;
    },
    locations() {
      return this.$store.state.artaria.locations;
    },
  },
  methods: {
    addMissiles(amount) {
      this.$store.dispatch("updateMissiles", amount);
    },
    checked(check) {
      if (!check) {
        this.addMissiles(this.smallMissiles);
      } else {
        this.addMissiles(-this.smallMissiles);
      }
    },
  },
};
</script>

<style>
input[type="checkbox"]:checked + .toggle_switch {
  background: #000000;
  color: #fff; /*
background-image: url("checked.png"); */
}
.toggle_switch {
  border: 1px solid #000;
  display: inline-block;
  padding: 3px;
  background: #f00;
  height: 10px;
  width: 10px;
  /*
background: url("unchecked.png") no-repeat left center; */ /* padding-left:
15px; */
}
input[type="checkbox"] {
  display: none;
}
</style>

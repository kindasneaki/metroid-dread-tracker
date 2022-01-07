<template>
  <div class="tracker">
    {{ msg }}
    <!-- <button v-on:click="addMissiles(smallMissiles)">missile tank 2</button>
    <button v-on:click="addMissiles(bigMissiles)">missiles tank 10</button> -->
    <div v-for="location in locations" :key="location.area">
      <label :for="location.area">
        <input type="checkbox" :id="location.area" v-model="checkedValue" />
        <span class="toggle_switch"></span>
      </label>
    </div>
    <div>{{ missiles }}</div>
  </div>
</template>

<script>
export default {
  name: "Tracker",
  props: {
    msg: String,
  },
  data() {
    return {
      smallMissiles: 2,
      bigMissiles: 10,
      currentState: false,
      locations: [
        {
          area: "left",
          checked: false,
        },
        {
          area: "right",
          checked: false,
        },
        {
          area: "top",
          checked: false,
        },
        {
          area: "bottom",
          checked: false,
        },
      ],
    };
  },
  computed: {
    missiles() {
      return this.$store.state.missiles;
    },
    isActive() {
      return this.currentState;
    },
    checkedValue: {
      get() {
        return false;
      },
      set(newValue) {
        if (newValue) {
          this.addMissiles(this.smallMissiles);
        } else {
          this.addMissiles(-this.smallMissiles);
        }

        this.currentState = newValue;
      },
    },
  },
  methods: {
    addMissiles(amount) {
      this.$store.dispatch("updateMissiles", amount);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

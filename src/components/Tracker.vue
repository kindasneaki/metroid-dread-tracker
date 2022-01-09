<template>
  <div class="tracker">
    {{ msg }}
    <div>missiles {{ missiles }}</div>
    <div>energyPart {{ energyPart }} energyFull {{ energyFull }}</div>
    <div>powerBomb {{ powerBomb }}</div>

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
    ...mapState(["missiles", "energyPart", "energyFull", "powerBomb"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

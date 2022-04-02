<template>
  <Display />
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/artaria">Artaria</router-link> |
    <router-link to="/cataris">Cataris</router-link> |
    <router-link to="/dairon">Dairon</router-link> |
    <router-link to="/burenia">Burenia</router-link> |
    <router-link to="/ferenia">Ferenia</router-link> |
    <router-link to="/ghavoran">Ghavoran</router-link> |
    <router-link to="/elun">Elun</router-link> |
    <router-link to="/hanubia">Hanubia</router-link>
  </div>
  <router-view />
  <Tracker />
</template>
<script>
import Tracker from "@/components/Tracker.vue";
import Display from "@/components/Display.vue";
export default { name: "Home", components: { Tracker, Display } };
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 50px;
  text-align: center;
  position: relative;
}

#nav a {
  font-weight: bold;
  color: #92a5b8;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
input[type="checkbox"]:checked + .toggle_switch {
  background: #1deb38;
  color: #fff; /* background-image: url("checked.png"); */
}
input[type="checkbox"]:checked + .toggle_switch_softlock {
  background: #1deb38;
  color: #fff; /* background-image: url("checked.png"); */
}
input[type="checkbox"]:checked + .toggle_switch_noLogic {
  background: #1deb38;
  color: #fff; /* background-image: url("checked.png"); */
}
.toggle_switch {
  border: 1px solid #000;
  display: inline-block;
  padding: 3px;
  background: #f00;
  height: 10px;
  width: 10px; /* background: url("unchecked.png") no-repeat left center; */ /*
padding-left: 15px; */
}
.toggle_switch_softlock {
  border: 1px solid #000;
  display: inline-block;
  padding: 3px;
  background: yellow;
  height: 10px;
  width: 10px;
}
.toggle_switch_noLogic {
  border: 1px solid #000;
  display: inline-block;
  padding: 3px;
  background: #4a7491;
  height: 10px;
  width: 10px;
}
input[type="checkbox"] {
  display: none;
}
body {
  background-color: #0b131a;
}
</style>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/artaria">Artaria</router-link> |
    <router-link to="/cataris">Cataris</router-link>
  </div>
  <Tracker />
  <router-view />
</template>
<script>
import Tracker from "@/components/Tracker.vue";
export default { name: "Home", components: { Tracker } };
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
input[type="checkbox"]:checked + .toggle_switch {
  background: #000000;
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
input[type="checkbox"] {
  display: none;
}
</style>

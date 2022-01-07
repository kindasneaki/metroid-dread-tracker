<template>
  <div class="home">
    <Tracker msg="Welcome to Your Metroid Dread Tracker" />
  </div>
</template>

<script>
// @ is an alias to /src
import Tracker from "@/components/Tracker.vue";

export default {
  name: "Home",
  components: {
    Tracker,
  },
};
</script>

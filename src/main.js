import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createMetaManager } from "vue-meta";

// MIG-01: Read ?rdv=1 once at app bootstrap.
// Strict === "1" check per T-02-03 (no eval, no injection surface — just flips a boolean).
// Guard window access so the bundle does not crash in non-browser (SSR/node) contexts.
if (typeof window !== "undefined") {
  const rdv = new URLSearchParams(window.location.search).get("rdv");
  if (rdv === "1") {
    store.dispatch("logic/setFlag", true);
  }
}

createApp(App).use(store).use(router).use(createMetaManager()).mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createMetaManager } from "vue-meta";
import { deserializeState, STORAGE_KEY } from "./store/persistence";

// Pre-mount bootstrap: restore persisted settings + progress before mount.

if (typeof window !== "undefined") {
  // PER-01/PER-02: Restore persisted settings + progress before mount.
  // deserializeState returns null for corrupt/missing/version-mismatched blobs (graceful).
  // If null, the app boots with defaults — no crash, no user-visible error.
  let blob = null;
  try {
    blob = deserializeState(localStorage.getItem(STORAGE_KEY));
  } catch {
    // localStorage access denied or other error — boot with defaults
  }
  if (blob !== null) {
    store.dispatch("restoreState", blob);
  }
}

createApp(App).use(store).use(router).use(createMetaManager()).mount("#app");

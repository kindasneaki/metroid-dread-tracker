import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createMetaManager } from "vue-meta";
import { deserializeState, STORAGE_KEY } from "./store/persistence";

// ── Pre-mount bootstrap ───────────────────────────────────────────────────────
// Order: (1) ?rdv=1 flag, (2) localStorage restore, then (3) mount.
// Restore MUST happen before mount so settings survive the onMounted model load
// (SET_MODEL reads state.settings and will not clobber it — BLOCKER fix in logic.js).

if (typeof window !== "undefined") {
  // MIG-01: Read ?rdv=1 once at app bootstrap.
  // Strict === "1" check per T-02-03 (no eval, no injection surface — just flips a boolean).
  const rdv = new URLSearchParams(window.location.search).get("rdv");
  if (rdv === "1") {
    store.dispatch("logic/setFlag", true);
  }

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

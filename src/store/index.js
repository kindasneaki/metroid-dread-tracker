import { createStore } from "vuex";
import artaria from "./modules/artaria";
import cataris from "./modules/cataris";
import dairon from "./modules/dairon";
import burenia from "./modules/burenia";
import ferenia from "./modules/ferenia";
import ghavoran from "./modules/ghavoran";
import elun from "./modules/elun";
import hanubia from "./modules/hanubia";
import items from "./modules/items";
import logic from "./modules/logic";
import { serializeState, STORAGE_KEY } from "./persistence";

// ── Region module name list (must match createStore modules keys below) ────────
const REGION_NAMES = [
  "artaria",
  "cataris",
  "dairon",
  "burenia",
  "ferenia",
  "ghavoran",
  "elun",
  "hanubia",
];

// ── Debounce helper (trailing-edge, no external deps) ─────────────────────────
function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, wait);
  };
}

// ── Persistence plugin ────────────────────────────────────────────────────────
/**
 * Vuex plugin that snapshots {settings, progress} to localStorage on every
 * mutation, debounced at 300 ms (trailing) so rapid toggles coalesce.
 *
 * Snapshots from LIVE store.state (not the mutation payload) because the
 * v-model checkboxes mutate in place BEFORE any co-occurring named commit fires
 * the subscriber. The named commit (UPDATE_AREA, SET_ABILITY, etc.) is what
 * makes subscribe() fire — the live state already reflects the user change.
 *
 * All localStorage access is guarded by typeof window / typeof localStorage
 * so node/SSR imports do not throw (T-03-04).
 */
function persistencePlugin(store) {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return;
  }

  const persist = debounce(() => {
    const s = store.state;
    const regions = {};
    for (const name of REGION_NAMES) {
      const locs = s[name] && s[name].locations;
      if (Array.isArray(locs)) {
        regions[name] = locs.reduce((acc, loc, idx) => {
          if (loc.checked) acc.push(idx);
          return acc;
        }, []);
      } else {
        regions[name] = [];
      }
    }
    const snapshot = {
      settings: s.logic && s.logic.settings,
      items: s.items && s.items.items,
      xDefeated: s.items && s.items.xDefeated,
      counters: {
        missiles: s.missiles || 0,
        energyPart: s.energyPart || 0,
        energyFull: s.energyFull || 0,
        powerBomb: s.powerBomb || 0,
      },
      regions,
    };
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(serializeState(snapshot)),
      );
    } catch {
      // Storage full or access denied — ignore silently (T-03-04)
    }
  }, 300);

  store.subscribe(() => persist());
}

export default createStore({
  state: {
    missiles: 0,
    energyPart: 0,
    energyFull: 0,
    powerBomb: 0,
  },
  mutations: {
    SET_ABILITY(state, { amount, type }) {
      state[type] += amount;
    },
    /**
     * Absolute-set a root counter to a specific value (used by resetProgress
     * and restoreState to avoid signed-offset arithmetic).
     */
    SET_COUNTER(state, { type, value }) {
      state[type] = Number(value) || 0;
    },
    ROTATE_ENERGY(state) {
      state.energyPart = 0;
    },
    FIX_ENERGY(state) {
      state.energyPart += 4;
      state.energyFull -= 1;
    },
  },
  actions: {
    /**
     * Hydrate the store from a deserialized persistence blob (PER-01).
     * Called from main.js BEFORE mount when a valid blob is found in localStorage.
     * Uses ABSOLUTE-SET mutations — does NOT toggle; idempotent.
     *
     * @param {object} blob - { settings, checkedItems, xDefeated, counters, regions }
     *                        as returned by deserializeState
     */
    restoreState({ commit, dispatch }, blob) {
      if (!blob) return;

      // Restore settings into logic module (SET_SETTINGS preserves restored values
      // against the subsequent SET_MODEL call — BLOCKER fix in Task 1)
      if (blob.settings && typeof blob.settings === "object") {
        commit("logic/SET_SETTINGS", blob.settings, { root: true });
      }

      // Restore items + xDefeated (absolute-set, not toggle)
      commit(
        "items/HYDRATE_ITEMS",
        {
          checkedItems: blob.checkedItems || {},
          xDefeated: blob.xDefeated === true,
        },
        { root: true },
      );

      // Restore root counters (absolute-set, not additive)
      const c = blob.counters || {};
      for (const type of [
        "missiles",
        "energyPart",
        "energyFull",
        "powerBomb",
      ]) {
        commit("SET_COUNTER", { type, value: Number(c[type]) || 0 });
      }

      // Restore per-region checked location indices (absolute-set, not toggle)
      const regions = blob.regions || {};
      for (const name of REGION_NAMES) {
        const indices = Array.isArray(regions[name]) ? regions[name] : [];
        commit(`${name}/SET_LOCATIONS`, indices, { root: true });
      }

      // Re-run BFS once with restored state so inLogicPickups reflect restored items
      dispatch("logic/recompute", null, { root: true });
    },

    /**
     * Reset all progress (checked items, locations, counters) and clear the
     * persisted blob from localStorage. RETAINS settings (user config is separate
     * from progress — the SettingsPanel button is labelled "Reset progress").
     */
    resetProgress({ commit, dispatch }) {
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // Access denied — ignore
        }
      }

      // Reset item checked + logic flags
      commit("items/RESET_ITEMS", null, { root: true });

      // Reset root counters to zero
      for (const type of [
        "missiles",
        "energyPart",
        "energyFull",
        "powerBomb",
      ]) {
        // SET_ABILITY adds — reset by setting to 0 directly via override
        commit("SET_COUNTER", { type, value: 0 });
      }

      // Reset all region location checkboxes
      for (const name of REGION_NAMES) {
        commit(`${name}/RESET_LOCATIONS`, null, { root: true });
      }

      // Re-run BFS so inLogicPickups reflect cleared state
      dispatch("logic/recompute", null, { root: true });
    },

    // MIG-02: add dispatch + rootGetters to context so we can fire the flag-guarded
    // logic/recompute when a map pickup (missile/energy/power-bomb/major) is collected.
    // This is the chokepoint for minor-ammo collection (Artaria.vue → addAbility →
    // dispatch("updateAbility")), which mutates the root counters the engine reads.
    // All existing SET_ABILITY/ROTATE_ENERGY/FIX_ENERGY behaviour is untouched.
    updateAbility({ commit, dispatch, rootGetters }, { amount, type }) {
      if (type === "energyPart") {
        let result = (this.state.energyPart + amount) / 4;
        if (result === 1) {
          type = "energyFull";
          commit("ROTATE_ENERGY");
        } else if (result < 0) {
          commit("FIX_ENERGY");
        }
      }
      commit("SET_ABILITY", { amount, type });
      // MIG-02: after counter mutation, trigger the new engine when the flag is ON.
      // When OFF, this branch is skipped — byte-for-byte identical to legacy behaviour.
      if (rootGetters["logic/useRandovaniaLogic"]) {
        dispatch("logic/recompute", null, { root: true });
      }
    },
  },
  modules: {
    artaria,
    cataris,
    dairon,
    burenia,
    ferenia,
    ghavoran,
    elun,
    hanubia,
    items,
    logic,
  },
  getters: {},
  plugins: [persistencePlugin],
});

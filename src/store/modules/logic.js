/**
 * src/store/modules/logic.js
 *
 * Namespaced Vuex module owning the async Randovania logic-database load lifecycle
 * and the single global recompute action.
 *
 * State:
 *   ready          — true once createGameModel succeeds (load gate)
 *   error          — string if the load or schema guard fails (fail loudly, T-01-07)
 *   gameModel      — frozen GameModel from createGameModel (DAT-04)
 *   inLogicPickups — Set<number> of pickup_index values reachable with current state (ENG-07)
 *   energyRisk     — Set<number> pickup_index values reachable only via risky damage path (D-06)
 *   settings       — starter-preset settings (D-04; Phase 3 will replace from UI/localStorage)
 *
 * Actions:
 *   load      — fetch public/logic/*.json in parallel via process.env.BASE_URL (Pitfall 4),
 *               assert schema (DAT-03), build + cache frozen GameModel (DAT-04).
 *   recompute — no-op until ready; reads rootGetters['items/inLogic'] + rootState minor
 *               counters to build ResourceState (D-06), runs the engine, stores result.
 *
 * D-05 NON-BREAKING: this module does NOT import Tracker.vue, does NOT dispatch
 * items/updateArea, and does NOT modify any region view. The existing hand-authored
 * engine continues to drive the UI. Phase 2 will wire the UI behind a flag.
 */

import {
  createGameModel,
  assertSchema,
  recompute as engineRecompute,
} from "@/logic/index.js";
import { defaultSettings } from "@/logic/Settings.js";
import { buildResourceState } from "@/logic/ResourceState.js";

// ── Vendored file list (matches public/logic/ from Plan 01) ──────────────────

const LOGIC_FILES = [
  "header",
  "Artaria",
  "Cataris",
  "Dairon",
  "Burenia",
  "Ferenia",
  "Ghavoran",
  "Elun",
  "Hanubia",
  "Itorash",
];

/**
 * Fetch all 10 logic JSON files in parallel.
 * Uses process.env.BASE_URL so production under /metroid-dread-tracker/ resolves (Pitfall 4).
 *
 * @returns {Promise<{ header: object, regions: object }>}
 */
async function fetchLogicDb() {
  const base = process.env.BASE_URL || "/";
  const fetches = LOGIC_FILES.map((name) =>
    fetch(`${base}logic/${name}.json`).then((r) => {
      if (!r.ok) {
        throw new Error(
          `Failed to fetch ${name}.json: HTTP ${r.status} ${r.statusText}`,
        );
      }
      return r.json();
    }),
  );
  const parts = await Promise.all(fetches);
  const header = parts[0];
  const regions = {};
  for (let i = 1; i < LOGIC_FILES.length; i++) {
    regions[LOGIC_FILES[i]] = parts[i];
  }
  return { header, regions };
}

// ── Module ────────────────────────────────────────────────────────────────────

export default {
  namespaced: true,

  state: () => ({
    gameModel: null,
    ready: false,
    error: null,
    inLogicPickups: new Set(),
    energyRisk: new Set(),
    // settings is initialised with a placeholder; SET_MODEL replaces it with the
    // real header-derived defaults once the database loads.
    settings: null,
    // MIG-01: feature flag — default OFF. Flipped via ?rdv=1 at bootstrap (main.js).
    // When ON, the new Randovania engine drives Artaria reachability (Plan 03 wires the view).
    useRandovaniaLogic: false,
  }),

  mutations: {
    /**
     * Store the frozen GameModel and derive the starter-preset settings from the
     * loaded header. Sets ready = true (the load gate).
     */
    SET_MODEL(state, { model, header }) {
      state.gameModel = model;
      state.settings = defaultSettings(header);
      state.ready = true;
      state.error = null;
    },

    /**
     * Record a load failure. Fails loudly so problems are visible (T-01-07).
     */
    SET_ERROR(state, message) {
      state.error = message;
      state.ready = false;
    },

    /**
     * Store the result of a recompute pass.
     */
    SET_RESULT(state, { inLogicPickups, energyRisk }) {
      state.inLogicPickups = inLogicPickups;
      state.energyRisk = energyRisk;
    },

    /**
     * MIG-01: Flip the useRandovaniaLogic feature flag.
     * Accepts any truthy/falsy value; coerces to boolean.
     */
    SET_FLAG(state, value) {
      state.useRandovaniaLogic = Boolean(value);
    },
  },

  actions: {
    /**
     * MIG-01: Set the useRandovaniaLogic flag. Commits SET_FLAG to coerce to boolean.
     * If turning ON and the model is already ready, immediately recomputes so the first
     * paint reflects the new engine without requiring an ability toggle.
     *
     * @param {boolean} value - true to enable the new Randovania engine
     */
    setFlag({ commit, state, dispatch }, value) {
      commit("SET_FLAG", value);
      if (value && state.ready) {
        dispatch("recompute");
      }
    },

    /**
     * Async load action — fetch public/logic/*.json in parallel, assert schema,
     * build and cache the frozen GameModel. Called once at app init (App.vue).
     *
     * Fails loudly: any fetch/parse/schema/build error is committed as SET_ERROR
     * so the app can surface the problem (T-01-07, D-02).
     *
     * D-03: After a successful load, dispatch recompute once so the initial paint
     * reflects the new engine immediately (the ready gate inside recompute is now
     * satisfied). Non-breaking: recompute is a no-op when flag is OFF.
     */
    async load({ commit, dispatch }) {
      try {
        const db = await fetchLogicDb();
        // DAT-03: throws on schema drift — fail loudly before touching any other db field
        assertSchema(db.header.schema_version);
        const model = createGameModel(db);
        commit("SET_MODEL", { model, header: db.header });
        // D-03: initial recompute after the model is ready (no-op when flag OFF because
        // the engine will return empty sets; Plan 03 wires the view to read them only when ON).
        dispatch("recompute");
      } catch (e) {
        commit("SET_ERROR", String(e));
      }
    },

    /**
     * Recompute in-logic pickup set from current tracker state.
     *
     * Load gate: returns immediately if the GameModel is not yet ready (D-02).
     * Non-breaking: reads from items module + root store only; does NOT dispatch
     * to items/updateArea, Tracker.vue, or region views (D-05).
     *
     * Sources:
     *   obtained abilities — rootGetters['items/inLogic'] (array of {type, logic})
     *   missiles           — rootState.missiles        → MissileAmmo + MissileLauncher
     *   energyPart         — rootState.energyPart      → EFragment
     *   energyFull         — rootState.energyFull      → ETank
     *   powerBomb (ammo)   — rootState.powerBomb       → PBAmmo
     */
    recompute({ state, commit, rootGetters, rootState }) {
      // Load gate (D-02): no-op until the GameModel is cached and ready
      if (!state.ready) return;

      // Build the obtained-ability map from items module's inLogic getter.
      // rootGetters['items/inLogic'] returns state.items — an array of
      // { type: string, checked: boolean, logic: boolean } objects.
      const itemsArray = rootGetters["items/inLogic"] || [];
      const obtained = {};
      for (const item of itemsArray) {
        if (item.logic) {
          obtained[item.type] = true;
        }
      }

      // Root-store minor counters (src/store/index.js state)
      const counters = {
        missiles: rootState.missiles || 0,
        energyPart: rootState.energyPart || 0,
        energyFull: rootState.energyFull || 0,
        powerBomb: rootState.powerBomb || 0,
      };

      const resourceState = buildResourceState(
        obtained,
        counters,
        state.settings,
        state.gameModel.rdb,
      );

      const result = engineRecompute(
        state.gameModel,
        resourceState,
        state.settings,
      );

      commit("SET_RESULT", result);
    },
  },

  getters: {
    /** True once the GameModel has loaded successfully. */
    ready: (state) => state.ready,

    /** The load error string, or null. */
    error: (state) => state.error,

    /** Set<number> of in-logic pickup indices (empty until first recompute). */
    inLogicPickups: (state) => state.inLogicPickups,

    /** Set<number> of pickup indices reachable only via a risky damage path. */
    energyRisk: (state) => state.energyRisk,

    /**
     * MIG-01: Whether the Randovania engine drives Artaria reachability.
     * Default false (OFF). Flipped to true via ?rdv=1 at app bootstrap.
     */
    useRandovaniaLogic: (state) => state.useRandovaniaLogic,
  },
};

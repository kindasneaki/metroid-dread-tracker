/**
 * src/logic/index.js
 *
 * Public engine API and shared-code seam for the Randovania reachability engine.
 *
 * IMPORTANT: This file MUST have ZERO Node built-in imports (no fs, no path) and
 * ZERO Vue/Vuex imports. The same module runs in:
 *   - The browser bundle (db fed via fetch → JSON)
 *   - Node assertion scripts (db fed via fs.readFileSync → JSON.parse)
 *
 * Contract (Plan 01 stubs; Plan 02 implements engine internals):
 *   createGameModel(db)                  → frozen GameModel object
 *   recompute(model, resourceState, settings)  → { inLogicPickups: Set, energyRisk: Set }
 *   assertSchema(loaded)                 → throws on schema drift
 *   EXPECTED_SCHEMA_VERSION              → 33 (DAT-03)
 *
 * Plan 02 will import helper modules (templates, Requirement, GameModel, Reachability,
 * energy, ResourceState, Settings, itemMap) here. Leave the seam comment below as the
 * insertion point.
 */

// ── DAT-03: Schema version guard ─────────────────────────────────────────────

/** Pinned Randovania logic-database schema version. Update only via refresh-logic-db.mjs. */
export const EXPECTED_SCHEMA_VERSION = 33;

/**
 * Assert that the loaded schema_version matches the pinned constant.
 * Throws a descriptive Error on any drift so the app fails loudly rather than
 * silently mis-evaluating reachability with a stale/incompatible database.
 *
 * @param {number} loaded - schema_version read from public/logic/header.json
 * @throws {Error} if loaded !== EXPECTED_SCHEMA_VERSION
 */
export function assertSchema(loaded) {
  if (loaded !== EXPECTED_SCHEMA_VERSION) {
    throw new Error(
      `Randovania logic schema drift: vendored=${loaded}, expected=${EXPECTED_SCHEMA_VERSION}. ` +
        `Re-run scripts/refresh-logic-db.mjs and review src/logic for breaking changes.`,
    );
  }
}

// ── ENGINE SEAM (Plan 02 inserts imports here) ────────────────────────────────
//
// import { buildGameModel } from "./GameModel.js";
// import { runReach }       from "./Reachability.js";
// import { makeExpander }   from "./templates.js";
// import { evaluate }       from "./Requirement.js";
// import { buildResourceState } from "./ResourceState.js";
// import { defaultSettings } from "./Settings.js";
// import { ABILITY_TO_RDV }  from "./itemMap.js";
// import { maxEnergy }       from "./energy.js";

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Build an immutable GameModel from the vendored logic database.
 *
 * In Plan 01 this is a schema-guarded stub that returns a frozen sentinel object.
 * Plan 02 replaces the body with the real graph-build (buildGraph, template expansion,
 * dock-override handling) while keeping this signature and the freeze guarantee.
 *
 * @param {{ header: object, regions: object }} db - parsed Randovania JSON
 * @returns {Readonly<object>} frozen GameModel (immutable; DAT-04)
 */
export function createGameModel(db) {
  // DAT-03: fail loudly on schema drift before touching any other db field
  assertSchema(db.header.schema_version);

  // Plan 02 inserts the real engine build here (templates expansion, graph construction,
  // dock-override resolution, pickup indexing). For now return a frozen sentinel so
  // the schemaGuard and immutable validation cases pass in Wave 0.
  return Object.freeze({
    // Sentinel fields — Plan 02 replaces these with the real graph and indices.
    _stub: true,
    pickupCount: 0,
    nodes: {},
    adj: {},
    start: null,
    rdb: db.header.resource_database,
  });
}

/**
 * Run the reachability computation and return the set of in-logic pickup indices
 * plus the set of pickups reachable only via risky damage paths.
 *
 * In Plan 01 this is a shaped stub returning empty sets. Plan 02 replaces the body
 * with the fixpoint BFS (Reachability.js) and energy-risk collection (ENG-06/D-06).
 *
 * @param {Readonly<object>} model         - frozen GameModel from createGameModel
 * @param {{ items: object, events: Set, maxEnergy: number }} resourceState
 * @param {{ trickLevels: object, misc: object }} settings
 * @returns {{ inLogicPickups: Set<number>, energyRisk: Set<number> }}
 */
// eslint-disable-next-line no-unused-vars
export function recompute(model, resourceState, settings) {
  // Plan 02 inserts the real fixpoint BFS + energy-risk collection here.
  return {
    inLogicPickups: new Set(),
    energyRisk: new Set(),
  };
}

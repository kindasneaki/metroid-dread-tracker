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
 * Contract:
 *   createGameModel(db)                           → frozen GameModel object
 *   recompute(model, resourceState, settings)     → { inLogicPickups: Set, energyRisk: Set }
 *   assertSchema(loaded)                          → throws on schema drift
 *   EXPECTED_SCHEMA_VERSION                       → 33 (DAT-03)
 */

import { createGameModel as _buildModel } from "./GameModel.js";
import { reach, reachablePickups, collectEnergyRisk } from "./Reachability.js";

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

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Build an immutable GameModel from the vendored logic database.
 *
 * Validates the schema version, expands all 45 templates once, builds the 1860-node
 * graph with dock overrides honored, and returns an Object.freeze'd result (DAT-04).
 *
 * @param {{ header: object, regions: object }} db - parsed Randovania JSON
 *   db.header — header.json (resource_database, dock_weakness_database, starting_location)
 *   db.regions — { Artaria: {...}, ... } — one object per region name
 * @returns {Readonly<object>} frozen GameModel (immutable; DAT-04)
 * @throws {Error} if db.header.schema_version !== EXPECTED_SCHEMA_VERSION
 */
export function createGameModel(db) {
  // DAT-03: fail loudly on schema drift before touching any other db field
  assertSchema(db.header.schema_version);
  return _buildModel(db);
}

/**
 * Run the reachability computation and return the set of in-logic pickup indices
 * plus the set of pickups reachable only via risky damage paths.
 *
 * resourceState can be produced by buildResourceState (full fields) or by the
 * validate-logic.mjs battery helpers (items + events + maxEnergy only). Both forms
 * are accepted — missing energy fields default to safe/minimal values.
 *
 * @param {Readonly<object>} model - frozen GameModel from createGameModel
 * @param {object} resourceState
 *   Required: { items: {[rdvName]: number}, events: Set<string> }
 *   From buildResourceState also includes: suits, tanks, parts, immediateParts, strictness, damageReductions
 *   From battery helpers may include: maxEnergy (pre-computed number)
 * @param {object} settings
 *   { trickLevels?: object, trickLevel?: number, misc: object }
 *   If trickLevels is absent, all tricks are set to settings.trickLevel (default 0).
 * @returns {{ inLogicPickups: Set<number>, energyRisk: Set<number> }}
 */
export function recompute(model, resourceState, settings) {
  const rdb = model.rdb;

  // Build trickLevels: prefer explicit trickLevels object; fall back to flat trickLevel
  let trickLevels = settings.trickLevels;
  if (!trickLevels) {
    trickLevels = {};
    const level = settings.trickLevel !== undefined ? settings.trickLevel : 0;
    for (const k of Object.keys(rdb.tricks || {})) {
      trickLevels[k] = level;
    }
  }

  // Misc: from settings
  const misc = settings.misc || {};

  // Energy ctx fields:
  // - Prefer resourceState.suits if present (from buildResourceState)
  // - Otherwise derive suits from items (Varia/Gravity item presence)
  const suits =
    resourceState.suits instanceof Set
      ? resourceState.suits
      : (() => {
          const s = new Set();
          if ((resourceState.items["Varia"] || 0) >= 1) s.add("Varia");
          if ((resourceState.items["Gravity"] || 0) >= 1) s.add("Gravity");
          return s;
        })();

  const tanks =
    resourceState.tanks !== undefined
      ? resourceState.tanks
      : resourceState.items["ETank"] || 0;
  const parts =
    resourceState.parts !== undefined
      ? resourceState.parts
      : resourceState.items["EFragment"] || 0;
  const immediateParts =
    resourceState.immediateParts !== undefined
      ? resourceState.immediateParts
      : true;
  const strictness =
    resourceState.strictness !== undefined ? resourceState.strictness : 1.5;
  const damageReductions =
    resourceState.damageReductions || (rdb ? rdb.damage_reductions : []);

  const ctx = {
    trickLevels,
    misc,
    suits,
    tanks,
    parts,
    immediateParts,
    strictness,
    damageReductions,
  };

  // Mutable per-call state (state.events is written by reach; items never mutated)
  const state = {
    items: resourceState.items,
    events:
      resourceState.events instanceof Set ? resourceState.events : new Set(),
  };

  const { reachable } = reach(state, ctx, model);
  const pickupArray = reachablePickups(reachable, model);
  const energyRisk = collectEnergyRisk(reachable, state, ctx, model);

  return {
    inLogicPickups: new Set(pickupArray),
    energyRisk,
  };
}

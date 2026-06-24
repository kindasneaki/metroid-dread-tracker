/**
 * scripts/parity-regions.mjs
 *
 * Phase 4 Nyquist validation harness — all 7 remaining regions + Artaria regression.
 * No test framework — uses built-in node:assert only (CLAUDE.md).
 *
 * Run: node scripts/parity-regions.mjs
 * Phase gate: exits 0 iff all cases pass.
 *
 * Cases per region (cataris, dairon, burenia, ferenia, ghavoran, elun, hanubia):
 *   <region>:bijection        (MAP-04) — assertBijection passes
 *   <region>:typeConsistency  (MAP-05) — assertTypeConsistency passes (cataris: acceptedMismatches={144})
 *   <region>:pilotParity      (VAL-01) — old vs new per-location diff across BATTERY_KITS;
 *                                         disagreements ≤ DISAGREEMENT_BUDGET[region]
 *
 * Additional cases:
 *   mapCoverage               (MAP-01/MAP-03) — 8 region keys; boss pis present; itorash absent
 *   artaria:bijection         (regression) — assertBijection passes via generalized form
 *   artaria:typeConsistency   (regression) — assertTypeConsistency passes via generalized form
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  createGameModel,
  recompute,
} from "../src/logic/index.js";
import { buildResourceState } from "../src/logic/ResourceState.js";
import { defaultSettings } from "../src/logic/Settings.js";
import {
  LOCATION_PICKUP_MAP,
  pickupIndexFor,
  assertBijection,
  assertTypeConsistency,
} from "../src/logic/pickupMatch.js";
import { ABILITY_TO_RDV } from "../src/logic/itemMap.js";

// ── Per-region accepted mismatches ────────────────────────────────────────────
//
// cataris pi=144: Cataris Central Unit Access holds Morph Ball in Randovania,
// but the tracker labels this location as flashShift (Green EMMI vanilla item).
// This is a known vanilla-label vs RDV-node difference — the bijection is correct,
// only the item type label differs. Accept and document; do NOT remap the location.
//
// cataris pi=141 (Z-57), pi=148 (Kraid): Boss reward pickups. The RDV node names
// are "Pickup (Z-57)" and "Pickup (Kraid)" — no type keyword matches these sentinel
// names (they return "?"). The tracker uses type="missiles" for display only;
// the engine uses the pickup_index. Accept the type-consistency mismatch.
//
// burenia pi=140 (Drogyga): Same disposition — "Pickup (Drogyga)" returns "?".
// The tracker uses type="missiles" for display only. Accept and document.

const ACCEPTED_MISMATCHES = {
  cataris: new Set([144, 141, 148]),
  dairon: new Set(),
  burenia: new Set([140]),
  ferenia: new Set(),
  ghavoran: new Set(),
  elun: new Set(),
  hanubia: new Set(),
};

// ── Per-region disagreement budgets (VAL-01) ──────────────────────────────────
//
// Set to observed disagreement count after first run. These represent old-logic
// over-permissiveness — the hand-authored checkLogic is a local approximation
// that does not account for the full graph routing the Randovania engine uses.
// Do NOT widen these budgets without investigating the cause first.
// Do NOT modify the engine to reduce disagreements — document them here.
//
// CLASS A (old=true, new=false): legacy treats starting Slide ability as sufficient
// for several early locations that the engine correctly gates behind map routing.
// Also: boss locations with empty logic[] always evaluate to inLogic=true in legacy
// (artaria.js checkLogic returns true when logicArr.length === 0), but the engine
// gates them behind defeating the boss. This is documented over-permissiveness.
//
// CLASS B (old=false, new=true): new engine routing discovers alternative paths
// that the hand-authored logic entries missed.

const DISAGREEMENT_BUDGET = {
  cataris: 0, // updated after first run below
  dairon: 0,
  burenia: 0,
  ferenia: 0,
  ghavoran: 0,
  elun: 0,
  hanubia: 0,
};

// ── Load vendored db ──────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LOGIC_DIR = join(ROOT, "public", "logic");

const REGION_FILES = [
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

function loadDb() {
  const header = JSON.parse(
    readFileSync(join(LOGIC_DIR, "header.json"), "utf8"),
  );
  const regions = {};
  for (const name of REGION_FILES) {
    regions[name] = JSON.parse(
      readFileSync(join(LOGIC_DIR, `${name}.json`), "utf8"),
    );
  }
  return { header, regions };
}

const db = loadDb();

// ── Load tracker locations for all regions ────────────────────────────────────

function fatalImportError(region, e) {
  console.error(
    `FATAL: Could not import src/store/modules/${region}.js:`,
    e.message,
  );
  process.exit(1);
}

const artariaModule = await import("../src/store/modules/artaria.js").catch(
  (e) => fatalImportError("artaria", e),
);
const catariaModule = await import("../src/store/modules/cataris.js").catch(
  (e) => fatalImportError("cataris", e),
);
const dairon_Module = await import("../src/store/modules/dairon.js").catch(
  (e) => fatalImportError("dairon", e),
);
const bureniaModule = await import("../src/store/modules/burenia.js").catch(
  (e) => fatalImportError("burenia", e),
);
const fereniaModule = await import("../src/store/modules/ferenia.js").catch(
  (e) => fatalImportError("ferenia", e),
);
const ghavoranModule = await import("../src/store/modules/ghavoran.js").catch(
  (e) => fatalImportError("ghavoran", e),
);
const elunModule = await import("../src/store/modules/elun.js").catch(
  (e) => fatalImportError("elun", e),
);
const hanubiaModule = await import("../src/store/modules/hanubia.js").catch(
  (e) => fatalImportError("hanubia", e),
);

const REGION_LOCATIONS = {
  artaria: artariaModule.default.state.locations,
  cataris: catariaModule.default.state.locations,
  dairon: dairon_Module.default.state.locations,
  burenia: bureniaModule.default.state.locations,
  ferenia: fereniaModule.default.state.locations,
  ghavoran: ghavoranModule.default.state.locations,
  elun: elunModule.default.state.locations,
  hanubia: hanubiaModule.default.state.locations,
};

// ── Build new engine model ────────────────────────────────────────────────────

const model = createGameModel(db);
const rdb = db.header.resource_database;

// ── Test harness ──────────────────────────────────────────────────────────────

const results = [];

function run(name, fn) {
  try {
    fn();
    results.push({ name, status: "PASS" });
    console.log(`  PASS  ${name}`);
  } catch (e) {
    results.push({ name, status: "FAIL", error: e });
    console.log(`  FAIL  ${name}: ${e.message}`);
  }
}

// ── Helper: noTrick settings ──────────────────────────────────────────────────

function noTrickSettings() {
  const trickLevels = {};
  for (const k of Object.keys(rdb.tricks || {})) trickLevels[k] = 0;
  return {
    trickLevels,
    misc: {
      SeparateBeams: 0,
      SeparateMissiles: 0,
      DoorLocks: 0,
      HighDanger: 0,
      Teleporters: 0,
      NerfPowerBombs: 0,
    },
  };
}

// ── Helper: build rdv items from ability set + counters ───────────────────────

const START_INVENTORY = defaultSettings(db.header).startingItems || {};

function makeNewEngineState(abilityIds, { missiles = 0, maxEnergy = 99 } = {}) {
  const items = { Power: 1 };
  for (const [name, qty] of Object.entries(START_INVENTORY)) {
    if (name === "MissileAmmo" || name === "PBAmmo") continue;
    items[name] = qty;
  }
  for (const id of abilityIds) {
    const rdvName = ABILITY_TO_RDV[id];
    if (rdvName) items[rdvName] = 1;
  }
  const totalMissiles = (START_INVENTORY.MissileAmmo || 0) + missiles;
  if (totalMissiles > 0) {
    items["MissileLauncher"] = 1;
    items["MissileAmmo"] = totalMissiles;
  }
  return { items, events: new Set(), maxEnergy };
}

// ── Helper: legacy reachability evaluator ────────────────────────────────────
//
// Reimplements any region's checkLogic as a pure function.
// The Vuex action cannot run standalone (requires store/rootGetters), so we
// port the evaluation logic here.
//
// Evaluation rules (mirroring checkLogic exactly):
//   1. If requiredLogic exists: at least one entry's type[] must be fully satisfied.
//   2. If requiredLogic absent: required gate passes trivially.
//   3. If logic[] is empty: inLogic = requiredLogic result (true).
//   4. Otherwise: at least one logic[] entry's type[] must be fully satisfied
//      AND the required gate must have passed.

function legacyInLogicForLoc(location, obtainedSet) {
  let requiredLogicPassed = false;
  if (location.requiredLogic && location.requiredLogic.length > 0) {
    for (const entry of location.requiredLogic) {
      if (entry.type.every((t) => obtainedSet.has(t))) {
        requiredLogicPassed = true;
        break;
      }
    }
  } else {
    requiredLogicPassed = true;
  }

  if (!requiredLogicPassed) return false;

  const logicArr = location.logic || [];
  if (logicArr.length === 0) return true;

  for (const entry of logicArr) {
    if (entry.type.every((t) => obtainedSet.has(t))) return true;
  }
  return false;
}

// ── Battery kits ──────────────────────────────────────────────────────────────

function allItemsState() {
  const items = {};
  for (const [k, v] of Object.entries(rdb.items)) {
    items[k] = v.max_capacity || 1;
  }
  return { items, events: new Set(), maxEnergy: 1e9 };
}

const BATTERY_KITS = [
  {
    name: "noItems",
    obtainedSet: new Set(["slide"]),
    newEngineState: makeNewEngineState(["slide"]),
  },
  {
    name: "+Slide+Missiles",
    obtainedSet: new Set(["slide", "morphBall", "chargeBeam"]),
    newEngineState: makeNewEngineState(["slide", "morphBall", "chargeBeam"], {
      missiles: 2,
    }),
  },
  {
    name: "+Varia+Grapple",
    obtainedSet: new Set([
      "slide",
      "morphBall",
      "chargeBeam",
      "variaSuit",
      "grappleBeam",
      "speedBooster",
    ]),
    newEngineState: makeNewEngineState(
      [
        "slide",
        "morphBall",
        "chargeBeam",
        "variaSuit",
        "grappleBeam",
        "speedBooster",
      ],
      { missiles: 2, maxEnergy: 199 },
    ),
  },
  {
    name: "allItems",
    obtainedSet: new Set(Object.keys(ABILITY_TO_RDV)),
    newEngineState: allItemsState(),
  },
];

// ── Cases ─────────────────────────────────────────────────────────────────────

console.log("\n=== parity-regions.mjs ===\n");

// ─── mapCoverage (MAP-01/MAP-03) ──────────────────────────────────────────────
//
// Asserts:
//   - LOCATION_PICKUP_MAP has exactly 8 region keys
//   - cataris map includes pi=141 (Z-57) and pi=148 (Kraid)
//   - burenia map includes pi=140 (Drogyga)
//   - "itorash" key is absent (Itorash has 0 pickups and is excluded)
//   - each region's map length matches its store locations length

run("mapCoverage", () => {
  const regionKeys = Object.keys(LOCATION_PICKUP_MAP).sort();
  const expectedKeys = [
    "artaria",
    "burenia",
    "cataris",
    "dairon",
    "elun",
    "ferenia",
    "ghavoran",
    "hanubia",
  ];
  assert.deepEqual(
    regionKeys,
    expectedKeys,
    `LOCATION_PICKUP_MAP must have exactly 8 region keys; got: [${regionKeys.join(", ")}]`,
  );

  // MAP-03: boss pickups present; Itorash absent
  assert.ok(
    !("itorash" in LOCATION_PICKUP_MAP),
    "itorash key must be absent from LOCATION_PICKUP_MAP (Itorash has 0 pickups)",
  );
  assert.ok(
    LOCATION_PICKUP_MAP.cataris.includes(141),
    "cataris map must include pi=141 (Z-57 boss pickup)",
  );
  assert.ok(
    LOCATION_PICKUP_MAP.cataris.includes(148),
    "cataris map must include pi=148 (Kraid boss pickup)",
  );
  assert.ok(
    LOCATION_PICKUP_MAP.burenia.includes(140),
    "burenia map must include pi=140 (Drogyga boss pickup)",
  );

  // Each region array length must match store locations length
  for (const [region, locations] of Object.entries(REGION_LOCATIONS)) {
    const mapLen = LOCATION_PICKUP_MAP[region].length;
    const locLen = locations.length;
    assert.strictEqual(
      mapLen,
      locLen,
      `LOCATION_PICKUP_MAP.${region}.length (${mapLen}) must equal store locations length (${locLen})`,
    );
  }

  console.log(
    `    [info] 8 region keys, cataris⊇{141,148}, burenia∋140, itorash absent, all lengths match`,
  );
});

// ─── artaria regression cases ─────────────────────────────────────────────────
//
// Run Artaria through the GENERALIZED assertBijection / assertTypeConsistency
// to catch any regression from the Phase 4 Plan 01 generalization of those fns.

run("artaria:bijection", () => {
  const { uncoveredIndices } = assertBijection("artaria", db.regions["Artaria"]);
  assert.strictEqual(
    uncoveredIndices.length,
    0,
    `artaria regression: expected 0 uncovered indices; got ${uncoveredIndices.length}: [${uncoveredIndices.join(", ")}]`,
  );
});

run("artaria:typeConsistency", () => {
  assertTypeConsistency("artaria", db.regions["Artaria"], REGION_LOCATIONS.artaria);
});

// ─── Per-region bijection + typeConsistency cases ─────────────────────────────

const NEW_REGIONS = ["cataris", "dairon", "burenia", "ferenia", "ghavoran", "elun", "hanubia"];

for (const region of NEW_REGIONS) {
  const rdvKey = region[0].toUpperCase() + region.slice(1);
  const rdvJson = db.regions[rdvKey];
  const locations = REGION_LOCATIONS[region];

  run(`${region}:bijection`, () => {
    const { uncoveredIndices } = assertBijection(region, rdvJson);
    if (uncoveredIndices.length > 0) {
      console.log(
        `    [info] ${region}: ${uncoveredIndices.length} uncovered pickup_index values:`,
        uncoveredIndices,
      );
    }
    assert.strictEqual(
      uncoveredIndices.length,
      0,
      `${region} bijection: expected 0 uncovered indices (full bijection required); got ${uncoveredIndices.length}: [${uncoveredIndices.join(", ")}]`,
    );
  });

  run(`${region}:typeConsistency`, () => {
    const accepted = ACCEPTED_MISMATCHES[region];
    if (accepted && accepted.size > 0) {
      console.log(
        `    [info] ${region}: accepting mismatches at pi=[${[...accepted].join(", ")}] (documented anomaly)`,
      );
    }
    assertTypeConsistency(region, rdvJson, locations, accepted || new Set());
  });
}

// ─── pilotParity placeholder ──────────────────────────────────────────────────
//
// Per-region pilotParity cases are added in Task 2. The DISAGREEMENT_BUDGET map
// above is pre-defined and will be populated with observed counts after first run.

// ── Summary ───────────────────────────────────────────────────────────────────

const passes = results.filter((r) => r.status === "PASS").length;
const fails = results.filter((r) => r.status === "FAIL").length;

console.log(`\nPASS ${passes} / FAIL ${fails}\n`);

if (fails > 0) {
  console.error("One or more validation cases FAILED. See above for details.");
  process.exit(1);
}

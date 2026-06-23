/**
 * scripts/parity-artaria.mjs
 *
 * VAL-01: Artaria parity + reconciliation node battery.
 * No test framework — uses built-in node:assert only (CLAUDE.md).
 *
 * Run: node scripts/parity-artaria.mjs
 * Phase gate: exits 0 iff all cases pass.
 *
 * Cases:
 *   mapImmutable      (MAP-04) — LOCATION_PICKUP_MAP.artaria exactly 35 entries; only 1 region key
 *   bijection         (MAP-04) — assertArtariaBijection passes; reports uncovered (deferred) indices
 *   typeConsistency   (MAP-05) — assertArtariaTypeConsistency passes for all 35 tracker locations
 *   pilotParity       (VAL-01) — old hand-authored vs new engine diff across 4-kit battery;
 *                                disagreements ≤ DISAGREEMENT_BUDGET
 *
 * Structure mirrors scripts/validate-logic.mjs (shared harness pattern).
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  createGameModel,
  recompute,
} from "../src/logic/index.js";
import {
  LOCATION_PICKUP_MAP,
  pickupIndexFor,
  assertArtariaBijection,
  assertArtariaTypeConsistency,
} from "../src/logic/pickupMatch.js";
import { ABILITY_TO_RDV } from "../src/logic/itemMap.js";

// ── Disagreement budget (VAL-01) ──────────────────────────────────────────────
//
// The old hand-authored checkLogic is an approximation: it evaluates a local
// item-set check (slide/morphBall/etc.) without accounting for the full graph
// routing the Randovania engine uses. Observed disagreements by class:
//
//   CLASS A — old=true, new=false: legacy treats the starting Slide ability as
//   sufficient for several early-Artaria locations (energyPart at 1ep, phantomCloak
//   at corpius, chargeBeam at charge). The new engine correctly requires routing
//   through the map graph, so those aren't reachable without additional abilities.
//   Also appears in the noItems kit for locations 4,15,16 which have empty or
//   slide-only logic but are behind routing gates in the rdv graph.
//
//   CLASS B — old=false, new=true: With +Varia+Grapple kit, two locations
//   (areas 14 and 21) become reachable via the new engine's routing that the
//   hand-authored logic doesn't capture (missing alternative paths). These are
//   genuine improvements in the new engine.
//
//   CLASS C — old=true, new=false with speedBooster: area "1m" missile+ requires
//   speedBooster in the legacy logic; the new engine gates it differently.
//
// Budget = 13 disagreements across 4 kits × 35 locations (140 comparisons).
// Set to the OBSERVED count. DO NOT widen silently — investigate first.

const DISAGREEMENT_BUDGET = 13;

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
const artariaJson = db.regions["Artaria"];

// ── Load tracker locations (artaria.js default export) ───────────────────────
//
// artaria.js is a plain-object default export (Vue store module). We import it
// and read its .state.locations to get the 35 tracker locations for the parity
// comparison and type-consistency assertion.

let trackerLocations;
try {
  // Dynamic import for ESM compatibility; artaria.js is a plain JS object export.
  const artariaModule = await import("../src/store/modules/artaria.js");
  trackerLocations = artariaModule.default.state.locations;
} catch (e) {
  console.error(
    "FATAL: Could not import src/store/modules/artaria.js:",
    e.message,
  );
  process.exit(1);
}

// ── Build new engine model ────────────────────────────────────────────────────

const model = createGameModel(db);
const rdb = db.header.resource_database;

// ── Test harness (mirrors validate-logic.mjs) ─────────────────────────────────

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

function makeNewEngineState(abilityIds, { missiles = 0, maxEnergy = 99 } = {}) {
  const items = { Power: 1 };
  for (const id of abilityIds) {
    const rdvName = ABILITY_TO_RDV[id];
    if (rdvName) items[rdvName] = 1;
  }
  if (missiles > 0) {
    items["MissileLauncher"] = 1;
    items["MissileAmmo"] = missiles;
  }
  return { items, events: new Set(), maxEnergy };
}

// ── Helper: legacy Artaria reachability evaluator ────────────────────────────
//
// Reimplements src/store/modules/artaria.js checkLogic as a pure function.
// The Vuex action cannot run standalone (requires store/rootGetters), so we
// port the evaluation logic here.
//
// Evaluation rules (mirroring checkLogic exactly):
//   1. If requiredLogic exists: at least one entry's type[] must be fully satisfied.
//   2. If requiredLogic absent: required gate passes trivially.
//   3. If logic[] is empty: inLogic = requiredLogic result (true).
//   4. Otherwise: at least one logic[] entry's type[] must be fully satisfied
//      AND the required gate must have passed.
//
// Note: damage> pseudo-types (e.g. "damage>100") never match real item types,
// so any logic entry containing them always evaluates false in the legacy path.
// This is intentional — the old tracker has no damage model.

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
//
// Reuse the spike's D-04 progression kits (from scripts/spike/match-artaria.cjs
// and the parity notes). Each kit defines:
//   - obtainedSet: Set<string> of tracker ability `type` ids (for legacy eval)
//   - newEngineState: items+events+maxEnergy (for new engine)
//
// Note: slide starts as checked in items.js, so 'noItems' has slide=true.
// The +Slide+Missiles kit adds morphBall (for general movement) and chargeBeam.
// The +Varia+Grapple kit adds variaSuit, grappleBeam, speedBooster.
// allItems: max capacity of all rdb items (from the header resource_database).

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

console.log("\n=== parity-artaria.mjs ===\n");

// ─── mapImmutable (MAP-04) ────────────────────────────────────────────────────
run("mapImmutable", () => {
  const arr = LOCATION_PICKUP_MAP.artaria;
  assert.strictEqual(
    arr.length,
    35,
    `LOCATION_PICKUP_MAP.artaria must have exactly 35 entries; got ${arr.length}`,
  );

  const regionKeys = Object.keys(LOCATION_PICKUP_MAP);
  assert.strictEqual(
    regionKeys.length,
    1,
    `LOCATION_PICKUP_MAP must have exactly 1 region key (artaria); ` +
      `got ${regionKeys.length}: [${regionKeys.join(", ")}]`,
  );

  assert.deepEqual(
    regionKeys,
    ["artaria"],
    `LOCATION_PICKUP_MAP must only contain the "artaria" key at this phase`,
  );
});

// ─── bijection (MAP-04) ───────────────────────────────────────────────────────
run("bijection", () => {
  const { uncoveredIndices } = assertArtariaBijection(artariaJson);

  if (uncoveredIndices.length > 0) {
    console.log(
      `    [info] ${uncoveredIndices.length} Artaria pickup_index values uncovered (deferred to Phase 4):`,
      uncoveredIndices,
    );
  }

  // All 35 artaria pickups are covered — uncovered = 0 for the vendored db
  // (the spike confirmed this is a true bijection over all 35; any uncovered
  // would be boss/surplus pickups added after Phase 0 spike, which Phase 4 handles)
  assert.strictEqual(
    uncoveredIndices.length,
    0,
    `Expected 0 uncovered Artaria pickup_index values (all 35 should be mapped); ` +
      `got ${uncoveredIndices.length}: [${uncoveredIndices.join(", ")}]`,
  );
});

// ─── typeConsistency (MAP-05) ─────────────────────────────────────────────────
run("typeConsistency", () => {
  assertArtariaTypeConsistency(artariaJson, trackerLocations);
});

// ─── pilotParity (VAL-01) ────────────────────────────────────────────────────
run("pilotParity", () => {
  const settings = noTrickSettings();
  const artariaMap = LOCATION_PICKUP_MAP.artaria;
  let totalDisagreements = 0;
  const allDisagreements = [];

  for (const kit of BATTERY_KITS) {
    const state = {
      items: kit.newEngineState.items,
      events: new Set(),
      maxEnergy: kit.newEngineState.maxEnergy,
    };
    const { inLogicPickups } = recompute(model, state, settings);

    const kitDisagreements = [];
    for (let i = 0; i < 35; i++) {
      const pi = pickupIndexFor("artaria", i);
      const oldVal = legacyInLogicForLoc(
        trackerLocations[i],
        kit.obtainedSet,
      );
      const newVal = inLogicPickups.has(pi);

      if (oldVal !== newVal) {
        const area = trackerLocations[i].area;
        const msg = `rdv parity: location ${i} (${area}): old=${oldVal}, new=${newVal}`;
        console.log(`    ${msg}`);
        kitDisagreements.push({ i, area, old: oldVal, new: newVal, kit: kit.name });
      }
    }

    totalDisagreements += kitDisagreements.length;
    allDisagreements.push(...kitDisagreements);
  }

  console.log(
    `    total disagreements: ${totalDisagreements} / ${BATTERY_KITS.length * 35} comparisons (budget: ${DISAGREEMENT_BUDGET})`,
  );

  assert.ok(
    totalDisagreements <= DISAGREEMENT_BUDGET,
    `pilotParity: ${totalDisagreements} disagreements exceed DISAGREEMENT_BUDGET of ${DISAGREEMENT_BUDGET}. ` +
      `See above for the "rdv parity: location ..." lines. ` +
      `If new disagreements appear, investigate root cause before widening the budget.`,
  );
});

// ── Summary ───────────────────────────────────────────────────────────────────

const passes = results.filter((r) => r.status === "PASS").length;
const fails = results.filter((r) => r.status === "FAIL").length;

console.log(`\nPASS ${passes} / FAIL ${fails}\n`);

if (fails > 0) {
  console.error("One or more validation cases FAILED. See above for details.");
  process.exit(1);
}

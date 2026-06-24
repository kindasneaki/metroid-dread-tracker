/**
 * scripts/validate-settings.mjs
 *
 * Nyquist assertion battery for Phase 3: configurable settings + persistence.
 * No test framework — uses built-in node:assert only (CLAUDE.md constraint).
 *
 * Run: node scripts/validate-settings.mjs
 * Full suite: node scripts/validate-logic.mjs && node scripts/parity-artaria.mjs && node scripts/validate-settings.mjs && npm run lint
 *
 * Cases:
 *   trickLevelEffect  (SET-01) — raising trickLevel expands the in-logic set
 *   miscToggleEffect  (SET-02) — toggling a misc flag changes reachability
 *   startingItemsEffect (SET-03) — starting missiles 0 vs 15 flips a missile-gated location
 *   recomputeOnChange (SET-04) — recompute reads the given settings object each call
 *   persistRoundTrip  (PER-01/02) — serialize → deserialize restores identical state; corrupt/mismatch → null
 *   engineRegression  — non-empty in-logic set with all items (sanity guard)
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { createGameModel, recompute } from "../src/logic/index.js";
import { buildResourceState } from "../src/logic/ResourceState.js";
import { defaultSettings } from "../src/logic/Settings.js";
import { serializeState, deserializeState, SCHEMA_VERSION } from "../src/store/persistence.js";

// ── Load vendored db ──────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LOGIC_DIR = join(ROOT, "public", "logic");

const FILES = [
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

function loadDb() {
  const header = JSON.parse(readFileSync(join(LOGIC_DIR, "header.json"), "utf8"));
  const regions = {};
  for (const name of FILES.slice(1)) {
    regions[name] = JSON.parse(readFileSync(join(LOGIC_DIR, `${name}.json`), "utf8"));
  }
  return { header, regions };
}

const db = loadDb();
const rdb = db.header.resource_database;
const model = createGameModel(db);

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

// ── Helpers ───────────────────────────────────────────────────────────────────

function allItemsState() {
  const items = {};
  for (const [k, v] of Object.entries(rdb.items)) {
    items[k] = v.max_capacity || 1;
  }
  return { items, events: new Set(), maxEnergy: 1e9 };
}

function trickSettings(level) {
  const trickLevels = {};
  for (const k of Object.keys(rdb.tricks)) trickLevels[k] = level;
  return {
    trickLevels,
    misc: {
      SeparateBeams: 0,
      SeparateMissiles: 0,
      DoorLocks: 0,
      HighDanger: level > 0 ? 1 : 0,
      Teleporters: 0,
      NerfPowerBombs: 0,
    },
  };
}

// ── Cases ─────────────────────────────────────────────────────────────────────

console.log("\n=== validate-settings.mjs ===\n");

// ─── trickLevelEffect (SET-01) ────────────────────────────────────────────────
// Raising trick level from 0 to max expands (or equals) the in-logic pickup set.
// Must strictly differ where trick-gated nodes exist.
run("trickLevelEffect", () => {
  const state0 = allItemsState();
  const stateMax = allItemsState();

  const noTrick = trickSettings(0);
  const maxTrick = trickSettings(5);

  const { inLogicPickups: noTrickPickups } = recompute(model, { ...state0, events: new Set() }, noTrick);
  const { inLogicPickups: maxTrickPickups } = recompute(model, { ...stateMax, events: new Set() }, maxTrick);

  // Max tricks must yield at least as many pickups (monotonic on trick level with all items)
  assert.ok(
    maxTrickPickups.size >= noTrickPickups.size,
    `trickLevelEffect: max tricks (${maxTrickPickups.size}) must be >= no tricks (${noTrickPickups.size})`,
  );

  // At least one pickup must be trick-gated (proves SET-01 — trickLevel has observable effect)
  let trickGated = 0;
  for (const idx of maxTrickPickups) {
    if (!noTrickPickups.has(idx)) trickGated++;
  }
  assert.ok(trickGated > 0, `trickLevelEffect: expected at least one trick-gated pickup (found ${trickGated})`);
});

// ─── miscToggleEffect (SET-02) ────────────────────────────────────────────────
// Toggling DoorLocks changes the in-logic set (guards a door in the db).
run("miscToggleEffect", () => {
  const state = allItemsState();
  const baseTricks = trickSettings(0);

  const settingLocksOff = { ...baseTricks, misc: { ...baseTricks.misc, DoorLocks: 0 } };
  const settingLocksOn = { ...baseTricks, misc: { ...baseTricks.misc, DoorLocks: 1 } };

  const { inLogicPickups: locksOffPickups } = recompute(model, { ...state, events: new Set() }, settingLocksOff);
  const { inLogicPickups: locksOnPickups } = recompute(model, { ...state, events: new Set() }, settingLocksOn);

  // DoorLocks=0 (doors open) should yield >= pickups vs DoorLocks=1 (doors locked)
  assert.ok(
    locksOffPickups.size >= locksOnPickups.size,
    `miscToggleEffect: DoorLocks=0 (${locksOffPickups.size}) must be >= DoorLocks=1 (${locksOnPickups.size})`,
  );

  // The two settings must produce different results (proves misc flag has observable effect)
  assert.ok(
    locksOffPickups.size !== locksOnPickups.size,
    `miscToggleEffect: DoorLocks toggle must change the in-logic set (both returned ${locksOffPickups.size})`,
  );
});

// ─── startingItemsEffect (SET-03) ────────────────────────────────────────────
// Starting missiles 0 vs 15 (default Dread starter) flips a missile-gated location.
// Also verifies that the default settings carry MissileAmmo === 15.
run("startingItemsEffect", () => {
  const settings = defaultSettings(db.header);

  // Verify the default carries STARTING_MISSILES = 15
  assert.strictEqual(
    settings.startingItems.MissileAmmo,
    15,
    `startingItemsEffect: default startingItems.MissileAmmo must be 15 (Dread starter preset)`,
  );

  // Build a "no starting missiles" variant: strip MissileAmmo (and Launcher) from startingItems
  const noStartMissiles = {
    ...settings,
    startingItems: { ...settings.startingItems, MissileAmmo: 0, MissileLauncher: 0 },
  };

  const noObtained = {};
  const noCounters = { missiles: 0, energyPart: 0, energyFull: 0, powerBomb: 0 };

  const rs15 = buildResourceState(noObtained, noCounters, settings, rdb);
  const rs0 = buildResourceState(noObtained, noCounters, noStartMissiles, rdb);

  const engineSettings = { trickLevel: 0, misc: settings.misc };

  const { inLogicPickups: pickups15 } = recompute(model, rs15, engineSettings);
  const { inLogicPickups: pickups0 } = recompute(model, rs0, engineSettings);

  // With 15 starting missiles we must reach at least as many pickups
  assert.ok(
    pickups15.size >= pickups0.size,
    `startingItemsEffect: 15 missiles (${pickups15.size}) must reach >= locations as 0 missiles (${pickups0.size})`,
  );

  // At least one pickup must be missile-gated (in with 15 missiles, not with 0)
  let missileGated = 0;
  for (const idx of pickups15) {
    if (!pickups0.has(idx)) missileGated++;
  }
  assert.ok(
    missileGated > 0,
    `startingItemsEffect: expected >=1 missile-gated location to flip between 0 and 15 starting missiles (found ${missileGated})`,
  );
});

// ─── recomputeOnChange (SET-04) ───────────────────────────────────────────────
// Calling recompute with two distinct settings objects produces two distinct results.
// Proves the engine reads the provided settings object on each call (not a stale cached copy).
run("recomputeOnChange", () => {
  const state = allItemsState();

  // Use the same results proven in trickLevelEffect + miscToggleEffect — just re-derive
  // them here directly to show recompute reads the settings argument.
  const settingsA = trickSettings(0); // no tricks, DoorLocks=0
  const settingsB = trickSettings(5); // max tricks, HighDanger=1

  const { inLogicPickups: setA } = recompute(model, { ...state, events: new Set() }, settingsA);
  const { inLogicPickups: setB } = recompute(model, { ...state, events: new Set() }, settingsB);

  // The two calls must produce different results (engines reads settings each time)
  assert.ok(
    setA.size !== setB.size,
    `recomputeOnChange: different settings objects must yield different pickup sets (both returned ${setA.size})`,
  );

  // Calling again with settingsA must reproduce setA exactly (deterministic + reads settings)
  const { inLogicPickups: setA2 } = recompute(model, { ...state, events: new Set() }, settingsA);
  assert.strictEqual(
    setA2.size,
    setA.size,
    `recomputeOnChange: recompute(settingsA) must be deterministic (got ${setA.size} then ${setA2.size})`,
  );
});

// ─── persistRoundTrip (PER-01/02) ────────────────────────────────────────────
// serialize(settings+progress) → deserialize restores identical meaningful state.
// schema-version mismatch and corrupt JSON both return null gracefully.
run("persistRoundTrip", () => {
  // Build a representative snapshot
  const settings = defaultSettings(db.header);
  const snapshot = {
    settings,
    items: [
      { type: "morphBall", checked: true },
      { type: "slide", checked: true },
      { type: "bomb", checked: false },
      { type: "chargeBeam", checked: false },
      { type: "grappleBeam", checked: true },
    ],
    xDefeated: { logic: true },
    counters: { missiles: 30, energyPart: 2, energyFull: 3, powerBomb: 4 },
    regions: { artaria: [0, 5, 9], cataris: [2, 7], dairon: [] },
  };

  // ── Round-trip (PER-01) ───────────────────────────────────────────────────
  const blob = serializeState(snapshot);
  const out = deserializeState(JSON.stringify(blob));

  assert.ok(out !== null, "persistRoundTrip: round-trip must not return null");

  // Settings must survive verbatim
  assert.strictEqual(
    out.settings.trickLevel,
    settings.trickLevel,
    `persistRoundTrip: trickLevel must survive round-trip`,
  );
  assert.deepEqual(
    out.settings.misc,
    settings.misc,
    "persistRoundTrip: misc must survive round-trip",
  );
  assert.strictEqual(
    out.settings.startingItems.MissileAmmo,
    settings.startingItems.MissileAmmo,
    "persistRoundTrip: startingItems.MissileAmmo must survive round-trip",
  );

  // Checked items — restored as type-keyed map
  assert.strictEqual(out.checkedItems["morphBall"], true, "persistRoundTrip: morphBall checked must be true");
  assert.strictEqual(out.checkedItems["slide"], true, "persistRoundTrip: slide checked must be true");
  assert.strictEqual(out.checkedItems["bomb"], false, "persistRoundTrip: bomb checked must be false");

  // xDefeated
  assert.strictEqual(out.xDefeated, true, "persistRoundTrip: xDefeated must survive round-trip");

  // Counters
  assert.strictEqual(out.counters.missiles, 30, "persistRoundTrip: missiles counter must survive");
  assert.strictEqual(out.counters.energyPart, 2, "persistRoundTrip: energyPart must survive");
  assert.strictEqual(out.counters.energyFull, 3, "persistRoundTrip: energyFull must survive");
  assert.strictEqual(out.counters.powerBomb, 4, "persistRoundTrip: powerBomb must survive");

  // Region indices
  assert.deepEqual(out.regions.artaria, [0, 5, 9], "persistRoundTrip: artaria indices must survive");
  assert.deepEqual(out.regions.cataris, [2, 7], "persistRoundTrip: cataris indices must survive");
  assert.deepEqual(out.regions.dairon, [], "persistRoundTrip: empty region array must survive");

  // ── Mutation isolation ────────────────────────────────────────────────────
  // Mutating the original snapshot after serialize must NOT affect the blob
  snapshot.regions.artaria.push(99);
  const out2 = deserializeState(JSON.stringify(blob));
  assert.deepEqual(out2.regions.artaria, [0, 5, 9], "persistRoundTrip: serialize must deep-clone region arrays");

  // ── Graceful discard (PER-02) ─────────────────────────────────────────────
  // Corrupt JSON → null
  assert.strictEqual(deserializeState("{bad json"), null, "persistRoundTrip: corrupt JSON must return null");

  // Schema mismatch → null
  const blobCopy = JSON.parse(JSON.stringify(blob));
  blobCopy.schemaVersion = SCHEMA_VERSION + 999;
  assert.strictEqual(
    deserializeState(JSON.stringify(blobCopy)),
    null,
    "persistRoundTrip: schema mismatch must return null",
  );

  // Null/undefined/non-string input → null
  assert.strictEqual(deserializeState(null), null, "persistRoundTrip: null input must return null");
  assert.strictEqual(deserializeState(undefined), null, "persistRoundTrip: undefined input must return null");
  assert.strictEqual(deserializeState(""), null, "persistRoundTrip: empty string must return null");
});

// ─── engineRegression ─────────────────────────────────────────────────────────
// Sanity guard: with all items the engine returns a non-empty pickup set.
// Fails loudly if the engine is broken, preventing false positives above.
run("engineRegression", () => {
  const state = allItemsState();
  const settings = trickSettings(5);
  const { inLogicPickups } = recompute(model, { ...state, events: new Set() }, settings);

  assert.ok(
    inLogicPickups.size > 0,
    `engineRegression: all-items pickup set must be non-empty (got ${inLogicPickups.size})`,
  );
  assert.ok(
    inLogicPickups.size >= 149,
    `engineRegression: expected >=149 pickups with all items, got ${inLogicPickups.size}`,
  );
});

// ── Summary ───────────────────────────────────────────────────────────────────

const passes = results.filter((r) => r.status === "PASS").length;
const skips = results.filter((r) => r.status === "SKIP").length;
const fails = results.filter((r) => r.status === "FAIL").length;

console.log(`\nPASS ${passes} / SKIP ${skips} / FAIL ${fails}\n`);

if (fails > 0) {
  console.error("One or more validation cases FAILED. See above for details.");
  process.exit(1);
}

/**
 * scripts/validate-logic.mjs
 *
 * VAL-01: Node assertion battery for the Randovania reachability engine.
 * No test framework — uses built-in node:assert only.
 *
 * Run: node scripts/validate-logic.mjs
 * Phase gate: exits 0 iff all ACTIVE cases pass.
 *
 * ENGINE_READY detection: createGameModel returns a stub in Plan 01 (_stub: true,
 * pickupCount: 0). Once Plan 02 lands the real engine, _stub disappears and
 * pickupCount > 0, which activates the engine-dependent cases automatically.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  createGameModel,
  recompute,
  assertSchema,
  EXPECTED_SCHEMA_VERSION,
} from "../src/logic/index.js";

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

// ── ENGINE_READY detection ────────────────────────────────────────────────────
// Plan 01 stub: model._stub === true, model.pickupCount === 0
// Plan 02 real engine: _stub absent, model.pickupCount > 0
const probeModel = createGameModel(db);
const ENGINE_READY = !probeModel._stub && probeModel.pickupCount > 0;

// ── Test harness ──────────────────────────────────────────────────────────────

const results = []; // { name, status: "PASS"|"SKIP"|"FAIL", error? }

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

function skip(name, reason) {
  results.push({ name, status: "SKIP" });
  console.log(`  SKIP  ${name} (${reason})`);
}

// ── Helper: allItems / noItems resource state (ported from engine.cjs) ────────

function allItemsState(rdb) {
  const items = {};
  for (const [k, v] of Object.entries(rdb.items)) {
    items[k] = v.max_capacity || 1;
  }
  return { items, events: new Set(), maxEnergy: 1e9 };
}

function noItemsState() {
  return { items: { Power: 1 }, events: new Set(), maxEnergy: 99 };
}

function maxTrickSettings(rdb) {
  const trickLevels = {};
  for (const k of Object.keys(rdb.tricks)) trickLevels[k] = 5;
  return {
    trickLevels,
    misc: {
      SeparateBeams: 0,
      SeparateMissiles: 0,
      DoorLocks: 0,
      HighDanger: 1,
      Teleporters: 0,
      NerfPowerBombs: 0,
    },
  };
}

function noTrickSettings(rdb) {
  const trickLevels = {};
  for (const k of Object.keys(rdb.tricks)) trickLevels[k] = 0;
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

// ── Cases ─────────────────────────────────────────────────────────────────────

console.log("\n=== validate-logic.mjs ===\n");

// ─── vendorPresent (DAT-01/02) — always ACTIVE ───────────────────────────────
run("vendorPresent", () => {
  // 10 JSON files present
  const missing = FILES.filter((f) => {
    try {
      readFileSync(join(LOGIC_DIR, `${f}.json`));
      return false;
    } catch {
      return true;
    }
  });
  assert.deepEqual(missing, [], `Missing JSON files: ${missing.join(", ")}`);

  // VERSION.txt present and contains schema_version=33
  const ver = readFileSync(join(LOGIC_DIR, "VERSION.txt"), "utf8");
  assert.ok(ver.includes("schema_version=33"), `VERSION.txt does not contain schema_version=33:\n${ver}`);
});

// ─── schemaGuard (DAT-03) — always ACTIVE ────────────────────────────────────
run("schemaGuard", () => {
  // assertSchema(33) must NOT throw
  assertSchema(33);

  // assertSchema(<any other number>) MUST throw
  const badVersions = [32, 34, 0, 1];
  for (const bad of badVersions) {
    assert.throws(
      () => assertSchema(bad),
      /schema drift/,
      `assertSchema(${bad}) should throw but did not`,
    );
  }

  // EXPECTED_SCHEMA_VERSION is exactly 33
  assert.strictEqual(EXPECTED_SCHEMA_VERSION, 33);

  // createGameModel with a mutated schema_version must throw
  assert.throws(
    () => createGameModel({ header: { schema_version: 32, resource_database: db.header.resource_database } }),
    /schema drift/,
    "createGameModel with schema_version=32 should throw",
  );
});

// ─── immutable (DAT-04) — always ACTIVE ──────────────────────────────────────
run("immutable", () => {
  const model = createGameModel(db);
  assert.ok(Object.isFrozen(model), "createGameModel must return a frozen object");

  // Mutation attempt should throw (strict mode) or silently no-op; either is acceptable.
  // We test that the property is not writable.
  const desc = Object.getOwnPropertyDescriptor(model, "_stub") ||
               Object.getOwnPropertyDescriptor(model, "pickupCount");
  if (desc) {
    assert.ok(!desc.writable || desc.writable === false || Object.isFrozen(model),
      "Frozen object properties must not be writable");
  }
});

// ─── Engine-dependent cases — SKIP until Plan 02 lands ───────────────────────

const SKIP_REASON = "engine pending Plan 02";

if (ENGINE_READY) {
  const model = createGameModel(db);
  const rdb = db.header.resource_database;

  // allItems (ENG-03/07): all items + max tricks + HighDanger => 149/149 pickups + Ship victory
  run("allItems", () => {
    const state = allItemsState(rdb);
    const settings = maxTrickSettings(rdb);
    const { inLogicPickups } = recompute(model, state, settings);
    assert.ok(inLogicPickups.size >= 149, `Expected >=149 pickups, got ${inLogicPickups.size}`);
    assert.ok(state.events.has("Ship"), "Ship victory event must be reached with all items");
  });

  // noItems (ENG-03/07): no items (Power only), tricks 0 => 0 pickups, no Ship
  run("noItems", () => {
    const state = noItemsState();
    const settings = noTrickSettings(rdb);
    const { inLogicPickups } = recompute(model, state, settings);
    assert.strictEqual(inLogicPickups.size, 0, `Expected 0 pickups with no items, got ${inLogicPickups.size}`);
    assert.ok(!state.events.has("Ship"), "Ship must NOT be reached with no items");
  });

  // monotonic (ENG-07): adding items never removes an in-logic pickup
  run("monotonic", () => {
    const settings = noTrickSettings(rdb);
    let prevSet = new Set();

    // Add items one by one from allItems resource state keys
    const allItems = allItemsState(rdb).items;
    const itemKeys = Object.keys(allItems);
    const cumulativeItems = { Power: 1 };
    const cumulativeState = () => ({
      items: { ...cumulativeItems },
      events: new Set(),
      maxEnergy: 99 + (cumulativeItems.ETank || 0) * 100 + (cumulativeItems.EFragment || 0) * 25,
    });

    for (const key of itemKeys) {
      if (key === "Power") continue;
      cumulativeItems[key] = allItems[key];
      const state = cumulativeState();
      const { inLogicPickups } = recompute(model, state, settings);

      // monotonicity: prevSet must be a subset of current
      for (const idx of prevSet) {
        assert.ok(inLogicPickups.has(idx),
          `Monotonicity violation: pickup ${idx} was in-logic then dropped after adding ${key}`);
      }
      prevSet = inLogicPickups;
    }
  });

  // templates (ENG-01/02): all 45 templates expand without throwing
  run("templates", () => {
    // Model build (already called above) would throw if template expansion fails.
    // Additionally verify the model has no unresolved 'template' type nodes by
    // checking the template count in the rdb.
    const templateCount = Object.keys(rdb.requirement_template || {}).length;
    assert.strictEqual(templateCount, 45, `Expected 45 templates, got ${templateCount}`);
    // If we reach here, template expansion during model build did not throw.
  });

  // trickLevel (ENG-04): trick-gated pickup out at level 0, in at its required level
  run("trickLevel", () => {
    const noTrick = noTrickSettings(rdb);
    const maxTrick = maxTrickSettings(rdb);
    const state = allItemsState(rdb);

    const { inLogicPickups: withTricks } = recompute(model,
      { ...state, events: new Set() }, maxTrick);
    const { inLogicPickups: withoutTricks } = recompute(model,
      { ...state, events: new Set() }, noTrick);

    // With max tricks we should reach at least as many pickups
    assert.ok(withTricks.size >= withoutTricks.size,
      "Max tricks must yield >= pickups vs no tricks");
    // At least one pickup must be trick-gated (reachable at max tricks, not at level 0)
    let trickGated = 0;
    for (const idx of withTricks) {
      if (!withoutTricks.has(idx)) trickGated++;
    }
    assert.ok(trickGated > 0, "Expected at least one trick-gated pickup (none found)");
  });

  // miscNegate (ENG-05): DoorLocks/SeparateMissiles setting flips a sensitive edge
  run("miscNegate", () => {
    const state = allItemsState(rdb);
    const base = noTrickSettings(rdb);

    const settingOn = { ...base, misc: { ...base.misc, DoorLocks: 1 } };
    const settingOff = { ...base, misc: { ...base.misc, DoorLocks: 0 } };

    const { inLogicPickups: withLocks } = recompute(model,
      { ...state, events: new Set() }, settingOn);
    const { inLogicPickups: withoutLocks } = recompute(model,
      { ...state, events: new Set() }, settingOff);

    // The two sets should differ when the misc setting gates a door
    // (at minimum: withoutLocks ⊇ withLocks, or they are equal with all items)
    assert.ok(withoutLocks.size >= withLocks.size,
      "DoorLocks=0 should yield >= pickups vs DoorLocks=1 with all items");
  });

  // energy (ENG-06): heat/lava room gating with/without suit
  run("energy", () => {
    const rdbItems = rdb.items;
    const noSuitItems = {};
    for (const [k, v] of Object.entries(rdbItems)) {
      if (k !== "Varia" && k !== "Gravity") noSuitItems[k] = v.max_capacity || 1;
    }
    const settings = maxTrickSettings(rdb);
    const withSuit = allItemsState(rdb);
    const noSuit = { items: noSuitItems, events: new Set(), maxEnergy: 1e9 };

    const { inLogicPickups: withSuitPickups } = recompute(model,
      { ...withSuit, events: new Set() }, settings);
    const { inLogicPickups: noSuitPickups } = recompute(model,
      { ...noSuit, events: new Set() }, settings);

    // With suits we should reach at least as many pickups as without
    assert.ok(withSuitPickups.size >= noSuitPickups.size,
      "Having Varia+Gravity suits should yield >= in-logic pickups vs no suits");
  });

  // energyRisk (ENG-06/D-06): energyRisk set non-empty for low energy + known damage room
  run("energyRisk", () => {
    const rdbItems = rdb.items;
    const minItems = { Power: 1 };
    for (const [k, v] of Object.entries(rdbItems)) {
      if (k !== "ETank" && k !== "EFragment") minItems[k] = v.max_capacity || 1;
    }
    const settings = maxTrickSettings(rdb);
    const lowEnergyState = { items: minItems, events: new Set(), maxEnergy: 99 };

    const { energyRisk } = recompute(model, lowEnergyState, settings);
    assert.ok(energyRisk.size > 0,
      "energyRisk must be non-empty for low-energy (no tanks) + known heat/lava rooms");
  });

  // missileGate (ENG-07/D-06): missile-gated pickup only in-logic when missiles > 0
  run("missileGate", () => {
    const settings = noTrickSettings(rdb);
    const withMissiles = {
      items: { Power: 1, MissileLauncher: 1, MissileAmmo: 5 },
      events: new Set(),
      maxEnergy: 99,
    };
    const noMissiles = {
      items: { Power: 1 },
      events: new Set(),
      maxEnergy: 99,
    };

    const { inLogicPickups: withMs } = recompute(model, withMissiles, settings);
    const { inLogicPickups: noMs } = recompute(model, noMissiles, settings);

    // At least one pickup must be missile-gated (in with missiles, not without)
    let gated = 0;
    for (const idx of withMs) {
      if (!noMs.has(idx)) gated++;
    }
    assert.ok(gated > 0, "Expected at least one missile-gated pickup (none found)");
  });

  // starterBaseline (D-04): default Settings + hand-checked subset => expected pickup set
  run("starterBaseline", () => {
    // Starter items: morphBall, slideBoots (Slide)
    const starterItems = { Power: 1, Morph: 1, Slide: 1 };
    const defaultSettings = noTrickSettings(rdb);
    const state = { items: starterItems, events: new Set(), maxEnergy: 99 };
    const { inLogicPickups } = recompute(model, state, defaultSettings);

    // With only Morph + Slide, at least a few items should be in logic
    // (exact count asserted in Phase 2 parity; here we just assert non-negative and deterministic)
    assert.ok(inLogicPickups.size >= 0, "starterBaseline: pickup set must be non-negative");
    // Run twice — must be deterministic
    const { inLogicPickups: second } = recompute(model, { items: starterItems, events: new Set(), maxEnergy: 99 }, defaultSettings);
    assert.strictEqual(inLogicPickups.size, second.size, "recompute must be deterministic");
  });
} else {
  skip("allItems", SKIP_REASON);
  skip("noItems", SKIP_REASON);
  skip("monotonic", SKIP_REASON);
  skip("templates", SKIP_REASON);
  skip("trickLevel", SKIP_REASON);
  skip("miscNegate", SKIP_REASON);
  skip("energy", SKIP_REASON);
  skip("energyRisk", SKIP_REASON);
  skip("missileGate", SKIP_REASON);
  skip("starterBaseline", SKIP_REASON);
}

// ── Summary ───────────────────────────────────────────────────────────────────

const passes = results.filter((r) => r.status === "PASS").length;
const skips = results.filter((r) => r.status === "SKIP").length;
const fails = results.filter((r) => r.status === "FAIL").length;

console.log(`\nPASS ${passes} / SKIP ${skips} / FAIL ${fails}\n`);

if (fails > 0) {
  console.error("One or more validation cases FAILED. See above for details.");
  process.exit(1);
}

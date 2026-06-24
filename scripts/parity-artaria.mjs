/**
 * scripts/parity-artaria.mjs
 *
 * VAL-02: Artaria structural regression gate.
 * No test framework — uses built-in node:assert only (CLAUDE.md).
 *
 * Run: node scripts/parity-artaria.mjs
 * Phase gate: exits 0 iff all cases pass.
 *
 * Cases:
 *   mapImmutable      (MAP-04) — LOCATION_PICKUP_MAP.artaria exactly 35 entries; 8 region keys
 *   bijection         (MAP-04) — assertArtariaBijection passes; reports uncovered (deferred) indices
 *   typeConsistency   (MAP-05) — assertArtariaTypeConsistency passes for all 35 tracker locations
 *
 * Structure mirrors scripts/validate-logic.mjs (shared harness pattern).
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  LOCATION_PICKUP_MAP,
  assertArtariaBijection,
  assertArtariaTypeConsistency,
} from "../src/logic/pickupMatch.js";

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
// and read its .state.locations to get the 35 tracker locations for the
// type-consistency assertion.

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

// ── Cases ─────────────────────────────────────────────────────────────────────

console.log("\n=== parity-artaria.mjs ===\n");

// ─── mapImmutable (MAP-04) ────────────────────────────────────────────────────
// Updated in Phase 4 Plan 02: LOCATION_PICKUP_MAP now has 8 region keys.
// This check validates that artaria's 35 entries are unchanged (regression guard)
// and that all 8 expected region keys are present with correct lengths.
run("mapImmutable", () => {
  const arr = LOCATION_PICKUP_MAP.artaria;
  assert.strictEqual(
    arr.length,
    35,
    `LOCATION_PICKUP_MAP.artaria must have exactly 35 entries; got ${arr.length}`,
  );

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

  const expectedLengths = {
    artaria: 35,
    cataris: 25,
    dairon: 23,
    burenia: 20,
    ferenia: 17,
    ghavoran: 20,
    elun: 5,
    hanubia: 4,
  };
  for (const [region, expectedLen] of Object.entries(expectedLengths)) {
    assert.strictEqual(
      LOCATION_PICKUP_MAP[region].length,
      expectedLen,
      `LOCATION_PICKUP_MAP.${region} must have ${expectedLen} entries; got ${LOCATION_PICKUP_MAP[region].length}`,
    );
  }
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

// ── Summary ───────────────────────────────────────────────────────────────────

const passes = results.filter((r) => r.status === "PASS").length;
const fails = results.filter((r) => r.status === "FAIL").length;

console.log(`\nPASS ${passes} / FAIL ${fails}\n`);

if (fails > 0) {
  console.error("One or more validation cases FAILED. See above for details.");
  process.exit(1);
}

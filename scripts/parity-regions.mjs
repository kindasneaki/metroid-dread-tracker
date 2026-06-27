/**
 * scripts/parity-regions.mjs
 *
 * VAL-02: All-regions structural regression gate.
 * No test framework — uses built-in node:assert only (CLAUDE.md).
 *
 * Run: node scripts/parity-regions.mjs
 * Phase gate: exits 0 iff all cases pass.
 *
 * Cases per region (cataris, dairon, burenia, ferenia, ghavoran, elun, hanubia):
 *   <region>:bijection        (MAP-04) — assertBijection passes
 *   <region>:typeConsistency  (MAP-05) — assertTypeConsistency passes (cataris: acceptedMismatches={144,141,148})
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
  LOCATION_PICKUP_MAP,
  assertBijection,
  assertTypeConsistency,
} from "../src/logic/pickupMatch.js";

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

// ── Summary ───────────────────────────────────────────────────────────────────

const passes = results.filter((r) => r.status === "PASS").length;
const fails = results.filter((r) => r.status === "FAIL").length;

console.log(`\nPASS ${passes} / FAIL ${fails}\n`);

if (fails > 0) {
  console.error("One or more validation cases FAILED. See above for details.");
  process.exit(1);
}

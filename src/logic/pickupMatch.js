/**
 * src/logic/pickupMatch.js
 *
 * Production reconciliation module: tracker-array-index → Randovania pickup_index map.
 *
 * The artaria array was produced and verified by scripts/spike/match-artaria.cjs
 * (affine-fit, worst match 12px, bijection confirmed). It is committed verbatim here
 * and MUST NOT be re-derived at runtime. The spike can be re-run to sanity-check.
 *
 * IMPORTANT: ZERO Node built-in imports. ZERO Vue/Vuex imports.
 * This module runs in BOTH the browser bundle (via Vue app) and Node assertion scripts.
 *
 * Exports:
 *   LOCATION_PICKUP_MAP          — { artaria: number[35] } (other regions added in Phase 4 Plan 02)
 *   pickupIndexFor(region, i)    — lookup helper; throws on unknown region or out-of-range i
 *   assertBijection(region, rdvJson)                                       — MAP-04 (generalized)
 *   assertTypeConsistency(region, rdvJson, locs, acceptedMismatches)       — MAP-05 (generalized)
 *   assertArtariaBijection(rdvJson)        — backward-compat wrapper for assertBijection("artaria")
 *   assertArtariaTypeConsistency(rdvJson, locs) — backward-compat wrapper for assertTypeConsistency("artaria")
 */

// ── Verified Artaria map (tracker array order → pickup_index) ────────────────
//
// Tracker location index (array position in artaria.js state.locations) →
// Randovania pickup_index in public/logic/Artaria.json.
//
// 35 entries, bijection over Artaria's 35 pickup indices.
// Source: scripts/spike/match-artaria.cjs (Phase 0).
// Do NOT modify without re-running the spike and updating the assertions below.

export const LOCATION_PICKUP_MAP = {
  artaria: [
    32, 24, 26, 28, 7, 20, 29, 22, 21, 5, 17, 4, 1, 12, 9, 31, 6, 13, 10, 11, 2,
    8, 15, 30, 18, 16, 3, 14, 19, 0, 139, 138, 27, 25, 23,
  ],
  // Derived by scripts/match-region.cjs (Phase 4 Plan 01). Committed verbatim.
  // cataris: 25 entries (23 non-boss + z57/141 at index 23, kraid/148 at index 24)
  cataris: [
    41, 34, 53, 40, 39, 38, 37, 47, 52, 54, 36, 43, 46, 45, 50, 42, 44, 49, 48,
    33, 51, 35, 144, 141, 148,
  ],
  // dairon: 23 entries
  dairon: [
    76, 67, 69, 74, 66, 62, 75, 56, 59, 55, 60, 68, 64, 72, 63, 70, 71, 61, 73,
    65, 57, 58, 147,
  ],
  // burenia: 20 entries (19 non-boss + drogyga/140 at index 19)
  burenia: [
    94, 84, 77, 93, 80, 92, 81, 83, 91, 87, 88, 89, 86, 90, 82, 95, 85, 78, 79,
    140,
  ],
  // ferenia: 17 entries
  ferenia: [
    120, 132, 121, 129, 125, 122, 130, 128, 123, 124, 131, 133, 126, 127, 119,
    142, 143,
  ],
  // ghavoran: 20 entries
  ghavoran: [
    98, 106, 113, 107, 103, 101, 108, 97, 111, 99, 102, 112, 105, 109, 96, 146,
    110, 100, 104, 145,
  ],
  // elun: 5 entries
  elun: [118, 117, 114, 116, 115],
  // hanubia: 4 entries
  hanubia: [136, 134, 135, 137],
};

// ── pickupIndexFor ────────────────────────────────────────────────────────────

/**
 * Return the Randovania pickup_index for tracker array index `i` in `region`.
 *
 * @param {string} region - e.g. "artaria" (lower-case)
 * @param {number} i      - 0-based index into the region's locations array
 * @returns {number} the pickup_index
 * @throws {Error} if region is unknown or i is out of range
 */
export function pickupIndexFor(region, i) {
  const arr = LOCATION_PICKUP_MAP[region];
  if (!arr) {
    throw new Error(
      `pickupIndexFor: unknown region "${region}". ` +
        `Known regions: ${Object.keys(LOCATION_PICKUP_MAP).join(", ")}.`,
    );
  }
  if (i < 0 || i >= arr.length) {
    throw new Error(
      `pickupIndexFor: index ${i} is out of range for region "${region}" ` +
        `(valid 0–${arr.length - 1}).`,
    );
  }
  return arr[i];
}

// ── Helper: derive a type keyword from a Randovania node name ─────────────────

/**
 * Derive the type keyword from a Randovania node name.
 * Mirrors `rdvType` in scripts/spike/match-artaria.cjs.
 *
 * @param {string} nodeName
 * @returns {string}
 */
function rdvTypeKeyword(nodeName) {
  if (/Charge Beam/.test(nodeName)) return "major:charge";
  if (/Varia Suit/.test(nodeName)) return "major:varia";
  if (/Grapple Beam/.test(nodeName)) return "major:grapple";
  if (/Screw Attack/.test(nodeName)) return "major:screw";
  if (/Phantom Cloak/.test(nodeName)) return "major:cloak";
  if (/Spider Magnet/.test(nodeName)) return "major:magnet";
  if (/Energy Tank/.test(nodeName)) return "etank";
  if (/Energy Part/.test(nodeName)) return "epart";
  if (/Power Bomb/.test(nodeName)) return "pb";
  if (/Missile\+ Tank/.test(nodeName)) return "missile+";
  if (/Missile Tank/.test(nodeName)) return "missile";
  // New-region major ability types (Phase 4). Tracker uses plural form for missile variants.
  // NOTE: More-specific patterns must come before less-specific ones that share substrings.
  // "Cross Bomb" must precede "Bomb" (otherwise /Bomb/ matches "Cross Bomb" first).
  if (/Morph Ball/.test(nodeName)) return "major:morphBall";
  if (/Diffusion Beam/.test(nodeName)) return "major:diffusionBeam";
  if (/Wide Beam/.test(nodeName)) return "major:wideBeam";
  if (/Cross Bomb/.test(nodeName)) return "major:crossBomb";
  if (/Bomb/.test(nodeName)) return "major:bomb";
  if (/Speed Booster/.test(nodeName)) return "major:speedBooster";
  if (/Gravity Suit/.test(nodeName)) return "major:gravitySuit";
  if (/Flash Shift/.test(nodeName)) return "major:flashShift";
  if (/Space Jump/.test(nodeName)) return "major:spaceJump";
  if (/Storm Missile/.test(nodeName)) return "major:stormMissiles";
  if (/Wave Beam/.test(nodeName)) return "major:waveBeam";
  if (/Super Missile/.test(nodeName)) return "major:superMissiles";
  if (/Spin Boost/.test(nodeName)) return "major:spinBoost";
  if (/Pulse Radar/.test(nodeName)) return "major:pulseRadar";
  if (/Plasma Beam/.test(nodeName)) return "major:plasmaBeam";
  if (/Ice Missile/.test(nodeName)) return "major:iceMissiles";
  return "?";
}

/**
 * Derive the type keyword from a tracker location's `type` + `amount`.
 * Mirrors `trkType` in scripts/spike/match-artaria.cjs.
 *
 * @param {string} t      - location.type
 * @param {number} amount - location.amount
 * @returns {string}
 */
function trkTypeKeyword(t, amount) {
  if (t === "missiles") return amount >= 10 ? "missile+" : "missile";
  if (t === "energyPart") return "epart";
  if (t === "energyFull") return "etank";
  if (t === "powerBomb") return "pb";
  if (t === "chargeBeam") return "major:charge";
  if (t === "variaSuit") return "major:varia";
  if (t === "grappleBeam") return "major:grapple";
  if (t === "screwAttack") return "major:screw";
  if (t === "phantomCloak") return "major:cloak";
  if (t === "spiderMagnet") return "major:magnet";
  return "major:" + t;
}

// ── assertBijection (MAP-04) ─────────────────────────────────────────────────

/**
 * Assert that LOCATION_PICKUP_MAP[region] forms a valid bijection over the
 * pickup indices present in the Randovania region JSON.
 *
 * Checks:
 *   (b) every mapped index is a member of the valid pickup_index set in rdvJson
 *   (c) no index is reused (Set.size === map.length)
 *   (d) reports — but does NOT fail on — any pickup_index uncovered by the map
 *       (boss pickups not yet in tracker are deferred, not failures)
 *
 * ASVS V5: validates region key and array contents before use; throws clearly on violation.
 *
 * @param {string} region   - lower-case region name, e.g. "artaria"
 * @param {object} rdvJson  - parsed public/logic/<Region>.json
 * @returns {{ uncoveredIndices: number[] }} report of uncovered indices (not a failure)
 * @throws {Error} if region unknown or bijection is violated
 */
export function assertBijection(region, rdvJson) {
  const map = LOCATION_PICKUP_MAP[region];
  if (!map) {
    throw new Error(`assertBijection: unknown region "${region}".`);
  }

  // Collect valid pickup_index values from the rdv region JSON
  const validSet = new Set();
  for (const area of Object.values(rdvJson.areas)) {
    for (const node of Object.values(area.nodes)) {
      if (node.node_type === "pickup") {
        validSet.add(node.pickup_index);
      }
    }
  }

  // (b) every mapped index is valid
  const invalidEntries = map.filter((pi) => !validSet.has(pi));
  if (invalidEntries.length > 0) {
    throw new Error(
      `pickupMatch ${region} bijection violation: mapped indices not found in rdv data: [${invalidEntries.join(", ")}].`,
    );
  }

  // (c) no index reused
  const mappedSet = new Set(map);
  if (mappedSet.size !== map.length) {
    const seen = new Set();
    const dupes = map.filter((pi) => {
      if (seen.has(pi)) return true;
      seen.add(pi);
      return false;
    });
    throw new Error(
      `pickupMatch ${region} bijection violation: duplicate pickup indices found: [${dupes.join(", ")}].`,
    );
  }

  // (d) uncovered indices — listed but not a failure
  const uncoveredIndices = [...validSet].filter((pi) => !mappedSet.has(pi));

  return { uncoveredIndices };
}

/**
 * Backward-compat wrapper. Keeps scripts/parity-artaria.mjs working unmodified.
 * @param {object} rdvArtariaJson - parsed public/logic/Artaria.json
 */
export function assertArtariaBijection(rdvArtariaJson) {
  return assertBijection("artaria", rdvArtariaJson);
}

// ── assertTypeConsistency (MAP-05) ─────────────────────────────────────────────

/**
 * Assert that each mapped pickup's Randovania node-name keyword matches the
 * tracker location's type keyword.
 *
 * For each tracker location index i:
 *   - trkKw = derived from location.type + location.amount (via trkTypeKeyword)
 *   - rdvKw = derived from the node name whose pickup_index === pickupIndexFor(region, i)
 *   - assert trkKw === rdvKw (unless pi is in acceptedMismatches)
 *
 * Known accepted mismatches (pass as acceptedMismatches Set):
 *   - cataris pi=144: tracker uses "flashShift" (vanilla Green EMMI location label)
 *     but RDV places "Morph Ball" at Central Unit Access. The bijection is correct;
 *     only the vanilla item label differs from the RDV node name.
 *
 * @param {string}     region              - lower-case region name, e.g. "cataris"
 * @param {object}     rdvJson             - parsed public/logic/<Region>.json
 * @param {Array}      trackerLocations    - region module's state.locations array
 * @param {Set<number>} [acceptedMismatches] - pickup_index values allowed to mismatch (documented anomalies)
 * @throws {Error} with message "pickupMatch type mismatch at index {i}: ..." on first un-accepted mismatch
 */
export function assertTypeConsistency(
  region,
  rdvJson,
  trackerLocations,
  acceptedMismatches = new Set(),
) {
  // Build a lookup: pickup_index → node name
  const piToNode = new Map();
  for (const area of Object.values(rdvJson.areas)) {
    for (const [nodeName, node] of Object.entries(area.nodes)) {
      if (node.node_type === "pickup") {
        piToNode.set(node.pickup_index, nodeName);
      }
    }
  }

  for (let i = 0; i < trackerLocations.length; i++) {
    const loc = trackerLocations[i];
    const pi = pickupIndexFor(region, i);

    if (acceptedMismatches.has(pi)) {
      console.info(
        `assertTypeConsistency: accepted mismatch at ${region} index ${i} (pi=${pi}) — documented anomaly`,
      );
      continue;
    }

    const nodeName = piToNode.get(pi);

    if (!nodeName) {
      throw new Error(
        `pickupMatch type mismatch at index ${i}: tracker=${loc.type}, rdv=(pickup_index ${pi} not found in rdv data)`,
      );
    }

    const trkKw = trkTypeKeyword(loc.type, loc.amount || 0);
    const rdvKw = rdvTypeKeyword(nodeName);

    if (trkKw !== rdvKw) {
      throw new Error(
        `pickupMatch type mismatch at index ${i}: tracker=${trkKw}, rdv=${rdvKw}`,
      );
    }
  }
}

/**
 * Backward-compat wrapper. Keeps scripts/parity-artaria.mjs working unmodified.
 * @param {object} rdvArtariaJson    - parsed public/logic/Artaria.json
 * @param {Array}  trackerLocations  - artaria.js state.locations array
 */
export function assertArtariaTypeConsistency(rdvArtariaJson, trackerLocations) {
  return assertTypeConsistency("artaria", rdvArtariaJson, trackerLocations);
}

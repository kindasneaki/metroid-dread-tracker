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
 *   LOCATION_PICKUP_MAP       — { artaria: number[35] } (other regions absent — Phase 4)
 *   pickupIndexFor(region, i) — lookup helper; throws on unknown region or out-of-range i
 *   assertArtariaBijection    — MAP-04 dev/load + node guard
 *   assertArtariaTypeConsistency — MAP-05 guard
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
    32, 24, 26, 28, 7, 20, 29, 22, 21, 5, 17, 4, 1, 12, 9, 31, 6, 13, 10, 11,
    2, 8, 15, 30, 18, 16, 3, 14, 19, 0, 139, 138, 27, 25, 23,
  ],
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

// ── assertArtariaBijection (MAP-04) ──────────────────────────────────────────

/**
 * Assert that LOCATION_PICKUP_MAP.artaria forms a valid bijection over the
 * Artaria pickup indices present in the Randovania region JSON.
 *
 * Checks:
 *   (a) artaria array has exactly 35 entries
 *   (b) every mapped index is a member of the valid pickup_index set in rdvArtariaJson
 *   (c) no index is reused (Set.size === 35)
 *   (d) reports — but does NOT fail on — any Artaria pickup_index uncovered by the map
 *       (the 3 boss/surplus indices are deferred to Phase 4)
 *
 * @param {object} rdvArtariaJson - parsed public/logic/Artaria.json
 * @returns {{ uncoveredIndices: number[] }} report of deferred uncovered indices
 * @throws {Error} starting with "pickupMatch Artaria bijection violation" on any failure
 */
export function assertArtariaBijection(rdvArtariaJson) {
  const map = LOCATION_PICKUP_MAP.artaria;

  // (a) length check
  if (map.length !== 35) {
    throw new Error(
      `pickupMatch Artaria bijection violation: expected 35 entries, got ${map.length}.`,
    );
  }

  // Collect valid pickup_index values from the rdv region JSON
  const validSet = new Set();
  for (const area of Object.values(rdvArtariaJson.areas)) {
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
      `pickupMatch Artaria bijection violation: mapped indices not found in rdv data: [${invalidEntries.join(", ")}].`,
    );
  }

  // (c) no index reused
  const mappedSet = new Set(map);
  if (mappedSet.size !== 35) {
    const seen = new Set();
    const dupes = map.filter((pi) => {
      if (seen.has(pi)) return true;
      seen.add(pi);
      return false;
    });
    throw new Error(
      `pickupMatch Artaria bijection violation: duplicate pickup indices found: [${dupes.join(", ")}].`,
    );
  }

  // (d) uncovered indices — deferred, listed but not a failure
  const uncoveredIndices = [...validSet].filter((pi) => !mappedSet.has(pi));

  return { uncoveredIndices };
}

// ── assertArtariaTypeConsistency (MAP-05) ─────────────────────────────────────

/**
 * Assert that each mapped pickup's Randovania node-name keyword matches the
 * tracker location's type keyword.
 *
 * For each tracker location index i:
 *   - trkKw = derived from location.type + location.amount (via trkTypeKeyword)
 *   - rdvKw = derived from the node name of the node whose pickup_index === pickupIndexFor("artaria", i)
 *   - assert trkKw === rdvKw
 *
 * @param {object} rdvArtariaJson - parsed public/logic/Artaria.json
 * @param {Array}  trackerLocations - artaria.js state.locations array
 * @throws {Error} with message "pickupMatch type mismatch at index {i}: tracker={type}, rdv={rdvType}" on first mismatch
 */
export function assertArtariaTypeConsistency(rdvArtariaJson, trackerLocations) {
  // Build a lookup: pickup_index → node name
  const piToNode = new Map();
  for (const area of Object.values(rdvArtariaJson.areas)) {
    for (const [nodeName, node] of Object.entries(area.nodes)) {
      if (node.node_type === "pickup") {
        piToNode.set(node.pickup_index, nodeName);
      }
    }
  }

  for (let i = 0; i < trackerLocations.length; i++) {
    const loc = trackerLocations[i];
    const pi = pickupIndexFor("artaria", i);
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

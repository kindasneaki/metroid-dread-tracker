/**
 * src/store/persistence.js
 *
 * Pure, node-importable persistence helpers for the Metroid Dread Tracker.
 *
 * IMPORTANT: ZERO Vue/Vuex imports. ZERO Node built-in imports.
 * ZERO localStorage access — the Vuex plugin (Plan 02) wraps these with window.localStorage.
 *
 * Exports:
 *   SCHEMA_VERSION   — numeric constant; guards against stale blobs on deserialize
 *   STORAGE_KEY      — namespaced localStorage key (shared by plugin + battery)
 *   serializeState   — plain-object snapshot → versioned JSON-safe blob
 *   deserializeState — raw localStorage string → structured payload | null
 */

// ── Schema version ────────────────────────────────────────────────────────────
// Increment when the persisted shape changes in an incompatible way.
// Matching SCHEMA_VERSION check in deserializeState discards stale blobs gracefully.
export const SCHEMA_VERSION = 1;

// ── Storage key ───────────────────────────────────────────────────────────────
// Namespaced so it cannot collide with other apps on the same origin.
export const STORAGE_KEY = "mdt:v1";

// ── serializeState ────────────────────────────────────────────────────────────

/**
 * Serialize the tracker's user-authored state into a versioned, JSON-safe blob.
 *
 * Call this with explicit plain-object slices pulled from the Vuex store — do NOT
 * pass the live Vuex state objects directly (they may contain non-serializable
 * fields and this function deep-clones to prevent cross-contamination).
 *
 * @param {object} snapshot
 * @param {object}   snapshot.settings     - full settings object (from logic module)
 * @param {Array}    snapshot.items         - items array from items module (each {type, checked, logic, ...})
 * @param {object}   snapshot.xDefeated    - { logic: boolean } (Release the X flag)
 * @param {object}   snapshot.counters     - { missiles, energyPart, energyFull, powerBomb }
 * @param {object}   snapshot.regions      - { [regionName]: number[] } — checked location indices per region
 *
 * @returns {object} versioned JSON-safe blob (plain object, ready for JSON.stringify)
 */
export function serializeState({ settings, items, xDefeated, counters, regions }) {
  // Persist only the minimal checked-type map for items to avoid bloating the blob.
  // inLogic / logic fields are computed; only `checked` (user input) matters.
  const checkedItems = {};
  if (Array.isArray(items)) {
    for (const item of items) {
      if (item.type !== undefined) {
        checkedItems[item.type] = item.checked === true;
      }
    }
  }

  // xDefeated: only the logic boolean matters (user-toggled)
  const xDefeatedValue = xDefeated && xDefeated.logic === true;

  // Counters: plain copy, coerce to numbers
  const countersCopy = {
    missiles: Number(counters && counters.missiles != null ? counters.missiles : 0),
    energyPart: Number(counters && counters.energyPart != null ? counters.energyPart : 0),
    energyFull: Number(counters && counters.energyFull != null ? counters.energyFull : 0),
    powerBomb: Number(counters && counters.powerBomb != null ? counters.powerBomb : 0),
  };

  // Regions: deep-clone the arrays to prevent later mutations from corrupting the blob
  const regionsCopy = {};
  if (regions && typeof regions === "object") {
    for (const [name, indices] of Object.entries(regions)) {
      regionsCopy[name] = Array.isArray(indices) ? indices.slice() : [];
    }
  }

  // Settings: JSON round-trip to deep-clone (settings contains only plain objects/arrays)
  const settingsCopy = JSON.parse(JSON.stringify(settings || {}));

  return {
    schemaVersion: SCHEMA_VERSION,
    settings: settingsCopy,
    checkedItems,
    xDefeated: xDefeatedValue,
    counters: countersCopy,
    regions: regionsCopy,
  };
}

// ── deserializeState ──────────────────────────────────────────────────────────

/**
 * Parse a raw localStorage string and return the structured payload, or null on failure.
 *
 * Never throws. Returns null for:
 *   - Any JSON parse error
 *   - Any blob whose schemaVersion !== SCHEMA_VERSION
 *   - Null/undefined/non-string input
 *
 * On a valid matching blob returns:
 *   { settings, checkedItems, xDefeated, counters, regions }
 *
 * @param {string} rawString - the string value read from localStorage
 * @returns {{ settings, checkedItems, xDefeated: boolean, counters, regions } | null}
 */
export function deserializeState(rawString) {
  if (rawString == null || typeof rawString !== "string") return null;
  let parsed;
  try {
    parsed = JSON.parse(rawString);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  if (parsed.schemaVersion !== SCHEMA_VERSION) return null;

  return {
    settings: parsed.settings || {},
    checkedItems: parsed.checkedItems || {},
    xDefeated: parsed.xDefeated === true,
    counters: parsed.counters || { missiles: 0, energyPart: 0, energyFull: 0, powerBomb: 0 },
    regions: parsed.regions || {},
  };
}

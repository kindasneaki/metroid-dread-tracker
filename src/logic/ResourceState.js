/**
 * src/logic/ResourceState.js
 *
 * Build the engine input (ResourceState) from tracker-UI state.
 *
 * Maps items.js obtained abilities and root-store minor counters to the Randovania
 * resource item names the engine expects, applying the launcher/ammo fan-out.
 *
 * IMPORTANT: ZERO Node built-in imports. ZERO Vue/Vuex imports.
 */

import { ABILITY_TO_RDV } from "./itemMap.js";
import { maxEnergy } from "./energy.js";

/**
 * Build the ResourceState from tracker state — the input object that reach/evaluate consume.
 *
 * Exact minor-counter sources (verified against src/store/index.js + src/store/modules/items.js):
 *   MissileAmmo  ← counters.missiles (root-store running total)
 *   ETank        ← counters.energyFull (root-store tank count)
 *   EFragment    ← counters.energyPart (root-store part count)
 *   MainPB       ← obtained.powerBomb (items.js ability `.logic` boolean → 0/1)
 *   PBAmmo       ← counters.powerBomb (root-store ammo counter — DISTINCT from MainPB ability)
 *   MissileLauncher ← 1 when MissileAmmo > 0 (implicit; tracker has no launcher checkbox)
 *   Power        ← always 1
 *
 * @param {object} obtained
 *   Map of items.js ability type → boolean (`.logic` value).
 *   Keys: "morphBall", "slide", "bomb", "crossBomb", "powerBomb", "chargeBeam", etc.
 *   Also accepts the entire items.js `items` array for convenience — pass the `.logic` map.
 *
 * @param {object} counters
 *   Root-store running counters: { missiles, energyPart, energyFull, powerBomb }
 *   (src/store/index.js state fields)
 *
 * @param {object} settings
 *   Output of defaultSettings() or a settings override.
 *   Uses: settings.strictness, settings.immediateParts
 *
 * @param {object} rdb
 *   db.header.resource_database (for damage_reductions; passed through to ctx)
 *
 * @returns {{
 *   items: { [rdvName: string]: number },
 *   events: Set<string>,
 *   suits: Set<string>,
 *   tanks: number,
 *   parts: number,
 *   immediateParts: boolean,
 *   strictness: number,
 *   damageReductions: Array,
 *   maxEnergyValue: number
 * }}
 */
export function buildResourceState(obtained, counters, settings, rdb) {
  const items = {};

  // 1:1 major abilities from the tracker ability map
  for (const [abilityId, rdvName] of Object.entries(ABILITY_TO_RDV)) {
    if (obtained[abilityId]) {
      items[rdvName] = 1;
    }
  }

  // Derived / implicit items
  const missileAmmo = counters.missiles || 0;
  const pbAmmo = counters.powerBomb || 0;
  const tanks = counters.energyFull || 0;
  const parts = counters.energyPart || 0;

  // Power: always held (base weapon)
  items["Power"] = 1;

  // MissileAmmo: root-store missile running counter
  if (missileAmmo > 0) items["MissileAmmo"] = missileAmmo;

  // MissileLauncher: implicitly held when the player has any missiles
  if (missileAmmo > 0) items["MissileLauncher"] = 1;

  // PBAmmo: root-store power-bomb ammo counter (DISTINCT from MainPB ability above)
  if (pbAmmo > 0) items["PBAmmo"] = pbAmmo;

  // ETank / EFragment: from root-store energy counters
  if (tanks > 0) items["ETank"] = tanks;
  if (parts > 0) items["EFragment"] = parts;

  // Suits Set (for damagePasses / reductionMultiplier)
  const suits = new Set();
  if (obtained.variaSuit) suits.add("Varia");
  if (obtained.gravitySuit) suits.add("Gravity");

  const immediateParts =
    settings.immediateParts !== undefined ? settings.immediateParts : true;
  const strictness =
    settings.strictness !== undefined ? settings.strictness : 1.5;
  const maxEnergyValue = maxEnergy(tanks, parts, immediateParts);

  return {
    items,
    events: new Set(),
    suits,
    tanks,
    parts,
    immediateParts,
    strictness,
    damageReductions: rdb ? rdb.damage_reductions : [],
    maxEnergyValue,
  };
}

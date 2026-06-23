/**
 * src/logic/energy.js
 *
 * Damage-as-max-energy gate helpers for the Randovania reachability engine.
 *
 * Ported from scripts/spike/energy.cjs (re-verified against Dread logic database).
 * Converted to ESM with injected damage_reductions instead of module-level fs reads.
 *
 * IMPORTANT: ZERO Node built-in imports. ZERO Vue/Vuex imports.
 */

const BASE_ENERGY = 99;
const ENERGY_PER_TANK = 100;

/**
 * Compute maximum energy for the given tank + fragment state.
 *
 * @param {number} tanks - ETank count
 * @param {number} parts - EFragment count (energy parts)
 * @param {boolean} immediateParts - whether energy parts immediately add to max energy
 * @returns {number} total max energy
 */
export function maxEnergy(tanks, parts, immediateParts) {
  return (
    BASE_ENERGY +
    tanks * ENERGY_PER_TANK +
    (immediateParts ? parts * (ENERGY_PER_TANK / 4) : 0)
  );
}

/**
 * Compute the damage reduction multiplier for a given damage type and set of held suits.
 *
 * @param {string} damageType - e.g. "Heat", "Lava", "Cold", "Damage"
 * @param {Set<string>} suits - set of held suit item names (e.g. new Set(["Varia"]))
 * @param {Array} damageReductions - db.header.resource_database.damage_reductions
 * @returns {number} product of all applicable suit multipliers (1.0 if no match)
 */
export function reductionMultiplier(damageType, suits, damageReductions) {
  const entry = damageReductions.find((r) => r.name === damageType);
  if (!entry) return 1;
  let mult = 1;
  for (const red of entry.reductions) {
    if (suits.has(red.name)) mult *= red.multiplier;
  }
  return mult;
}

/**
 * Evaluate whether a damage requirement passes for the given context.
 *
 * effective = rawAmount * reductionMultiplier(damageType, suits) * strictness
 * Passes iff maxEnergy(tanks, parts, immediateParts) > effective
 *
 * @param {string} damageType - damage type name
 * @param {number} rawAmount - raw damage amount from the requirement
 * @param {object} ctx - evaluation context:
 *   {
 *     suits: Set<string>,       // held suit item names
 *     tanks: number,            // ETank count
 *     parts: number,            // EFragment count
 *     immediateParts: boolean,  // energy-part-to-energy conversion mode
 *     strictness: number,       // damage_strictness (1.5 = Randovania default)
 *     damageReductions: Array,  // from rdb.damage_reductions
 *   }
 * @returns {{ ok: boolean, eff: number }}
 */
export function damagePasses(damageType, rawAmount, ctx) {
  const mult = reductionMultiplier(damageType, ctx.suits, ctx.damageReductions);
  const eff = rawAmount * mult * ctx.strictness;
  const me = maxEnergy(ctx.tanks, ctx.parts, ctx.immediateParts);
  return { ok: me > eff, eff };
}

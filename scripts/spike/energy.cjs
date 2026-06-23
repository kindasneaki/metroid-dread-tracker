/* eslint-disable */
// Phase 0 Spike C — validate the damage-as-max-energy gate.
// effective = raw * product(suit multipliers held) * strictness; pass iff maxEnergy > effective.
// Run: node scripts/spike/energy.cjs
const fs = require("fs");
const RDIR = "/Users/rjosephson/Documents/Development/randovania/randovania/games/dread/logic_database/";
const h = JSON.parse(fs.readFileSync(RDIR + "header.json", "utf8"));
const reductions = h.resource_database.damage_reductions; // [{name, reductions:[{name,quantity,multiplier}]}]
const ENERGY_PER_TANK = 100;
const BASE_ENERGY = 99;

function reductionMultiplier(damageType, suits /* Set of item names held */) {
  const entry = reductions.find((r) => r.name === damageType);
  if (!entry) return 1;
  let mult = 1;
  for (const red of entry.reductions) {
    if (suits.has(red.name)) mult *= red.multiplier;
  }
  return mult;
}
function maxEnergy(tanks, parts, immediateParts) {
  return BASE_ENERGY + tanks * ENERGY_PER_TANK + (immediateParts ? parts * (ENERGY_PER_TANK / 4) : 0);
}
function passes(damageType, rawAmount, suits, tanks, strictness) {
  const eff = rawAmount * reductionMultiplier(damageType, suits) * strictness;
  return { ok: maxEnergy(tanks, 0, false) > eff, eff };
}

const STRICT = 1.5; // Randovania default damage_strictness
console.log("=== Energy gate validation (strictness " + STRICT + ", energy/tank " + ENERGY_PER_TANK + ", base " + BASE_ENERGY + ") ===\n");

const cases = [
  // [label, damageType, raw, suits, tanksNeededExpectation]
  ["Heat 100, no suit",        "Heat", 100, new Set(),               "needs tanks"],
  ["Heat 100, Varia",          "Heat", 100, new Set(["Varia"]),      "FREE (Varia negates heat)"],
  ["Lava 200, no suit",        "Lava", 200, new Set(),               "needs many tanks"],
  ["Lava 200, Varia",          "Lava", 200, new Set(["Varia"]),      "partial (x0.75)"],
  ["Lava 200, Gravity",        "Lava", 200, new Set(["Gravity"]),    "FREE (Gravity negates lava)"],
  ["Damage 300, no suit",      "Damage", 300, new Set(),             "needs tanks"],
  ["Damage 300, Varia+Gravity","Damage", 300, new Set(["Varia","Gravity"]), "x0.375"],
  ["Cold 150, Gravity",        "Cold", 150, new Set(["Gravity"]),    "FREE (Gravity negates cold)"],
];

for (const [label, dt, raw, suits, note] of cases) {
  process.stdout.write((label).padEnd(30) + " | eff@strict=" + (raw * reductionMultiplier(dt, suits) * STRICT).toFixed(0).padStart(5) + " | min tanks to pass: ");
  let needed = null;
  for (let t = 0; t <= 12; t++) { if (passes(dt, raw, suits, t, STRICT).ok) { needed = t; break; } }
  console.log((needed === null ? ">12" : String(needed)).padStart(3) + "   (" + note + ")");
}

console.log("\n=== sanity: monotonic in tanks & suits strictly help ===");
const heat = (suits, t) => passes("Heat", 200, suits, t, 1.0).ok;
console.log("Heat200 no-suit: 0 tanks=" + heat(new Set(), 0) + " 2 tanks=" + heat(new Set(), 2) + " 3 tanks=" + heat(new Set(), 3));
console.log("Heat200 Varia : 0 tanks=" + heat(new Set(["Varia"]), 0) + " (suit negates regardless of tanks)");

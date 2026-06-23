/**
 * src/logic/itemMap.js
 *
 * Ability-id to Randovania short-name map + launcher/ammo fan-out.
 *
 * Keys are the exact `type` ids from src/store/modules/items.js.
 * Values are the Randovania resource_database.items keys.
 *
 * IMPORTANT: ZERO Node built-in imports. ZERO Vue/Vuex imports.
 *
 * Fan-out rules for derived / implicit items (see buildResourceState in ResourceState.js):
 *
 *   Power:1            — always held (Power Beam is the base weapon)
 *   MissileLauncher:1  — granted when MissileAmmo > 0 (tracker has no launcher checkbox;
 *                        launcher is implicit when the player has any missiles — see A1)
 *   MissileAmmo:N      — root-store `missiles` counter (running total, NOT per-type delta)
 *   MainPB: 0|1        — items.js ability `powerBomb` (.logic boolean — the capability)
 *   PBAmmo:N           — root-store `powerBomb` counter (ammo count; DISTINCT from MainPB)
 *   ETank:N            — root-store `energyFull` (tank count)
 *   EFragment:N        — root-store `energyPart` (energy-part count)
 *
 * ⚠ Naming trap: `powerBomb` exists as BOTH a root-store ammo counter (PBAmmo) AND an
 *   items.js ability id (MainPB). They are distinct sources — the ability boolean goes to
 *   MainPB and the ammo counter goes to PBAmmo. Never conflate them.
 */

/**
 * 1:1 map from tracker ability `type` ids to Randovania short-names (24 major abilities).
 * Derived / implicit items (Power, MissileLauncher, MissileAmmo, MainPB, PBAmmo, ETank,
 * EFragment) are handled separately in ResourceState.buildResourceState().
 *
 * @type {{ [abilityId: string]: string }}
 */
export const ABILITY_TO_RDV = {
  morphBall: "Morph",
  grappleBeam: "Grapple",
  waveBeam: "Wave",
  chargeBeam: "Charge",
  diffusionBeam: "Diffusion",
  spiderMagnet: "Magnet",
  screwAttack: "Screw",
  variaSuit: "Varia",
  gravitySuit: "Gravity",
  spaceJump: "Space",
  spinBoost: "Spin",
  flashShift: "Flash",
  phantomCloak: "Cloak",
  pulseRadar: "Pulse",
  speedBooster: "Speed",
  slide: "Slide",
  bomb: "Bomb",
  crossBomb: "Cross",
  powerBomb: "MainPB", // items.js ability → Randovania MainPB (the capability boolean)
  wideBeam: "Wide",
  plasmaBeam: "Plasma",
  superMissiles: "Supers",
  iceMissiles: "Ice",
  stormMissiles: "Storm",
};

/**
 * src/logic/Settings.js
 *
 * Starter-preset default settings (D-04) for the Randovania reachability engine.
 *
 * Until the Phase 3 settings UI ships, the engine assumes Randovania's starter preset:
 *   - tricks disabled (level 0)
 *   - vanilla doors (DoorLocks off)
 *   - NerfPowerBombs on
 *   - vanilla teleporters
 *   - HighDanger off
 *   - energy_per_tank 100
 *   - immediate energy parts on
 *   - X not started released
 *   - damage_strictness 1.5
 *   - starting inventory: the preset's "must_start" pickups — Missile launcher (+15
 *     missiles), Pulse Radar, and Slide (Randovania starter_preset.rdvpreset:
 *     standard_pickup_configuration.pickups_state.{Missiles,Pulse Radar,Slide}
 *     num_included_in_starting_pickups = 1). The Missiles pickup has
 *     starting_condition "must_start" — you ALWAYS begin with the launcher + 15 ammo.
 *
 * Phase 3 will drive these values from UI/localStorage. Settings are a plain object.
 *
 * IMPORTANT: ZERO Node built-in imports. ZERO Vue/Vuex imports.
 */

// Base missile capacity granted by the Missile launcher in Metroid Dread.
export const STARTING_MISSILES = 15;

/**
 * Return the D-04 starter-preset default settings.
 *
 * @param {object} header - parsed header.json (provides starting_location)
 * @returns {{
 *   trickLevel: number,
 *   misc: { SeparateBeams: number, SeparateMissiles: number, DoorLocks: number,
 *            HighDanger: number, Teleporters: number, NerfPowerBombs: number },
 *   energyPerTank: number,
 *   immediateParts: boolean,
 *   strictness: number,
 *   startingLocation: object,
 *   victory: string
 * }}
 */
export function defaultSettings(header) {
  return {
    trickLevel: 0,
    misc: {
      // Starter preset shuffles beams/missiles as SEPARATE items (not progressive),
      // so the logic must model in-game stacking: a higher beam opens a lower beam's
      // door (Wave→Wide/Plasma), and a higher missile opens a lower missile's door.
      // These flags gate the stacking branches of the Shoot * templates.
      SeparateBeams: 1,
      SeparateMissiles: 1,
      DoorLocks: 0,
      HighDanger: 0,
      Teleporters: 0,
      NerfPowerBombs: 1,
    },
    energyPerTank: 100,
    immediateParts: true,
    strictness: 1.5,
    startingLocation: header.starting_location,
    victory: "Ship",
    // Preset "must_start" starting inventory (Randovania short-names → quantity).
    // MissileAmmo is additive with collected missile tanks; the others are presence
    // flags. Power Beam is granted unconditionally by buildResourceState.
    startingItems: {
      MissileLauncher: 1,
      MissileAmmo: STARTING_MISSILES,
      Pulse: 1,
      Slide: 1,
    },
  };
}

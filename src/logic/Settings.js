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
 *
 * Phase 3 will drive these values from UI/localStorage. Settings are a plain object.
 *
 * IMPORTANT: ZERO Node built-in imports. ZERO Vue/Vuex imports.
 */

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
      SeparateBeams: 0,
      SeparateMissiles: 0,
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
  };
}

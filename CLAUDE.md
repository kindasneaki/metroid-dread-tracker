# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An interactive item-tracker for **Metroid Dread randomizers**. It overlays
checkboxes on game-region map images and computes, in real time, which item
locations are currently reachable ("in logic") based on the abilities the
player has collected.

## Commands

- `npm install` — install dependencies
- `npm run serve` — dev server with hot-reload (http://localhost:8080)
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint + Prettier, auto-fixes
- `npm run deploy` — runs `deploy.bat`: force-pushes `dist/` to the `gh-pages`
  branch (Windows batch script; production assets are served from
  `/metroid-dread-tracker/` per `vue.config.js`)

There is **no test framework** configured. Linting is the only automated check.

## Stack

Vue 3 + Vuex 4 + Vue Router 4, built with Vue CLI (webpack — not Vite). Plain
JavaScript, no TypeScript. `vue-meta` for head tags.

## Architecture

### State lives in Vuex, nowhere else

`src/store/index.js` is the root store. It registers nine modules: one
`items` module plus one module per game region (`artaria`, `cataris`,
`dairon`, `burenia`, `ferenia`, `ghavoran`, `elun`, `hanubia`). The root
store itself only holds the running counters (`missiles`, `energyPart`,
`energyFull`, `powerBomb`) and the energy-conversion logic (4 energy parts
roll up into 1 full tank via `ROTATE_ENERGY` / `FIX_ENERGY`).

**Persistence via localStorage:** settings and progress (checked items + locations)
persist via `src/store/persistence.js` and restore on load. A page refresh does NOT
reset progress.

### The two halves of the data model

- **Items** (`src/store/modules/items.js`): `state.items` is the list of major
  abilities (`morphBall`, `chargeBeam`, `spiderMagnet`, …), each
  `{ type, name, checked, logic }`. `state.minorItems` tracks countable pickups
  (missiles, energy parts/tanks, power bombs). `checkProgressive` handles
  progressive ability chains (e.g. bomb → cross-bomb).

- **Locations** (each region module, e.g. `src/store/modules/artaria.js`): an
  array of pickup locations. Each location carries only presentation data:
  ```
  {
    area, type, amount,
    top, left,              // absolute CSS position over the map image
    checked: false,         // user has collected this location
  }
  ```
  Reachability is computed by the Randovania BFS engine — there are no
  per-location logic rules in the store data.

### The reachability engine (the key cross-module flow)

This is the heart of the app and spans several files:

1. User toggles an ability in `src/components/Tracker.vue`.
2. Tracker dispatches `items/updateArea`, which commits `UPDATE_AREA` and
   unconditionally dispatches `logic/recompute`.
3. `logic/recompute` builds a `ResourceState` from `rootGetters['items/inLogic']`
   and root counters, runs the Randovania BFS engine, and commits the resulting
   `inLogicPickups` and `energyRisk` Sets to logic module state.
4. Region views re-render: `locationStates` computed maps each location to its
   `pickup_index` via `pickupIndexFor()`, reads `inLogicPickups.has(pi)` for shown
   and `energyRisk.has(pi)` for softlock styling.

The `inLogic` getter in `items.js` is the single source of truth for "which
abilities count as obtained."

### UI layout

`src/App.vue` always renders three things: `Display.vue` (HUD: current
missiles/energy/power-bombs, top-left), the `<router-view>` (the current
region's map, center), and `Tracker.vue` (the ability/item grid, overlay).
Region views are nearly identical — a map image with location checkboxes
positioned absolutely via each location's `top`/`left` strings. Item and map
art lives in `src/assets/`.

## Conventions

- Adding a new tracked location: add a presentation object (area, type, amount,
  top, left, checked: false) to the relevant region module's `state.locations`
  array AND add the corresponding `pickup_index` to `LOCATION_PICKUP_MAP` in
  `src/logic/pickupMatch.js`. The engine picks it up automatically — no
  per-location logic rules needed.
- Region modules are highly parallel — when changing logic-engine behavior,
  the same edit usually needs to be mirrored across all eight.
- Prettier enforces CRLF line endings (see `package.json` eslintConfig).

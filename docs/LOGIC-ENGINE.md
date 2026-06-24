# Logic Engine — How Reachability Works

> Developer guide to how the Metroid Dread Tracker decides what's "in logic,"
> how state flows from a click to a checkbox color, and what changed during the
> v1.0 Randovania-logic-port milestone (plus the follow-up fixes after it).
>
> Last updated: 2026-06-24.

---

## 1. What this is

The tracker overlays checkboxes on game-region map images and, in real time,
colors each pickup location by whether it is currently **reachable** ("in logic")
given the abilities and ammo you've collected and your seed settings.

The core promise: **when the tracker says a location is in logic, it matches what
the actual Randovania randomizer would compute for the same items + settings.**

To make that true, the tracker runs a real port of Randovania's reachability
engine over Randovania's own logic database — not hand-authored rules.

---

## 2. Before vs. after the port

| | Old (pre-milestone) | Now |
|---|---|---|
| Reachability source | Hand-authored `logic`/`requiredLogic` arrays + a `checkLogic` action per region | A ported engine (`src/logic/`) that runs a graph search over Randovania's database |
| Per-location rules | Stored on each location object | Gone — locations are presentation-only; rules live in Randovania's data |
| Feature flag | `useRandovaniaLogic` chose old vs. new path | Removed — the engine is the only path |
| Energy/damage | Not modeled | Modeled (binary survivable-or-not, matching Randovania) |

The cutover (milestone Phase 5) deleted the hand-authored path entirely. There is
now exactly one source of truth for "in logic."

---

## 3. The data: Randovania's logic database

Vendored under `public/logic/` and fetched at app start:

- `header.json` — resource database (item/event/trick definitions, **damage
  reductions**), starting config, victory condition.
- One file per region: `Artaria.json`, `Cataris.json`, `Dairon.json`,
  `Burenia.json`, `Ferenia.json`, `Ghavoran.json`, `Elun.json`, `Hanubia.json`,
  `Itorash.json` — each a node graph (rooms → nodes → connections, with a
  requirement on every connection).
- `VERSION.txt` — provenance: which Randovania revision + schema version the data
  was copied from (currently `schema_version=33`, randovania rev `bc3c47879`).

The data is **vendored, not generated at runtime.** To refresh it, re-copy from a
matching Randovania checkout and bump `VERSION.txt`. `assertSchema` fails loudly if
the schema version drifts.

---

## 4. The engine (`src/logic/`)

Pure JavaScript, **zero Vue/Vuex imports, zero Node built-ins** — it runs
identically in the browser bundle and in the Node validation scripts.

| File | Role |
|---|---|
| `index.js` | Public API: `createGameModel(db)`, `recompute(model, resourceState, settings)`, `assertSchema`. |
| `GameModel.js` | Builds a frozen, indexed graph (`nodes`, `adj`, `start`) from the raw JSON. Built once, cached, never mutated. |
| `Requirement.js` | `evaluate(req, state, ctx)` — recursively evaluates a requirement tree (`and`/`or`/`resource`). The `resource` branch covers items, events, tricks, misc, **and damage**. |
| `Reachability.js` | `reach(state, ctx, model)` — fixpoint BFS from the start node, collecting reachable nodes + events until convergence; `reachablePickups()` extracts the reachable pickup indices. |
| `ResourceState.js` | `buildResourceState(obtained, counters, settings, rdb)` — maps the tracker's abilities + counters + preset starting inventory into the Randovania resource shape the engine consumes. |
| `energy.js` | `maxEnergy()`, `reductionMultiplier()`, `damagePasses()` — the damage/energy gate (see §7). |
| `Settings.js` | `defaultSettings(header)` — derives the starter-preset settings (trick level, starting items, strictness) from the DB header. |
| `itemMap.js` | Tracker ability type ↔ Randovania resource-name mapping. |
| `pickupMatch.js` | `LOCATION_PICKUP_MAP` + `pickupIndexFor(region, i)` — binds each tracker checkbox to a Randovania `pickup_index` (see §6). Also the bijection/type assertions. |
| `templates.js` | Expands Randovania requirement "templates" (named sub-requirements) during model build. |

### What `recompute` does

```
recompute(model, resourceState, settings):
  1. Build an evaluation context (ctx): trick levels, misc flags, suits,
     tanks/parts, damage reductions, strictness.
  2. reach() — fixpoint BFS: starting from the start node, repeatedly traverse
     every connection whose requirement evaluate()s true with the current
     items/events, accumulating reachable nodes and discovered events until
     nothing new is reachable.
  3. reachablePickups() — collect the pickup_index of every reachable pickup node.
  4. return { inLogicPickups: Set<pickup_index> }.
```

A location is **in logic iff its `pickup_index` is in `inLogicPickups`.** That's the
whole contract. (Damage gates are enforced *inside* step 2 — an unsurvivable
connection is simply never traversed, so anything behind it is naturally not
reachable. See §7.)

---

## 5. State model (Vuex) and the end-to-end flow

State lives entirely in Vuex (`src/store/`). The modules:

- **Root store** (`src/store/index.js`) — the **single source of truth for minor
  counters**: `missiles`, `energyPart`, `energyFull`, `powerBomb`. These are
  *collected deltas* (the preset's starting ammo is added separately by the
  engine). Also owns `updateAbility` (the recompute-triggering counter action),
  `resetProgress`, `restoreState`, and the persistence plugin.
- **`items` module** — `state.items` is the major-ability list, each
  `{ type, checked, logic }`. `state.minorItems` is now **only the static
  definitions of the five HUD counter buttons** (type/name/icon/amount) — it no
  longer holds live counts. `state.xDefeated` is the "Release the X" flag.
- **`logic` module** — owns the cached `gameModel`, the engine result
  `inLogicPickups`, the active `settings`, and the `recompute` / `setSettings` /
  `load` actions.
- **Region modules** (`artaria` … `hanubia`) — `state.locations` arrays carrying
  **presentation only**: `area`, `top`, `left`, `type`, `amount`, `checked`. No
  reachability rules anymore.

### Two flags per ability: `checked` vs `logic`

Every entry in `items.items` has both:

- **`checked`** — the UI checkbox state (what you see ticked).
- **`logic`** — what the **engine** reads as "obtained." `recompute` builds its
  obtained-ability set from `item.logic`, *not* `item.checked`.

For a normal ability they track together; the split exists to support progressive
chains. The restore path keeps them in sync (see §9.2).

### The data flow, click → color

```
                    ┌─────────────────────── you interact ───────────────────────┐
                    │                          │                       │          │
      ability grid (Tracker.vue)   map location checkbox     +/- ammo widget   Settings
                    │                          │                       │          │
          items/updateArea            root updateAbility       root updateAbility  logic/setSettings
        (toggles item.logic)     (counter += amount, e.g.   (same path — unified   (merges settings)
                    │             missiles/energyFull/…)      in the follow-up fix) │
                    └──────────────┬───────────┴───────────────────────┴──────────┘
                                   ▼
                        dispatch  logic/recompute   ← also runs once after load + restore
                                   ▼
              reads: items[].logic  +  rootState counters  +  logic.settings
                                   ▼
                  buildResourceState → engine reach() → inLogicPickups (Set)
                                   ▼
                       commit  logic/SET_RESULT
                                   ▼
   each region view's `locationStates` computed: shown = inLogicPickups.has(pickupIndexFor(region, i))
                                   ▼
                          checkbox CSS class → color (see §8)
```

Every interaction that can change reachability dispatches `logic/recompute`
unconditionally — there is no flag guard. Trigger sites: ability-grid toggles
(`items/updateArea`), counter/ammo changes and map pickups (root `updateAbility`),
the X-released toggle (`Tracker.checkX`), settings changes (`logic/setSettings`),
the initial `App.vue` → `logic/load`, and `restoreState`.

---

## 6. Binding checkboxes to pickups (`pickupMatch.js`)

Randovania identifies pickups by a numeric `pickup_index`; the tracker identifies
them by array position in a region's `locations`. `LOCATION_PICKUP_MAP` is the
bridge — one array per region, mapping tracker index → `pickup_index`:

```js
pickupIndexFor("artaria", i)  // → the Randovania pickup_index for Artaria location i
```

It has **8 region keys** (Itorash has no pickups, so no key). Each region's array
was derived offline by an **affine-fit** of tracker map coordinates to Randovania
node coordinates (`scripts/match-region.cjs`) and committed verbatim. Two
load-time assertions guard it:

- `assertBijection(region, json)` — every tracker location maps to a unique, valid
  `pickup_index`.
- `assertTypeConsistency(region, json, locs, acceptedMismatches)` — the item type
  shown on the tracker matches the Randovania node's item type (with a small set
  of accepted vanilla-label exceptions, e.g. Cataris `pickup_index` 144).

The three boss pickups (Z-57, Kraid, Drogyga) are included.

---

## 7. The energy / damage model — and why there's no "yellow"

Some connections require taking environmental damage (heat, lava, etc.). The
engine models this exactly the way Randovania does — **binary**:

- `damagePasses(name, amount, ctx)` computes `effective = rawAmount ×
  suitReduction × strictness` and passes iff **`maxEnergy > effective`**.
- `maxEnergy = 99 + 100 × tanks + 25 × parts`.
- `strictness` (a settings value; Dread preset default **1.5**) inflates damage to
  keep the logic conservative.

If a damage gate doesn't pass, `evaluate` returns false → `reach` never traverses
that connection → everything behind it is simply out of logic. So **energy gates
reachability directly**; there is no separate "risky" state.

> **Why this matters / history:** an earlier build had an `energyRisk` overlay that
> painted reachable-but-damaging pickups **yellow** using a 75%-of-max-energy
> heuristic with transitive propagation. We verified against Randovania's resolver
> source (`resource_requirement.py`: `damage < current_energy`) that **Randovania
> has no such "risk" state** — it's binary. The overlay was a tracker invention,
> it was overly aggressive (one early hazard flooded the whole map yellow), so it
> was removed. Energy now only ever gates in/out of logic.

**Known limitation (deferred — "ENERGY-01"):** the engine checks damage against
**max** energy, whereas Randovania tracks **current** energy along the path
(depleting through damage, refilling at save/heal rooms). For a single damage gate
entered at full health they agree; for long chains of damage with no heal between,
the tracker is slightly *more permissive* than Randovania. Path-accurate energy
simulation is a future-milestone item.

---

## 8. Colors

Two things decide a checkbox's color: whether it's **in logic**
(`locationStates[i].shown`) and whether it's **checked** (collected). Checked wins.

| Color | Hex | Meaning |
|---|---|---|
| 🟢 Green | `#1deb38` | In logic / available — reachable now, not yet collected |
| ⬜ Gray | `#888888` | Out of logic — not reachable yet |
| 🔵 Blue | `#2f80ed` | Collected (checkbox checked) |

Colors are defined in `src/App.vue`; the in/out-of-logic span is chosen in each
region view's template. Blue (collected) applies on `:checked` regardless of logic
state, so a ticked box reads blue whether or not it was in logic when ticked.

---

## 9. Persistence & the follow-up fixes (this session)

### 9.1 Persistence (`src/store/persistence.js` + the plugin in `index.js`)

On every mutation (debounced 300 ms) the store snapshots to
`localStorage["mdt:v1"]`:

- `settings` (the logic module's settings)
- `checkedItems` — `{ [abilityType]: checked }`
- `xDefeated`
- `counters` — the root `missiles/energyPart/energyFull/powerBomb`
- `regions` — checked location indices per region

On startup, `main.js` deserializes the blob and dispatches `restoreState` *before*
mounting, then runs one `recompute`. `deserializeState` discards any blob whose
`schemaVersion` doesn't match (so incompatible old saves are ignored, not
mis-applied).

### 9.2 Fix — restore was zeroing the engine flag

`HYDRATE_ITEMS` (the restore mutation) used to set every ability's `logic` flag to
`false` on the assumption that "recompute will re-derive it" — but `recompute`
reads `logic` directly and never re-derives it from `checked`. Result: after a
reload your abilities showed as checked but the engine saw them as *not obtained*,
so most of the map went out of logic. **Fix:** `HYDRATE_ITEMS` now sets
`item.logic = item.checked`, so a reload reflects your collected abilities.

### 9.3 Fix — unified the ammo counters (missiles / PB / energy)

There used to be **two disconnected counters**: the HUD/`+/-` widget wrote
`items.minorItems` (display only — not persisted, not seen by the engine), while
the map checkboxes and the engine used the root counters. Collecting via the
widget didn't save or count; collecting via the map didn't update the HUD.

**Fix:** everything now uses the **root counters** as the single source of truth:

- The `+/-` widget (`Tracker.toggleMinor`) dispatches the root `updateAbility`
  path → updates the counter, **recomputes**, and **persists**.
- The HUD (`Display.vue`) reads the root counters and shows **starting ammo +
  collected** (`missileTotal` / `powerBombTotal`, plus energy parts/tanks).
- Map checkboxes already used this path, so all collection methods now agree.

`items.minorItems` is now only the static button definitions for the widget; its
old `total` fields and the dead `updateMinor`/`SET_MISSILES` mutations remain
in place but unused (flagged for a later cleanup pass).

---

## 10. Validation (there is no test framework)

Per project convention, validation is Node assertion scripts run with `node`:

- `scripts/validate-logic.mjs` — engine correctness battery (all-items reachability,
  monotonicity, energy gate, missile gate, settings wiring, etc.).
- `scripts/parity-artaria.mjs` / `scripts/parity-regions.mjs` — structural
  assertions: bijection + type-consistency + map coverage across all 8 regions.
- `scripts/match-region.cjs` — the offline affine-fit map deriver.

A clean run after a change: `node scripts/validate-logic.mjs && node
scripts/parity-artaria.mjs && node scripts/parity-regions.mjs`, plus `npm run lint`
and `npm run build`. The counter-math UI (energy rotation, ±2/±10 missiles) has no
automated coverage — verify those by hand via `npm run serve`.

---

## 11. Known limitations / backlog

Tracked in `.planning/BACKLOG.md`:

- **ENERGY-01 (deferred):** max-energy vs. path-tracked current-energy (see §7).
- **`xDefeated` not fed to the engine:** the "Release the X" toggle flips
  `xDefeated.logic` and triggers recompute, but `recompute` builds its obtained set
  from `items/inLogic`, which returns only `state.items` and excludes `xDefeated`.
  So the flag currently has no effect on reachability.
- **Map-collected major abilities:** clicking a *major-ability location* on a map
  dispatches `updateAbility` with that ability's type, which only updates a root
  counter — it does **not** set the ability's `items[].logic`. Major abilities are
  registered through the **ability grid**, not the map. (Minor items on the map
  work fine — they map to real counters.)
- **Dead `minorItems` counter code:** see §9.3.
- **Legacy counter bugs:** `FIX_ENERGY` adds 3 parts (not 4); `UPDATE_PROGRESSIVE`
  is partly broken/dead.

These are documented, non-blocking, and slated for a future milestone.

---

## 12. Quick reference — "I want to…"

- **Change what counts as in logic:** it's data-driven — edit Randovania's logic DB
  (`public/logic/`) and re-vendor; don't hand-edit reachability in the app.
- **Add/replace a tracked location:** add a presentation-only object to the region
  module's `locations` (with `top`/`left`/`type`/`amount`) and a matching
  `LOCATION_PICKUP_MAP` entry (re-run `scripts/match-region.cjs`); the bijection
  assertion will tell you if it's wrong.
- **Adjust difficulty/strictness/tricks:** those are `settings` — the SettingsPanel
  drives `logic/setSettings`, which merges and recomputes.
- **Recolor:** `src/App.vue` (`.toggle_switch` = in-logic, `.toggle_switch_noLogic`
  = out-of-logic, `:checked` = collected).

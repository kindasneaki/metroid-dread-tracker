# Requirements: Metroid Dread Tracker — Randovania Logic Port

**Defined:** 2026-06-22
**Core Value:** When the tracker says a location is "in logic," it matches what the actual Randovania randomizer considers reachable for the player's seed/preset.

## v1 Requirements

### Engine (graph reachability)

- [ ] **ENG-01**: Engine evaluates Randovania requirement trees (`and`/`or`/`resource`/`template`, with `negate`) against an obtained-resource state
- [ ] **ENG-02**: Templates are transitively pre-expanded at load (memoized, cycle-guarded) so the hot path resolves no templates
- [ ] **ENG-03**: A fixpoint BFS reach loop traverses the whole-game node graph, collecting event nodes until no new events open
- [ ] **ENG-04**: Trick requirements pass iff the configured trick level ≥ the requirement amount
- [ ] **ENG-05**: Misc/settings requirements (DoorLocks, HighDanger, etc.) evaluate from settings, honoring `negate`
- [ ] **ENG-06**: Damage requirements evaluate as a max-energy gate (energy = 99 + tanks·100 (+parts), reduced by Varia/Gravity and damage_strictness) and flag the location "reachable but risky"
- [ ] **ENG-07**: Engine returns the set of in-logic `pickup_index` given obtained items + settings; one global recompute replaces all per-region `checkLogic`

### Data integration

- [ ] **DAT-01**: Randovania logic JSON (9 region files + `header.json`) is vendored into the repo as a snapshot with provenance (`VERSION.txt`)
- [ ] **DAT-02**: A read-only `scripts/refresh-logic-db.mjs` re-copies the snapshot from a configurable Randovania checkout and records version
- [ ] **DAT-03**: Engine asserts `header.schema_version` at load and fails loudly on drift
- [ ] **DAT-04**: The ~470KB data is served via `fetch`/`public/`, kept out of the JS bundle, and the parsed `GameModel` is cached as immutable

### Mapping (reconciliation)

- [x] **MAP-01**: An explicit `LOCATION_PICKUP_MAP` binds every tracker location to a Randovania `pickup_index` (per-region, array order)
- [x] **MAP-02**: A read-only helper script lists, per region, Randovania pickups (`pickup_index | area | node_name | type | coords`) beside tracker locations to author/verify the map
- [x] **MAP-03**: The 149-vs-146 + Itorash deltas are each resolved (added with map coords, or explicitly excluded with a documented reason)
- [x] **MAP-04**: A dev/load assertion enforces a bijection (every location → a unique valid `pickup_index`; report uncovered indices)
- [x] **MAP-05**: A node-name↔location-`type` consistency assertion flags suspicious pairings for review

### Settings

- [ ] **SET-01**: User can set a global trick level (0–5) that re-triggers reachability
- [ ] **SET-02**: User can toggle DoorLocks, HighDanger, NerfPowerBombs, Teleporters, SeparateBeams, SeparateMissiles
- [ ] **SET-03**: Energy params (energy_per_tank, immediate parts, damage_strictness) and starting location are configurable, defaulting to Randovania's starter preset
- [ ] **SET-04**: Any settings change re-runs only the BFS (model + templates stay cached)
- [ ] **SET-05**: A settings panel UI exposes the above

### Persistence

- [ ] **PER-01**: Seed settings persist to localStorage and restore on load
- [ ] **PER-02**: Progress (checked items and checked locations) persists to localStorage and restores on load

### Migration & validation

- [ ] **MIG-01**: New engine ships behind a `useRandovaniaLogic` flag; region views read in-logic via a getter that switches old vs new path
- [ ] **MIG-02**: Artaria is piloted and validated first; parity diffing logs old-vs-new per-location disagreements
- [ ] **MIG-03**: After all regions validate, the flag default flips and hand-authored `logic`/`requiredLogic`/per-index softlock hacks + per-region `checkLogic` are deleted (presentation data kept)
- [ ] **VAL-01**: `node` assertion scripts cover "no items ⇒ minimal set," "all items + max tricks ⇒ all pickups + victory (Ship)," and hand-checked item-subset → expected-pickup cases
- [ ] **VAL-02**: `CLAUDE.md` architecture section is updated to describe the new engine

## v2 Requirements

### Later milestone

- **HOOK-01**: Live hook into a running Randovania to auto-check collected locations
- **ENERGY-01**: Per-path cumulative energy/damage simulation
- **TRICK-01**: Per-trick override UI
- **TELE-01**: Teleporter/door-rando target remapping

## Out of Scope

| Feature | Reason |
|---------|--------|
| Live Randovania hook (this milestone) | No external API; requires forking Randovania — deferred |
| Per-path energy simulation | Large scope; max-energy gate is sufficient and more faithful than today |
| Per-trick override UI | Global trick level covers most seeds; defer |
| Seed/spoiler import | Not part of the logic-reliability goal |

## Traceability

Which phases cover which requirements. Filled during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| ENG-01..03, DAT-01, MAP-01..03 | Phase 0 | Pending |
| ENG-01..07, DAT-01..04 | Phase 1 | Pending |
| MIG-01, MIG-02, MAP-04, MAP-05, VAL-01 | Phase 2 | Pending |
| SET-01..05, PER-01, PER-02 | Phase 3 | Pending |
| MAP-01..05 (remaining regions) | Phase 4 | Pending |
| MIG-03, VAL-02 | Phase 5 | Pending |

**Coverage:**

- v1 requirements: 28 total
- Mapped to phases: 28
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-22*
*Last updated: 2026-06-22 after initial definition*

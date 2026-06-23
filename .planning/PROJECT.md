# Metroid Dread Tracker — Randovania Logic Port

## What This Is

An interactive item-tracker for Metroid Dread randomizers (Vue 3 + Vuex). It
overlays checkboxes on game-region map images and computes, in real time, which
item locations are currently reachable ("in logic") based on the abilities the
player has collected. This milestone replaces the tracker's hand-authored
reachability rules with a faithful port of Randovania's *actual* Dread logic so
the in-logic computation can be trusted.

## Core Value

When the tracker says a location is "in logic," it must match what the actual
Randovania randomizer considers reachable — for any seed and the player's chosen
trick/settings preset.

## Requirements

### Validated

<!-- Inferred from existing code — already shipped and relied upon. -->

- ✓ Checkbox overlays positioned over each region's map image — existing
- ✓ Per-region map views for the 8 regions (Artaria, Cataris, Dairon, Burenia,
  Ferenia, Ghavoran, Elun, Hanubia) — existing
- ✓ Ability/item tracker grid that toggles obtained abilities — existing
- ✓ Minor-item counters (missiles, energy parts/tanks, power bombs) with the
  4-parts→1-tank rollup — existing
- ✓ Progressive ability chains (bomb→cross-bomb, etc.) — existing
- ✓ Real-time recompute of in-logic / softlock checkbox colors on toggle —
  existing (hand-authored rules — the thing this milestone replaces)

### Active

<!-- This milestone. Hypotheses until shipped and validated. -->

- [ ] Reachability is computed by a real graph engine that consumes Randovania's
  Dread logic JSON (node graph + events + templates), not flat hand-authored rules
- [ ] Each tracker location is bound to a Randovania `pickup_index` via a verified,
  asserted mapping (bijection + type-consistency checks)
- [ ] Trick level and key seed settings (DoorLocks, HighDanger, NerfPowerBombs,
  Teleporters, SeparateBeams/Missiles, energy params, starting location) are
  user-configurable and re-trigger reachability
- [ ] Damage/energy requirements are honored as a max-energy gate, flagged as
  "reachable but risky"
- [ ] Settings and progress (checked items/locations) persist across refresh
  (localStorage)
- [ ] Vendored Randovania logic snapshot with a documented refresh path and a
  schema-version guard

### Out of Scope

- Live hook into a running Randovania client — Randovania exposes no external API;
  would require forking it. Deferred to a later milestone (architecture kept open).
- Per-path cumulative energy/damage simulation — v1 uses a max-energy gate; full
  resolver-accurate energy is a later upgrade.
- Per-trick override UI — v1 uses a single global trick level; per-trick later.
- Teleporter/door-rando *target* remapping — v1 treats them as on/off settings only.
- Seed/spoiler import — not part of the logic-reliability goal.

## Context

- **Source of truth:** Randovania checkout at
  `/Users/rjosephson/Documents/Development/randovania/randovania/games/dread/logic_database/`
  — `header.json` (resource DB: 49 items, 26 tricks, 184 events, 6 misc settings,
  45 requirement templates, damage/energy model, dock-weakness DB, starting
  location) + per-region JSON (`Artaria.json` … plus a 9th region `Itorash.json`).
- Logic is seed-independent: room-connection graph is fixed; only item placement
  varies per seed. Requirements are recursive `and`/`or`/`resource`/`template`
  trees; tricks gated by configured level; misc settings via `negate`.
- **#1 risk — reconciliation:** the tracker's `area` field is a per-region display
  label ("1".."35"), NOT a join key. Randovania has 149 pickups (+ Itorash) vs the
  tracker's 146 locations across 8 regions. Each location must be hand-mapped to a
  `pickup_index` and asserted.
- Current engine: per-region `checkLogic` actions over flat `logic`/`requiredLogic`;
  `items.js` `inLogic` getter is the obtained-ability source of truth;
  `Tracker.vue` toggles items. State is in-memory only today.
- No test framework — lint only (ESLint + Prettier, CRLF line endings).

## Constraints

- **Tech stack**: Vue 3 + Vuex 4 + Vue Router 4, Vue CLI/webpack (not Vite), plain
  JS — match existing conventions, Prettier CRLF.
- **No tests**: validation via `node` assertion scripts + parity diffing, not a
  test runner.
- **Migration safety**: introduce the engine behind a `useRandovaniaLogic` flag;
  pilot Artaria; keep all presentation data; no big-bang rewrite of 8 modules.
- **Data size**: `header.json` ~470KB — serve via `fetch`/`public/`, keep out of
  the JS bundle.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Port logic now; live hook later | No external Randovania API; port is self-contained and helps all users | — Pending |
| Real graph engine over flatten-and-import | Flattening event/state chains is lossy and re-introduces approximation | — Pending |
| Configurable trick level/settings | Reachability changes drastically by preset; needed for cross-seed accuracy | — Pending |
| Persist settings + progress | We're adding a state layer anyway; also fixes refresh-wipe pain | — Pending |
| Damage = max-energy gate (v1) | Per-path energy sim is large scope; gate is strictly more faithful than today | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-22 after initialization*

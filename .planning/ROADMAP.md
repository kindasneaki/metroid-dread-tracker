# Roadmap: Metroid Dread Tracker — Randovania Logic Port

**Created:** 2026-06-22
**Core Value:** When the tracker says a location is "in logic," it matches the actual Randovania randomizer for the player's seed/preset.
**Granularity:** standard · **Mode:** Vertical-ish (engine is shared infra; regions roll out as slices)

Phases are ordered so the riskiest unknowns are proven first (Phase 0 spikes
gate the rest), then the engine is built, piloted on one region behind a flag,
made configurable + persistent, scaled to all regions, and finally cut over.

---

### Phase 0: De-risk spikes

**Goal:** Prove the three project-defining unknowns end-to-end before committing to the full build.
**Success Criteria**:

1. `LOCATION_PICKUP_MAP.artaria` authored and verified; the 149-vs-146 + Itorash deltas have a documented disposition (add/exclude) per pickup.
2. A throwaway-but-real evaluator + fixpoint reach loop runs against the vendored JSON and proves "all items + max tricks ⇒ all pickups + victory (Ship)" and "no items ⇒ minimal start-adjacent set."
3. The damage-as-max-energy gate is validated against a couple of known heat/lava rooms.

**Requirements:** ENG-01, ENG-02, ENG-03, DAT-01, MAP-01, MAP-02, MAP-03 (Artaria scope)
**Risks:** reconciliation off-by-one mis-binds a whole region; event-fixpoint correctness; energy approximation fidelity.

### Phase 1: Engine + data foundation

**Goal:** A production `src/logic/` engine and vendored data that computes in-logic pickups from obtained items + settings.
**Success Criteria**:

1. `ResourceState`, `Requirement`, `templates`, `GameModel`, `Reachability`, `Settings`, `index` implemented; `GameModel` cached immutable.
2. Vendored snapshot under `public/logic/` (fetched at runtime, kept out of the JS bundle) with `VERSION.txt`; `refresh-logic-db.mjs` works; schema-version guard fails loudly on drift.
3. New namespaced `logic` Vuex module with a single `recompute` action returns the in-logic `pickup_index` set (+ energy-risk set).

**Requirements:** ENG-01..ENG-07, DAT-01..DAT-04
**Depends on:** Phase 0
**Plans:** 3 plans
Plans:

- [x] 01-01-PLAN.md — Vendor data snapshot + refresh script + node entrypoint contract + validation battery harness (Wave 1)
- [x] 01-02-PLAN.md — Port the reach engine: templates/evaluator/energy/GameModel(dock overrides)/Reachability/Settings/itemMap/ResourceState (Wave 2)
- [x] 01-03-PLAN.md — Namespaced `logic` Vuex module: async load gate + recompute, registered + triggered at app init (Wave 3)

### Phase 2: Artaria pilot behind a flag

**Goal:** Drive Artaria's checkbox colors from the new engine, validated for parity, with the old path still default.
**Success Criteria**:

1. `useRandovaniaLogic` flag added; Artaria view reads in-logic via a getter that switches old vs new.
2. Bijection + type-consistency assertions pass for Artaria; mis-maps fail loudly in dev.
3. Parity-diff harness logs old-vs-new per-location disagreements; each disagreement is explained (old logic is the approximation).

**Requirements:** MIG-01, MIG-02, MAP-04, MAP-05, VAL-01 (Artaria scope)
**Depends on:** Phase 1
**Plans:** 3 plans
Plans:

- [x] 02-01-PLAN.md — Wave 0: pickupMatch.js (verified map + bijection/type assertions) + parity-artaria.mjs battery (Wave 1)
- [x] 02-02-PLAN.md — useRandovaniaLogic flag + ?rdv=1 read + flag-guarded logic/recompute trigger (Wave 2)
- [x] 02-03-PLAN.md — Flag-aware Artaria.vue computed (index→pickup_index→class) + dev parity warning (Wave 3)

### Phase 3: Configurable settings + persistence

**Goal:** Users set trick level + key settings to match their seed; settings and progress survive refresh.
**Success Criteria**:

1. `SettingsPanel.vue` exposes global trick level + DoorLocks/HighDanger/NerfPowerBombs/Teleporters/SeparateBeams/SeparateMissiles + energy params + starting location; changes re-run only the BFS.
2. Defaults mirror Randovania's starter preset.
3. Settings and progress (checked items + locations) persist to localStorage and restore on load.

**Requirements:** SET-01..SET-05, PER-01, PER-02
**Depends on:** Phase 2
**Plans:** 3 plans
Plans:

- [x] 03-01-PLAN.md — Wave 0: pure persistence.js (serialize/deserialize) + validate-settings.mjs battery (Wave 1)
- [x] 03-02-PLAN.md — logic/setSettings + debounced localStorage plugin + restore-before-mount + reset (Wave 2)
- [x] 03-03-PLAN.md — SettingsPanel.vue (trick level/misc/starting inventory/energy params) + mount + Reset progress (Wave 3)

### Phase 4: Remaining regions

**Goal:** All 8 tracker regions driven by the new engine, each reconciled and asserted.
**Success Criteria**:

1. `LOCATION_PICKUP_MAP` authored for Cataris, Dairon, Burenia, Ferenia, Ghavoran, Elun, Hanubia.
2. Bijection + type assertions pass for every region; all deltas dispositioned.
3. Parity diffing reviewed per region.

**Requirements:** MAP-01..MAP-05 (all regions)
**Depends on:** Phase 3
**Plans:** 4/4 plans complete
Plans:

- [x] 04-01-PLAN.md — Wave 1: generalize match-artaria→match-region.cjs + region-parametric assertBijection/assertTypeConsistency + rdvTypeKeyword extensions (Artaria regression-safe)
- [x] 04-02-PLAN.md — Wave 2: commit 7 region arrays into LOCATION_PICKUP_MAP + add 3 boss pickups (Z-57/141, Kraid/148, Drogyga/140) + fix powerbomb typo
- [x] 04-03-PLAN.md — Wave 3: wire flag-aware locationStates computed into all 7 region views (default OFF)
- [x] 04-04-PLAN.md — Wave 3: scripts/parity-regions.mjs — bijection/typeConsistency/mapCoverage/parity battery across 7 regions + Artaria regression

### Phase 5: Cut over & cleanup

**Goal:** Make the new engine the only engine; remove the hand-authored logic.
**Success Criteria**:

1. `useRandovaniaLogic` flag default flipped on (or removed).
2. Hand-authored `logic`/`requiredLogic`, per-index softlock hacks, and per-region `checkLogic` deleted; presentation data (`area`, `top`, `left`, `type`, `amount`, `checked`) intact.
3. `CLAUDE.md` architecture section updated; `npm run lint` clean; app verified via `npm run serve`.

**Requirements:** MIG-03, VAL-02
**Depends on:** Phase 4
**Plans:** 3/5 plans executed
Plans:

- [x] 05-01-PLAN.md — Remove useRandovaniaLogic flag + ?rdv reader; make every recompute dispatch unconditional (Wave 1)
- [x] 05-02-PLAN.md — Delete checkLogic/UPDATE_LOGIC + per-location logic fields in artaria/cataris/dairon/burenia (Wave 1)
- [x] 05-03-PLAN.md — Delete checkLogic/UPDATE_LOGIC + per-location logic fields in ferenia/ghavoran/elun/hanubia (Wave 1)
- [ ] 05-04-PLAN.md — Simplify all 8 region views to engine-only locationStates; drop parityWarnings/watch/mounted (Wave 2)
- [ ] 05-05-PLAN.md — Strip legacy parity-script cases + rewrite CLAUDE.md + phase grep/full-suite gate (Wave 2)

---

## Out of this roadmap (later milestone)

Live Randovania hook (HOOK-01), per-path energy sim (ENERGY-01), per-trick UI
(TRICK-01), teleporter/door-rando target remapping (TELE-01).

---
*Roadmap created: 2026-06-22*

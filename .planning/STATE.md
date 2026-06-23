# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-22)

**Core value:** When the tracker says a location is "in logic," it matches the actual Randovania randomizer for the player's seed/preset.
**Current focus:** Phase 0 — De-risk spikes (reconciliation, engine core, energy)

## Status

- Milestone: v1 — Randovania logic port
- Phase: 0 (De-risk spikes) — not yet planned/executed
- Mode: yolo · Granularity: standard · Research+PlanCheck+Verifier: on

## Next Action

Run `/gsd-plan-phase 1` to plan the first execution phase, or proceed with the
Phase 0 spikes directly (reconciliation helper + engine-core proof + energy check).

## Notes / Open Risks

- #1 risk: location↔`pickup_index` reconciliation (149 + Itorash vs 146/8 regions).
- Randovania source of truth: `/Users/rjosephson/Documents/Development/randovania/randovania/games/dread/logic_database/`.
- No test framework — validate via `node` assertion scripts + parity diffing.

---
*Last updated: 2026-06-22 after initialization*

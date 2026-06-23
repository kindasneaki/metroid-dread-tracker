/**
 * src/logic/Reachability.js
 *
 * Fixpoint BFS reachability engine for the Randovania node graph.
 *
 * Ported from scripts/spike/engine.cjs reach() + reachablePickups() (re-verified:
 * 7 fixpoint passes to converge with all items; 149/149 pickups + Ship victory).
 * Adds energy-risk collection (ENG-06/D-06) as a post-pass over reachable pickups.
 *
 * IMPORTANT: ZERO Node built-in imports. ZERO Vue/Vuex imports.
 * The frozen GameModel is NEVER mutated — reach writes only to the per-call state.events Set.
 */

import { evaluate } from "./Requirement.js";
import { damagePasses } from "./energy.js";

/**
 * Fixpoint BFS from model.start, collecting event_name into state.events until convergence.
 *
 * Anti-Pattern: never write back into the frozen model during this loop. Only state.events
 * is mutated, and state is a per-call object the caller owns.
 *
 * @param {object} state - { items: {[name]: number}, events: Set<string> }
 *   state.events is MUTATED in place as events are discovered
 * @param {object} ctx - evaluation context:
 *   { trickLevels, misc, suits, tanks, parts, immediateParts, strictness, damageReductions }
 * @param {Readonly<object>} model - frozen GameModel from createGameModel
 * @returns {{ reachable: Set<string>, passes: number }}
 */
export function reach(state, ctx, model) {
  const reachable = new Set();
  let changed = true;
  let passes = 0;

  while (changed) {
    changed = false;
    passes++;
    const stack = [model.start];
    const visited = new Set([model.start]);

    while (stack.length) {
      const n = stack.pop();
      reachable.add(n);

      const node = model.nodes[n];
      if (node && node.node_type === "event" && node.event_name) {
        if (!state.events.has(node.event_name)) {
          state.events.add(node.event_name);
          changed = true;
        }
      }

      for (const e of model.adj[n] || []) {
        if (visited.has(e.to)) continue;
        if (!model.nodes[e.to]) continue; // dangling target
        if (evaluate(e.req, state, ctx)) {
          visited.add(e.to);
          stack.push(e.to);
        }
      }
    }
  }

  return { reachable, passes };
}

/**
 * Collect the sorted pickup_index array of reachable pickup nodes.
 *
 * @param {Set<string>} reachable - set of reachable node ids from reach()
 * @param {Readonly<object>} model - frozen GameModel
 * @returns {number[]} sorted array of pickup_index values
 */
export function reachablePickups(reachable, model) {
  const idxs = [];
  for (const n of reachable) {
    const node = model.nodes[n];
    if (node && node.node_type === "pickup") idxs.push(node.pickup_index);
  }
  return idxs.sort((a, b) => a - b);
}

/**
 * Energy-risk collector (ENG-06/D-06).
 *
 * v1 predicate (A2 — documented and tunable):
 * A reachable pickup is "risky" if any outgoing edge on its SHORTEST path includes a damage
 * requirement that PASSES but whose effective damage is within 25% of maxEnergy. In practice
 * we scan all edges incident to reachable nodes and flag the destination pickup if a damage
 * sub-requirement on any edge along the path has eff/maxEnergy >= 0.75.
 *
 * This is an over-approximation (all edges, not just the satisfying path), but it is
 * conservative, deterministic, fast, and tunable. The exact margin (RISK_RATIO) is the
 * documented parameter.
 *
 * @param {Set<string>} reachable - set of reachable node ids
 * @param {object} state - { items, events }
 * @param {object} ctx - same ctx as reach()
 * @param {Readonly<object>} model - frozen GameModel
 * @returns {Set<number>} set of pickup_index values flagged as risky
 */
const RISK_RATIO = 0.75; // flag pickup when effective damage >= 75% of maxEnergy

export function collectEnergyRisk(reachable, state, ctx, model) {
  const { maxEnergy: computeMax } = _energyHelpers(ctx);
  const me = computeMax();

  // Phase 1: find all nodes that are entered via a risky damage edge
  const riskyEntryNodes = new Set();
  for (const n of reachable) {
    for (const e of model.adj[n] || []) {
      if (!reachable.has(e.to)) continue; // only traversed edges
      if (!evaluate(e.req, state, ctx)) continue; // edge wasn't traversed
      if (_hasRiskyDamage(e.req, ctx, me)) {
        riskyEntryNodes.add(e.to);
      }
    }
  }

  // Phase 2: propagate risk transitively through the reachable subgraph.
  // All pickups reachable FROM a risky-entry node (including the entry node itself
  // if it's a pickup) are flagged as risky.
  const risky = new Set();
  for (const start of riskyEntryNodes) {
    // BFS/DFS within the already-reachable subgraph
    const visited = new Set([start]);
    const stack = [start];
    while (stack.length) {
      const cur = stack.pop();
      const node = model.nodes[cur];
      if (node && node.node_type === "pickup" && node.pickup_index != null) {
        risky.add(node.pickup_index);
      }
      for (const e of model.adj[cur] || []) {
        if (!reachable.has(e.to)) continue;
        if (visited.has(e.to)) continue;
        if (evaluate(e.req, state, ctx)) {
          visited.add(e.to);
          stack.push(e.to);
        }
      }
    }
  }

  return risky;
}

// ── Internal helpers ──────────────────────────────────────────────────────────

/**
 * Extract a maxEnergy thunk from ctx (avoids importing maxEnergy directly,
 * keeping the coupling to damagePasses/energy.js minimal).
 */
function _energyHelpers(ctx) {
  return {
    maxEnergy: () => {
      const BASE = 99;
      const PER_TANK = 100;
      return (
        BASE +
        (ctx.tanks || 0) * PER_TANK +
        (ctx.immediateParts ? (ctx.parts || 0) * (PER_TANK / 4) : 0)
      );
    },
  };
}

/**
 * Recursively check if a (pre-expanded) requirement tree contains a `damage` leaf
 * that passes but is within the risk margin of maxEnergy.
 *
 * @param {object} req - expanded requirement node
 * @param {object} ctx
 * @param {number} me - current maxEnergy
 * @returns {boolean}
 */
function _hasRiskyDamage(req, ctx, me) {
  if (!req) return false;
  if (req.type === "and" || req.type === "or") {
    return req.data.items.some((r) => _hasRiskyDamage(r, ctx, me));
  }
  if (req.type === "resource" && req.data.type === "damage") {
    const { ok, eff } = damagePasses(req.data.name, req.data.amount, ctx);
    if (ok && me > 0 && eff / me >= RISK_RATIO) return true;
  }
  return false;
}

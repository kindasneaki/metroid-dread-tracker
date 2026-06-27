/**
 * src/logic/Reachability.js
 *
 * Fixpoint BFS reachability engine for the Randovania node graph.
 *
 * Ported from scripts/spike/engine.cjs reach() + reachablePickups() (re-verified:
 * 7 fixpoint passes to converge with all items; 149/149 pickups + Ship victory).
 * Energy/damage gates reachability directly via evaluate() → damagePasses() — a
 * damage edge you cannot survive is simply not traversed (out of logic), matching
 * Randovania's binary `damage < energy` model. There is no separate "risk" state.
 *
 * IMPORTANT: ZERO Node built-in imports. ZERO Vue/Vuex imports.
 * The frozen GameModel is NEVER mutated — reach writes only to the per-call state.events Set.
 */

import { evaluate } from "./Requirement.js";

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

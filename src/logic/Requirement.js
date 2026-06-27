/**
 * src/logic/Requirement.js
 *
 * Requirement evaluator for the Randovania reachability engine.
 *
 * Ported from scripts/spike/engine.cjs lines 52-91 (re-verified: handles all resource
 * types present in Dread logic data). Converted to ESM. The `damage` branch now
 * delegates to energy.damagePasses() instead of the spike's crude ctx.maxEnergy > amount,
 * so suit reductions and strictness apply (ENG-06).
 *
 * IMPORTANT: ZERO Node built-in imports. ZERO Vue/Vuex imports.
 *
 * @param {object} req - expanded requirement tree node (no `type:"template"` after expansion)
 * @param {object} state - { items: {[name]: number}, events: Set<string> }
 * @param {object} ctx - {
 *   trickLevels: {[name]: number},
 *   misc: {[name]: number},
 *   suits: Set<string>,
 *   tanks: number,
 *   parts: number,
 *   immediateParts: boolean,
 *   strictness: number,
 *   damageReductions: Array,
 * }
 */

import { damagePasses } from "./energy.js";

/**
 * Evaluate a (pre-expanded) requirement tree against state + context.
 *
 * @param {object} req - requirement node
 * @param {object} state
 * @param {object} ctx
 * @returns {boolean}
 */
export function evaluate(req, state, ctx) {
  switch (req.type) {
    case "and":
      return req.data.items.every((r) => evaluate(r, state, ctx));
    case "or":
      return req.data.items.length === 0
        ? false
        : req.data.items.some((r) => evaluate(r, state, ctx));
    case "resource": {
      const d = req.data;
      let pass;
      switch (d.type) {
        case "items":
          pass = (state.items[d.name] || 0) >= d.amount;
          break;
        case "events":
          pass = state.events.has(d.name);
          break;
        case "tricks":
          pass = (ctx.trickLevels[d.name] || 0) >= d.amount;
          break;
        case "misc":
          pass = (ctx.misc[d.name] || 0) >= d.amount;
          break;
        case "damage":
          // ENG-06: max-energy gate with suit reductions and strictness
          pass = damagePasses(d.name, d.amount, ctx).ok;
          break;
        case "versions":
          pass = true; // not seed-relevant for reachability
          break;
        default:
          pass = false;
      }
      return d.negate ? !pass : pass;
    }
    default:
      return false;
  }
}

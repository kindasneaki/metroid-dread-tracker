/**
 * src/logic/templates.js
 *
 * Memoized, cycle-guarded template pre-expansion for Randovania requirement trees.
 *
 * Ported verbatim from scripts/spike/engine.cjs lines 24-49 (re-verified: 45 templates
 * expand cleanly). Converted to ESM with injected rdb instead of module-level fs reads.
 *
 * IMPORTANT: ZERO Node built-in imports. ZERO Vue/Vuex imports.
 * Data arrives as a parsed JS object (from fetch in browser, from fs in node scripts).
 */

/**
 * Create a memoized, cycle-guarded template expander for the given resource database.
 *
 * @param {object} rdb - db.header.resource_database (the parsed requirement_template map lives here)
 * @returns {function(req: object, seen?: Set): object} expand(req, seen) - fully expanded requirement
 */
export function makeExpander(rdb) {
  const cache = new Map();

  function expand(req, seen) {
    if (!req) return { type: "and", data: { items: [] } }; // trivial
    if (req.type === "template") {
      const name = req.data;
      if (cache.has(name)) return cache.get(name);
      if (seen && seen.has(name)) {
        // cycle: treat as impossible to break recursion (should not happen in practice)
        return { type: "or", data: { items: [] } };
      }
      const nextSeen = new Set(seen || []);
      nextSeen.add(name);
      const tdef = rdb.requirement_template[name];
      const out = expand(tdef.requirement, nextSeen);
      cache.set(name, out);
      return out;
    }
    if (req.type === "and" || req.type === "or") {
      return {
        type: req.type,
        data: { items: req.data.items.map((r) => expand(r, seen)) },
      };
    }
    return req; // resource leaf
  }

  return expand;
}

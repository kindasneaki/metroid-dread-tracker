/**
 * src/logic/GameModel.js
 *
 * Builds the immutable Randovania node graph (GameModel) from the vendored logic database.
 *
 * Ported from scripts/spike/engine.cjs buildGraph() (re-verified: 1860 nodes, 149 pickups).
 * Adds the three correctness deltas skipped by the spike:
 *   1. Honor override_default_open_requirement / override_default_lock_requirement on docks
 *      (8 docks in the Dread dataset carry non-null overrides)
 *   2. Graph is returned as Object.freeze() (DAT-04 immutable)
 *   3. All templates pre-expanded at build time — hot path resolves no template nodes (ENG-02)
 *
 * IMPORTANT: ZERO Node built-in imports. ZERO Vue/Vuex imports.
 * Data arrives as a parsed JS object (db.header + db.regions).
 */

import { makeExpander } from "./templates.js";

const REGION_NAMES = [
  "Artaria",
  "Cataris",
  "Dairon",
  "Burenia",
  "Ferenia",
  "Ghavoran",
  "Elun",
  "Hanubia",
  "Itorash",
];

/**
 * Compose a node id from region, area, and node name.
 * Format: "Region|Area|Node" (matches the spike's id() helper)
 *
 * @param {string} region
 * @param {string} area
 * @param {string} node
 * @returns {string}
 */
function nodeId(region, area, node) {
  return region + "|" + area + "|" + node;
}

/**
 * Compute the traversal requirement for a dock node.
 *
 * ENG-01 correctness fix vs spike: prefer node.override_default_open_requirement over
 * the weakness DB open requirement, and node.override_default_lock_requirement over the
 * lock requirement, falling back to the weakness DB. Both are expanded through templates.
 *
 * @param {object} node - dock node object from the region JSON
 * @param {object} dockTypes - header.dock_weakness_database.types
 * @param {function} expand - template-expanding function from makeExpander
 * @returns {object} expanded and/or requirement
 */
function dockRequirement(node, dockTypes, expand) {
  const t = dockTypes[node.dock_type];
  const w = t ? t.items[node.default_dock_weakness] : null;

  // Prefer node-level overrides; fall back to the weakness DB defaults
  const open =
    node.override_default_open_requirement !== null &&
    node.override_default_open_requirement !== undefined
      ? node.override_default_open_requirement
      : w
        ? w.requirement
        : null;

  const lockW = w ? w.lock : null;
  const lock =
    node.override_default_lock_requirement !== null &&
    node.override_default_lock_requirement !== undefined
      ? node.override_default_lock_requirement
      : lockW
        ? lockW.requirement
        : null;

  const parts = [];
  if (open) parts.push(expand(open));
  if (lock) parts.push(expand(lock));
  return { type: "and", data: { items: parts } };
}

/**
 * Build the global node graph from the vendored logic database.
 *
 * DAT-04: Returns an Object.freeze'd GameModel. The frozen model is safe to cache and
 * share across concurrent recompute calls — reach mutates only its per-call state.events,
 * never the model itself.
 *
 * @param {{ header: object, regions: object }} db
 *   db.header — parsed header.json (resource_database, dock_weakness_database, starting_location)
 *   db.regions — { Artaria: {...}, Cataris: {...}, ... } — one entry per region name
 * @returns {Readonly<{
 *   nodes: object,
 *   adj: object,
 *   pickupCount: number,
 *   start: string,
 *   rdb: object,
 *   dockTypes: object
 * }>} frozen GameModel
 */
export function createGameModel(db) {
  const rdb = db.header.resource_database;
  const dockTypes = db.header.dock_weakness_database.types;

  // Template expander — memoized per this model build (ENG-02)
  const expand = makeExpander(rdb);

  const nodes = {}; // nodeId -> { node_type, event_name, pickup_index, region }
  const adj = {}; // nodeId -> [{ to: string, req: object }]
  let pickupCount = 0;

  for (const regionName of REGION_NAMES) {
    const regionData = db.regions[regionName];
    if (!regionData) continue;

    for (const [areaName, area] of Object.entries(regionData.areas)) {
      for (const [nodeName, node] of Object.entries(area.nodes)) {
        const nid = nodeId(regionName, areaName, nodeName);

        nodes[nid] = {
          node_type: node.node_type,
          event_name: node.event_name || null,
          pickup_index: node.pickup_index != null ? node.pickup_index : null,
          region: regionName,
        };

        if (node.node_type === "pickup") pickupCount++;
        adj[nid] = adj[nid] || [];

        // Intra-area connections — expand templates once at build time (ENG-02)
        for (const [target, req] of Object.entries(node.connections || {})) {
          adj[nid].push({
            to: nodeId(regionName, areaName, target),
            req: expand(req),
          });
        }

        // Dock default_connection (cross-area / cross-region crossing)
        if (node.node_type === "dock" && node.default_connection) {
          const dc = node.default_connection;
          adj[nid].push({
            to: nodeId(dc.region, dc.area, dc.node),
            req: dockRequirement(node, dockTypes, expand),
          });
        }
      }
    }
  }

  // Starting location
  const sl = db.header.starting_location;
  const start = nodeId(sl.region, sl.area, sl.node);

  // DAT-04: freeze the model — never mutate it during reach
  return Object.freeze({ nodes, adj, pickupCount, start, rdb, dockTypes });
}

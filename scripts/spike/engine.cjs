/* eslint-disable */
// Phase 0 Spike B — prove a faithful reach engine over Randovania's Dread JSON.
// Self-contained, reads directly from the Randovania checkout (Phase 1 vendors the data).
// Run: node scripts/spike/engine.cjs
const fs = require("fs");
const path = require("path");

const DIR =
  process.env.RDV_DREAD_DB ||
  "/Users/rjosephson/Documents/Development/randovania/randovania/games/dread/logic_database/";
const REGIONS = [
  "Artaria", "Cataris", "Dairon", "Burenia", "Ferenia",
  "Ghavoran", "Elun", "Hanubia", "Itorash",
];

function load(name) {
  return JSON.parse(fs.readFileSync(path.join(DIR, name), "utf8"));
}

const header = load("header.json");
const rdb = header.resource_database;
const dockTypes = header.dock_weakness_database.types;

// ---------- template pre-expansion (memoized, cycle-guarded) ----------
const templateCache = new Map();
function expand(req, seen) {
  if (!req) return { type: "and", data: { items: [] } }; // trivial
  if (req.type === "template") {
    const name = req.data;
    if (templateCache.has(name)) return templateCache.get(name);
    if (seen && seen.has(name)) {
      // cycle: treat as impossible to break recursion (should not happen in practice)
      return { type: "or", data: { items: [] } };
    }
    const nextSeen = new Set(seen || []);
    nextSeen.add(name);
    const tdef = rdb.requirement_template[name];
    const out = expand(tdef.requirement, nextSeen);
    templateCache.set(name, out);
    return out;
  }
  if (req.type === "and" || req.type === "or") {
    return {
      type: req.type,
      data: { items: req.data.items.map((r) => expand(r, seen)) },
    };
  }
  return req; // resource — leaf
}

// ---------- requirement evaluator ----------
function evaluate(req, state, ctx) {
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
          // Spike: max-energy gate (Phase 0 Spike C refines reductions/strictness)
          pass = ctx.maxEnergy > d.amount;
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

// ---------- build the global node graph ----------
// nodeId = "Region|Area|Node"
function id(r, a, n) {
  return r + "|" + a + "|" + n;
}

function dockRequirement(node) {
  // combined open + lock requirement for traversing a vanilla dock
  const t = dockTypes[node.dock_type];
  if (!t) return { type: "and", data: { items: [] } };
  const w = t.items[node.default_dock_weakness];
  if (!w) return { type: "and", data: { items: [] } };
  const parts = [];
  if (w.requirement) parts.push(expand(w.requirement));
  if (w.lock && w.lock.requirement) parts.push(expand(w.lock.requirement));
  return { type: "and", data: { items: parts } };
}

function buildGraph() {
  const nodes = {}; // id -> {node_type, event_name, pickup_index}
  const adj = {}; // id -> [{to, req}]
  let pickupCount = 0;

  for (const region of REGIONS) {
    const R = load(region + ".json");
    for (const [areaName, area] of Object.entries(R.areas)) {
      for (const [nodeName, node] of Object.entries(area.nodes)) {
        const nid = id(region, areaName, nodeName);
        nodes[nid] = {
          node_type: node.node_type,
          event_name: node.event_name,
          pickup_index: node.pickup_index,
          region,
        };
        if (node.node_type === "pickup") pickupCount++;
        adj[nid] = adj[nid] || [];
        // intra-area connections
        for (const [target, req] of Object.entries(node.connections || {})) {
          adj[nid].push({ to: id(region, areaName, target), req: expand(req) });
        }
        // dock default_connection (cross-area / cross-region)
        if (node.node_type === "dock" && node.default_connection) {
          const dc = node.default_connection;
          adj[nid].push({
            to: id(dc.region, dc.area, dc.node),
            req: dockRequirement(node),
          });
        }
      }
    }
  }
  return { nodes, adj, pickupCount };
}

// ---------- fixpoint reach loop ----------
function reach(state, ctx, graph, startId) {
  const reachable = new Set();
  let changed = true;
  let passes = 0;
  while (changed) {
    changed = false;
    passes++;
    const stack = [startId];
    const visited = new Set([startId]);
    while (stack.length) {
      const n = stack.pop();
      reachable.add(n);
      const node = graph.nodes[n];
      if (node && node.node_type === "event" && node.event_name) {
        if (!state.events.has(node.event_name)) {
          state.events.add(node.event_name);
          changed = true;
        }
      }
      for (const e of graph.adj[n] || []) {
        if (visited.has(e.to)) continue;
        if (!graph.nodes[e.to]) continue; // dangling target
        if (evaluate(e.req, state, ctx)) {
          visited.add(e.to);
          stack.push(e.to);
        }
      }
    }
  }
  return { reachable, passes };
}

function reachablePickups(reachable, graph) {
  const idxs = [];
  for (const n of reachable) {
    const node = graph.nodes[n];
    if (node && node.node_type === "pickup") idxs.push(node.pickup_index);
  }
  return idxs.sort((a, b) => a - b);
}

// ---------- contexts ----------
function allItemsState() {
  const items = {};
  for (const [k, v] of Object.entries(rdb.items)) {
    items[k] = v.max_capacity || 1;
  }
  return { items, events: new Set() };
}
function noItemsState() {
  // Dread starts with Power Beam only
  return { items: { Power: 1 }, events: new Set() };
}
function ctx(trickLevel, miscOverrides, maxEnergy) {
  const trickLevels = {};
  for (const k of Object.keys(rdb.tricks)) trickLevels[k] = trickLevel;
  const misc = {
    SeparateBeams: 0, SeparateMissiles: 0, DoorLocks: 0,
    HighDanger: 0, Teleporters: 0, NerfPowerBombs: 0,
    ...(miscOverrides || {}),
  };
  return { trickLevels, misc, maxEnergy };
}

// ---------- run proofs ----------
const START = id(
  header.starting_location.region,
  header.starting_location.area,
  header.starting_location.node
);
console.log("templates expanded:", rdb.requirement_template ? Object.keys(rdb.requirement_template).length : 0);
const graph = buildGraph();
console.log("graph nodes:", Object.keys(graph.nodes).length, "| total pickups:", graph.pickupCount);
console.log("start node:", START, graph.nodes[START] ? "(found)" : "(MISSING!)");

console.log("\n=== TEST 1: all items + max tricks + HighDanger ⇒ everything reachable ===");
{
  const state = allItemsState();
  const c = ctx(5, { HighDanger: 1 }, 1e9);
  const { reachable, passes } = reach(state, c, graph, START);
  const pk = reachablePickups(reachable, graph);
  console.log("fixpoint passes:", passes);
  console.log("reachable pickups:", pk.length, "/", graph.pickupCount);
  console.log("victory (Ship event reached):", state.events.has("Ship"));
  if (pk.length < graph.pickupCount) {
    const all = new Set();
    for (const n in graph.nodes) if (graph.nodes[n].node_type === "pickup") all.add(graph.nodes[n].pickup_index);
    const missing = [...all].filter((i) => !pk.includes(i)).sort((a, b) => a - b);
    console.log("MISSING pickup_index:", missing.slice(0, 40), missing.length > 40 ? "..." : "");
  }
}

console.log("\n=== TEST 2: no items (Power Beam only) + tricks disabled ⇒ minimal set ===");
{
  const state = noItemsState();
  const c = ctx(0, {}, 99);
  const { reachable, passes } = reach(state, c, graph, START);
  const pk = reachablePickups(reachable, graph);
  console.log("fixpoint passes:", passes);
  console.log("reachable pickups:", pk.length, "/", graph.pickupCount);
  console.log("pickup_index set:", pk);
  console.log("victory (Ship):", state.events.has("Ship"));
}

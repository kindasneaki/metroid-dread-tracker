/* eslint-disable */
// Phase 4: Generalized region reconciliation via affine fit.
// Generalizes scripts/spike/match-artaria.cjs to work for any region.
//
// Fit game-world (x,y) -> tracker map (left,top) using same-type anchor pairs.
// Anchor strategy: tracker locations whose trkType matches exactly one RDV pickup
// of the same type (unambiguous identity pairs).
//
// Run: node scripts/match-region.cjs <region>
// e.g. node scripts/match-region.cjs cataris
const fs = require("fs");

const region = process.argv[2];
if (!region) {
  console.error("Usage: node scripts/match-region.cjs <region>  (e.g. cataris)");
  process.exit(1);
}
const Region = region[0].toUpperCase() + region.slice(1);
const RDV = `public/logic/${Region}.json`;
const TRK = `src/store/modules/${region}.js`;

// Boss pickups to exclude from regular matching (emitted in a separate section instead)
const BOSS_PIS = { cataris: [141, 148], burenia: [140] };
const bossPisForRegion = new Set(BOSS_PIS[region] || []);

// ---- Randovania pickups: index, node name, type, game coords ----
const R = JSON.parse(fs.readFileSync(RDV, "utf8"));

function rdvType(node) {
  if (/Charge Beam/.test(node)) return "major:charge";
  if (/Varia Suit/.test(node)) return "major:varia";
  if (/Grapple Beam/.test(node)) return "major:grapple";
  if (/Screw Attack/.test(node)) return "major:screw";
  if (/Phantom Cloak/.test(node)) return "major:cloak";
  if (/Spider Magnet/.test(node)) return "major:magnet";
  if (/Energy Tank/.test(node)) return "etank";
  if (/Energy Part/.test(node)) return "epart";
  if (/Power Bomb/.test(node)) return "pb";
  if (/Missile\+ Tank/.test(node)) return "missile+";
  if (/Missile Tank/.test(node)) return "missile";
  // New-region major ability types:
  if (/Morph Ball/.test(node)) return "major:morphBall";
  if (/Diffusion Beam/.test(node)) return "major:diffusionBeam";
  if (/Wide Beam/.test(node)) return "major:wideBeam";
  if (/Cross Bomb/.test(node)) return "major:crossBomb";  // must precede /Bomb/
  if (/Bomb/.test(node)) return "major:bomb";
  if (/Speed Booster/.test(node)) return "major:speedBooster";
  if (/Gravity Suit/.test(node)) return "major:gravitySuit";
  if (/Flash Shift/.test(node)) return "major:flashShift";
  if (/Space Jump/.test(node)) return "major:spaceJump";
  if (/Storm Missile/.test(node)) return "major:stormMissiles";
  if (/Wave Beam/.test(node)) return "major:waveBeam";
  if (/Super Missile/.test(node)) return "major:superMissiles";
  if (/Spin Boost/.test(node)) return "major:spinBoost";
  if (/Pulse Radar/.test(node)) return "major:pulseRadar";
  if (/Plasma Beam/.test(node)) return "major:plasmaBeam";
  if (/Ice Missile/.test(node)) return "major:iceMissiles";
  return "?";
}

const rdv = [];
const rdvBoss = []; // boss pickups stored separately
for (const [an, area] of Object.entries(R.areas))
  for (const [nn, node] of Object.entries(area.nodes))
    if (node.node_type === "pickup") {
      const entry = { pi: node.pickup_index, area: an, node: nn, type: rdvType(nn), x: node.coordinates.x, y: node.coordinates.y };
      if (bossPisForRegion.has(node.pickup_index)) {
        rdvBoss.push(entry);
      } else {
        rdv.push(entry);
      }
    }

// ---- Tracker locations: index, area, type, map px ----
const src = fs.readFileSync(TRK, "utf8");

function trkType(t, amount) {
  if (t === "missiles") return amount >= 10 ? "missile+" : "missile";
  if (t === "energyPart") return "epart";
  if (t === "energyFull") return "etank";
  if (t === "powerBomb") return "pb";
  if (t === "chargeBeam") return "major:charge";
  if (t === "variaSuit") return "major:varia";
  if (t === "grappleBeam") return "major:grapple";
  if (t === "screwAttack") return "major:screw";
  if (t === "phantomCloak") return "major:cloak";
  if (t === "spiderMagnet") return "major:magnet";
  return "major:" + t; // catch-all covers all new major ability types
}

const trk = [];
const parts = src.split(/\n\s*area:\s*/).slice(1);
parts.forEach((p, i) => {
  const area = (p.match(/^"([^"]*)"/) || [])[1];
  const type = (p.match(/type:\s*"([^"]+)"/) || [])[1];
  const amount = +((p.match(/amount:\s*(\d+)/) || [])[1] || 0);
  const top = +((p.match(/top:\s*"margin-top:\s*(\d+)/) || [])[1] || 0);
  const left = +((p.match(/left:\s*"left:\s*(\d+)/) || [])[1] || 0);
  trk.push({ i, area, type: trkType(type, amount), top, left });
});

// ---- Anchor selection: unambiguous same-type identity pairs ----
// A pair is unambiguous if both the RDV set and the tracker set contain exactly 1
// pickup of that type (so the pairing is forced). This matches the Artaria spike
// logic (6 major ability types, each unique in both sets).
const rdvByType = {};
for (const p of rdv) (rdvByType[p.type] = rdvByType[p.type] || []).push(p);
const trkByType = {};
for (const t of trk) (trkByType[t.type] = trkByType[t.type] || []).push(t);

const anchors = [];
for (const [type, rdvList] of Object.entries(rdvByType)) {
  const trkList = trkByType[type] || [];
  if (rdvList.length === 1 && trkList.length === 1) {
    // Unambiguous 1-to-1 pair — use as anchor
    anchors.push({ r: rdvList[0], t: trkList[0] });
  }
}

// Hanubia (0 unique types): use all same-type pairs as soft anchors.
// The soft anchors create a biased fit but the 4-location count limits ambiguity.
const softAnchorFallback = anchors.length === 0;
if (softAnchorFallback) {
  console.log("  (no unambiguous 1:1 type pairs; using all same-type pairs as soft anchors)");
  for (const [type, rdvList] of Object.entries(rdvByType)) {
    const trkList = trkByType[type] || [];
    for (const r of rdvList) {
      for (const t of trkList) {
        anchors.push({ r, t });
      }
    }
  }
}

// solve A for [left|top] = A . [x, y, 1] via normal equations (3x3)
function solveAffine(samples, target) {
  let M = [[0,0,0],[0,0,0],[0,0,0]], b = [0,0,0];
  for (const s of samples) {
    const v = [s.x, s.y, 1], tv = target(s);
    for (let i=0;i<3;i++){ for(let j=0;j<3;j++) M[i][j]+=v[i]*v[j]; b[i]+=v[i]*tv; }
  }
  return solve3(M, b);
}
function solve3(M, b) {
  const A = M.map((r,i)=>[...r,b[i]]);
  for (let c=0;c<3;c++){
    let piv=c; for(let r=c+1;r<3;r++) if(Math.abs(A[r][c])>Math.abs(A[piv][c])) piv=r;
    [A[c],A[piv]]=[A[piv],A[c]];
    for(let r=0;r<3;r++){ if(r===c) continue; const f=A[r][c]/A[c][c]; for(let k=c;k<4;k++) A[r][k]-=f*A[c][k]; }
  }
  return [A[0][3]/A[0][0], A[1][3]/A[1][1], A[2][3]/A[2][2]];
}

let PL, PT;
if (anchors.length >= 1) {
  PL = solveAffine(anchors.map(a=>({x:a.r.x,y:a.r.y, t:a.t.left})), (s)=>s.t);
  PT = solveAffine(anchors.map(a=>({x:a.r.x,y:a.r.y, t:a.t.top})), (s)=>s.t);
} else {
  PL = [0, 0, 0];
  PT = [0, 0, 0];
}

const predLeft = (x,y)=>PL[0]*x+PL[1]*y+PL[2];
const predTop  = (x,y)=>PT[0]*x+PT[1]*y+PT[2];

console.log(`=== ${region}: anchor residuals (px) — must be small for fit to be trustworthy ===`);
console.log(`  anchors used: ${anchors.length} (${softAnchorFallback ? "soft" : "identity"})`);
let maxRes=0;
const uniqAnchors = softAnchorFallback ? [] : anchors; // only check residuals for true identity pairs
for (const a of uniqAnchors) {
  const dl = predLeft(a.r.x,a.r.y)-a.t.left, dt = predTop(a.r.x,a.r.y)-a.t.top;
  const res = Math.hypot(dl,dt); maxRes=Math.max(maxRes,res);
}
console.log("max anchor residual:", maxRes.toFixed(1), "px");
if (maxRes > 50) {
  console.warn("  WARNING: high anchor residual — investigate mapping manually");
}

// ---- nearest-match each non-boss rdv pickup to a same-type tracker loc ----
console.log("\n=== auto-match (greedy nearest within same type) ===");
const used = new Set();
const map = {}; // tracker index -> pickup_index

// Unambiguous identity anchors placed first (no-op for soft anchor fallback regions)
if (!softAnchorFallback) {
  for (const a of anchors) {
    if (!used.has(a.t.i)) {
      map[a.t.i] = a.r.pi;
      used.add(a.t.i);
    }
  }
}

// Greedy nearest-match for remaining (same-type)
let worst = 0, rows = [];
for (const p of rdv) {
  const alreadyMapped = Object.values(map).includes(p.pi);
  if (alreadyMapped) continue;
  const cands = (byType => (byType[p.type]||[]).filter(t=>!used.has(t.i)))((() => { const m = {}; for (const t of trk) (m[t.type] = m[t.type]||[]).push(t); return m; })());
  let best=null,bestD=1e9;
  const pl=predLeft(p.x,p.y), pt=predTop(p.x,p.y);
  for (const t of cands){ const d=Math.hypot(t.left-pl,t.top-pt); if(d<bestD){bestD=d;best=t;} }
  if (best){ map[best.i]=p.pi; used.add(best.i); worst=Math.max(worst,bestD); rows.push({pi:p.pi,type:p.type,trk:best.i,area:best.area,d:bestD}); }
  else { rows.push({pi:p.pi,type:p.type,trk:"NONE",d:-1}); }
}

// Cross-type fallback: pair remaining unmatched RDV with remaining tracker locs by proximity.
// Handles documented type mismatches (e.g., cataris greenEMMI flashShift <-> Morph Ball pi=144).
const unmatchedRdv = rows.filter(r => r.trk === "NONE").map(r => rdv.find(p => p.pi === r.pi));
rows = rows.filter(r => r.trk !== "NONE");
const unmatchedTrk = trk.filter(t => !used.has(t.i));
if (unmatchedRdv.length > 0 && unmatchedTrk.length > 0) {
  console.log(`  (cross-type fallback: ${unmatchedRdv.length} unmatched RDV, ${unmatchedTrk.length} unmatched tracker locs)`);
  for (const p of unmatchedRdv) {
    const cands = trk.filter(t => !used.has(t.i));
    let best=null,bestD=1e9;
    const pl=predLeft(p.x,p.y), pt=predTop(p.x,p.y);
    for (const t of cands){ const d=Math.hypot(t.left-pl,t.top-pt); if(d<bestD){bestD=d;best=t;} }
    if (best){ map[best.i]=p.pi; used.add(best.i); worst=Math.max(worst,bestD); rows.push({pi:p.pi,type:p.type+"/XTYPE",trk:best.i,area:best.area,d:bestD}); }
    else rows.push({pi:p.pi,type:p.type,trk:"NONE",d:-1});
  }
}

rows.sort((a,b)=>b.d-a.d);
console.log("worst match distance:", worst.toFixed(1), "px (lower = more confident)");
if (worst > 50) {
  console.warn("  WARNING: worst match > 50px — investigate least-confident pairs below");
}
console.log("top 8 least-confident matches:");
for (const r of rows.slice(0,8)) console.log("  idx "+String(r.pi).padStart(3)+" "+r.type.padEnd(14)+" -> trk#"+r.trk+" ("+r.area+")  d="+(r.d<0?"NONE":r.d.toFixed(1)));

const mapped = Object.keys(map).length;
console.log("\nmapped tracker locations:", mapped, "/", trk.length);
console.log(`LOCATION_PICKUP_MAP.${region} =`, JSON.stringify(trk.map(t => (t.i in map ? map[t.i] : null))));

// ---- Boss pickup predicted positions ----
if (rdvBoss.length > 0) {
  console.log("\n=== boss pickup predicted positions ===");
  for (const bossRdv of rdvBoss) {
    const predL = Math.round(predLeft(bossRdv.x, bossRdv.y));
    const predT = Math.round(predTop(bossRdv.x, bossRdv.y));
    console.log(`  pi=${bossRdv.pi} (${bossRdv.node}): top="margin-top:${predT}px"  left="left:${predL}px"`);
  }
}

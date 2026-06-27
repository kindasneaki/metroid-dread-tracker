/* eslint-disable */
// Phase 0 Spike A — repeatable location reconciliation via affine fit.
// Fit game-world (x,y) -> tracker map (left,top) using the 6 major pickups as
// known anchors, then nearest-match same-type pickups. Anchor residuals tell us
// whether the fit (and thus the auto-match) is trustworthy.
// Run: node scripts/spike/match-artaria.cjs
const fs = require("fs");

const RDV = "/Users/rjosephson/Documents/Development/randovania/randovania/games/dread/logic_database/Artaria.json";
const TRK = "src/store/modules/artaria.js";

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
  return "?";
}
const rdv = [];
for (const [an, area] of Object.entries(R.areas))
  for (const [nn, node] of Object.entries(area.nodes))
    if (node.node_type === "pickup")
      rdv.push({ pi: node.pickup_index, area: an, node: nn, type: rdvType(nn), x: node.coordinates.x, y: node.coordinates.y });

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
  return "major:" + t;
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

// ---- affine fit game(x,y) -> image(left,top) from major anchors ----
const majors = ["major:charge", "major:varia", "major:grapple", "major:screw", "major:cloak", "major:magnet"];
const anchors = majors.map((m) => ({ r: rdv.find((p) => p.type === m), t: trk.find((p) => p.type === m) }));

// solve A for [left|top] = A . [x, y, 1] via normal equations (3x3)
function solveAffine(samples, target) {
  // build 3x3 normal matrix M and rhs b for params [a,b,c]
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
const aLeft = solveAffine(anchors.map(a=>a.r), () => 0); // placeholder
const PL = solveAffine(anchors.map(a=>({x:a.r.x,y:a.r.y, t:a.t.left})), (s)=>s.t);
const PT = solveAffine(anchors.map(a=>({x:a.r.x,y:a.r.y, t:a.t.top})), (s)=>s.t);
const predLeft = (x,y)=>PL[0]*x+PL[1]*y+PL[2];
const predTop  = (x,y)=>PT[0]*x+PT[1]*y+PT[2];

console.log("=== anchor residuals (px) — must be small for the fit to be trustworthy ===");
let maxRes=0;
for (const a of anchors) {
  const dl = predLeft(a.r.x,a.r.y)-a.t.left, dt = predTop(a.r.x,a.r.y)-a.t.top;
  const res = Math.hypot(dl,dt); maxRes=Math.max(maxRes,res);
  console.log("  "+a.r.type.padEnd(14)+" pred("+predLeft(a.r.x,a.r.y).toFixed(0)+","+predTop(a.r.x,a.r.y).toFixed(0)+") actual("+a.t.left+","+a.t.top+")  residual="+res.toFixed(1));
}
console.log("max anchor residual:", maxRes.toFixed(1), "px");

// ---- nearest-match each non-major rdv pickup to a same-type tracker loc ----
console.log("\n=== auto-match (greedy nearest within same type) ===");
const used = new Set();
const map = {}; // tracker index -> pickup_index
const byType = {};
for (const t of trk) (byType[t.type] = byType[t.type] || []).push(t);
// majors first (identity)
for (const a of anchors) { map[a.t.i] = a.r.pi; used.add(a.t.i); }
let worst = 0, rows = [];
for (const p of rdv) {
  if (p.type.startsWith("major:")) continue;
  const cands = (byType[p.type]||[]).filter(t=>!used.has(t.i));
  let best=null,bestD=1e9;
  const pl=predLeft(p.x,p.y), pt=predTop(p.x,p.y);
  for (const t of cands){ const d=Math.hypot(t.left-pl,t.top-pt); if(d<bestD){bestD=d;best=t;} }
  if (best){ map[best.i]=p.pi; used.add(best.i); worst=Math.max(worst,bestD); rows.push({pi:p.pi,type:p.type,trk:best.i,area:best.area,d:bestD}); }
  else rows.push({pi:p.pi,type:p.type,trk:"NONE",d:-1});
}
rows.sort((a,b)=>b.d-a.d);
console.log("worst match distance:", worst.toFixed(1), "px (lower = more confident)");
console.log("top 8 least-confident matches:");
for (const r of rows.slice(0,8)) console.log("  idx "+String(r.pi).padStart(3)+" "+r.type.padEnd(9)+" -> trk#"+r.trk+" ("+r.area+")  d="+(r.d<0?"NONE":r.d.toFixed(1)));

const mapped = Object.keys(map).length;
console.log("\nmapped tracker locations:", mapped, "/", trk.length);
console.log("LOCATION_PICKUP_MAP.artaria =", JSON.stringify(trk.map(t => (t.i in map ? map[t.i] : null))));

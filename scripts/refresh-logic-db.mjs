// scripts/refresh-logic-db.mjs
// DAT-02: Read-only snapshot refresh from a configurable Randovania checkout.
// Run: node scripts/refresh-logic-db.mjs
// Override source: RDV_DREAD_DB=<path> node scripts/refresh-logic-db.mjs
//
// This script copies 10 Randovania logic-database JSON files into public/logic/
// and writes a VERSION.txt with provenance. It NEVER writes back to the source.

import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";

const SRC =
  process.env.RDV_DREAD_DB ||
  "/Users/rjosephson/Documents/Development/randovania/randovania/games/dread/logic_database";

const DEST = new URL("../public/logic/", import.meta.url).pathname;

const FILES = [
  "header",
  "Artaria",
  "Cataris",
  "Dairon",
  "Burenia",
  "Ferenia",
  "Ghavoran",
  "Elun",
  "Hanubia",
  "Itorash",
].map((f) => `${f}.json`);

// Ensure destination directory exists
mkdirSync(DEST, { recursive: true });

// Copy each JSON file from source to destination
for (const f of FILES) {
  copyFileSync(`${SRC}/${f}`, `${DEST}${f}`);
  console.log(`  copied: ${f}`);
}

// Read schema_version from the just-copied header
const schema = JSON.parse(readFileSync(`${DEST}header.json`, "utf8")).schema_version;

// Capture Randovania git rev (best-effort; falls back to "unknown")
let rev = "unknown";
try {
  rev = execSync(`git -C ${SRC} rev-parse HEAD`, { encoding: "utf8" }).trim();
} catch {
  // not a git repo or git not available — VERSION.txt still records "unknown"
}

// Write provenance file
const version =
  `randovania_rev=${rev}\n` +
  `schema_version=${schema}\n` +
  `copied_at=${new Date().toISOString()}\n` +
  `source=${SRC}\n`;

writeFileSync(`${DEST}VERSION.txt`, version);

console.log(`\nVendored ${FILES.length} files to ${DEST}`);
console.log(`schema_version=${schema}  rev=${rev.slice(0, 12)}`);

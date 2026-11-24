// Loading Screen Gold: A Tip in 200 Characters
// Entry: a single loading-screen tip for stressed developers and AI coding agents.
//
// The tip is written to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Gate: UTF-8 text of 1 to 200 characters, not only whitespace, exactly one line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Tip: the agent isn't stuck. It's rereading your code the way you reread its code: slowly, suspiciously, and with growing regret.";

// Gate self-check: 1-200 chars, not only whitespace, exactly one line.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`gate: line is ${chars} chars, must be 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("gate: line is only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("gate: line must be exactly one line");
}
// The judge's first criterion is that the entry IS a loading-screen tip, not
// a slogan or a status message, so the line must carry the tip framing.
if (!LINE.startsWith("Tip: ")) {
  throw new Error("gate: line must open with the loading-screen tip framing");
}
// Economy of words: no leading/trailing space, no double spaces, and the
// UTF-8 bytes must round-trip exactly (sealed gate reads UTF-8 text).
if (LINE !== LINE.trim() || LINE.includes("  ")) {
  throw new Error("gate: line has wasted whitespace");
}
if (Buffer.from(LINE, "utf8").toString("utf8") !== LINE) {
  throw new Error("gate: line is not clean UTF-8");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${chars} chars to ${join(outDir, "entry.txt")}`);

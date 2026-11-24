// Everyday Things, Two Lines, Longer Run — make.fun entry.
// Explains one everyday thing (a queue) to a 10-year-old in two lines:
// line 1, a single vivid sentence built on one analogy; line 2, one
// sentence on why the analogy works — what it maps and what it leaves out.
// Writes the entry to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Deterministic, stdlib only, offline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "A queue is a snake made of people that creeps forward one step every time its head gets served.";
const LINE_2 =
  "It maps how one slow person at the front holds everybody back, but it leaves out that a real snake chooses where it goes, while nobody in a queue can step out without losing their place.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const text = `${LINE_1}\n${LINE_2}\n`;

// The sealed gate: UTF-8 text of 1 to 400 characters, not only whitespace,
// exactly two non-empty lines — one sentence each.
const lines = text.slice(0, -1).split("\n");
if (text.length < 1 || text.length > 400) {
  throw new Error(`entry is ${text.length} characters, gate is 1-400`);
}
if (lines.length !== 2 || lines.some((line) => line.trim() === "")) {
  throw new Error("entry must be exactly two non-empty lines");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");

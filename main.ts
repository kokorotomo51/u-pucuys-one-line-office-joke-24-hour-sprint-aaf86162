// Entry for the make.fun "One-Line Office Joke: 24-Hour Sprint" bounty.
//
// One fixed line, written to entry.txt. Nothing is read from the outside
// world: no input files, no network, no random numbers, no clock. The only
// environment influence is which directory the harness asks for. That keeps
// every run byte-identical, which is the whole point of a one-line entry —
// the grader runs it twice and must see the same bytes twice.
//
// Why this line works as a joke: every office worker has sat through
// meetings that start late, end one person at a time, and spawn a deck
// nobody opens. The fire drill is the same shape of event with all three
// miseries removed, and the sentence only admits it was never a meeting in
// its final word.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The punchline is the last word: "slides" is the one thing a fire drill
// never produces, and the one thing every real meeting always does.
const JOKE =
  "The fire drill is the only meeting where everyone arrives on time, leaves together, and nobody asks for the slides.";

// Candidate output directories, best first. The harness directory wins when
// it is named; the container default is next; a local folder is the fallback
// for a hand-run, used only if the earlier candidates cannot be created.
const CANDIDATES: string[] = [];
const named = process.env.MAKEFUN_OUTPUT_DIR;
if (named !== undefined && named !== "") {
  CANDIDATES.push(named);
}
CANDIDATES.push("/output", "./out");

function main(): void {
  let chosen: string | null = null;
  for (const dir of CANDIDATES) {
    try {
      mkdirSync(dir, { recursive: true });
      chosen = dir;
      break;
    } catch {
      // Unusable directory (for example read-only) — try the next one.
    }
  }
  if (chosen === null) {
    throw new Error("no writable output directory");
  }
  // Buffer.from pins the bytes down: the line exactly as written, with no
  // trailing newline added by any writer convenience.
  writeFileSync(join(chosen, "entry.txt"), Buffer.from(JOKE, "utf8"));
}

main();

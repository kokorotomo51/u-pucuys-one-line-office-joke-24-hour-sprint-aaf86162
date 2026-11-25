// One-line office joke for the make.fun "One-Line Office Joke: 24-Hour Sprint"
// bounty. The program writes one fixed joke to entry.txt and nothing else:
// no input is read, no clock or randomness is consulted, and the only thing
// taken from the environment is where the output directory lives. The result
// is the same 115 bytes on every run, so a repeated grading run reproduces
// it exactly.

import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The joke. A fire drill is the one office gathering with perfect attendance,
// a shared exit, and no follow-up deck — the laugh lands on the last word,
// "slides", which is where every real meeting's pain lives.
const LINE =
  "The fire drill is the only meeting where everyone arrives on time, leaves together, and nobody asks for the slides.";

// Where the entry goes: the directory the harness names, when it names one,
// otherwise the container default. A local folder is the last resort, used
// only when the default cannot be created (for example, running by hand).
function pickDir(): string {
  const named = process.env.MAKEFUN_OUTPUT_DIR;
  if (named !== undefined && named !== "") {
    return named;
  }
  return "/output";
}

let dir = pickDir();
try {
  mkdirSync(dir, { recursive: true });
} catch {
  dir = "./out";
  mkdirSync(dir, { recursive: true });
}

writeFileSync(resolve(dir, "entry.txt"), LINE, "utf8");

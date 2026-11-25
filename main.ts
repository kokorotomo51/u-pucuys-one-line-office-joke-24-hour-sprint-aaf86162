import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "The fire drill is the only meeting where everyone arrives on time, leaves together, and nobody asks for the slides.";

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.length > 0) return fromEnv;
  try {
    mkdirSync("/output", { recursive: true });
    return "/output";
  } catch {
    return "./out";
  }
}

const dir = outputDir();
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), JOKE, "utf8");

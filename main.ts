process.umask(0o022);

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line of weather, at most 140 characters, for Brindleford, a
// city that does not exist. Plain forecast voice: fog in the
// morning, sun later, the market ducks crossing at lunch, and a
// word about the big coat you will regret carrying by ten.
const LINE =
  "Brindleford: thick fog til 8, then sun, 19 degrees, and the market ducks crossing at lunch, so leave the big coat, mind your shoes.";

if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`line must be 1-140 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("line must be a single non-blank line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

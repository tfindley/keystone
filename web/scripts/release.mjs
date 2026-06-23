// Cut a new FitSD spec release. Maintainer-run, reviewable before push.
//
//   npm run release -- 0.3.0
//
// What it does, in order:
//   1. Reads the outgoing version from the root VERSION file (e.g. 0.2.0).
//   2. Freezes the outgoing version: appends its slug to versions.json and runs a build,
//      so starlight-versions archives the CURRENT standard as an immutable /0.2/ snapshot.
//   3. Bumps the root VERSION to the new number (main becomes the new "latest").
//   4. Re-vendors so the site's published version follows the standard.
//   5. Prepends a CHANGELOG stub for the new version.
//   6. Commits everything and tags v<new> — but does NOT push.
//
// You then review the diff and `git push --follow-tags`. CI (web.yml) builds + publishes.
//
// Model: latest == main, live. Frozen versions are immutable history. Website/typo changes
// never come through here — they're ordinary commits. This script is ONLY for a spec
// version release (a normative change). See RELEASING.md.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const web = resolve(here, "..");
const root = resolve(here, "../..");
const VERSION = join(root, "VERSION");
const CHANGELOG = join(root, "CHANGELOG.md");
const versionsJson = join(web, "versions.json");

const die = (msg) => {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
};
const run = (cmd, args, cwd = root) =>
  execFileSync(cmd, args, { cwd, stdio: ["ignore", "pipe", "pipe"] }).toString().trim();

// --- 0. parse + validate -----------------------------------------------------
const next = process.argv[2];
if (!next) die("usage: npm run release -- <new-version>   e.g. npm run release -- 0.3.0");
if (!/^\d+\.\d+\.\d+$/.test(next)) die(`"${next}" is not a MAJOR.MINOR.PATCH version`);

if (!existsSync(VERSION)) die("root VERSION file is missing");
const current = readFileSync(VERSION, "utf8").trim();
const [cMaj, cMin, cPat] = current.split(".").map(Number);
const [nMaj, nMin, nPat] = next.split(".").map(Number);
const ord = (a, b, c) => a * 1e6 + b * 1e3 + c;
if (ord(nMaj, nMin, nPat) <= ord(cMaj, cMin, cPat))
  die(`new version ${next} must be greater than current ${current}`);

const outgoingSlug = `${cMaj}.${cMin}`; // freeze by minor line, e.g. 0.2
const outgoingLabel = `v${outgoingSlug}`;

// --- 1. guard: clean working tree -------------------------------------------
const dirty = run("git", ["status", "--porcelain"]);
if (dirty && !process.argv.includes("--force"))
  die("working tree is not clean — commit or stash first (or pass --force). A release should be its own commit.");

console.log(`\n▶ Releasing FitSD v${next}  (freezing outgoing ${outgoingLabel})\n`);

// --- 2. freeze the outgoing version -----------------------------------------
const frozen = JSON.parse(readFileSync(versionsJson, "utf8"));
if (frozen.some((v) => v.slug === outgoingSlug)) {
  die(`version ${outgoingSlug} is already frozen in versions.json — nothing to freeze. Did you mean a later number?`);
}
frozen.push({ slug: outgoingSlug, label: outgoingLabel });
frozen.sort((a, b) => a.slug.localeCompare(b.slug, undefined, { numeric: true }));
writeFileSync(versionsJson, JSON.stringify(frozen, null, 2) + "\n");
console.log(`  ✓ versions.json += ${outgoingLabel}`);

console.log("  … building to archive the snapshot (this runs starlight-versions)");
execFileSync("npm", ["run", "build"], { cwd: web, stdio: "inherit" });
console.log(`  ✓ froze current standard as /${outgoingSlug}/ (immutable)`);

// --- 3 + 4. bump VERSION, re-vendor so the site follows the standard ---------
writeFileSync(VERSION, `${next}\n`);
execFileSync("node", ["scripts/vendor.mjs"], { cwd: web, stdio: "ignore" });
console.log(`  ✓ VERSION ${current} → ${next}  (main is now latest)`);

// --- 5. CHANGELOG stub -------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const entry = `## v${next} — ${today}\n\n- _Describe the normative changes in this release._\n\n`;
if (existsSync(CHANGELOG)) {
  const body = readFileSync(CHANGELOG, "utf8");
  const marker = "<!-- releases -->";
  const i = body.indexOf(marker);
  writeFileSync(
    CHANGELOG,
    i === -1 ? entry + body : body.slice(0, i + marker.length) + "\n\n" + entry + body.slice(i + marker.length + 1),
  );
} else {
  writeFileSync(CHANGELOG, `# FitSD — Changelog\n\nReleases of the FitSD standard.\n\n<!-- releases -->\n\n${entry}`);
}
console.log("  ✓ CHANGELOG.md stub added");

// --- 6. commit + tag (no push) ----------------------------------------------
run("git", ["add", "VERSION", "CHANGELOG.md",
  "web/versions.json", "web/src/generated/version.json",
  `web/src/content/docs/${outgoingSlug}`, `web/src/content/versions/${outgoingSlug}.json`]);
run("git", ["commit", "-m", `Release FitSD v${next} (freeze ${outgoingLabel})`]);
run("git", ["tag", `v${next}`]);

console.log(`\n✓ Committed and tagged v${next} (not pushed).\n`);
console.log("  Review, then publish:");
console.log("    git show --stat HEAD     # the release commit");
console.log(`    git push --follow-tags   # CI builds + publishes; /${outgoingSlug}/ goes live, latest = v${next}`);
console.log("\n  Then fill in the CHANGELOG entry for this release.\n");

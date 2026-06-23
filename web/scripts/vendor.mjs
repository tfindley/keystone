// Vendors the canonical FitSD standard (Markdown at the repo root) into the
// Starlight content collection. Runs as `predev` and `prebuild`; pass `--check`
// (CI) to fail when the committed copies have drifted from canonical.
//
// THE INVARIANT: nobody hand-edits web/src/content/docs/<vendored>.md. The canonical
// files at the repo root are the single source of truth — this script renders them
// verbatim (frontmatter normalised to Starlight's, the duplicate H1 dropped because
// Starlight supplies the title from frontmatter). What gets vendored, and where, is
// declared once in content.manifest.mjs and shared with the sidebar.
//
// Hand-authored site pages (manifest items marked `authored: true`, e.g. the
// compliance pages) live in the same collection and are NEVER touched here.
//
// The Docker build (context ./web) can't reach ../FitSD docs, so the vendored copies
// are committed; if a canonical source is missing we warn and keep the committed copy.

import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, vendoredItems } from "../content.manifest.mjs";

const here = dirname(fileURLToPath(import.meta.url)); // web/scripts
const root = resolve(here, "../.."); // repo root (holds the canonical standard)
const web = resolve(here, ".."); // web
const docsDir = join(web, "src/content/docs");
const ledgerPath = join(web, ".vendored.json"); // outputs we own (for stale cleanup)
const versionSrc = join(root, "VERSION"); // canonical spec version (source of truth)
const versionOut = join(web, "src/generated/version.json"); // vendored for the Docker context

// The published spec version is DRIVEN BY THE STANDARD: the canonical root VERSION file.
// Vendor it into the build context (the Docker build can't reach ../VERSION) as JSON the
// site imports. Returns the relative output path so --check covers it like the docs.
function vendorVersion() {
  if (!existsSync(versionSrc)) {
    console.warn("[vendor] VERSION: source missing — keeping committed src/generated/version.json");
    return "src/generated/version.json";
  }
  const version = readFileSync(versionSrc, "utf8").trim();
  mkdirSync(dirname(versionOut), { recursive: true });
  writeFileSync(versionOut, `{ "version": ${JSON.stringify(version)} }\n`);
  console.log(`[vendor] VERSION: ${version} -> src/generated/version.json`);
  return "src/generated/version.json";
}

// --- frontmatter helpers ---------------------------------------------------

// Pull the leading `---\n...\n---` block off a Markdown file. Minimal, line-based;
// we only need a handful of scalar fields, not a full YAML parser.
function splitFrontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { fm: {}, body: md };
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    fm[kv[1]] = v;
  }
  return { fm, body: md.slice(m[0].length) };
}

// Drop the first body H1 — Starlight renders the title from frontmatter, so a body
// `# Title` would double it. Also drop a leading blockquote lede if it merely repeats
// the description (kept simple: we only strip the H1 and following blank lines).
function stripLeadingH1(body) {
  return body.replace(/^\s*# .*(?:\r?\n)+/, "");
}

const y = (s) => JSON.stringify(String(s)); // safe double-quoted YAML scalar

function buildFrontmatter(item, fm) {
  const lines = ["---"];
  lines.push(`title: ${y(fm.title || item.label)}`);
  if (item.description) lines.push(`description: ${y(item.description)}`);
  lines.push("sidebar:");
  lines.push(`  label: ${y(item.label)}`);
  // Custom fields kept for the per-page "Tier 0 · draft" badge (schema-extended).
  if (fm.framework) lines.push(`framework: ${y(fm.framework)}`);
  if (fm.tier !== undefined && fm.tier !== "") lines.push(`tier: ${y(fm.tier)}`);
  if (fm.status) lines.push(`status: ${y(fm.status)}`);
  if (fm.document) lines.push(`document: ${y(fm.document)}`);
  // Marker so it's unmistakable these are generated.
  lines.push("# vendored from the canonical standard — do not edit here. Edit the repo-root .md.");
  lines.push("---");
  return lines.join("\n");
}

// --- vendoring -------------------------------------------------------------

function readLedger() {
  try {
    return new Set(JSON.parse(readFileSync(ledgerPath, "utf8")));
  } catch {
    return new Set();
  }
}

function vendorAll() {
  const items = vendoredItems();
  const written = [];
  let copied = 0;
  let kept = 0;

  for (const item of items) {
    const src = join(root, item.canonical);
    const out = join(docsDir, `${item.slug}.md`);
    const rel = `src/content/docs/${item.slug}.md`;
    if (!existsSync(src)) {
      // Docker build / partial checkout — keep whatever committed copy exists.
      console.warn(`[vendor] ${item.slug}: source missing (${item.canonical}) — keeping committed copy`);
      if (existsSync(out)) written.push(rel);
      kept++;
      continue;
    }
    const raw = readFileSync(src, "utf8");
    const { fm, body } = splitFrontmatter(raw);
    const content = `${buildFrontmatter(item, fm)}\n\n${stripLeadingH1(body).replace(/^\s+/, "")}`;
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, content);
    written.push(rel);
    copied++;
  }

  // Stale cleanup: remove outputs we wrote last time that are no longer vendored
  // (a renamed/removed slug). Authored pages are never in the ledger, so safe.
  const nowSet = new Set(written);
  for (const rel of readLedger()) {
    if (!nowSet.has(rel)) {
      const p = join(web, rel);
      if (existsSync(p)) {
        rmSync(p);
        console.log(`[vendor] removed stale ${rel}`);
      }
    }
  }
  writeFileSync(ledgerPath, JSON.stringify([...nowSet].sort(), null, 2) + "\n");

  console.log(`[vendor] ${SITE.name}: ${copied} vendored, ${kept} kept-as-is, ${written.length} total`);
  return written;
}

const written = vendorAll();
written.push(vendorVersion());

// CI: fail if the committed vendored copies drifted from the canonical sources.
if (process.argv.includes("--check")) {
  const paths = written.map((rel) => join("web", rel));
  try {
    execFileSync("git", ["diff", "--quiet", "--", ...paths], { cwd: root, stdio: "ignore" });
    console.log("[vendor] check: vendored copies are in sync");
  } catch {
    console.error(
      "[vendor] check: vendored copies are OUT OF DATE — run 'npm --prefix web run vendor' and commit:",
    );
    try {
      execFileSync("git", ["--no-pager", "diff", "--stat", "--", ...paths], { cwd: root, stdio: "inherit" });
    } catch {
      /* best-effort */
    }
    process.exit(1);
  }
}

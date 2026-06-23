// Mobile overflow audit (375px): loads each key page in a phone viewport and reports any
// element wider than the viewport (the usual cause of horizontal scroll). Needs a working
// Playwright Chromium — run `npx playwright install chromium` first. Mirrors syscert's audit.
//
//   BASE=http://localhost:4321 node scripts/mobile-audit.mjs   (after `npm run preview`)
import { chromium } from "playwright";

const base = process.env.BASE || "http://localhost:4321";
const W = Number(process.env.W || 375);
const pages = [
  "/",
  "/quickstart/",
  "/framework/charter/",
  "/framework/requirements/",
  "/capabilities/govern/",
  "/capabilities/solution-development/process/",
  "/reference/standards-alignment/",
  "/reference/diagrams/",
  "/adoption/positioning/",
  "/compliance/security/",
];

const browser = await chromium.launch();
let failures = 0;
for (const url of pages) {
  const ctx = await browser.newContext({
    viewport: { width: W, height: 800 },
    deviceScaleFactor: 2,
    colorScheme: "dark",
  });
  const page = await ctx.newPage();
  await page.goto(base + url, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(500);

  const report = await page.evaluate((vw) => {
    const docEl = document.documentElement;
    // The real test: does the PAGE scroll horizontally? Wide content inside a
    // horizontally-scrollable container (code blocks, big tables) is fine — it scrolls
    // itself and doesn't widen the page. Only a page-level overflow is a defect.
    if (docEl.scrollWidth <= docEl.clientWidth + 1) return { overflow: false, offenders: [] };
    const inScrollable = (el) => {
      for (let p = el.parentElement; p; p = p.parentElement) {
        const ox = getComputedStyle(p).overflowX;
        if (ox === "auto" || ox === "scroll" || ox === "hidden") return true;
      }
      return false;
    };
    const out = [];
    for (const el of document.body.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width > 0 && !inScrollable(el)) {
        out.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().trim().slice(0, 40)}`);
      }
    }
    return { overflow: true, offenders: out.slice(0, 8) };
  }, W);

  if (report.overflow) {
    failures++;
    console.log(`✗ ${url}\n    ${report.offenders.join("\n    ") || "(page scrolls horizontally)"}`);
  } else {
    console.log(`✓ ${url}`);
  }
  await ctx.close();
}
await browser.close();
console.log(failures ? `\n${failures} page(s) with overflow` : "\nNo horizontal overflow at 375px");
process.exit(failures ? 1 : 0);

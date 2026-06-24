// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightVersions from "starlight-versions";
import rehypeMermaid from "rehype-mermaid";
import { SITE, sidebar } from "./content.manifest.mjs";
// The published spec version is driven by the standard: vendored from the root VERSION file.
import versionData from "./src/generated/version.json" with { type: "json" };
// The frozen, browsable past versions. The release script (scripts/release.mjs) appends here.
import frozenVersions from "./versions.json" with { type: "json" };

// Canonical site URL (used for sitemap, canonical tags, OG). Override per-env with SITE_URL.
const site = process.env.SITE_URL || SITE.url;

// Mermaid diagrams render to SVG at BUILD time via a headless browser (no client JS),
// gated behind RENDER_MERMAID=1 because that needs Chromium + its system libs present.
// Default OFF → the build is always green and diagrams show as code blocks; flip it on
// in a build stage that has the browser (see web/Dockerfile notes). 'img-svg' emits a
// data: SVG, allowed by the CSP's `img-src data:` and isolated from the page style-src.
const renderMermaid = process.env.RENDER_MERMAID === "1";

// https://astro.build/config
export default defineConfig({
  site,
  markdown: {
    // Astro's default Shiki highlighter emits inline styles that a strict CSP rejects;
    // Starlight renders code via Expressive Code instead, so we turn the base one off.
    syntaxHighlight: false,
    // A static SVG bakes one theme, but the site is dark/light switchable — 'neutral'
    // reads acceptably on both the warm-paper and deep-ink backgrounds.
    rehypePlugins: renderMermaid
      ? [[rehypeMermaid, { strategy: "img-svg", mermaidConfig: { theme: "neutral" } }]]
      : [],
  },
  // Content-Security-Policy. Astro generates + maintains per-build script-src/style-src
  // hashes for every inline script/style and adds these directives, delivered via a
  // <meta> element. The site self-hosts its fonts and runs no third-party scripts, so
  // 'self' suffices. frame-ancestors can't go in a <meta> CSP — it's set as an HTTP
  // header in nginx.conf (clickjacking is also covered by X-Frame-Options there).
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
      ],
    },
  },
  integrations: [
    starlight({
      title: SITE.title,
      description: SITE.description,
      favicon: "/favicon.svg",
      // Versioning. The plugin requires at least one frozen version, so it's only loaded
      // once one exists. With zero, the site is simply "latest, live" (no switcher) — the
      // honest state until a version is superseded. `current` (the site root /) is main,
      // live, labelled with the spec version from the standard's VERSION file. Frozen
      // versions are immutable snapshots at /0.1/ etc. A new version is cut by
      // scripts/release.mjs, which freezes the outgoing version and appends it to versions.json.
      plugins: frozenVersions.length
        ? [
            starlightVersions({
              current: { label: `Latest (v${versionData.version})` },
              versions: frozenVersions,
            }),
          ]
        : [],
      // The sidebar is derived from the same manifest the vendor uses — nav and content
      // can never disagree. Two levels deep (Capabilities → Solution Development → forms).
      sidebar: sidebar(),
      // Surface the Tier / status badge under each standard page's title. The variant with
      // the version notice can only be used once the versions plugin is loaded (it imports
      // a plugin-provided virtual module), so pick the right one.
      components: {
        PageTitle: frozenVersions.length
          ? "./src/components/PageTitle.astro"
          : "./src/components/PageTitleNoVersions.astro",
      },
      social: [
        { icon: "github", label: "GitHub", href: SITE.repo },
      ],
      // Starlight ships Pagefind (self-hosted, offline) — "search built in" with no backend.
      pagefind: true,
      lastUpdated: true,
      editLink: {
        baseUrl: `${SITE.repo}/edit/main/`,
      },
      customCss: ["./src/styles/fitsd.css", "./src/styles/forms.css"],
    }),
  ],
});

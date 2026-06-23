---
title: How this site is built
description: The tech stack and the single-source-of-truth pipeline behind fitsd.tfindley.dev.
sidebar:
  label: How this site is built
---

This site is deliberately boring to operate: a static build, served from a small
container, with the standard's text pulled straight from git.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Generator | **Astro + Starlight** | Documentation framework: two-level nav, offline search, dark/light, SEO. |
| Search | **Pagefind** | Static, self-hosted, no backend. |
| Fonts | **Fraunces · Public Sans · IBM Plex Mono**, self-hosted | No external requests; keeps the CSP `'self'`. |
| Versioning | **starlight-versions** | Every released version stays browsable at a stable URL. |
| Serve | **nginx** (`alpine-slim`) | Static files only; minimal attack surface. |
| Build & ship | **GitHub Actions → GHCR**, pulled behind **Traefik** | Nothing is built on the production host. |

## One source of truth

The FitSD standard lives as canonical Markdown in the repository root. A vendor step
(`scripts/vendor.mjs`) renders those files into the site's content collection at build
time — normalising frontmatter and nothing else — so the website shows the standard
**verbatim**. The vendored copies are committed, and CI runs `vendor.mjs --check` to fail
the build if they ever drift from the canonical source.

```
repo-root *.md  ──vendor──▶  src/content/docs/**  ──Astro──▶  static site
        ▲                                                           │
        └────────────── single source of truth ────────────────────┘
```

Nobody edits the vendored copies by hand. To change the standard, you change the
canonical Markdown — the same files reviewed on GitHub.

## Versioning

Releases are frozen and kept browsable so a team can adopt — and cite — a specific
version. See [Versioning & change policy](/compliance/versioning/).

---
title: Security of this site
description: The security posture of fitsd.tfindley.dev — headers, CSP, supply chain, and hosting.
sidebar:
  label: Security of this site
---

This page documents the security posture of **fitsd.tfindley.dev** itself — not the
FitSD framework, but the website that publishes it. It is maintained in the same spirit
FitSD asks of any service: the posture is written down, not assumed.

## Threat model, briefly

The site is **static**. There is no application server, no database, no user accounts,
and no form submissions — so whole classes of risk (injection, auth bypass, server-side
request forgery) do not apply. The realistic risks are: content tampering in transit,
clickjacking, supply-chain compromise of the build, and information disclosure. The
controls below target those.

## Transport & headers

- **TLS** is terminated at the edge (Traefik) with HSTS; the container speaks plain HTTP
  only on its internal network.
- A strict **Content-Security-Policy** is generated at build time by Astro, with per-build
  hashes for every inline script and style, delivered via a `<meta>` element. The site
  loads **no third-party scripts, fonts, or analytics** — `default-src 'self'`.
- nginx adds `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`,
  `Referrer-Policy: strict-origin-when-cross-origin`, a restrictive `Permissions-Policy`,
  and Cross-Origin-Opener / Resource policies. `server_tokens` is off.

## Supply chain

- Dependencies are pinned via a lockfile and installed with `npm ci` in a clean build
  container. Fonts are **self-hosted** (`@fontsource`), so the browser never reaches an
  external CDN.
- Search is **Pagefind** — a static index built at compile time and served from the same
  origin. No search backend, no external query service.
- The image is built by GitHub Actions and published to GHCR; the host pulls it. Nothing
  is built on the production host.

## Content integrity

The published standard is **vendored verbatim** from the canonical Markdown in git and
checked for drift in CI (`vendor.mjs --check`) — the site cannot silently disagree with
the source of truth. See [How this site is built](/compliance/tech-stack/).

## Reporting

Security contact details are published at
[`/.well-known/security.txt`](/.well-known/security.txt). Please report anything you find
there or via the repository's issue tracker.

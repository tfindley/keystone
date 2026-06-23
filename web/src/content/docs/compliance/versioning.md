---
title: Versioning & change policy
description: How this site implements FitSD's versioning — frozen URLs, the switcher, and where the policy lives.
sidebar:
  label: Versioning & change policy
---

The *policy* — what a version means, and how a team adopts one — is part of the standard:
see [FitSD — Versioning Policy](/framework/versioning-policy/). This page covers how the
**website** implements it.

## Driven by the standard

The published version is **not** decided by the site. It comes from the `VERSION` file at
the root of the repository, vendored into the build. The standard drives the site.

## What you see

- **Latest** (the site root) is `main`, live — labelled with the current version, e.g.
  *Latest (v0.2.0)*. Errata appear here as soon as they're merged.
- **Frozen versions** are immutable snapshots at stable URLs — `/0.1/`, `/0.2/`, … — with
  a version switcher in the header. A frozen version never changes in place.

## How a version is cut

Releases are deliberate and reviewable, never an automatic side effect of editing. A
maintainer runs the release script, which freezes the outgoing version, bumps `VERSION`,
and creates a tag for review before anything is published. The procedure is in
[`RELEASING.md`](https://github.com/tfindley/keystone/blob/main/RELEASING.md); the
rationale is in the [Versioning Policy](/framework/versioning-policy/).

## Current status

FitSD is **pre-1.0** and under active development; the founding layer is in place and the
content is still being streamlined. The [Roadmap](/framework/roadmap/) tracks what's changing.

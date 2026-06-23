---
title: AI-assisted development
description: How FitSD and this site were built with AI assistance, and what stays under human ownership.
sidebar:
  label: AI-assisted development
---

FitSD asks that what it covers be **documented and evidenced** — shown to work, not
merely asserted ("readiness" means *documented*, and "every artefact earns its place";
see the [Charter](/framework/charter/)). In that spirit, this page sets down openly how
FitSD and this site were actually built — including where AI helped. FitSD doesn't itself
require this kind of disclosure; the project chooses to.

## What AI did

An LLM (Claude) did the legwork on top of the author's design: drafting and refining the
text, checking it for consistency and contradictions, and stitching the parts into a
coherent whole. The same assistance built the website — the Astro/Starlight setup, the
vendor pipeline that renders the standard verbatim, styling, security configuration, and CI.

## What stays under human control

- **The design and the decisions.** The FitSD model, its principles, and every call about
  what's in and what's out are the author's. The AI proposes wording and structure; the
  author decides what the standard *says*.
- **Review and sign-off.** Changes are reviewed by a human before they're merged and
  published. The AI proposes; the maintainer decides.
- **Security posture.** The controls described in [Security of this site](/compliance/security/)
  are human-owned decisions, verified against the build output.

## Why disclose it

FitSD is built on documented evidence and supportability — being able to show, and stand
behind, what you ship. A project in that spirit shouldn't be coy about its own making. AI
did real work here; that belongs on the record, not hidden. FitSD doesn't demand this
disclosure — the project holds itself to it anyway.

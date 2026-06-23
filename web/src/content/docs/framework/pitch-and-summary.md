---
title: "FitSD — Elevator Pitch & Executive Summary"
description: "The short forms: a pitch to say out loud and a one-page summary for whoever holds the budget."
sidebar:
  label: "Pitch & Summary"
framework: "FitSD"
tier: "0"
status: "draft"
document: "Elevator Pitch & Executive Summary"
# vendored from the canonical standard — do not edit here. Edit the repo-root .md.
---

> The short forms of FitSD: a pitch to say out loud, and a one-page summary to hand to whoever holds the budget. Non-normative — it adds no requirements. The fuller positioning is in *Adoption & Positioning*; the framework itself is in the *Charter* and *Requirements*.

## Elevator pitch

**One line.**
FitSD is just enough process for a small team to take on the right work and ship it so it lasts — one front door for new work, and a "done" that means *operable*, not merely running.

**The thirty-second version.**
Small teams can't run ITIL — it assumes a department and a budget for process nobody has. But they still have to decide what's worth building, design it so it can actually be run, and avoid the 2 a.m. page for something nobody wrote down. FitSD is the smallest amount of that discipline a handful of people can keep up. New work enters through one front door with two quick decision gates — *is this worth doing?* then *is it ready to build?* — and nothing goes live until it's proven ready: documented, recoverable, secure, monitored, supportable. It keeps what ITIL, ISO 20000 and FitSM get right, and drops everything a small team can't sustain.

**The version that actually lands (talking upward).**
Ever watched a good idea die because there was no clean way to pitch it? FitSD turns "we need to replace the ageing build pipeline" from a nervous corridor conversation into a one-page proposal with a yes/no at the bottom — in the language leadership already speaks: the driver, the cost of doing nothing, the options, the effort. It gets technical teams heard and funded, then makes sure what they ship can actually be run and supported. Governance that works *for* the team, not on it.

## Executive summary

**In a sentence.** FitSD ("Fit for Solution Development") is a lightweight service-management framework that gives a small technical team just enough governance to take on the right work and ship it so it can be run — and a shared language for getting that work funded.

### The problem

Frameworks like ITIL and ISO/IEC 20000 are built for organisations with a department, a budget, and people whose whole job is process. Most teams have none of that — yet they carry the same risks: effort spent on work that was never worth doing, and services that go live but can't be supported, recovered or secured. The result is predictable. Good ideas die for want of a way to pitch them, and the things that do ship come back as out-of-hours incidents and audit findings.

### What FitSD is

FitSD distils mainstream service-management and security practice (ITIL 4, ISO 20000, FitSM) down to the smallest amount a handful of people can actually sustain. It is deliberately vendor- and organisation-neutral, and released under Creative Commons (CC BY 4.0) so any team can adopt and adapt it. Two commitments set it apart:

- **One front door.** New work enters through a single intake and two light decision gates — Gate 1 (*is this worth doing?*) and Gate 2 (*is it ready to build?*). Effort is earned at a gate; nothing is built on a whim.
- **Readiness is the finish line.** Nothing reaches live service until it is *evidenced* as ready — documented, recoverable (with a tested restore), secure, access-controlled, monitored and supportable. "Done" means operable, not just switched on.

### How it stays light

FitSD owns only a thin set of testable requirements. It ships a full, ready-to-use process for one capability — Solution Development, the front door — and for the other four (govern; change & release; run & restore; secure & assure) it states the requirement and points at the standard or process a team already runs. That is how it can require change, incident and security discipline *without rebuilding those disciplines* — the single design choice that keeps it lightweight rather than just claiming to be.

### What an adopting team gets

- **A way to be heard.** Gate records are project proposals in the language leadership already uses — turning corridor pitches into fundable decisions.
- **Fewer 2 a.m. surprises.** The Definition of Done stops services shipping before they can be supported, recovered or secured.
- **An audit trail without a PMO.** Acceptance records, a risk register and change records — the evidence customers and auditors ask for, with no enterprise governance team to produce it.
- **An on-ramp, not a dead end.** It maps cleanly onto ISO/IEC 27001 and NIS2, so early discipline isn't wasted if the team grows into the heavier standards.

### Who it's for

Small technical teams — from a solo operator to an SMB of ~200 — stuck between "just ship it" and "we really should have a process." It also suits a small team inside a larger organisation that needs a defensible front door plugging into the parent's existing change, incident and governance machinery.

### Where it's the wrong tool

It is not a substitute for a full ISMS or ITIL where certification scope or a contract genuinely demands the heavy apparatus — it is the on-ramp, not the destination. It is not for routine day-to-day change, which belongs in change management. And it adds little for a team already running mature ITIL or ISO that works.

### Status

v0.2 — the founding layer, hardened. The charter, requirements and all five capabilities are drafted, with Solution Development built out in full (a process and three forms) and the rest as one-page capability cards. v0.2 added the full service lifecycle (end-of-life review and controlled retirement), the information-stores layer, continuity in the Definition of Done, and a new-technology intake control. A public worked example and the maturity self-check are the next milestones (see the *Roadmap*).

---

*Companion documents: `FitSD — Framework Charter` (what it is, in full), `FitSD — Adoption & Positioning` (the who/why/how-far), `FitSD — Quickstart` (one project, five moves), `FitSD — Requirements` (the testable spine).*

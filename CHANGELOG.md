# FitSD — Changelog

Notable changes to the **FitSD standard**, written for implementers. Newest first.

FitSD follows its [Versioning Policy](./FitSD%20%E2%80%94%20Versioning%20Policy.md): only a **normative** change (a new or altered "shall") moves the version. Entries tagged **[normative]** can affect conformance — if you already conform to the previous version, those are the lines to read closely. Everything else is new guidance, a clarification, or errata, with no version impact.

Changes are logged under **Unreleased** as they land; at release the heading is promoted to the version and dated (see [RELEASING.md](./RELEASING.md)).

<!-- releases -->

## Unreleased — v0.3.0 (MINOR, in progress on the `v0.3` branch)

Theme: the Service Acceptance Criteria (SAC) become a **standing, organisation-owned baseline** — defined once and inherited by every solution, instead of rediscovered at each go-live.

### Added
- **[normative] FSD-GV-7** — an organisation **shall define and ratify a standing Service Acceptance baseline** (its own thresholds for each SAC criterion) and apply it to every solution's Service Acceptance. This is the new conformance obligation for v0.3.0.
- **`reference/FitSD — Service Acceptance Criteria`** — the SAC defined once, as inheritable, org-tunable principles, with a blank baseline template to ratify.
- **`FitSD — Implementation Guide`** — a business stand-up playbook: a 7-step checklist, the implementation-profile mapping (requirements → your local policies), and minimal small-team roles.
- **`FSD-FRM-00 — Idea Brief`** — the pre-Gate-1 intake is now a canonical form (numbered 00, ahead of the gates); it carries forward into Gate 1. Closes the "no Idea Brief form" gap (#6).
- **Gate 2 (`FSD-FRM-02`)** — a "Selected option + evaluation reference" field, the seam between the Gate 1 options and the Gate 2 design.
- **Tooling** — `scripts/check-sac-drift.sh` guards against a hardcoded SAC count creeping back into the docs.

### Changed
- **SAC referenced by name, defined once.** `FSD-PRO §7`, `FSD-FRM-02 §5` and `FSD-FRM-03 §1` now reference the criteria from the new reference doc and carry only their stage column (design vs evidence). The criteria themselves are unchanged — a clarification, not a change to the Definition of Done.
- **`FSD-SD-5` note** now points at the SAC reference doc and names the standing baseline.
- **Simplifications** — removed the Gate 2 §4/§5 monitoring overlap; consolidated the duplicated "system of record" note in `FSD-PRO §4/§8`.

### For implementers moving from v0.2
- The SAC **categories are unchanged** — nothing you accepted under v0.2 becomes non-conformant.
- The one new thing for v0.3 conformance: **ratify your SAC baseline** (FSD-GV-7). You were already choosing these thresholds at acceptance; now you set them once, up front, and inherit them into every solution.

### Resolved issues
- **#6** Idea Brief form — added (`FSD-FRM-00`).
- **#7** SAC "eight vs nine" drift — the framework was already de-numbered in v0.2; added a drift guard so a count can't return.
- **#8** SAC as inheritable principles — delivered (FSD-GV-7 + reference doc + Implementation Guide).

## v0.2.0 — 2026-06-24

- Full service lifecycle: end-of-life review and controlled retirement (**FSD-RR-7**).
- **Information-stores** layer — every register and record named, described tech-agnostically.
- Demand pipeline and retained history in **FSD-GV-4**.
- Continuity added to the Definition of Done (operating knowledge captured, not reliant on a single person).
- New-technology intake trigger and Gate 1 vendor due-diligence.
- SAC "Monitoring, alerting & incident triggers" split into **Monitoring & alerting** and **Incident profile**; SAC de-numbered (referenced by name, not by count).
- Tier model reframed into Framework (portable) and Implementation (per-team) layers.

## v0.1.0 — initial framework

- The founding Charter, the Requirements spine (Tier 1), and the five-capability model — Solution Development built in full (process + gate/acceptance forms), with one-page cards for Govern, Change & Release, Run & Restore, and Secure & Assure. Supporting layer: elevator pitch, adoption & positioning, quickstart, definitions, standards alignment, diagrams, and the CC BY 4.0 licence. (See git history for detail.)

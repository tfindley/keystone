# Design note — Lifecycle completion & information-stores layer

**Date:** 2026-06-23
**Status:** implemented (2026-06-23)
**Author/owner:** Tristan Findley (with Claude)
**Affects:** FitSD v0.1 → v0.2 (founding-layer hardening)

## Goal

Close three gaps surfaced while sense-checking what Solution Development is *for* — without expanding FitSD into "a larger thing." The user's four-part mental model (control flow in; overview of upcoming/in-flight/completed; history; control technology spread) is correct, but in v0.1 only **flow in** is fully delivered. The other three are present in spirit but under-specified, and some records are delegated to "your work-tracking system" with no control.

The agreed shape is **"complete the spine, lean"**: sharpen what exists, make the framework's records explicit and tech-agnostic, and finish the lifecycle's end-of-life decision — all inside existing capabilities. **No new capability/module.** Solution Development stays the lean intake → gates → acceptance flow it is today.

## Scope

**In scope**

1. **Sharpening** — re-word existing artefacts; near-zero new surface.
2. **Information-stores layer** — a FitSM-style, tech-agnostic catalogue + diagram of the registers/records FitSD already implies, plus the two it's missing.
3. **Lifecycle completion** — an explicit end-of-life review (renew / replace / retire) and controlled retirement.

**Out of scope (deliberate — YAGNI / keep it modular)**

- No new capability or process module. Overview & history are owned by **Govern + the data stores**, not bolted onto Solution Development.
- **Supplier / contract lifecycle** (engage → operate → renew/exit) stays the backlogged **FSD-SC** capability. A contract renewal often coincides with a product end-of-life but is a distinct decision.
- **SLA *management*** as its own discipline is not added. SLAs are touched only where the lifecycle already meets them (set at acceptance; withdrawn/transitioned at retirement).
- No tool/technology prescriptions anywhere. Stores are described by *what they hold and who owns them*, never by product.

## Design decisions

| #   | Decision                                     | Choice                                                                              | Rationale                                                                            |
| --- | -------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1   | Retirement's home                            | `FSD-RR-7`, reframed as **end-of-life review & retirement**                         | End of run-state; keeps it in an existing capability                                 |
| 2   | Tech-adoption control                        | Scope-test trigger + Gate 1 due-diligence + a *note* on `FSD-SD-1` (no new "shall") | Minimum viable governance; it's a sharpening of intake, not a new requirement        |
| 3   | Demand register + history                    | Broaden `FSD-GV-4`                                                                  | One edit covers both the upcoming/in-flight view and retained history                |
| 4   | Stores catalogue                             | New non-normative `reference/` doc + diagram                                        | Mirrors *Standards Alignment*; gathers scattered records without adding requirements |
| 5   | Continuity (knowledge transfer / bus-factor) | Strengthen the SAC "Supportability / handover" criterion                            | Avoids a new requirement; upgrades NIS2 (g)/(i) and ISO A.6.3 mappings               |

### End-of-life is a decision, not a destination

`FSD-RR-7` records an end-of-life decision with three outcomes, two of which already have homes:

- **Renew / continue** — function and product stay (re-license, patch, re-contract). Stays in **Run & Restore**; the contract side is **FSD-SC**.
- **Replace / re-platform** — function still needed, product isn't → **new demand back through Solution Development** (the existing EOL/EOS demand source and "learnings become new demand" loop).
- **Retire** — function no longer needed → controlled decommission (the genuinely new part).

## Change set (file-by-file)

### Normative

1. **`FitSD — Requirements.md`**
   - `FSD-SD-1` — add note: net-new includes adopting a new technology/tool/third-party dependency the team must own, support or secure, **regardless of cost or effort**.
   - `FSD-SD-5` — strengthen the "supportability and handover" item to include **continuity** (bus-factor addressed; more than one person can run it; knowledge transfer / cross-training).
   - `FSD-GV-4` — broaden to: register of services, **the demand pipeline**, and key records — kept current, **with completed and retired entries retained as the historical record**.
   - `FSD-RR-7` — **NEW.** End-of-life review & retirement: at end of life a decision is recorded (renew / replace / retire); if retire, carried out in a controlled way — data handled, access revoked, SLAs withdrawn, docs archived, register updated, operating knowledge captured. Cross-ref SA (access/data), GV (register), SD (replace = new demand), FSD-SC (contract).
   - Update the `FSD-RR` "how satisfied" blurb and the closing coverage note.

2. **`capabilities/solution-development/FSD-PRO — Solution Development Process.md`**
   - §1 Purpose — broaden objective: control the flow in; **be the control point for adopting new technology**; feed the registers that give the upcoming/in-flight/completed view.
   - §1 Scope test — add the new-technology/dependency trigger.
   - §7 SAC table — continuity wording in "Supportability / handover".
   - §9 — add the Information Stores reference; note retirement (`FSD-RR-7`) downstream.

3. **`…/FSD-FRM-01 — Gate 1 Outline Proposal.md`** — add a light **"New technology / vendor due-diligence"** section (vendor, licensing, upgrade path, exit), promoted out of the optional PoC §6 so it applies whenever new tech/vendor is involved. PoC stays feasibility-only.

4. **`…/FSD-FRM-03 — Service Acceptance Record.md`** — continuity in the "Supportability / handover" criterion.

### Capability cards

5. **`…/run-and-restore/FSD-RR — Run & Restore.md`** — add `FSD-RR-7`; add a short note on the renew/replace/retire fork; update scope to include end-of-life & retirement.
6. **`…/govern/FSD-GV — Govern.md`** — reflect broadened `FSD-GV-4` (demand pipeline + retained history); name the information-stores view as Govern's purview; the review cadence surfaces EOL candidates.
7. **`…/secure-and-assure/FSD-SA — Secure & Assure.md`** — note retirement's security hooks (access revocation, data disposal) and the continuity link.

### Reference, diagrams, glossary

8. **`reference/FitSD — Information Stores.md`** — **NEW.** Intro (tech-agnostic intent) + catalogue table: store name · what it holds · owning capability · lifecycle stage served · borrowed-from (FitSM → ITIL → ISO 27001). Includes the two new stores: **demand/pipeline register** and **retirement record**.
9. **`diagrams/FitSD — Diagrams.md`**
   - New **§6 Information stores** diagram (data stores wired to the lifecycle/capabilities, tech-agnostic).
   - Enrich **§4** lifecycle state diagram with the EOL fork: `In service → EOL review → {renew ↺ / replace → new demand / retire → retired}`.
   - Light relabel of the §2 "Retire" node to reflect the EOL review.
10. **`FitSD — Definitions.md`** — add: Demand register / pipeline; Information store; End-of-life (EOL) review; Retirement / decommission; Continuity (operational knowledge).
11. **`reference/FitSD — Standards Alignment.md`** — retirement → ISO A.8.10, FitSM PR1 (service status), ITIL service retirement; continuity → ISO A.6.3, and upgrade NIS2 (g)/(i) notes.

### Index & planning

12. **`README.md`** — add the Information Stores doc to "What's in here".
13. **`FitSD — Roadmap.md`** — move lifecycle completion + information-stores layer to shipped; keep FSD-SC and the tech-sprawl positioning piece open.
14. **`BACKLOG.md`** — record done; retain FSD-SC (supplier/contract lifecycle) and SAC topic guidance as open.

## Standards impact (strengthened mappings)

- **Retirement:** ISO 27001 A.8.10 (information deletion), A.5.x; FitSM PR1 (service portfolio/status); ITIL service retirement.
- **Continuity / knowledge:** ISO 27001 A.6.3 (awareness & training); NIS2 21(2)(g) cyber hygiene & training and (i) HR security — both move from "partial" toward covered.
- **Records control:** ISO 27001 7.5 (documented information) — the information-stores layer makes this concrete.

## Risks & mitigations

- **Risk: scope creep / loss of agility.** Mitigation: no new module; 1 new requirement only; everything else is sharpening or non-normative reference. Solution Development is untouched in weight.
- **Risk: the information-stores doc drifts toward tool prescription.** Mitigation: catalogue columns are *holds / owner / borrowed-from* — no tool column, by rule.
- **Risk: diagram duplication drift** (the §4 / §2 edits). Mitigation: Diagrams.md remains the source; embedded copies updated in the same pass.

## Done when

- One new requirement (`FSD-RR-7`) and two broadened ones (`FSD-GV-4`, `FSD-SD-5`) read cleanly and cross-reference correctly.
- The Information Stores reference doc + diagram exist, are tech-agnostic, and account for every register/record the requirements name (incl. the two new ones).
- The EOL fork is visible in the lifecycle diagram and consistent with the demand-source loop.
- README, Definitions, Standards Alignment, Roadmap, Backlog and the three affected cards are consistent with the above. No dangling references.

# FitSD

*Fit for Solution Development — just enough process to take on the right work and ship it so it lasts.*

Small teams don't need ITIL. What they need is a way to decide whether a piece of work is worth doing, design it so it can actually be run, and prove it's ready before it goes live — without burying themselves in governance to get there.

That's the whole idea. FitSD keeps the parts of ITIL, ISO 20000 and FitSM that earn their place for a handful of people, and drops the rest. Two things do most of the work:

- **One front door.** New work comes in through a single intake and two light decision gates. Nothing gets built on a whim.
- **Readiness built in.** Nothing reaches live service until it's documented, recoverable, secure, monitored and supportable — not just running. No more 2 a.m. pages for something nobody wrote down.

It's a personal project, and it's deliberately not tied to any one organisation. Released under **CC BY 4.0** (see `LICENSE`).

**New here?** Start with `FitSD — Quickstart.md` — one project, five moves.

## What's in here

| Path                                       | Tier | What it is                                                          |
| ------------------------------------------ | ---- | ------------------------------------------------------------------- |
| `FitSD — Framework Charter.md`             | 0    | What FitSD is: principles, the capability model, roles, conformance |
| `FitSD — Requirements.md`                  | 1    | The testable "shall" statements — the spine an auditor would check  |
| `FitSD — Adoption & Positioning.md`        | 0    | Who it's for, why they'd adopt it, and how it fits by org size      |
| `FitSD — Quickstart.md`                    | 0    | The five-move path from "what's this?" to "we're using it"          |
| `FitSD — Roadmap.md`                       | 0    | Direction of travel — bigger picture than the backlog               |
| `FitSD — Origins.md`                       | 0    | Where the thinking came from                                        |
| `FitSD — Definitions.md`                   | 0    | Master glossary — FitSD terms, MoSCoW, and common acronyms          |
| `reference/FitSD — Standards Alignment.md` | 0    | How it maps to ISO 27001, NIS2, ITIL and FitSM                      |
| `reference/FitSD — Influences.md`          | 0    | The Lean / DevOps canon behind the thinking (non-normative)        |
| `capabilities/`                            | 2/4  | The process docs and forms — built out for Solution Development     |
| `diagrams/`, `BACKLOG.md`                  | —    | Mermaid diagrams; the running list of what's next                   |
| `LICENSE`                                  | —    | Creative Commons Attribution 4.0 (CC BY 4.0)                        |

## The five capabilities

| Group                               | Code   | Status                                                   |
| ----------------------------------- | ------ | -------------------------------------------------------- |
| Govern                              | FSD-GV | Card built (`capabilities/`)                             |
| Bring in — **Solution Development** | FSD-SD | Built out in full (`capabilities/solution-development/`) |
| Change & release                    | FSD-CH | Card built (`capabilities/`)                             |
| Run & restore                       | FSD-RR | Card built (`capabilities/`)                             |
| Secure & assure                     | FSD-SA | Card built (`capabilities/`)                             |

Solution Development is built out in full — a process and three forms. The other four each have a **capability card**: what it governs, the requirements it carries, and which existing standard or process to satisfy them with. That's the design — FitSD tells you *what* good looks like and lets you keep the *how* you already have.

## Where it's at

v0.1, founding layer. The charter and requirements are drafted; Solution Development has its process and three working forms. Everything else is on the map but not yet built. See `BACKLOG.md` for what's queued.

// Single source of truth for site structure.
//
// Consumed by BOTH:
//   - scripts/vendor.mjs   → which canonical .md to vendor, and where (+ frontmatter)
//   - astro.config.mjs     → the Starlight sidebar (groups, nesting, labels, order)
//
// One manifest means the nav and the vendored content can never disagree.
//
// Leaf item shape:
//   { canonical, slug, label, description }   canonical → vendored from the repo root
//   { slug, label, authored: true }           hand-authored site page (vendor leaves it alone)
// Group shape:
//   { group, items: [...] }                    nestable (two-level sidebar)

export const SITE = {
  title: "FitSD",
  name: "FitSD",
  domain: "fitsd.tfindley.dev",
  url: "https://fitsd.tfindley.dev",
  tagline: "Just enough process to take on the right work and ship it so it lasts.",
  description:
    "FitSD (Fit for Solution Development) is a lightweight, vendor-neutral service-management framework for small technical teams: one front door for new work, two decision gates, and a definition of done that means operable — documented, recoverable, secure, monitored and supportable. Released under CC BY 4.0.",
  // The GitHub repository that holds the canonical standard.
  repo: "https://github.com/tfindley/keystone",
  license: "CC BY 4.0",
};

export const NAV = [
  {
    group: "Start here",
    items: [
      {
        canonical: "FitSD — Quickstart.md",
        slug: "quickstart",
        label: "Quickstart",
        description:
          "The fastest path from “what's this?” to “we're using it” — one real project, five moves, a win this week.",
      },
      {
        canonical: "FitSD — Origins.md",
        slug: "origins",
        label: "Origins",
        description: "Where the thinking behind FitSD came from.",
      },
    ],
  },
  {
    group: "The Framework",
    items: [
      {
        canonical: "FitSD — Framework Charter.md",
        slug: "framework/charter",
        label: "Charter",
        description:
          "What FitSD is: its principles, the five-capability model, roles, and how conformance is judged. Tier 0.",
      },
      {
        canonical: "FitSD — Requirements.md",
        slug: "framework/requirements",
        label: "Requirements",
        description:
          "The testable “shall” statements — the spine an auditor would check. Tier 1.",
      },
      {
        canonical: "FitSD — Definitions.md",
        slug: "framework/definitions",
        label: "Definitions",
        description: "The master glossary — FitSD terms, MoSCoW, and common acronyms.",
      },
      {
        canonical: "FitSD — Roadmap.md",
        slug: "framework/roadmap",
        label: "Roadmap",
        description: "Direction of travel for the framework — the bigger picture beyond the backlog.",
      },
      {
        canonical: "FitSD — Versioning Policy.md",
        slug: "framework/versioning-policy",
        label: "Versioning Policy",
        description:
          "How FitSD is versioned so a team can adopt — and conform to — a specific version that won't move.",
      },
      {
        canonical: "FitSD — Elevator Pitch & Executive Summary.md",
        slug: "framework/pitch-and-summary",
        label: "Pitch & Summary",
        description:
          "The short forms: a pitch to say out loud and a one-page summary for whoever holds the budget.",
      },
    ],
  },
  {
    group: "Capabilities",
    items: [
      {
        canonical: "capabilities/govern/FSD-GV — Govern.md",
        slug: "capabilities/govern",
        label: "Govern · FSD-GV",
        description:
          "The Govern capability card: what it governs, the requirements it carries, and how to satisfy them.",
      },
      {
        group: "Solution Development · FSD-SD",
        items: [
          {
            canonical:
              "capabilities/solution-development/FSD-PRO — Solution Development Process.md",
            slug: "capabilities/solution-development/process",
            label: "Process · FSD-PRO",
            description:
              "The front door, built out in full: intake → Gate 1 → Gate 2 → Service Acceptance.",
          },
          {
            canonical:
              "capabilities/solution-development/FSD-FRM-01 — Gate 1 Outline Proposal.md",
            slug: "capabilities/solution-development/gate-1",
            label: "Gate 1 · Outline Proposal",
            description: "Form FSD-FRM-01 — the “is this worth doing?” gate.",
          },
          {
            canonical:
              "capabilities/solution-development/FSD-FRM-02 — Gate 2 Solution Design.md",
            slug: "capabilities/solution-development/gate-2",
            label: "Gate 2 · Solution Design",
            description: "Form FSD-FRM-02 — the “is it ready to build?” gate.",
          },
          {
            canonical:
              "capabilities/solution-development/FSD-FRM-03 — Service Acceptance Record.md",
            slug: "capabilities/solution-development/acceptance",
            label: "Service Acceptance Record",
            description:
              "Form FSD-FRM-03 — the close-out that proves a service is operable before it goes live.",
          },
        ],
      },
      {
        canonical: "capabilities/change-and-release/FSD-CH — Change & Release.md",
        slug: "capabilities/change-and-release",
        label: "Change & Release · FSD-CH",
        description: "The Change & Release capability card.",
      },
      {
        canonical: "capabilities/run-and-restore/FSD-RR — Run & Restore.md",
        slug: "capabilities/run-and-restore",
        label: "Run & Restore · FSD-RR",
        description:
          "The Run & Restore capability card — operations, incident, restore, and end-of-life retirement.",
      },
      {
        canonical: "capabilities/secure-and-assure/FSD-SA — Secure & Assure.md",
        slug: "capabilities/secure-and-assure",
        label: "Secure & Assure · FSD-SA",
        description: "The Secure & Assure capability card.",
      },
    ],
  },
  {
    group: "Reference",
    items: [
      {
        canonical: "reference/FitSD — Standards Alignment.md",
        slug: "reference/standards-alignment",
        label: "Standards Alignment",
        description: "How FitSD maps to ISO 27001, NIS2, ITIL and FitSM.",
      },
      {
        canonical: "reference/FitSD — Influences.md",
        slug: "reference/influences",
        label: "Influences",
        description: "The Lean / DevOps canon behind the thinking (non-normative).",
      },
      {
        canonical: "reference/FitSD — Information Stores.md",
        slug: "reference/information-stores",
        label: "Information Stores",
        description:
          "The tech-agnostic catalogue of registers and records FitSD implies — what they hold and who owns them.",
      },
      {
        canonical: "diagrams/FitSD — Diagrams.md",
        slug: "reference/diagrams",
        label: "Diagrams",
        description: "The FitSD visual set — capability model, lifecycle, gates, and information stores.",
      },
    ],
  },
  {
    group: "Adoption",
    items: [
      {
        canonical: "FitSD — Adoption & Positioning.md",
        slug: "adoption/positioning",
        label: "Adoption & Positioning",
        description: "Who FitSD is for, why they adopt it, and how it fits teams of different sizes.",
      },
    ],
  },
  {
    group: "Compliance & governance",
    items: [
      {
        slug: "compliance/security",
        label: "Security of this site",
        authored: true,
        description: "The security posture of fitsd.tfindley.dev — headers, CSP, supply chain, hosting.",
      },
      {
        slug: "compliance/tech-stack",
        label: "How this site is built",
        authored: true,
        description: "The tech stack and the single-source-of-truth pipeline behind this site.",
      },
      {
        slug: "compliance/ai-assisted",
        label: "AI-assisted development",
        authored: true,
        description: "How AI assistance was used in building this site, and what stays under human control.",
      },
      {
        slug: "compliance/versioning",
        label: "Versioning & change policy",
        authored: true,
        description: "How FitSD versions are cut, frozen, and kept browsable so you can adopt a specific one.",
      },
    ],
  },
];

// Flatten the manifest to the leaf items vendor.mjs cares about (those with a canonical source).
export function vendoredItems() {
  const out = [];
  const walk = (nodes) => {
    for (const n of nodes) {
      if (n.items) walk(n.items);
      else if (n.canonical) out.push(n);
    }
  };
  walk(NAV);
  return out;
}

// Transform the manifest into a Starlight sidebar config (groups, nesting, labels).
export function sidebar() {
  const toItem = (n) =>
    n.items ? { label: n.group, items: n.items.map(toItem) } : { label: n.label, slug: n.slug };
  return NAV.map(toItem);
}

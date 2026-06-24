import type { FormSchema } from "./schema";

// Mirrors capabilities/solution-development/FSD-FRM-01 — Gate 1 Outline Proposal.
// Canonical doc is the authority; help text is quoted from it.
export const gate1: FormSchema = {
  id: "gate-1",
  frmId: "FSD-FRM-01",
  title: "Gate 1 — Outline Proposal",
  canonicalSlug: "capabilities/solution-development/gate-1",
  intro:
    "The first decision gate: is this worth doing? Capture the idea, its value, rough effort and options before any design effort is spent.",
  references: [
    { label: "Solution Development Process (FSD-PRO)", slug: "capabilities/solution-development/process" },
  ],
  sections: [
    {
      title: "Header",
      fields: [
        { name: "title", label: "Solution title", type: "text" },
        { name: "status", label: "Status", type: "select", options: ["Draft", "Submitted", "Approved"] },
        { name: "owner", label: "Solution Owner", type: "text", help: "Accountable for this solution." },
        { name: "contributors", label: "Contributors", type: "textarea" },
        { name: "date", label: "Date", type: "date" },
      ],
    },
    {
      title: "1. Idea",
      fields: [
        { name: "overview", label: "Overview", type: "textarea", help: "What is the idea, in a sentence or two?" },
        { name: "customer", label: "Customer", type: "text", help: "Internal team or named customer(s)." },
        {
          name: "requirement",
          label: "Requirement / outcome",
          type: "textarea",
          help: "The gap we are plugging and the outcome sought. High-level scope. State whether this is a one-off requirement or the start of a service that must scale.",
        },
        { name: "benefits", label: "Benefits", type: "textarea", help: "Internal and/or external." },
      ],
    },
    {
      title: "2. Value and driver",
      help: "Primary driver: Value / Compliance / Risk reduction. For compliance- or risk-driven work the case rests on §4 (impact of doing nothing) and the cited obligation or risk record, not the value total. Score each lens 1–3 (1 = low, 3 = high) — a priority signal, not a pass/fail.",
      fields: [
        { name: "primaryDriver", label: "Primary driver", type: "select", options: ["Value", "Compliance", "Risk reduction"] },
        { name: "growthScore", label: "Growth — score (1–3)", type: "number", min: 1, max: 3, help: "New revenue, users or capability." },
        { name: "growthNote", label: "Growth — note", type: "text" },
        { name: "retentionScore", label: "Retention — score (1–3)", type: "number", min: 1, max: 3, help: "Keeps current users, or protects a service they rely on." },
        { name: "retentionNote", label: "Retention — note", type: "text" },
        { name: "efficiencyScore", label: "Efficiency — score (1–3)", type: "number", min: 1, max: 3, help: "Saves time, cost or toil." },
        { name: "efficiencyNote", label: "Efficiency — note", type: "text" },
        { name: "riskScore", label: "Risk & compliance — score (1–3)", type: "number", min: 1, max: 3, help: "Reduces a risk or meets an obligation — e.g. closes an exception, meets a regulatory measure." },
        { name: "riskNote", label: "Risk & compliance — note", type: "text" },
        { name: "valueTotal", label: "Total", type: "number", help: "Summary only — a priority signal, not a pass/fail." },
      ],
    },
    {
      title: "3. Effort (T-shirt estimate)",
      help: "Size each as S / M / L with a short note. Consider all aspects — monitoring, security, billing, support and documentation — not just the build.",
      fields: [
        { name: "peopleSize", label: "People — size", type: "select", options: ["S", "M", "L"] },
        { name: "peopleNote", label: "People — note", type: "text" },
        { name: "capexSize", label: "CAPEX — size", type: "select", options: ["S", "M", "L"] },
        { name: "capexNote", label: "CAPEX — note", type: "text", help: "Purchase / one-off costs." },
        { name: "opexSize", label: "OPEX — size", type: "select", options: ["S", "M", "L"] },
        { name: "opexNote", label: "OPEX — note", type: "text", help: "Ongoing run / licensing / support costs." },
      ],
    },
    {
      title: "4. Impact and timing",
      fields: [
        { name: "impactNothing", label: "Impact of doing nothing", type: "textarea" },
        { name: "whyNow", label: "Why now?", type: "textarea", help: "The compelling event — a customer opportunity, a technology change, something on the critical path." },
        { name: "expires", label: "When does this expire?", type: "text", help: "A date or trigger to revisit the case. No clear date? Set a reminder for a quarter or two out." },
      ],
    },
    {
      title: "5. Delivery options",
      repeatable: {
        id: "options",
        itemNoun: "option",
        columns: [
          { name: "option", label: "Option", type: "text" },
          { name: "pros", label: "Pros", type: "textarea" },
          { name: "cons", label: "Cons", type: "textarea" },
          { name: "dependencies", label: "Dependencies", type: "textarea" },
          { name: "preferred", label: "Preferred?", type: "checkbox" },
        ],
      },
    },
    {
      title: "6. New technology / vendor",
      note: "Complete if this brings in a new technology, tool, product or third-party dependency — regardless of cost or effort.",
      help: "Due diligence so a new dependency comes in through the front door, not the back.",
      fields: [
        { name: "newTech", label: "New tech / tool introduced?", type: "select", options: ["No", "Yes"], help: "What is being adopted?" },
        { name: "vendorLicensing", label: "Vendor & licensing", type: "textarea", help: "Licence model and cost; the supplier, and how they've been to deal with so far.", showWhen: { field: "newTech", equals: "Yes" } },
        { name: "upgradePath", label: "Upgrade path", type: "textarea", help: "How and how often it's updated; its support / end-of-life horizon.", showWhen: { field: "newTech", equals: "Yes" } },
        { name: "supportOwnership", label: "Support & ownership", type: "textarea", help: "Who owns and supports it once live.", showWhen: { field: "newTech", equals: "Yes" } },
        { name: "exitAlternatives", label: "Exit / alternatives", type: "textarea", help: "How we'd get off it if needed; alternatives considered.", showWhen: { field: "newTech", equals: "Yes" } },
      ],
    },
    {
      title: "7. Proof of concept",
      note: "Optional — only if feasibility is still in doubt.",
      fields: [
        { name: "pocNeeded", label: "PoC needed?", type: "select", options: ["No", "Yes"] },
        { name: "pocObjective", label: "Objective", type: "textarea", help: "What question does the PoC answer?", showWhen: { field: "pocNeeded", equals: "Yes" } },
        { name: "pocSuccess", label: "Success criteria", type: "textarea", help: "How we judge it proved.", showWhen: { field: "pocNeeded", equals: "Yes" } },
        { name: "pocMethod", label: "Method & cost", type: "textarea", help: "Where you'll run it, and what it costs.", showWhen: { field: "pocNeeded", equals: "Yes" } },
        { name: "pocResources", label: "Resources & duration", type: "textarea", showWhen: { field: "pocNeeded", equals: "Yes" } },
        { name: "pocResult", label: "Result / conclusion", type: "textarea", help: "Completed after the PoC, before Gate 2.", showWhen: { field: "pocNeeded", equals: "Yes" } },
      ],
    },
    {
      title: "8. Sign-off",
      help: "Sign-off authorises progression to Gate 2 (or to a PoC first). Note any conditions.",
      fields: [
        { name: "decision", label: "Decision", type: "select", options: ["Proceed to Gate 2", "Proceed via PoC first", "Park", "Reject"] },
        { name: "approver", label: "Approver", type: "text" },
        { name: "conditions", label: "Conditions / reason", type: "textarea" },
        { name: "signoffDate", label: "Date", type: "date" },
      ],
    },
  ],
};

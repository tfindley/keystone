import type { FormSchema } from "./schema";

// The Idea Brief has no formal canonical form — it's described in FitSD — Quickstart §1.
// Informal intake: enough on paper to decide whether an idea is worth a proper look.
export const ideaBrief: FormSchema = {
  id: "idea-brief",
  frmId: "",
  title: "Idea Brief",
  canonicalSlug: "quickstart",
  intro:
    "An informal one-pager — enough to decide whether an idea is worth a proper look, before Gate 1. Don't design anything yet.",
  sections: [
    {
      title: "Header",
      fields: [
        { name: "title", label: "Working title", type: "text" },
        { name: "owner", label: "Raised by", type: "text" },
        { name: "date", label: "Date", type: "date" },
      ],
    },
    {
      title: "The brief",
      help: "One page. What's the problem, what would 'done' look like, and what's roughly in and out of scope.",
      fields: [
        { name: "problem", label: "Problem", type: "textarea", help: "What's the problem or gap?" },
        { name: "done", label: "What would 'done' look like?", type: "textarea", help: "The outcome you're after." },
        { name: "inScope", label: "Roughly in scope", type: "textarea" },
        { name: "outScope", label: "Roughly out of scope", type: "textarea" },
      ],
    },
  ],
};

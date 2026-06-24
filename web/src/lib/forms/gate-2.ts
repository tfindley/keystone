import type { FormSchema } from "./schema";

// Mirrors capabilities/solution-development/FSD-FRM-02 — Gate 2 Solution Design.
export const gate2: FormSchema = {
  id: "gate-2",
  frmId: "FSD-FRM-02",
  title: "Gate 2 — Solution Design",
  canonicalSlug: "capabilities/solution-development/gate-2",
  intro:
    "The second decision gate: is it ready to build? Refine the approved Gate 1 into a design — requirements, architecture (with security in it), and how each acceptance criterion will be met.",
  references: [
    { label: "Run & Restore (FSD-RR)", slug: "capabilities/run-and-restore" },
    { label: "Secure & Assure (FSD-SA)", slug: "capabilities/secure-and-assure" },
    { label: "Change & Release (FSD-CH)", slug: "capabilities/change-and-release" },
  ],
  sections: [
    {
      title: "Header",
      fields: [
        { name: "title", label: "Solution title", type: "text" },
        { name: "status", label: "Status", type: "select", options: ["Draft", "Submitted", "Approved"] },
        { name: "owner", label: "Solution Owner", type: "text" },
        { name: "contributors", label: "Contributors", type: "textarea" },
        { name: "linkedGate1", label: "Linked Gate 1 (FSD-FRM-01)", type: "text", help: "Reference to the approved Gate 1." },
        { name: "date", label: "Date", type: "date" },
      ],
    },
    {
      title: "1. Carry-forward from Gate 1",
      help: "Summarise the approved Gate 1 — outcome sought, value and effort — updated as more is now known.",
      fields: [
        { name: "outcome", label: "Outcome / requirement", type: "textarea" },
        { name: "valueRecap", label: "Value (recap)", type: "textarea" },
        { name: "effortRecap", label: "Effort (recap, refined)", type: "textarea" },
      ],
    },
    {
      title: "2. Requirements",
      help: "Functional and technical requirements as user stories, MoSCoW-rated.",
      repeatable: {
        id: "requirements",
        itemNoun: "requirement",
        columns: [
          { name: "story", label: "User story", type: "textarea", help: "As a … I want … so that …" },
          { name: "moscow", label: "MoSCoW", type: "select", options: ["Must", "Should", "Could", "Won't"] },
        ],
      },
    },
    {
      title: "3. Architecture",
      help: "Sketch the architecture and where it fits the wider estate. Show where security sits in it. Note any departures from the team's design principles.",
      fields: [
        { name: "diagram", label: "Architecture diagram (link)", type: "textarea", help: "Paste a link to the diagram (or describe it). Image upload isn't supported in this one-shot form." },
        { name: "description", label: "Description", type: "textarea" },
        { name: "securityDesign", label: "Security in the design", type: "textarea", help: "Where and how security is embedded." },
        { name: "designExceptions", label: "Design exceptions", type: "textarea", help: "Departures from the team's design principles, if any." },
      ],
    },
    {
      title: "4. Operational impact",
      fields: [
        { name: "monitoring", label: "Monitoring", type: "textarea" },
        { name: "billing", label: "Billing / chargeback", type: "textarea", help: "If applicable." },
        { name: "serviceDesk", label: "Service desk / ITSM", type: "textarea" },
        { name: "environments", label: "Environments", type: "textarea", help: "Dev / ongoing." },
        { name: "processImpact", label: "Process impact", type: "textarea", help: "Does this force changes to change, incident or other processes? Note which capability — FSD-CH / FSD-RR / FSD-SA." },
      ],
    },
    {
      title: "5. Service Acceptance Criteria — design approach",
      help: "State how each criterion will be met. Each is proven later on the Service Acceptance Record.",
      fields: [
        { name: "sacDocumentation", label: "Documentation", type: "textarea", help: "Which docs (HLD, runbook, recovery, user) and where they will live." },
        { name: "sacBackup", label: "Backup (tested)", type: "textarea", help: "What is backed up, frequency, retention, location — and how a test restore will be proven." },
        { name: "sacSecurity", label: "Security", type: "textarea", help: "Hardening, patch path (FSD-RR), vulnerability posture, any exceptions (FSD-SA)." },
        { name: "sacAccess", label: "Access", type: "textarea", help: "Access model — roles, least privilege, grant/revoke, admin control, JML handling." },
        { name: "sacAvailability", label: "Availability", type: "textarea", help: "Expected availability / SLO, capacity & scaling, DR considerations." },
        { name: "sacMonitoring", label: "Monitoring & alerting", type: "textarea", help: "What is monitored, thresholds, where alerts route." },
        { name: "sacIncident", label: "Incident profile", type: "textarea", help: "What counts as an incident for this service — triggers and severities — to register with incident management." },
        { name: "sacSupport", label: "Supportability / handover", type: "textarea", help: "Operating & support model, runbook, training; how continuity is assured — cross-training / knowledge capture so it isn't reliant on one person." },
        { name: "sacCost", label: "Cost / licensing", type: "textarea", help: "Expected run-cost and licences." },
      ],
    },
    {
      title: "6. RAIDD",
      help: "Risks, Assumptions, Issues, Dependencies, Decisions.",
      repeatable: {
        id: "raidd",
        itemNoun: "entry",
        columns: [
          { name: "type", label: "Type", type: "select", options: ["Risk", "Assumption", "Issue", "Dependency", "Decision"] },
          { name: "detail", label: "Detail", type: "textarea" },
        ],
      },
    },
    {
      title: "7. Refined effort and cost",
      help: "Keep proportionate: person-days by role/workstream, not a full FTE model.",
      fields: [
        { name: "peopleEstimate", label: "People — estimate", type: "textarea", help: "Person-days, by role / workstream." },
        { name: "capexEstimate", label: "CAPEX — estimate", type: "textarea", help: "Purchase / one-off." },
        { name: "opexEstimate", label: "OPEX — estimate", type: "textarea", help: "Ongoing run / licensing." },
      ],
    },
    {
      title: "7.2 Milestones",
      repeatable: {
        id: "milestones",
        itemNoun: "milestone",
        columns: [
          { name: "milestone", label: "Milestone", type: "text" },
          { name: "target", label: "Target date", type: "date" },
          { name: "owner", label: "Owner", type: "text" },
        ],
      },
    },
    {
      title: "8. Sign-off",
      help: "Sign-off authorises progression to delivery. Build and deployment changes are then raised through Change & Release (FSD-CH).",
      fields: [
        { name: "decision", label: "Decision", type: "select", options: ["Approved for delivery", "Rework"] },
        { name: "approver", label: "Approver", type: "text" },
        { name: "conditions", label: "Conditions", type: "textarea" },
        { name: "signoffDate", label: "Date", type: "date" },
      ],
    },
  ],
};

import type { FormSchema } from "./schema";

// Mirrors capabilities/solution-development/FSD-FRM-03 — Service Acceptance Record.
export const sac: FormSchema = {
  id: "acceptance",
  frmId: "FSD-FRM-03",
  title: "Service Acceptance Record",
  canonicalSlug: "capabilities/solution-development/acceptance",
  intro:
    "The close-out: prove the solution is ready to run before it enters live service. Each criterion is evidenced — a link, a date, a reference — not merely asserted.",
  references: [
    { label: "Run & Restore (FSD-RR)", slug: "capabilities/run-and-restore" },
    { label: "Secure & Assure (FSD-SA)", slug: "capabilities/secure-and-assure" },
  ],
  sections: [
    {
      title: "Header",
      fields: [
        { name: "title", label: "Solution title", type: "text" },
        { name: "owner", label: "Solution Owner", type: "text" },
        { name: "deliveryRef", label: "Delivery project (ref)", type: "text" },
        { name: "linkedGate2", label: "Linked Gate 2 (FSD-FRM-02)", type: "text" },
        { name: "date", label: "Date", type: "date" },
      ],
    },
    {
      title: "1. Acceptance criteria",
      help: "For each criterion, record the evidence (a link, a date, a reference) and whether it is met.",
      criteria: {
        id: "criteria",
        rows: [
          { name: "documentation", label: "Documentation", help: "HLD, runbook, recovery procedure, user/how-to published." },
          { name: "backup", label: "Backup (tested)", help: "Backup in place and test restore performed, dated." },
          { name: "security", label: "Security", help: "Hardening applied, patch path set (FSD-RR), vuln posture acceptable, exceptions logged (FSD-SA)." },
          { name: "access", label: "Access", help: "Access model implemented; least privilege; JML handling confirmed." },
          { name: "availability", label: "Availability", help: "SLO met or accepted; capacity & scaling understood; DR position recorded." },
          { name: "monitoring", label: "Monitoring & alerting", help: "Monitoring live; thresholds set; test alert observed end-to-end." },
          { name: "incident", label: "Incident profile", help: "Service-level incident triggers & severities registered with incident management." },
          { name: "support", label: "Supportability / handover", help: "Support model agreed; runbook accepted; team ready; training done; continuity assured (knowledge captured, not reliant on one person)." },
          { name: "cost", label: "Cost / licensing", help: "Licences in place; ongoing run-cost confirmed and owned." },
        ],
      },
    },
    {
      title: "2. Outstanding remediation",
      help: "List any criterion not yet met, the action required, and the owner/date. The record is re-presented when these are closed.",
      repeatable: {
        id: "remediation",
        itemNoun: "item",
        columns: [
          { name: "criterion", label: "Criterion", type: "text" },
          { name: "action", label: "Action required", type: "textarea" },
          { name: "owner", label: "Owner", type: "text" },
          { name: "target", label: "Target date", type: "date" },
        ],
      },
    },
    {
      title: "3. Acceptance sign-off",
      fields: [
        { name: "decision", label: "Decision", type: "select", options: ["Accepted into service", "Remediation required"] },
        { name: "approver", label: "Approver", type: "text" },
        { name: "conditions", label: "Conditions", type: "textarea" },
        { name: "signoffDate", label: "Date", type: "date" },
      ],
    },
  ],
};

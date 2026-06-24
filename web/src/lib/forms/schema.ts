// Types for the interactive Solution Development forms.
//
// Each form is data (a FormSchema); one renderer (components/forms/FitForm.astro) and one
// client script (components/forms/form.client.ts) drive all four. The schemas mirror the
// canonical FSD-FRM-* Markdown by hand — the canonical docs remain the source of truth.
// See README.md in this folder for the whole feature's design and how to remove it.

export type FieldType = "text" | "textarea" | "select" | "checkbox" | "date" | "number";

export interface Field {
  /** Unique within the form; used as the input name and the output key. */
  name: string;
  label: string;
  type: FieldType;
  /** Guidance text, shown as inline help under the field (verbatim from the canonical form). */
  help?: string;
  /** Options for a `select`. */
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  /** Show this field only when another field (by name) equals a value — conditional sections. */
  showWhen?: { field: string; equals: string };
}

/** A criterion row (used by the Service Acceptance "criteria" section): a fixed label +
 *  definition, captured with an evidence note and a Met? (Y/N). */
export interface Criterion {
  name: string;
  label: string;
  help?: string;
}

export interface Section {
  title: string;
  /** Section-level guidance / preamble. */
  help?: string;
  /** A short status note, e.g. "Optional" or "Complete only if…". */
  note?: string;
  /** A plain section: a list of fields. */
  fields?: Field[];
  /** A repeatable table: add/remove rows, each row a set of column fields. */
  repeatable?: { id: string; itemNoun: string; columns: Field[] };
  /** A fixed criteria table (Service Acceptance): each row gets an evidence note + Met? select. */
  criteria?: { id: string; rows: Criterion[] };
}

export interface FormSchema {
  /** URL slug, e.g. "gate-1". */
  id: string;
  /** Canonical form ID, e.g. "FSD-FRM-01" (empty for the informal Idea Brief). */
  frmId: string;
  title: string;
  /** Site slug of the canonical doc this mirrors, e.g. "capabilities/solution-development/gate-1". */
  canonicalSlug: string;
  /** One- or two-line description shown at the top of the form. */
  intro: string;
  /** Cross-referenced standard areas to link from the output (e.g. the FSD-RR / FSD-SA capabilities). */
  references?: { label: string; slug: string }[];
  sections: Section[];
}

# Interactive forms — how it works (and how to change or remove it)

Interactive versions of the FitSD Solution Development artifacts (Idea Brief, Gate 1, Gate 2,
Service Acceptance Record). Fill in a form in the browser, with the canonical guidance shown
inline, then **download a Markdown record** or **Print / Save as PDF (A4)**. One-shot — no
save/reload, no server, no account, no third-party libraries.

This is a **website-stream** feature: it does **not** bump the FitSD `VERSION`. The canonical
`FSD-FRM-*` Markdown remains the source of truth; these forms *mirror* it.

## File map

| File | Role |
|---|---|
| `src/lib/forms/schema.ts` | Types: `FormSchema`, `Section`, `Field`, `Criterion`. |
| `src/lib/forms/{idea-brief,gate-1,gate-2,sac}.ts` | One schema per form (hand-authored from the canonical docs; help text quoted from them). |
| `src/lib/forms/index.ts` | `slug → schema` map, in process order. |
| `src/components/forms/Field.astro` | Renders one labelled input + inline help. |
| `src/components/forms/FitForm.astro` | Renders a whole schema; emits all metadata (labels, types, **absolute links back to the standard**, version) as `data-*` so the client needs no schema. Includes the client `<script>`. |
| `src/components/forms/form.client.ts` | Bundled client logic: conditional fields, repeatable rows, Clear, and the outputs. One `collectForm()` step feeds both: **Download .md** and **Print / PDF** — the latter builds a **typeset document** (`.fitform-print`, DOM APIs, no inline styles) and prints *that*, not the live form. Links back to the standard embedded in both. |
| `src/pages/forms/index.astro` | The `/forms/` landing. |
| `src/pages/forms/[slug].astro` | One route per form, wrapped in Starlight's `StarlightPage`. |
| `src/styles/forms.css` | Screen layout (reuses `fitsd.css` tokens) + the `@media print` A4 record. |

Nav: a **Forms** group in `../../content.manifest.mjs` (`link` items → the custom pages; the
`sidebar()` helper supports `link` alongside `slug`). `forms.css` is registered in
`astro.config.mjs` `customCss`.

## How it works

1. A schema is data. `FitForm.astro` renders it to a `<form data-fitform>` with semantic
   `data-*` attributes and inline help.
2. `form.client.ts` (bundled → served `'self'`, CSP-clean) wires conditional visibility
   (`showWhen`), repeatable add/remove, and the actions.
3. **Output is generated from the live DOM** via a single `collectForm()` step — no schema
   ships to the browser. It feeds two emitters: `toMarkdown()` (the `.md` download) and
   `toPrintDoc()` (a typeset `.fitform-print` document). Both carry the canonical form's
   absolute URL + version + references. For print/PDF, `forms.css` hides everything except
   the generated document (`body > *:not(.fitform-print)`) and sets `@page { size: A4 }`, so
   the PDF reads as a clean document rather than a screenshot of the form.

## Add a form / change a field

- **New form:** add `src/lib/forms/<slug>.ts` exporting a `FormSchema`, register it in
  `index.ts`, and add a `{ link: "/forms/<slug>/", label }` to the Forms group in
  `content.manifest.mjs`. The route and rendering are automatic.
- **Change a field:** edit the relevant schema file. Keep it in step with the canonical
  `FSD-FRM-*` doc (see "drift" below).

## Remove the feature cleanly

1. Delete `src/lib/forms/`, `src/components/forms/`, `src/pages/forms/`, `src/styles/forms.css`.
2. Remove the **Forms** group from `content.manifest.mjs` (the `sidebar()` `link` branch can
   stay — it's harmless).
3. Remove `"./src/styles/forms.css"` from `customCss` in `astro.config.mjs`.
4. Bump `web/package.json` and rebuild. No FitSD `VERSION` change.

## Known limitations / deferred

- **No save/reload**, no carrying a record across Gate 1 → Gate 2 → SAC (future).
- **No binary upload** — the Gate 2 architecture diagram and SAC evidence are link/text fields.
- **Schema drift:** the schemas mirror the canonical `FSD-FRM-*` by hand, so they can drift if
  a canonical form changes. The canonical docs remain authoritative; the generated output is
  labelled as generated and cites the form ID + version. A schema↔canonical drift-check is a
  candidate in `../../SITE_TODO.md`.

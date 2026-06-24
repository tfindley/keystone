// Client behaviour for the interactive forms. Bundled by Astro (served 'self' — CSP-clean).
// Fully DOM-driven. One collect step feeds both outputs so they can't diverge:
//   • Download .md  — Markdown mirroring the canonical form, with links back to the standard.
//   • Print / PDF   — a typeset document (not the raw form), built with DOM APIs (XSS-safe)
//                     and styled by forms.css @media print (A4). No libraries.

type El = HTMLElement;
const HIDDEN = "fitform-hidden";

function inputValue(el: Element | null | undefined): string {
  if (!el) return "";
  if (el instanceof HTMLInputElement) {
    if (el.type === "checkbox") return el.checked ? "Yes" : "";
    return el.value.trim();
  }
  if (el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) return el.value.trim();
  return "";
}
function fieldValue(field: El): string {
  return inputValue(field.querySelector("input, textarea, select"));
}
const cleanInline = (s: string) => s.replace(/\s*\n+\s*/g, " ").trim();
const cleanCell = (s: string) => s.replace(/\|/g, "\\|").replace(/\s*\n+\s*/g, "<br>").trim();

// --- conditional visibility -------------------------------------------------

function applyConditionals(form: El) {
  form.querySelectorAll<El>("[data-field][data-show-when-field]").forEach((field) => {
    const ctrl = form.querySelector<HTMLElement>(`[data-field][data-name="${field.dataset.showWhenField}"]`);
    const current = ctrl ? fieldValue(ctrl) : "";
    field.classList.toggle(HIDDEN, current !== (field.dataset.showWhenEquals ?? ""));
  });
}

// --- repeatable rows --------------------------------------------------------

function clearRow(row: El) {
  row.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[data-input]").forEach((i) => {
    if (i instanceof HTMLInputElement && i.type === "checkbox") i.checked = false;
    else i.value = "";
  });
}
function addRow(repeatable: El) {
  const rows = repeatable.querySelector<El>("[data-rows]")!;
  const first = rows.querySelector<El>("[data-row]");
  if (!first) return;
  const clone = first.cloneNode(true) as El;
  clearRow(clone);
  rows.appendChild(clone);
}
function removeRow(row: El) {
  const rows = row.parentElement!;
  if (rows.querySelectorAll("[data-row]").length > 1) row.remove();
  else clearRow(row);
}

// --- collect the form into structured data (one source for both outputs) -----

interface FieldRow {
  label: string;
  value: string;
}
type CollectedSection =
  | { title: string; note: string; kind: "fields"; rows: FieldRow[] }
  | { title: string; note: string; kind: "table"; headers: string[]; rows: string[][] };
interface Collected {
  title: string;
  frmId: string;
  version: string;
  canonical: string;
  refs: { label: string; url: string }[];
  sections: CollectedSection[];
}

function collectForm(form: El): Collected {
  let refs: { label: string; url: string }[] = [];
  try {
    refs = JSON.parse(form.dataset.references || "[]");
  } catch {
    /* ignore */
  }
  const sections: CollectedSection[] = [];

  form.querySelectorAll<El>(".fitform-section").forEach((section) => {
    const title = section.dataset.section ?? "";
    const note = section.querySelector<El>(":scope > .fitform-note")?.textContent?.trim() ?? "";

    const fields = Array.from(section.querySelectorAll<El>(":scope > .fitform-field")).filter(
      (f) => !f.classList.contains(HIDDEN),
    );
    if (fields.length) {
      sections.push({
        title,
        note,
        kind: "fields",
        rows: fields.map((f) => ({ label: f.dataset.label ?? "", value: fieldValue(f) })),
      });
      return;
    }

    const rep = section.querySelector<El>(":scope > .fitform-repeatable");
    if (rep) {
      const first = rep.querySelector<El>("[data-row]");
      const headers = first ? Array.from(first.querySelectorAll<El>("[data-col]")).map((c) => c.dataset.label ?? "") : [];
      const rows = Array.from(rep.querySelectorAll<El>("[data-row]"))
        .map((r) => Array.from(r.querySelectorAll<El>("[data-col]")).map((c) => inputValue(c.querySelector("[data-input]"))))
        .filter((cells) => cells.some((c) => c !== ""));
      sections.push({ title, note, kind: "table", headers, rows });
      return;
    }

    const crit = section.querySelector<El>(":scope > .fitform-criteria");
    if (crit) {
      const rows = Array.from(crit.querySelectorAll<El>("[data-criterion]")).map((c) => [
        c.dataset.label ?? "",
        inputValue(c.querySelector("[data-evidence]")),
        inputValue(c.querySelector("[data-met]")) || "—",
      ]);
      sections.push({ title, note, kind: "table", headers: ["Criterion", "Evidence / link", "Met?"], rows });
    }
  });

  return {
    title: form.dataset.title ?? "FitSD form",
    frmId: form.dataset.frmid || "the Idea Brief",
    version: form.dataset.version ?? "",
    canonical: form.dataset.canonicalUrl ?? "",
    refs,
    sections,
  };
}

// --- Markdown emitter -------------------------------------------------------

function toMarkdown(d: Collected): string {
  const out: string[] = [];
  out.push(`# ${d.title}`, "");
  out.push(`> Generated with the FitSD toolkit — mirrors ${d.frmId} (FitSD v${d.version}).`);
  if (d.canonical) out.push(`> Canonical form: <${d.canonical}>`);
  out.push(`> The canonical form is the authority; review before use.`, "");
  if (d.refs.length) out.push(`**References:** ${d.refs.map((r) => `[${r.label}](${r.url})`).join(" · ")}`, "");

  for (const s of d.sections) {
    if (s.kind === "fields" && !s.rows.length) continue;
    if (s.kind === "table" && !s.rows.length) continue;
    out.push(`## ${s.title}`, "");
    if (s.note) out.push(`_${s.note}_`, "");
    if (s.kind === "fields") {
      s.rows.forEach((r) => out.push(`**${r.label}:** ${cleanInline(r.value) || "—"}`));
      out.push("");
    } else {
      out.push(`| ${s.headers.join(" | ")} |`);
      out.push(`| ${s.headers.map(() => "---").join(" | ")} |`);
      s.rows.forEach((cells) => out.push(`| ${cells.map(cleanCell).join(" | ")} |`));
      out.push("");
    }
  }
  return out.join("\n");
}

// --- print-document emitter (typeset; XSS-safe via DOM, no inline styles) -----

function elem(tag: string, cls?: string, text?: string): HTMLElement {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}
function link(text: string, href: string): HTMLAnchorElement {
  const a = elem("a", undefined, text) as HTMLAnchorElement;
  a.href = href;
  return a;
}

function toPrintDoc(d: Collected): HTMLElement {
  const root = elem("article", "fitform-print");
  root.appendChild(elem("h1", undefined, d.title));

  const meta = elem("p", "fitform-print-meta");
  meta.append(`FitSD ${d.frmId} · v${d.version} · `);
  if (d.canonical) meta.append(link(d.canonical, d.canonical));
  root.appendChild(meta);
  root.appendChild(elem("p", "fitform-print-meta", "The canonical form is the authority; review before use."));

  if (d.refs.length) {
    const r = elem("p", "fitform-print-refs");
    r.append("References: ");
    d.refs.forEach((ref, i) => {
      if (i) r.append(" · ");
      r.append(link(ref.label, ref.url));
    });
    root.appendChild(r);
  }

  for (const s of d.sections) {
    if (!s.rows.length) continue;
    root.appendChild(elem("h2", undefined, s.title));
    if (s.note) root.appendChild(elem("p", "fitform-print-note", s.note));

    if (s.kind === "fields") {
      const dl = elem("dl");
      s.rows.forEach((row) => {
        dl.appendChild(elem("dt", undefined, row.label));
        dl.appendChild(elem("dd", undefined, row.value || "—"));
      });
      root.appendChild(dl);
    } else {
      const table = elem("table");
      const thead = elem("thead");
      const htr = elem("tr");
      s.headers.forEach((h) => htr.appendChild(elem("th", undefined, h)));
      thead.appendChild(htr);
      table.appendChild(thead);
      const tbody = elem("tbody");
      s.rows.forEach((cells) => {
        const tr = elem("tr");
        cells.forEach((c) => tr.appendChild(elem("td", undefined, c)));
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      root.appendChild(table);
    }
  }
  return root;
}

// --- actions ----------------------------------------------------------------

function download(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function printForm(form: El) {
  document.querySelectorAll(".fitform-print").forEach((n) => n.remove());
  const doc = toPrintDoc(collectForm(form));
  document.body.appendChild(doc);
  const cleanup = () => doc.remove();
  window.addEventListener("afterprint", cleanup, { once: true });
  window.print();
  // Fallback in case afterprint doesn't fire (some browsers/contexts).
  setTimeout(() => doc.isConnected && doc.remove(), 60000);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// --- wiring -----------------------------------------------------------------

function wire(form: El) {
  if (form.dataset.fitformReady) return;
  form.dataset.fitformReady = "1";

  applyConditionals(form);
  form.addEventListener("change", () => applyConditionals(form));
  form.addEventListener("input", () => applyConditionals(form));

  form.addEventListener("click", (e) => {
    const t = e.target as El;
    const action = t.closest<El>("[data-action]")?.dataset.action;
    if (t.closest("[data-addrow]")) {
      addRow(t.closest<El>("[data-repeatable]")!);
    } else if (t.closest("[data-removerow]")) {
      removeRow(t.closest<El>("[data-row]")!);
    } else if (action === "download-md") {
      download(`fitsd-${form.dataset.slug}-${today()}.md`, toMarkdown(collectForm(form)));
    } else if (action === "print") {
      printForm(form);
    } else if (action === "reset") {
      (form as HTMLFormElement).reset();
      form.querySelectorAll<El>("[data-repeatable]").forEach((rep) => {
        rep.querySelectorAll<El>("[data-row]").forEach((r, i) => (i === 0 ? clearRow(r) : r.remove()));
      });
      applyConditionals(form);
    }
  });
}

export function initFitForms() {
  document.querySelectorAll<El>("[data-fitform]").forEach(wire);
}

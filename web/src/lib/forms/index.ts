import type { FormSchema } from "./schema";
import { ideaBrief } from "./idea-brief";
import { gate1 } from "./gate-1";
import { gate2 } from "./gate-2";
import { sac } from "./sac";

// All interactive forms, keyed by URL slug, in process order. Drives getStaticPaths in
// pages/forms/[slug].astro and the /forms/ landing list.
export const forms: Record<string, FormSchema> = {
  [ideaBrief.id]: ideaBrief,
  [gate1.id]: gate1,
  [gate2.id]: gate2,
  [sac.id]: sac,
};

export const formList: FormSchema[] = Object.values(forms);

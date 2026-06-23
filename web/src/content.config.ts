import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { docsVersionsLoader } from "starlight-versions/loader";
// Frozen versions; empty until the first release is cut by scripts/release.mjs.
import frozenVersions from "../versions.json" with { type: "json" };

// Docs are the canonical FitSD standard, vendored into src/content/docs/ at build by
// scripts/vendor.mjs (plus a few hand-authored site pages). The schema is Starlight's,
// extended with the framework metadata the vendor carries through so each page can show
// a "Tier 0 · draft" badge.
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        framework: z.string().optional(),
        tier: z.union([z.string(), z.number()]).optional(),
        status: z.string().optional(),
        document: z.string().optional(),
      }),
    }),
  }),
  // Archived, frozen versions (created by starlight-versions). Only defined once a frozen
  // version exists — otherwise the loader warns about an empty directory.
  ...(frozenVersions.length
    ? { versions: defineCollection({ loader: docsVersionsLoader() }) }
    : {}),
};

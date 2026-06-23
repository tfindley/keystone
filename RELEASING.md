# Releasing FitSD

How to publish changes — and how to tell an ordinary edit from a new version of the
standard. The public-facing policy is [FitSD — Versioning Policy](./FitSD%20%E2%80%94%20Versioning%20Policy.md);
this is the operator's checklist.

## The mental model: three streams

| Stream           | What it is                                                     | Version bump?           | How to ship                             |
| ---------------- | -------------------------------------------------------------- | ----------------------- | --------------------------------------- |
| **Website**      | Styling, layout, search, build config (`web/`)                 | `web/package.json` only | Commit to `main`; CI rebuilds the image |
| **Spec errata**  | Typos, clarifications, rendering fixes — *no normative effect* | **None**                | Commit to `main`; republishes in place  |
| **Spec release** | New or changed **requirements** (normative)                    | `VERSION` (semver)      | `npm run release` (below)               |

`main` is **latest, live** — the site root always serves it. Released versions are
**frozen** and immutable at `/0.1/`, `/0.2/`, … Decide which stream you're in *before* you
push: if you changed what FitSD *requires*, it's a release; otherwise it isn't.

> **Is it normative?** If an adopter could become non-conformant — or newly conformant —
> because of your change, it's normative → a release. Reworded the same requirement, fixed
> a typo, redrew a diagram, edited an explanatory page? Not normative → just commit.

## Everyday changes (website + errata)

1. Edit the canonical Markdown at the repo root (or the site under `web/`).
2. `cd web && npm run build` — the vendor step pulls your canonical edits in; confirm it's green.
3. Commit and push to `main`. CI ([`.github/workflows/web.yml`](.github/workflows/web.yml))
   re-vendors (with a drift check), builds the image, and publishes. The live site updates.

No version changes. This is the path for the vast majority of commits.

## Cutting a spec release

When you've made (or are about to make) a **normative** change, cut a version. The script
freezes the outgoing version, bumps `VERSION`, and tags — all locally, for your review.

```sh
cd web
npm run release -- 0.3.0      # the new number main becomes
```

It will:

1. Read the outgoing version from `VERSION` (e.g. `0.2.0`) and freeze it as an immutable
   `/0.2/` snapshot (via `starlight-versions`; appends `0.2` to `web/versions.json`).
2. Bump `VERSION` to `0.3.0` and re-vendor so the site's published version follows suit.
3. Add a dated `CHANGELOG.md` stub for `v0.3.0`.
4. Commit `Release FitSD v0.3.0 (freeze v0.2)` and create tag `v0.3.0` — **not pushed**.

Then review and publish:

```sh
git show --stat HEAD          # inspect the release commit (freeze + bump + changelog)
$EDITOR CHANGELOG.md          # fill in what changed in this release, then `git commit --amend`
git push --follow-tags        # CI builds + publishes: /0.2/ goes live, latest = v0.3.0
```

Pick the number with semver (see the Versioning Policy): **MAJOR** = breaking normative
change, **MINOR** = backward-compatible normative addition, **PATCH** = normative-neutral
correction you still want numbered.

### Notes & guard-rails

- The release script refuses to run on a **dirty working tree** (a release should be its
  own commit). Commit or stash first, or pass `--force` if you know what you're doing.
- It refuses to re-freeze a version already in `versions.json`.
- Frozen versions are **never** edited in place. A correction to old guidance is recorded,
  not rewritten.

## What the website does with all this

- The published version comes from the root `VERSION` file — vendored into the build so the
  standard drives the site, not the reverse.
- The version switcher shows **Latest (vX.Y.Z)** plus every frozen version.
- Mermaid diagrams are rendered to static SVG inside the Docker build (`RENDER_MERMAID=1` +
  a headless browser in the build stage only); local builds fall back to code blocks.

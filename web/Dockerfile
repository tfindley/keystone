# FitSD website — multi-stage build.
# Stage 1 builds the static Astro/Starlight site; stage 2 serves it with nginx.
# Traefik terminates TLS in front of this container, so nginx only speaks HTTP:80.

# ---- build ----
FROM node:22-slim AS build
WORKDIR /app

# install deps against the lockfile first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Render Mermaid diagrams to static SVG at BUILD time (no client JS, CSP-clean). This needs
# a headless browser + its system libraries; install them in THIS build stage only — the
# runtime image is nginx:alpine-slim and never carries the browser. If this layer is ever
# removed, the build still succeeds: diagrams fall back to code blocks (see astro.config).
ENV RENDER_MERMAID=1
RUN npx playwright install --with-deps chromium

# Build the static site. The canonical standard lives at the repo root, OUTSIDE this
# build context (./web), so vendor.mjs can't reach it here — it falls back to the
# committed vendored copies in src/content/docs/ (kept in sync by CI's vendor --check).
COPY . .
RUN npm run build

# ---- serve ----
# alpine-slim (not alpine): we only serve static files, so the optional dynamic modules
# and their image-filter/libgd dependency chain are pure attack surface. -slim drops them.
# Track the tag (not a pinned digest) so rebuilds pick up Alpine security patches.
FROM nginx:alpine-slim AS runtime
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/fitsd.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1/healthz || exit 1

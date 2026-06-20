# Deployment Plan

## Recommended First Deployment

Deploy the Vite production build as a static browser app.

Use:

```sh
pnpm run build
```

Serve the generated `dist/` directory from the selected static host.

## Hosting Requirements

- HTTPS enabled.
- Static asset caching enabled.
- No server-side learner data collection.
- No analytics unless added through a future privacy review.
- Fallback to `index.html` for client-side routing if host routing rules are required.

## Pre-Deploy Checklist

- Unit tests pass.
- Production build passes.
- Playwright desktop/tablet/mobile smoke and accessibility checks pass.
- Manual keyboard and mobile checks are documented.
- Learner validation summary has no unresolved critical/high findings.
- Security/privacy review is updated for the chosen host.

## Deferred Work

- Capacitor/mobile packaging.
- Account sync.
- Remote learner analytics.
- Bundle code splitting unless performance testing shows a need.


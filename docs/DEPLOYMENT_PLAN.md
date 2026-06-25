# Deployment Plan

## Recommended First Deployment

Package the Vite production build as an offline iOS app with Capacitor.

Use:

```sh
pnpm run cap:sync:ios
```

This builds `dist/`, copies the web assets into `ios/App/App/public`, and keeps
the app usable without an internet connection after installation.

## Offline App Requirements

- Capacitor config uses `webDir: "dist"` and must not define a remote `server.url`.
- No remote fonts, remote images, analytics SDKs, remote logging, or API calls.
- Learner progress, validation notes, confidence ratings, and practice results remain in local storage unless the user manually copies or exports feedback.
- App Store privacy answers should reflect no off-device data collection by this app.
- The in-app Data & Privacy page and `docs/PRIVACY_POLICY.md` should stay aligned.
- The iOS target includes `PrivacyInfo.xcprivacy` and `ITSAppUsesNonExemptEncryption=false`.
- Run airplane-mode QA on the installed simulator/device before submission.

## Pre-Deploy Checklist

- Unit tests pass.
- Production build passes.
- Playwright desktop/tablet/mobile smoke and accessibility checks pass.
- Manual keyboard and mobile checks are documented.
- Offline readiness unit checks pass.
- Installed iOS app opens, studies, saves progress, resumes, and launches practice modes without network.
- In-app local data reset clears learner progress and saved exam drafts.
- Learner validation summary has no unresolved critical/high findings.
- Security/privacy review is updated for the offline packaged app.
- Third-party notices and first-party asset provenance are current.

## Deferred Work

- Account sync.
- Remote learner analytics.
- Bundle code splitting unless performance testing shows a need.

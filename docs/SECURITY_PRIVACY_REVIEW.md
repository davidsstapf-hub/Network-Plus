# Network+ Security and Privacy Review

## Local Data

- Learner progress is stored locally in browser storage.
- Export/import uses a typed learner-progress envelope and rejects unrelated JSON.
- Validation exports include learner session entries, activity feedback, confidence ratings, tier summaries, and objective feedback captured locally.
- No account system, backend API, analytics, or third-party tracking is currently implemented.
- The iOS/Capacitor build is designed as an offline bundle: lessons, labs, flashcards, exams, icons, and styles are packaged with the app.
- No remote fonts, remote images, external study links, or runtime API calls are required for normal app use after installation.
- The app includes an in-app Data & Privacy page with local data disclosure and a two-step local progress delete control.
- `docs/PRIVACY_POLICY.md` contains the privacy policy text that should be published as the App Store Connect privacy URL.

## App Store Privacy Posture

- Data collection: none sent off-device by the app.
- Local storage: learner progress, exam attempts, and manual exports remain on the device unless the learner manually exports them.
- Network access: no internet connection is required for normal study flows after download.
- Tracking: no cross-app tracking, advertising identifiers, analytics SDKs, or remote logging are implemented.
- iOS metadata: the app includes `ITSAppUsesNonExemptEncryption=false` and a privacy manifest declaring no tracking and no collected data types.

## Dependencies

- React, React DOM, Vite, lucide-react, Playwright, and axe Playwright are used for app and validation workflows.
- Capacitor packages the production `dist/` directory into the iOS app. The production config must not define a remote `server.url`.
- Run dependency review again before production deployment.

## Open Release Items

- Re-run automated accessibility checks for each release candidate.
- Complete manual keyboard and screen-reader validation.
- Complete airplane-mode QA on iPhone and iPad simulators before App Store submission.
- Publish the privacy policy at a public URL and enter it in App Store Connect metadata.
- Do not add analytics, remote logging, or account sync without a fresh privacy review.

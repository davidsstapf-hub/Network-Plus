# Known Limitations

## Human Validation

- Real learner validation has not been completed yet.
- Objectives marked `content-expanded` should not be changed to `launch-ready` until learner sessions confirm comprehension.
- Critical or high learner findings block launch until fixed and retested.

## Accessibility

- Automated axe and Playwright smoke checks are available.
- Manual keyboard-only, screen-reader, contrast, reduced-motion, and heading-order review remains required.

## Deployment

- iOS/Capacitor offline packaging is now the recommended first release path.
- Final App Store metadata, screenshots, privacy answers, and TestFlight review remain required.
- Airplane-mode QA on installed iPhone and iPad builds remains required before submission.
- The production build currently passes with a Vite large-bundle warning. Code splitting can be considered after launch readiness if measured loading performance is poor.

## Data

- Learner progress is stored locally in browser storage.
- There is no account sync, backend, analytics, or cloud backup.
- User-initiated validation and feedback export is clipboard-based.
- Progress does not sync across devices; there is no user-facing progress import or cloud backup flow.

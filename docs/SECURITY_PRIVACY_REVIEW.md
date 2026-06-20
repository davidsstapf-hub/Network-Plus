# Network+ Security and Privacy Review

## Local Data

- Learner progress is stored locally in browser storage.
- Export/import uses a typed learner-progress envelope and rejects unrelated JSON.
- Validation exports include learner session entries, activity feedback, confidence ratings, tier summaries, and objective feedback captured locally.
- No account system, backend API, analytics, or third-party tracking is currently implemented.

## Dependencies

- React, React DOM, Vite, lucide-react, Playwright, and axe Playwright are used for app and validation workflows.
- Run dependency review again before production deployment.

## Open Release Items

- Confirm deployment host headers and privacy posture after the static host is selected.
- Re-run automated accessibility checks for each release candidate.
- Complete manual keyboard and screen-reader validation.
- Do not add analytics, remote logging, or account sync without a fresh privacy review.

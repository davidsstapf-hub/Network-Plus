# Network+ Release Checklist

## Objective and Content Review

- [x] Import N10-009 domain and objective map.
- [x] Record document version 4.0 in curriculum metadata.
- [x] Add complete learning loops for numbered objectives `1.1-5.5`.
- [x] Add tier checkpoints and a 90-question weighted practice exam.
- [x] Add automated traceability checks.
- [x] Add beginner-readiness audit rubric and objective status tracker.
- [x] Add learner-facing readiness signals and weak-objective remediation.
- [x] Expand subnetting practice into mixed calculation, binary, CIDR, host-sizing, and VLSM drills.
- [x] Add instructor-pass expansions and focused mini-drills for objectives previously marked weak.
- [x] Add in-app learner validation feedback capture.
- [x] Add activity confidence checks and lesson recap prompts to support content/UI learner trials.
- [x] Add browser launch notes, known limitations, learner validation summary, and deployment plan.
- [x] Add final exam remediation maps in exam results.
- [x] Add automated editorial depth gates for lessons and scenarios.
- [x] Replace scaffold-style scenario wording with objective-specific workplace cases.
- [x] Add automated Security+ sidebar/navigation parity guard while preserving Network+-specific curriculum content.
- [ ] Complete final human bullet-by-bullet signoff against the published objective guide.
- [ ] Complete final human editorial review for repetitive wording and explanation clarity.
- [ ] Confirm all examples are original and free of exam-dump material.

## Product Validation

- [x] Unit tests pass.
- [x] Production build passes.
- [x] Offline readiness checks guard against remote app shell dependencies.
- [x] Capacitor iOS packaging uses bundled `dist` assets instead of a remote server URL.
- [x] Add in-app Data & Privacy page with local data disclosure and delete-local-progress control.
- [x] Add iOS privacy manifest and non-exempt encryption export-compliance hint.
- [x] Draft App Store privacy policy text in `docs/PRIVACY_POLICY.md`.
- [x] Run desktop, tablet, and phone Playwright accessibility and smoke checks.
- [x] Add Playwright smoke coverage for final exam practice/exam launch, responsive navigation, subnetting, flashcards, and feedback capture.
- [x] Verify subnetting remains reachable through curriculum search/activity flow without adding extra sidebar shortcuts.
- [ ] Complete keyboard-only journeys for lessons, cards, quizzes, scenarios, and the final exam.
- [ ] Verify focus order, visible focus, announcements, headings, contrast, reduced motion, and mobile layouts.
- [ ] Complete airplane-mode QA on installed iPhone and iPad builds.
- [ ] Publish privacy policy at a public URL for App Store Connect.
- [ ] Confirm App Store privacy answers match the local-only/no-tracking implementation.

## Learner Acceptance

For each tier, recruit at least three learners and record device, completion outcome, confusing content, difficulty jumps, navigation friction, and accessibility problems in `docs/VALIDATION_LOG.md`. Critical and high findings block launch.

Use the in-app learner validation form on each activity to capture confusing content, difficulty jumps, missing examples, and strong explanations during sessions. Record learner/device/outcome/severity and follow-up in `docs/VALIDATION_LOG.md`.

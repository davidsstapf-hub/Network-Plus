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
- [x] Add in-app learner validation feedback capture and Progress review/export summary.
- [x] Add Validation Lab workflow for Tier 1 trial runner, tier session scripts, learner session logging, tier coverage, and blocker tracking.
- [x] Add activity confidence checks, Progress revisit list, and lesson recap prompts to support content/UI learner trials.
- [x] Make confidence-review items launch the activity directly and include confidence ratings in validation exports.
- [x] Add browser launch notes, known limitations, learner validation summary, and deployment plan.
- [ ] Complete final human bullet-by-bullet signoff against the official PDF.
- [ ] Replace any generated draft wording that feels repetitive after editorial review.
- [ ] Confirm all examples are original and free of exam-dump material.

## Product Validation

- [x] Unit tests pass.
- [x] Production build passes.
- [x] Run desktop, tablet, and phone Playwright accessibility and smoke checks.
- [x] Add Playwright smoke coverage for final exam practice/exam launch, Progress revisit launch, and Validation Lab package export.
- [ ] Complete keyboard-only journeys for lessons, cards, quizzes, scenarios, and the final exam.
- [ ] Verify focus order, visible focus, announcements, headings, contrast, reduced motion, and mobile layouts.

## Learner Acceptance

For each tier, recruit at least three learners and record device, completion outcome, confusing content, difficulty jumps, navigation friction, and accessibility problems in `docs/VALIDATION_LOG.md`. Critical and high findings block launch.

Use the Validation Lab Tier 1 Trial Runner to launch required Tier 1 activities in order. Record learner/device/outcome/severity, monitor the three-learner-per-tier gate, and copy the validation package after a session. Use the in-app learner validation form on each activity to capture confusing content, difficulty jumps, missing examples, and strong explanations during those sessions.

# Learner Validation Protocol

Use this protocol to decide when the app is ready for real Network+ learners.

## Tier 1 First

Run Tier 1 with at least three learners before validating later tiers. At least one learner must be a true beginner.

Each Tier 1 learner should complete:

- Objectives `1.1-1.8`.
- Flashcards for each section.
- Coached checks and section quizzes.
- Subnetting Lessons.
- At least 10 Subnetting Practice prompts.
- Tier 1 checkpoint.

During the session, the learner should use the in-app activity validation form whenever content is confusing, too hard, missing an example, or especially helpful.

## Session Logging

Record each observed session in `docs/VALIDATION_LOG.md` with:

- Learner ID.
- Tier.
- Experience level.
- Device/browser.
- Outcome.
- Severity.
- Notes.

During the session, have the learner use the activity feedback form and confidence checks inside the app. After the session, group those notes by objective and add the session-level summary to the validation log.

Critical and high severity findings block launch until resolved and retested.

## Feedback Triage

After each session batch:

- Group feedback by objective.
- Fix repeated confusion before one-off polish.
- Prioritize beginner wording, missing examples, quiz explanations, subnetting friction, and navigation/accessibility blockers.
- Retest changed content with at least one learner before marking a tier launch-ready.

## Ready Criteria

A tier is learning-ready when:

- At least three distinct learners completed validation sessions for that tier.
- No unresolved critical or high severity session findings remain.
- Activity-level feedback has been reviewed and repeated issues have been rewritten.
- Manual keyboard and mobile checks have no launch-blocking issues.

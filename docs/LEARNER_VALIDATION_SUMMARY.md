# Learner Validation Summary

## Current Status

Learner validation infrastructure is implemented, but real learner validation is still open.

The app can capture:

- learner sessions by tier,
- device/browser,
- experience level,
- completion outcome,
- severity,
- notes,
- activity-level confusion or praise,
- confidence ratings,
- objective-level feedback summaries.

## Required Sessions

Each tier requires at least three learner sessions before being marked launch-ready.

Tier 1 must include at least one true beginner.

## Blocking Criteria

Launch is blocked by:

- unresolved `critical` findings,
- unresolved `high` findings,
- repeated confusion on the same objective without a content fix,
- accessibility issues that prevent keyboard or screen-reader completion,
- subnetting practice friction that prevents beginner completion of Tier 1.

## Evidence Package

Use Validation Lab to copy the validation package after sessions. The package includes learner sessions, feedback, confidence ratings, tier summary, and objective feedback.

Record final findings in `docs/VALIDATION_LOG.md`.


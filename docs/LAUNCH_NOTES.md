# Network+ Browser Launch Notes

## Launch Target

The first launch target is a browser-first Network+ N10-009 learning app served as a static Vite build.

Mobile packaging should wait until learner validation and manual accessibility checks are complete.

## Ready Capabilities

- Full N10-009 numbered-objective coverage from `1.1` through `5.5`.
- Guided tier path from beginner foundations through final practice exam.
- Lessons, beginner bridges, scenarios, flashcards, coached checks, section quizzes, checkpoints, and a 90-question final practice exam.
- Dedicated subnetting lessons and mixed subnetting practice.
- Local progress, quiz/exam results, learner feedback, confidence ratings, and missed-objective remediation.
- Activity-level validation notes so trial learners can flag confusing, too hard, needs-example, or especially helpful content.
- Automated editorial depth gates for lessons and scenarios, including guards against short lesson paragraphs and scaffold-style scenario wording.
- Automated Security+ sidebar/navigation parity guard, with subnetting preserved as Network+-specific curriculum rather than a sidebar deviation.

## Launch Gates Still Required

- Human bullet-by-bullet signoff against the published N10-009 objective guide.
- At least three learner validation sessions per tier, including true-beginner validation for Tier 1.
- Manual keyboard-only walkthroughs across lessons, cards, quizzes, scenarios, checkpoints, final exam modes, subnetting, feedback capture, and remediation.
- Manual mobile/tablet visual review and screen-reader spot checks.
- Final human editorial pass for repetitive phrasing, explanation clarity, and originality confirmation.

## Automated Gates

Run before any release candidate:

```sh
pnpm run test
pnpm run build
pnpm run test:a11y
```

`pnpm run test:a11y` runs desktop, tablet, and phone Playwright smoke coverage.

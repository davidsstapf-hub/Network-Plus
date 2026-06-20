# Network+ Learning Lab

A Security+-style study companion for CompTIA Network+ N10-009. The app turns the official Network+ domains into guided lessons, worked scenarios, flashcards, coached checks, section quizzes, tier checkpoints, and a domain-weighted practice exam.

## Run Locally

```bash
pnpm install
pnpm run dev
```

The app stores objective progress in browser local storage.

## Source Material

The curriculum structure is based on the CompTIA Network+ N10-009 exam objectives PDF supplied with the project request, document version 4.0. This app is a study aid and does not include CompTIA exam questions, dumps, or unauthorized exam material.

## Validation

```bash
node --test tests/unit/*.test.js
pnpm run build
```

The unit suite checks objective coverage, activity data contracts, traceability, practice exam weighting, search, learning logic, and progress import/export behavior.

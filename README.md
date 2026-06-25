# Net+ Field Guide

An independent study companion for learners preparing for CompTIA Network+ N10-009. The app turns the published exam-topic domains into guided lessons, worked scenarios, flashcards, coached checks, section quizzes, tier checkpoints, and a domain-weighted practice review.

## Run Locally

```bash
pnpm install
pnpm run dev
```

The app stores objective progress in browser local storage.

## Source Material

The curriculum structure is based on the CompTIA-published Network+ N10-009 objective guide supplied with the project request, document version 4.0. This app is independent, unaffiliated with CompTIA, and does not include CompTIA exam questions, dumps, or unauthorized exam material.

## Validation

```bash
node --test tests/unit/*.test.js
pnpm run build
```

The unit suite checks objective coverage, activity data contracts, traceability, practice exam weighting, search, learning logic, and local progress behavior.

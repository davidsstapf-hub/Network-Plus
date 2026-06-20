export const requiredLearnersPerTier = 3
export const launchBlockingSeverities = ['critical', 'high']

export function tierValidationSummary(progress, tiers) {
  const sessions = progress.validationSessions ?? []
  return tiers.map((tier) => {
    const tierKey = String(tier.number)
    const tierSessions = sessions.filter((session) => session.tier === tierKey)
    const uniqueLearners = new Set(tierSessions.map((session) => session.learnerId.trim().toLowerCase()).filter(Boolean))
    const blockers = tierSessions.filter((session) => launchBlockingSeverities.includes(session.severity))
    return {
      tier: tierKey,
      title: tier.title,
      sessions: tierSessions.length,
      learners: uniqueLearners.size,
      blockers: blockers.length,
      ready: uniqueLearners.size >= requiredLearnersPerTier && blockers.length === 0,
    }
  })
}

export function validationGateStatus(progress, tiers) {
  const summary = tierValidationSummary(progress, tiers)
  const feedback = progress.learnerFeedback ?? []
  const blockers = (progress.validationSessions ?? []).filter((session) => launchBlockingSeverities.includes(session.severity))
  return {
    tierSummary: summary,
    readyTiers: summary.filter((tier) => tier.ready).length,
    totalTiers: summary.length,
    feedbackCount: feedback.length,
    blockerCount: blockers.length,
    readyForLearningTrials: summary[0]?.learners >= 1 && feedback.length > 0,
    readyForLaunch: summary.every((tier) => tier.ready) && blockers.length === 0,
  }
}

export function feedbackByObjective(progress) {
  const grouped = new Map()
  for (const entry of progress.learnerFeedback ?? []) {
    const key = entry.objective ?? 'unmapped'
    const row = grouped.get(key) ?? { objective: key, total: 0, confusing: 0, tooHard: 0, needsExample: 0, goodExplanation: 0, notes: [] }
    row.total += 1
    if (entry.signal === 'confusing') row.confusing += 1
    if (entry.signal === 'too-hard') row.tooHard += 1
    if (entry.signal === 'needs-example') row.needsExample += 1
    if (entry.signal === 'good-explanation') row.goodExplanation += 1
    if (entry.note) row.notes.push(entry.note)
    grouped.set(key, row)
  }
  return [...grouped.values()].sort((a, b) => b.total - a.total || a.objective.localeCompare(b.objective, undefined, { numeric: true }))
}

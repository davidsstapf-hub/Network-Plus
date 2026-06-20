import { allActivities, domains, tiers } from '../content/studyData.js'

const BEGINNER_FOUNDATION_OBJECTIVES = ['1.1', '1.4', '1.7', '2.1', '2.2', '3.4', '5.1']
const SUBNETTING_ACTIVITY_IDS = ['subnetting-calculator-lab', 'subnetting-explanations-page']

export function requiredActivitiesForTier(tier) {
  return tier.modules.flatMap((module) => module.activities).filter((activity) => activity.required)
}

export function getTierProgress(tier, progress) {
  const required = requiredActivitiesForTier(tier)
  if (!required.length) return 0
  const completed = required.filter((activity) => progress.completedActivityIds.includes(activity.id)).length
  return Math.round((completed / required.length) * 100)
}

export function getNextActivity(progress) {
  return getRecommendation(progress).activity
}

export function getRecommendation(progress) {
  const unfinished = allActivities.find((activity) => activity.required && !progress.completedActivityIds.includes(activity.id))
  if (unfinished) return { activity: unfinished, reason: 'continue', review: false }

  const weakResult = Object.entries(progress.results)
    .filter(([, result]) => typeof result.score === 'number' && result.score < 0.8)
    .sort(([, a], [, b]) => a.score - b.score)[0]

  if (!weakResult) return { activity: null, reason: 'complete', review: false }
  const weakActivity = allActivities.find((activity) => activity.id === weakResult[0])
  if (!weakActivity) return { activity: null, reason: 'complete', review: false }
  const reviewActivity = allActivities.find((activity) => activity.moduleId === weakActivity.moduleId && activity.type === 'flashcards')
    ?? allActivities.find((activity) => activity.moduleId === weakActivity.moduleId && activity.type === 'lesson')
    ?? weakActivity
  return { activity: reviewActivity, reason: 'weak-score', review: true, sourceActivityId: weakActivity.id, score: weakResult[1].score }
}

export function getWeakObjectives(progress, limit = 6) {
  const weak = new Map()
  for (const [activityId, result] of Object.entries(progress.results ?? {})) {
    if (typeof result.score !== 'number' || result.score >= 0.8) continue
    const activity = allActivities.find((item) => item.id === activityId)
    const objectives = result.objectiveMisses?.length
      ? result.objectiveMisses
      : activity?.questions
        ? [...new Set(activity.questions.map((question) => question.objective))]
        : activity?.objective
          ? [activity.objective]
          : []
    for (const objective of objectives) {
      const current = weak.get(objective) ?? { objective, misses: 0, lowestScore: 1, activities: [] }
      current.misses += 1
      current.lowestScore = Math.min(current.lowestScore, result.score)
      current.activities.push(activityId)
      weak.set(objective, current)
    }
  }
  return [...weak.values()]
    .sort((a, b) => a.lowestScore - b.lowestScore || b.misses - a.misses || a.objective.localeCompare(b.objective, undefined, { numeric: true }))
    .slice(0, limit)
}

export function getObjectiveRemediation(objective) {
  const related = allActivities.filter((activity) => activity.objective === objective)
  return {
    objective,
    lesson: related.find((activity) => activity.type === 'lesson') ?? null,
    flashcards: related.find((activity) => activity.type === 'flashcards') ?? null,
    quiz: related.find((activity) => activity.type === 'quiz') ?? null,
  }
}

export function getReadinessSignals(progress) {
  const completedIds = new Set(progress.completedActivityIds)
  const foundationActivities = allActivities.filter((activity) => activity.type === 'lesson' && BEGINNER_FOUNDATION_OBJECTIVES.includes(activity.objective))
  const foundationComplete = foundationActivities.length
    ? foundationActivities.every((activity) => completedIds.has(activity.id))
    : false
  const subnettingComplete = SUBNETTING_ACTIVITY_IDS.every((id) => completedIds.has(id))
  const domainCheckpointReady = tiers.slice(0, 5).every((tier) => {
    const requiredBeforeCheckpoint = requiredActivitiesForTier(tier).filter((activity) => activity.type !== 'checkpoint')
    return requiredBeforeCheckpoint.length && requiredBeforeCheckpoint.every((activity) => completedIds.has(activity.id))
  })
  const checkpointScores = allActivities.filter((activity) => activity.type === 'checkpoint').map((activity) => progress.results[activity.id]?.score).filter((score) => typeof score === 'number')
  const checkpointsPassed = checkpointScores.length >= 5 && checkpointScores.every((score) => score >= 0.8)
  const examReady = getReadiness(progress) >= 85 && checkpointsPassed && getWeakObjectives(progress, 1).length === 0
  return [
    {
      id: 'beginner-foundation',
      label: 'Beginner foundation',
      ready: foundationComplete,
      detail: foundationComplete ? 'Core language is complete.' : 'Finish OSI, addressing, switching, routing, services, and troubleshooting foundations.',
    },
    {
      id: 'subnetting-confidence',
      label: 'Subnetting confidence',
      ready: subnettingComplete,
      detail: subnettingComplete ? 'Subnet lessons and practice are complete.' : 'Complete subnet explanations and repeated drill practice.',
    },
    {
      id: 'domain-checkpoints',
      label: 'Domain checkpoint readiness',
      ready: domainCheckpointReady,
      detail: domainCheckpointReady ? 'All tier lessons before checkpoints are complete.' : 'Complete each tier learning loop before checkpoint attempts.',
    },
    {
      id: 'final-exam-readiness',
      label: 'Final exam readiness',
      ready: examReady,
      detail: examReady ? 'Coverage, checkpoints, and weak-objective review are aligned.' : 'Reach 85% readiness, pass checkpoints, and remediate weak objectives.',
    },
  ]
}

export function getModuleProgress(module, progress) {
  const required = module.activities.filter((activity) => activity.required)
  if (!required.length) return 0
  return Math.round(required.filter((activity) => progress.completedActivityIds.includes(activity.id)).length / required.length * 100)
}

export function moduleNeedsReview(module, progress) {
  return module.activities.some((activity) => {
    const score = progress.results[activity.id]?.score
    return ['quiz','checkpoint','scenario','exam'].includes(activity.type) && typeof score === 'number' && score < 0.8
  })
}

export function getDomainCoverage(progress) {
  return domains.map((domain) => {
    const activities = allActivities.filter((activity) => activity.domain === domain.id)
    const completed = activities.filter((activity) => progress.completedActivityIds.includes(activity.id)).length
    return { ...domain, progress: activities.length ? Math.round((completed / activities.length) * 100) : 0 }
  })
}

export function getReadiness(progress) {
  const coverage = getDomainCoverage(progress)
  const weightedCoverage = coverage.reduce((sum, domain) => sum + (domain.progress * domain.weight) / 100, 0)
  const scoredResults = Object.values(progress.results).filter((result) => typeof result.score === 'number')
  const quizAccuracy = scoredResults.length ? scoredResults.reduce((sum, result) => sum + result.score, 0) / scoredResults.length : 0
  return Math.round((weightedCoverage * 0.7) + (quizAccuracy * 100 * 0.3))
}

export function getOverallProgress(progress) {
  const required = tiers.flatMap(requiredActivitiesForTier)
  return required.length ? Math.round((required.filter((activity) => progress.completedActivityIds.includes(activity.id)).length / required.length) * 100) : 0
}

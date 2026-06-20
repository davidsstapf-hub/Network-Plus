import test from 'node:test'
import assert from 'node:assert/strict'
import { allActivities, tiers } from '../../src/content/studyData.js'
import { getModuleProgress, getNextActivity, getObjectiveRemediation, getOverallProgress, getReadiness, getReadinessSignals, getRecommendation, getTierProgress, getWeakObjectives, moduleNeedsReview, requiredActivitiesForTier } from '../../src/lib/learningLogic.js'
import { createDefaultProgress, createProgressRepository, migrateProgress } from '../../src/lib/progressRepository.js'
import { feedbackByObjective, tierValidationSummary, validationGateStatus } from '../../src/lib/validationLogic.js'

test('a new learner starts at the first Network+ lesson', () => {
  const progress = createDefaultProgress()
  assert.equal(getNextActivity(progress).id, allActivities.find((activity) => activity.required).id)
  assert.equal(getTierProgress(tiers[0], progress), 0)
})

test('tier and module progress are based on required activities', () => {
  const module = tiers[0].modules[0]
  const required = requiredActivitiesForTier(tiers[0])
  const progress = { ...createDefaultProgress(), completedActivityIds: required.slice(0, 2).map((activity) => activity.id) }
  assert.equal(getTierProgress(tiers[0], progress), Math.round(2 / required.length * 100))
  assert.equal(getModuleProgress(module, progress), Math.round(2 / module.activities.filter((activity) => activity.required).length * 100))
})

test('recommendations advance and later redirect weak scores to review', () => {
  const progress = createDefaultProgress()
  const first = getNextActivity(progress)
  progress.completedActivityIds = [first.id]
  assert.notEqual(getNextActivity(progress).id, first.id)
  const complete = { ...createDefaultProgress(), completedActivityIds: allActivities.filter((activity) => activity.required).map((activity) => activity.id), results: { [allActivities.find((activity) => activity.type === 'quiz').id]: { score: 0.5 } } }
  assert.equal(getRecommendation(complete).review, true)
})

test('readiness and overall progress are nonzero after scored work', () => {
  const activity = allActivities.find((item) => item.required)
  const progress = { ...createDefaultProgress(), completedActivityIds: [activity.id], results: { [activity.id]: { score: 1 } } }
  assert.ok(getReadiness(progress) > 0)
  assert.ok(getOverallProgress(progress) > 0)
})

test('module review state reacts to low assessment scores', () => {
  const module = tiers[0].modules[0]
  const quiz = module.activities.find((activity) => ['quiz','checkpoint'].includes(activity.type))
  const progress = { ...createDefaultProgress(), results: { [quiz.id]: { score: 0.6 } } }
  assert.equal(moduleNeedsReview(module, progress), true)
})

test('weak objective remediation maps misses back to learning activities', () => {
  const quiz = allActivities.find((activity) => activity.type === 'quiz' && activity.objective === '1.1')
  const progress = { ...createDefaultProgress(), results: { [quiz.id]: { score: 0.4, objectiveMisses: ['1.1'] } } }
  const weak = getWeakObjectives(progress)
  assert.equal(weak[0].objective, '1.1')
  const remediation = getObjectiveRemediation('1.1')
  assert.equal(remediation.lesson.type, 'lesson')
  assert.equal(remediation.flashcards.type, 'flashcards')
  assert.equal(remediation.quiz.type, 'quiz')
})

test('readiness signals expose beginner launch gates', () => {
  const progress = createDefaultProgress()
  const signals = getReadinessSignals(progress)
  assert.deepEqual(signals.map((signal) => signal.id), ['beginner-foundation','subnetting-confidence','domain-checkpoints','final-exam-readiness'])
  assert.equal(signals.every((signal) => typeof signal.ready === 'boolean' && signal.detail.length > 0), true)
})

test('progress repository persists and rejects invalid imports', () => {
  const values = new Map()
  const storage = { getItem:key => values.get(key) ?? null, setItem:(key,value)=>values.set(key,value), removeItem:key=>values.delete(key) }
  const repository = createProgressRepository(storage)
  const original = {
    ...createDefaultProgress(),
    learnerName:'Network learner',
    completedActivityIds:[allActivities[0].id],
    learnerFeedback:[{ id:'fb-1', activityId:allActivities[0].id, signal:'confusing', note:'Need another example.' }],
    confidenceRatings:{ [allActivities[0].id]: { activityId:allActivities[0].id, rating:'medium' } },
    validationSessions:[{ id:'session-1', tier:'1', learnerId:'beginner-1', severity:'none' }],
  }
  const imported = repository.import(repository.export(original))
  assert.equal(imported.learnerName, 'Network learner')
  assert.equal(imported.learnerFeedback.length, 1)
  assert.equal(imported.learnerFeedback[0].signal, 'confusing')
  assert.equal(imported.confidenceRatings[allActivities[0].id].rating, 'medium')
  assert.equal(imported.validationSessions.length, 1)
  assert.throws(() => repository.import('{"type":"unrelated","progress":{}}'), /not a Network\+ learner export/)
  assert.throws(() => repository.import('not json'), /not valid JSON/)
})

test('migration repairs malformed progress and deduplicates activity ids', () => {
  const first = allActivities[0].id
  const migrated = migrateProgress({ version: 0, completedActivityIds: [first, first], results: null, learnerFeedback: [{ activityId:first, signal:'too-hard' }, null, { signal:'bad' }], confidenceRatings: null, validationSessions: [{ tier:'1', learnerId:'A' }, { learnerId:'B' }] })
  assert.deepEqual(migrated.completedActivityIds, [first])
  assert.deepEqual(migrated.results, {})
  assert.equal(migrated.learnerFeedback.length, 1)
  assert.deepEqual(migrated.confidenceRatings, {})
  assert.equal(migrated.validationSessions.length, 1)
})

test('validation gate summarizes learner sessions and feedback by objective', () => {
  const progress = {
    ...createDefaultProgress(),
    learnerFeedback: [
      { activityId: allActivities[0].id, objective: '1.1', signal: 'confusing', note: 'Layer names were hard.' },
      { activityId: allActivities[0].id, objective: '1.1', signal: 'needs-example', note: 'Need a packet example.' },
    ],
    validationSessions: [
      { tier: '1', learnerId: 'beginner-1', severity: 'none' },
      { tier: '1', learnerId: 'beginner-2', severity: 'low' },
      { tier: '1', learnerId: 'beginner-3', severity: 'none' },
      { tier: '2', learnerId: 'beginner-4', severity: 'high' },
    ],
  }
  const summary = tierValidationSummary(progress, tiers)
  assert.equal(summary[0].ready, true)
  assert.equal(summary[1].blockers, 1)
  const gate = validationGateStatus(progress, tiers)
  assert.equal(gate.readyTiers, 1)
  assert.equal(gate.blockerCount, 1)
  assert.equal(gate.readyForLearningTrials, true)
  const grouped = feedbackByObjective(progress)
  assert.equal(grouped[0].objective, '1.1')
  assert.equal(grouped[0].total, 2)
})

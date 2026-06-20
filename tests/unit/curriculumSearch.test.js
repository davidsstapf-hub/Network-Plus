import test from 'node:test'
import assert from 'node:assert/strict'
import { tiers } from '../../src/content/studyData.js'
import { filterCurriculum, currentTierForProgress } from '../../src/lib/curriculumSearch.js'
import { createDefaultProgress } from '../../src/lib/progressRepository.js'
import { getRecommendation, requiredActivitiesForTier } from '../../src/lib/learningLogic.js'

test('curriculum search finds Network+ topics, objectives, and activity types', () => {
  assert.ok(filterCurriculum(tiers, 'subnet').resultCount > 0)
  assert.ok(filterCurriculum(tiers, '5.5').resultCount > 0)
  assert.ok(filterCurriculum(tiers, 'flashcards').resultCount > 0)
  assert.equal(filterCurriculum(tiers, 'no-such-network-topic').resultCount, 0)
})

test('current tier follows the next unfinished required activity', () => {
  const progress = createDefaultProgress()
  assert.equal(currentTierForProgress(tiers, progress, getRecommendation).number, 1)
  progress.completedActivityIds = requiredActivitiesForTier(tiers[0]).map((activity) => activity.id)
  assert.equal(currentTierForProgress(tiers, progress, getRecommendation).number, 2)
})

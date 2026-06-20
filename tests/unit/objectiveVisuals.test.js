import test from 'node:test'
import assert from 'node:assert/strict'
import { allActivities } from '../../src/content/studyData.js'
import { getObjectiveVisual } from '../../src/content/objectiveVisuals.js'

test('every lesson activity has an objective visual', () => {
  const missing = allActivities.filter((activity) => activity.type === 'lesson').filter((activity) => !getObjectiveVisual(activity)).map((activity) => activity.id)
  assert.deepEqual(missing, [])
})

test('objective visuals expose domain, objective, and mode items', () => {
  const visual = getObjectiveVisual(allActivities.find((activity) => activity.type === 'lesson'))
  assert.ok(visual.title.length > 8)
  assert.ok(visual.caption.length > 10)
  assert.equal(visual.items.length, 3)
})

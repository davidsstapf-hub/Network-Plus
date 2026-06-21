import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { allActivities, tiers, masterFlashcardsActivity } from '../../src/content/studyData.js'
import { getBeginnerBridge } from '../../src/content/beginnerReadiness.js'
import { getEditorialExpansion, tierOneEditorialObjectives } from '../../src/content/editorialExpansion.js'
import { buildTraceabilityMatrix, curriculumMetadata, objectiveHasCurriculumCoverage, officialObjectiveCodes } from '../../src/content/curriculumMetadata.js'

const networkAppSource = readFileSync(new URL('../../src/app/App.jsx', import.meta.url), 'utf8')
const securityAppSource = readFileSync(new URL('../../../GitHub/Security-Project/src/app/App.jsx', import.meta.url), 'utf8')

function extractNavItems(source, constantName) {
  const start = source.indexOf(`const ${constantName} = [`)
  assert.notEqual(start, -1, `${constantName} not found`)
  const end = source.indexOf('];', start)
  assert.notEqual(end, -1, `${constantName} terminator not found`)
  return source
    .slice(start, end)
    .split('\n')
    .filter((line) => line.includes('{ id:'))
    .map((line) =>
      line
        .trim()
        .replace(/,$/, '')
        .replaceAll('Security+', 'Network+')
        .replaceAll('why-security', 'why-network')
        .replaceAll('Why the Network+?', 'Why Network+?'),
    )
}

test('Network+ metadata records the verified N10-009 objective source', () => {
  assert.equal(curriculumMetadata.certification, 'CompTIA Network+')
  assert.equal(curriculumMetadata.examCode, 'N10-009')
  assert.equal(curriculumMetadata.objectiveDocumentVersion, '4.0')
  assert.equal(curriculumMetadata.objectiveVersionVerified, true)
})

test('Network+ sidebar navigation stays in Security+ parity', () => {
  assert.deepEqual(
    extractNavItems(networkAppSource, 'primaryNavItems'),
    extractNavItems(securityAppSource, 'primaryNavItems'),
  )
  assert.deepEqual(
    extractNavItems(networkAppSource, 'aboutNavItems'),
    extractNavItems(securityAppSource, 'aboutNavItems'),
  )
  assert.equal(networkAppSource.includes('sidebar__mission'), true)
  assert.equal(networkAppSource.includes('className="profile"'), true)
  assert.equal(networkAppSource.includes('{active === "progress"'), true)
  assert.equal(networkAppSource.includes('{ id: "subnetting"'), false)
  assert.equal(networkAppSource.includes('{ id: "subnetting-explain"'), false)
})

test('every numbered official N10-009 objective has a complete learning loop', () => {
  assert.equal(officialObjectiveCodes.length, 25)
  for (const code of officialObjectiveCodes) assert.equal(objectiveHasCurriculumCoverage(code, tiers), true, code)
})

test('every numbered objective has beginner bridge content', () => {
  for (const code of officialObjectiveCodes) {
    const bridge = getBeginnerBridge(code)
    assert.ok(bridge, code)
    assert.ok(bridge.vocabulary.length >= 4, code)
    assert.ok(bridge.why.length >= 50, code)
    assert.ok(bridge.example.length >= 50, code)
    assert.ok(bridge.mentalModel.length >= 40, code)
  }
})

test('weak audit objectives have editorial expansions and practice clusters', () => {
  const weakObjectives = ['1.2','1.3','1.5','1.6','1.7','1.8','2.3','2.4','3.1','3.2','3.3','3.5','4.1','4.2','4.3','5.2','5.3','5.4','5.5']
  assert.deepEqual(tierOneEditorialObjectives, ['1.2','1.3','1.5','1.6','1.7','1.8'])
  for (const code of weakObjectives) {
    const expansion = getEditorialExpansion(code)
    assert.ok(expansion, code)
    assert.ok(expansion.plainLanguage.length >= 80, code)
    assert.ok(expansion.workplaceExample.length >= 60, code)
    assert.ok(expansion.misconception.length >= 50, code)
    assert.ok(expansion.examReasoning.length >= 60, code)
    assert.ok(expansion.practiceCluster.prompts.length >= 4, code)
  }
})

test('traceability rows connect objectives to lessons, scenarios, cards, and assessments', () => {
  const rows = buildTraceabilityMatrix(tiers).filter((row) => officialObjectiveCodes.includes(row.objective))
  assert.equal(rows.length, 25)
  for (const row of rows) {
    assert.ok(row.lessons.length >= 1, row.objective)
    assert.ok(row.scenarios.length >= 1, row.objective)
    assert.ok(row.flashcards.length >= 1, row.objective)
    assert.ok(row.assessments.length >= 1, row.objective)
  }
})

test('every objective section ships lesson, scenario, flashcards, coached check, and section quiz', () => {
  const sections = tiers.slice(0,5).flatMap((tier) => tier.modules).filter((module) => /-section$/.test(module.id) && !module.id.includes('final'))
  assert.equal(sections.length, 25)
  for (const section of sections) {
    const [lesson, scenario, cards, check, quiz] = section.activities
    assert.equal(lesson.type, 'lesson', section.id)
    assert.equal(lesson.content.length, 6, section.id)
    assert.equal(scenario.type, 'scenario', section.id)
    assert.equal(scenario.evidence.length, 3, section.id)
    assert.equal(scenario.actions.filter((action) => action.correct).length, 3, section.id)
    assert.ok(cards.cards.length >= 10 && cards.cards.length <= 15, section.id)
    assert.equal(check.questions.length, 5, section.id)
    assert.equal(quiz.questions.length, 10, section.id)
  }
})

test('lessons and scenarios meet launch editorial depth gates', () => {
  const lessonActivities = allActivities.filter((activity) => activity.type === 'lesson')
  const scenarioActivities = allActivities.filter((activity) => activity.type === 'scenario')
  const scaffoldPhrases = [
    'Apply osi reference model to a realistic Network+ decision.',
    'objective evidence should let the technician',
    'decision should preserve service',
    'This OSI Reference Model scenario is testing objective',
  ]

  for (const lesson of lessonActivities) {
    assert.ok(lesson.learningObjectives?.length >= 3, lesson.id)
    assert.ok(lesson.headings?.length >= 6, lesson.id)
    assert.ok(lesson.content?.length >= 6, lesson.id)
    for (const paragraph of lesson.content) {
      assert.ok(paragraph.length >= 120, `${lesson.id} has a short paragraph: ${paragraph}`)
    }
  }

  for (const scenario of scenarioActivities) {
    assert.equal(scenario.evidence.length, 3, scenario.id)
    assert.equal(scenario.actions.filter((action) => action.correct).length, 3, scenario.id)
    assert.equal(scenario.actions.filter((action) => !action.correct).length, 2, scenario.id)
    assert.ok(scenario.summary.length >= 70, scenario.id)
    assert.ok(scenario.explanation.length >= 180, scenario.id)
    for (const evidence of scenario.evidence) assert.ok(evidence.length >= 70, `${scenario.id} evidence too short`)
    for (const action of scenario.actions) assert.ok(action.label.length >= 65, `${scenario.id} action too short`)
    const combined = [scenario.summary, ...scenario.evidence, ...scenario.actions.map((action) => action.label), scenario.explanation].join(' ')
    for (const phrase of scaffoldPhrases) assert.equal(combined.includes(phrase), false, `${scenario.id} contains scaffold phrase "${phrase}"`)
  }
})

test('tier checkpoints and final exam match launch counts and domain weighting', () => {
  for (const tier of tiers.slice(0,5)) {
    const checkpoint = tier.modules.flatMap((module) => module.activities).find((activity) => activity.type === 'checkpoint')
    assert.equal(checkpoint.questions.length, 20, tier.id)
  }
  const exam = allActivities.find((activity) => activity.id === 't6-practice-exam')
  assert.equal(exam.type, 'exam')
  assert.equal(exam.questions.length, 90)
  assert.equal(exam.config.allowModeSelection, true)
  assert.deepEqual(Object.fromEntries([1,2,3,4,5].map((domain) => [domain, exam.questions.filter((question) => question.domain === domain).length])), {1:21,2:18,3:17,4:13,5:21})
})

test('assessment questions have valid shape, unique ids, and useful explanations', () => {
  const questions = allActivities.flatMap((activity) => activity.questions ?? [])
  assert.equal(new Set(questions.map((question) => question.id)).size, questions.length)
  const genericAssessmentPhrases = [
    'Which action best demonstrates',
    'A learner is choosing between two plausible answers',
    'Restart every device',
    'Core concept for',
    'A Network+ learner is reviewing',
    'Which description correctly matches',
    'choose the newest technology term',
    'ignore scope because all network symptoms have the same cause',
    'restart unrelated devices',
    'A successful test of an unrelated service only',
    'A change made without a rollback plan',
    'A guess based only on the device brand',
  ]
  for (const question of questions) {
    assert.equal(question.options.length, 4, question.id)
    assert.equal(new Set(question.options.map((option) => option.trim().toLowerCase())).size, 4, question.id)
    assert.ok(Number.isInteger(question.correctIndex) && question.correctIndex >= 0 && question.correctIndex < 4, question.id)
    assert.ok(question.prompt.length >= 40, question.id)
    assert.ok(question.explanation.length >= 80, question.id)
    const combinedText = [question.prompt, ...question.options, question.explanation].join(' ')
    for (const phrase of genericAssessmentPhrases) assert.equal(combinedText.includes(phrase), false, `${question.id} contains "${phrase}"`)
  }
})

test('master flashcards aggregate all objective decks', () => {
  const objectiveCards = tiers.slice(0,5).flatMap((tier) => tier.modules.flatMap((module) => module.activities)).filter((activity) => activity.type === 'flashcards').flatMap((activity) => activity.cards)
  assert.equal(masterFlashcardsActivity.cards.length, objectiveCards.length)
  assert.ok(masterFlashcardsActivity.cards.length >= 250)
  assert.equal(masterFlashcardsActivity.shuffleCards, true)
})

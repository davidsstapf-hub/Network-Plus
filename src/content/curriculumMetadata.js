export const curriculumMetadata = { certification:'CompTIA Network+', examCode:'N10-009', objectiveSource:'Official CompTIA Network+ N10-009 exam objectives PDF supplied with project', objectiveSourceUrl:'https://www.comptia.org/en-us/certifications/network/', objectiveDocumentVersion:'4.0', objectiveExamVersion:'N10-009 Version 4.0', objectiveDocumentDate:'2023', objectiveReviewedAt:'2026-06-20', objectiveVersionVerified:true, verifiedAt:'2026-06-20', verificationNote:'All numbered N10-009 objectives 1.1-5.5 are represented by complete learning loops, tier checkpoints, and the 90-question practice exam. Human bullet-by-bullet signoff remains a release acceptance task.', contentSchemaVersion:1 }

export const officialObjectiveCodes = ["1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8","2.1","2.2","2.3","2.4","3.1","3.2","3.3","3.4","3.5","4.1","4.2","4.3","5.1","5.2","5.3","5.4","5.5"]

export function objectiveHasCurriculumCoverage(code, tiers) {
  const activities = tiers.flatMap((tier) => tier.modules).flatMap((module) => module.activities)
  const direct = activities.filter((activity) => String(activity.objective).includes(code))
  const exam = activities.find((activity) => activity.id === 't6-practice-exam')
  return direct.some((activity) => activity.type === 'lesson') && direct.some((activity) => activity.type === 'scenario') && direct.some((activity) => activity.type === 'flashcards') && direct.some((activity) => ['quiz','checkpoint'].includes(activity.type)) && Boolean(exam?.questions?.some((question) => question.objective === code))
}

export function buildTraceabilityMatrix(tiers) {
  const rows = new Map()
  for (const tier of tiers) for (const module of tier.modules) for (const activity of module.activities) {
    const objectives = activity.questions ? [...new Set([String(activity.objective), ...activity.questions.map((question) => String(question.objective))])] : [String(activity.objective)]
    for (const key of objectives) {
      const row = rows.get(key) ?? { objective:key, domains:new Set(), tiers:new Set(), lessons:[], scenarios:[], flashcards:[], assessments:[] }
      row.domains.add(activity.domain); row.tiers.add(tier.number)
      if (activity.type === 'lesson') row.lessons.push(activity.id)
      else if (activity.type === 'scenario') row.scenarios.push(activity.id)
      else if (activity.type === 'flashcards') row.flashcards.push(activity.id)
      else row.assessments.push(activity.id)
      rows.set(key,row)
    }
  }
  return [...rows.values()].map((row) => ({...row,domains:[...row.domains],tiers:[...row.tiers]})).sort((a,b)=>a.objective.localeCompare(b.objective,undefined,{numeric:true}))
}

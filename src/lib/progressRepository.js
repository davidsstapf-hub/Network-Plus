const STORAGE_KEY = 'networkplus-learner-progress'
const STORAGE_BACKUP_KEY = 'networkplus-learner-progress-backup'
export const CURRENT_PROGRESS_VERSION = 8
export const PROGRESS_EXPORT_TYPE = 'network-plus-progress'

const ACTIVITY_ID_ALIASES = {
  't1-auth': 't1-identity',
  't1-terms': 't1-cia-cards',
}

export function createDefaultProgress() {
  return {
    version: CURRENT_PROGRESS_VERSION,
    learnerName: 'Learner',
    completedOnboarding: false,
    completedActivityIds: [],
    results: {},
    scenarioResults: {},
    examAttempts: [],
    learnerFeedback: [],
    validationSessions: [],
    confidenceRatings: {},
    manualQaChecks: {},
    totalStudyMinutes: 0,
    currentActivityId: 'n11-osi-reference-model-lesson',
    lastStudiedAt: null,
  }
}

function uniqueStrings(value) {
  return Array.isArray(value) ? [...new Set(value.filter((item) => typeof item === 'string' && item.trim()))] : []
}

function plainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
}

function clampScore(value) {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : undefined
}

function sanitizeResults(value) {
  return Object.fromEntries(
    Object.entries(plainObject(value))
      .filter(([id, result]) => typeof id === 'string' && result && typeof result === 'object' && !Array.isArray(result))
      .map(([id, result]) => {
        const score = clampScore(result.score)
        return [ACTIVITY_ID_ALIASES[id] ?? id, {
          ...result,
          ...(score === undefined ? {} : { score }),
          objectiveMisses: uniqueStrings(result.objectiveMisses),
        }]
      }),
  )
}

function sanitizeObjectMap(value) {
  return Object.fromEntries(
    Object.entries(plainObject(value))
      .filter(([id, entry]) => typeof id === 'string' && entry && typeof entry === 'object' && !Array.isArray(entry)),
  )
}

function validIsoDateOrNull(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value)) ? value : null
}

export function migrateProgress(value) {
  if (!value || typeof value !== 'object') return createDefaultProgress()
  const base = createDefaultProgress()
  const isLegacy = !value.version || value.version < 2
  const legacyRemovedIds = new Set(isLegacy ? ['t1-check', 't1-checkpoint'] : [])
  const completedActivityIds = uniqueStrings(value.completedActivityIds)
    .filter((id) => !legacyRemovedIds.has(id))
    .map((id) => ACTIVITY_ID_ALIASES[id] ?? id)
  const results = Object.fromEntries(
    Object.entries(sanitizeResults(value.results))
      .filter(([id]) => !legacyRemovedIds.has(id)),
  )
  const totalStudyMinutes = Number.isFinite(value.totalStudyMinutes) ? Math.max(0, Math.round(value.totalStudyMinutes)) : base.totalStudyMinutes
  return {
    ...base,
    ...value,
    version: CURRENT_PROGRESS_VERSION,
    completedActivityIds: [...new Set(completedActivityIds)],
    results,
    scenarioResults: sanitizeResults(value.scenarioResults),
    examAttempts: Array.isArray(value.examAttempts) ? value.examAttempts : [],
    learnerFeedback: Array.isArray(value.learnerFeedback)
      ? value.learnerFeedback.filter((entry) => entry && typeof entry === 'object' && typeof entry.activityId === 'string')
      : [],
    validationSessions: Array.isArray(value.validationSessions)
      ? value.validationSessions.filter((entry) => entry && typeof entry === 'object' && typeof entry.tier === 'string')
      : [],
    confidenceRatings: sanitizeObjectMap(value.confidenceRatings),
    manualQaChecks: sanitizeObjectMap(value.manualQaChecks),
    learnerName: typeof value.learnerName === 'string' && value.learnerName.trim() ? value.learnerName.trim().slice(0, 80) : base.learnerName,
    completedOnboarding: typeof value.completedOnboarding === 'boolean' ? value.completedOnboarding : base.completedOnboarding,
    totalStudyMinutes,
    currentActivityId: typeof value.currentActivityId === 'string' && value.currentActivityId.trim() ? value.currentActivityId : base.currentActivityId,
    lastStudiedAt: validIsoDateOrNull(value.lastStudiedAt),
  }
}

export function createProgressRepository(storage = globalThis.localStorage) {
  const parseStoredProgress = (key) => {
    const raw = storage?.getItem(key)
    return raw ? migrateProgress(JSON.parse(raw)) : null
  }
  return {
    load() {
      try {
        return parseStoredProgress(STORAGE_KEY) ?? createDefaultProgress()
      } catch {
        try {
          return parseStoredProgress(STORAGE_BACKUP_KEY) ?? createDefaultProgress()
        } catch {
          return createDefaultProgress()
        }
      }
    },
    save(progress) {
      const migrated = migrateProgress(progress)
      const previous = storage?.getItem(STORAGE_KEY)
      if (previous) storage?.setItem(STORAGE_BACKUP_KEY, previous)
      storage?.setItem(STORAGE_KEY, JSON.stringify(migrated))
      return migrated
    },
    clear() {
      storage?.removeItem(STORAGE_KEY)
      storage?.removeItem(STORAGE_BACKUP_KEY)
    },
    export(progress) {
      return JSON.stringify({ type:PROGRESS_EXPORT_TYPE, exportedAt:new Date().toISOString(), progress:migrateProgress(progress) }, null, 2)
    },
    import(serialized) {
      let envelope
      if (serialized.length > 2_000_000) throw new Error('The learner export is too large.')
      try { envelope = JSON.parse(serialized) } catch { throw new Error('The selected file is not valid JSON.') }
      if (!envelope || envelope.type !== PROGRESS_EXPORT_TYPE || !envelope.progress || typeof envelope.progress !== 'object') throw new Error('This is not a Network+ learner export.')
      const progress = migrateProgress(envelope.progress)
      this.save(progress)
      return progress
    },
  }
}

export const progressRepository = createProgressRepository()

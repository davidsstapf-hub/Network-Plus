import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('networkplus-learner-progress', JSON.stringify({
      version: 6,
      learnerName: 'David',
      completedOnboarding: true,
      completedActivityIds: [],
      results: {},
      scenarioResults: {},
      examAttempts: [],
      learnerFeedback: [],
      confidenceRatings: {},
      validationSessions: [],
      totalStudyMinutes: 0,
      currentActivityId: 'n11-osi-reference-model-lesson',
      lastStudiedAt: null
    }))
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (value) => {
          window.__copiedText = value
        }
      }
    })
  })
  await page.goto('/')
})

test('overview renders Network+ workspace and passes basic axe scan', async ({ page }) => {
  await expect(page.getByText(/NET\+ FIELD GUIDE/i)).toBeVisible()
  await expect(page.getByRole('heading', { name: /New to networking/i })).toBeVisible()
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})

test('responsive core surfaces render on narrow viewports @responsive', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'desktop', 'Responsive smoke runs on tablet and mobile projects.')
  const openNavigationIfNeeded = async () => {
    const menuButton = page.getByRole('button', { name: /Open navigation/i })
    if (await menuButton.isVisible()) await menuButton.click()
  }
  await expect(page.getByRole('heading', { name: /New to networking/i })).toBeVisible()
  await openNavigationIfNeeded()
  await page.getByRole('navigation', { name: /main navigation/i }).getByRole('button', { name: /Progress/i }).click()
  await expect(page.getByRole('heading', { name: /Your learning telemetry/i })).toBeVisible()
  await openNavigationIfNeeded()
  await page.getByRole('navigation', { name: /main navigation/i }).getByRole('button', { name: /Subnetting Practice/i }).click()
  await expect(page.locator('.subnet-phone-shell').getByRole('heading', { name: /Subnetting Practice/i })).toBeVisible()
})

test('learning path opens the first lesson activity', async ({ page }) => {
  await page.getByRole('button', { name: /Open next activity/i }).click()
  await expect(page.locator('.activity-title h1')).toContainText(/OSI Reference Model/i)
})

test('learner validation feedback can be captured and reviewed', async ({ page }) => {
  await page.getByRole('button', { name: /Open next activity/i }).click()
  await expect(page.getByRole('heading', { name: /Flag this activity for review/i })).toBeVisible()
  await page.getByRole('button', { name: /Needs example/i }).click()
  await page.getByLabel(/Optional note/i).fill('Add another beginner-friendly analogy here.')
  await page.getByRole('button', { name: /Save validation note/i }).click()
  await expect(page.getByText(/Feedback saved/i)).toBeVisible()
  await page.getByRole('button', { name: /Almost/i }).click()
  await page.getByRole('button', { name: /FIELD HQ/i }).click()
  await page.getByRole('button', { name: /Progress/i }).click()
  await expect(page.getByRole('heading', { name: /Feedback captured during study/i })).toBeVisible()
  await expect(page.getByText(/Add another beginner-friendly analogy/i)).toBeVisible()
  await expect(page.getByRole('heading', { name: /Activities to revisit/i })).toBeVisible()
  await expect(page.locator('.confidence-review-list').getByText(/OSI Reference Model/i)).toBeVisible()
  await page.locator('.confidence-review-list').getByRole('button', { name: /OSI Reference Model/i }).click()
  await expect(page.locator('.activity-title h1')).toContainText(/OSI Reference Model/i)
})

test('validation lab logs a Tier 1 learner session', async ({ page }) => {
  await page.getByRole('button', { name: /Validation Lab/i }).click()
  await expect(page.getByRole('heading', { name: /Turn learner sessions/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Run the first learner session in order/i })).toBeVisible()
  await page.getByRole('button', { name: '1 OSI Reference Model Lesson' }).click()
  await expect(page.locator('.activity-title h1')).toContainText(/OSI Reference Model/i)
  await page.getByRole('button', { name: /FIELD HQ/i }).click()
  await page.getByRole('button', { name: /Validation Lab/i }).click()
  await page.getByLabel('Learner ID').fill('Beginner 01')
  await page.getByLabel('Device/browser').fill('Mac Chrome')
  await page.getByLabel('Notes').fill('Completed Tier 1 but wanted more subnetting examples.')
  await page.getByRole('button', { name: /Save learner session/i }).click()
  await expect(page.getByText(/1\/3 learners/i)).toBeVisible()
  await page.getByRole('button', { name: /Copy validation package/i }).click()
  const copied = await page.evaluate(() => window.__copiedText)
  expect(JSON.parse(copied).type).toBe('network-plus-validation-package')
})

test('final exam practice and timed modes launch cleanly', async ({ page }) => {
  const search = page.getByRole('textbox', { name: /filter guided curriculum/i })
  await search.fill('practice exam')
  await page.getByRole('button', { name: /Network\+ N10-009 practice exam/i }).click()
  await expect(page.getByRole('heading', { name: /How do you want to train/i })).toBeVisible()
  await page.getByRole('button', { name: /Practice Mode/i }).click()
  await page.locator('.answers .answer').first().click()
  await page.getByRole('button', { name: /Show answer/i }).click()
  await expect(page.getByText(/Exam takeaway/i)).toBeVisible()
  await page.getByRole('button', { name: /FIELD HQ/i }).click()
  await page.evaluate(() => localStorage.removeItem('secplus-exam-v3-t6-practice-exam'))
  await page.getByRole('textbox', { name: /filter guided curriculum/i }).fill('practice exam')
  await page.getByRole('button', { name: /Network\+ N10-009 practice exam/i }).click()
  await page.getByRole('button', { name: /Exam Mode/i }).click()
  await expect(page.getByText(/Exam Mode · 0 of 90 answered/i)).toBeVisible()
})

test('curriculum filter finds subnetting and shows recoverable empty state', async ({ page }) => {
  const search = page.getByRole('textbox', { name: /filter guided curriculum/i })
  await search.fill('subnet')
  await expect(page.getByRole('heading', { name: /Section 1.7 - IPv4 Addressing/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Subnetting Practice - Calculator/i })).toBeVisible()
  await search.fill('no-such-network-topic')
  await expect(page.getByRole('heading', { name: /No curriculum matches/i })).toBeVisible()
})

test('subnetting practice checks answers and advances questions', async ({ page }) => {
  await page.getByRole('navigation', { name: /main navigation/i }).getByRole('button', { name: /Subnetting Practice/i }).click()
  await expect(page.locator('.subnet-phone-shell').getByRole('heading', { name: /Subnetting Practice/i })).toBeVisible()
  await page.getByLabel('Network Address').fill('100.47.0.0')
  await page.getByLabel('Broadcast Address').fill('100.47.255.255')
  await page.getByLabel('Wildcard Mask').fill('0.0.255.255')
  await page.getByLabel('Max valid hosts in this subnet').fill('65534')
  await page.getByRole('button', { name: /Check Answers/i }).click()
  await expect(page.getByText(/Clean subnet/i)).toBeVisible()
  await page.getByRole('button', { name: /Try New Question/i }).click()
  await expect(page.getByText('Question 2 of 360')).toBeVisible()
})

test('subnetting lessons are separate from practice', async ({ page }) => {
  await page.getByRole('navigation', { name: /main navigation/i }).getByRole('button', { name: /Subnetting Lessons/i }).click()
  await expect(page.getByRole('heading', { name: /Learn the pattern/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Binary octets/i })).toBeVisible()
})

test('flash card page launches the cumulative Network+ deck', async ({ page }) => {
  await page.getByRole('button', { name: /flash cards/i }).click()
  await expect(page.getByRole('heading', { name: /Shuffle the whole Network\+ deck/i })).toBeVisible()
  await page.getByRole('button', { name: /Start shuffled deck/i }).click()
  await expect(page.locator('.activity-title h1')).toContainText(/Master Network\+ flashcards/i)
})

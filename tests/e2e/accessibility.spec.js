import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('networkplus-learner-progress', JSON.stringify({
      version: 7,
      learnerName: 'David',
      completedOnboarding: true,
      completedActivityIds: [],
      results: {},
      scenarioResults: {},
      examAttempts: [],
      learnerFeedback: [],
      confidenceRatings: {},
      manualQaChecks: {},
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
  await expect(page.locator('.start-card--primary')).toBeVisible()
  await expect(page.locator('.start-card--primary')).toContainText(/start here|keep going|review recommended/i)
  await expect(page.locator('.start-card--primary')).toContainText(/OSI Reference Model|New to networking/i)
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})

test('responsive core surfaces render on narrow viewports @responsive', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'desktop', 'Responsive smoke runs on tablet and mobile projects.')
  const openNavigationIfNeeded = async () => {
    const menuButton = page.getByRole('button', { name: /Open navigation/i })
    if (await menuButton.isVisible()) await menuButton.click()
  }
  await expect(page.locator('.start-card--primary')).toBeVisible()
  await expect(page.locator('.start-card--primary')).toContainText(/OSI Reference Model|New to networking/i)
  await openNavigationIfNeeded()
  await page.getByRole('navigation', { name: /main navigation/i }).getByRole('button', { name: /Learning Path/i }).click()
  await expect(page.getByRole('heading', { name: /See the whole mountain/i })).toBeVisible()
  await openNavigationIfNeeded()
  await page.getByRole('navigation', { name: /main navigation/i }).getByRole('button', { name: /^Progress$/i }).click()
  await expect(page.getByRole('heading', { name: /Your learning telemetry/i })).toBeVisible()
  await expect(page.locator('body')).not.toHaveCSS('overflow-x', 'scroll')
})

test('learning path opens the first lesson activity', async ({ page }) => {
  await page.getByRole('button', { name: /Open next activity/i }).click()
  await expect(page.locator('.activity-title h1')).toContainText(/OSI Reference Model/i)
})

test('global Continue learning opens the next recommended Network+ activity', async ({ page }) => {
  await page.locator('.topbar').getByRole('button', { name: /continue learning/i }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByLabel(/activity location/i)).toContainText(/Lesson/i)
  await expect(page.locator('.activity-title h1')).toContainText(/OSI Reference Model/i)
})

test('activity dialog receives focus and restores it on exit', async ({ page }) => {
  const menu = page.getByRole('button', { name: /open navigation/i })
  if (await menu.isVisible()) await menu.click()
  await page.getByRole('button', { name: /learning path/i }).click()
  await page.locator('.tier-node').first().click()
  const trigger = page.locator('.activity-row').first()
  await trigger.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Exit', exact: true })).toBeFocused()
  await page.getByRole('button', { name: 'Exit', exact: true }).click()
  await expect(trigger).toBeFocused()
})

test('sidebar shield returns to Overview home', async ({ page }) => {
  const menu = page.getByRole('button', { name: /open navigation/i })
  if (await menu.isVisible()) await menu.click()
  await page.getByRole('button', { name: /learning path/i }).click()
  if (await menu.isVisible()) await menu.click()
  await page.getByRole('button', { name: /return to overview home/i }).click()
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible()
})

test('learner validation feedback and confidence can be captured', async ({ page }) => {
  await page.getByRole('button', { name: /Open next activity/i }).click()
  await expect(page.getByRole('heading', { name: /Flag this activity for review/i })).toBeVisible()
  await page.getByRole('button', { name: /Needs example/i }).click()
  await page.getByLabel(/Optional note/i).fill('Add another beginner-friendly analogy here.')
  await page.getByRole('button', { name: /Save validation note/i }).click()
  await expect(page.getByText(/Feedback saved/i)).toBeVisible()
  await page.getByRole('button', { name: /Almost/i }).click()
  await expect(page.getByText(/Saved: Almost/i)).toBeVisible()
})

test('Security+ parity navigation exposes Progress but keeps Validation Lab hidden', async ({ page }) => {
  await expect(page.getByRole('navigation', { name: /main navigation/i }).getByRole('button', { name: /Validation Lab/i })).toHaveCount(0)
  await page.getByRole('navigation', { name: /main navigation/i }).getByRole('button', { name: /^Progress$/i }).click()
  await expect(page.getByRole('heading', { name: /Your learning telemetry/i })).toBeVisible()
})

test('why Network+ page uses network-specific career framing', async ({ page }) => {
  await page.getByRole('button', { name: /Why Network\+/i }).click()
  await expect(page.getByRole('heading', { name: /Networking is the layer every IT path has to cross/i })).toBeVisible()
  await expect(page.getByText(/\$96,800/i)).toBeVisible()
  await expect(page.getByText(/14,300/i)).toBeVisible()
  await expect(page.locator('.info-copy small').getByText(/Network and Computer Systems Administrators/i)).toBeVisible()
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
  await page.getByRole('textbox', { name: /filter guided curriculum/i }).fill('Subnetting Practice Calculator')
  await page.getByRole('button', { name: /Subnetting Practice Calculator/i }).click()
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
  await page.getByRole('textbox', { name: /filter guided curriculum/i }).fill('Subnetting Binary')
  await page.getByRole('button', { name: /Subnetting Binary and CIDR Explanations/i }).click()
  await expect(page.locator('.activity-title h1')).toContainText(/Subnetting Binary and CIDR Explanations/i)
  await expect(page.getByRole('heading', { name: /Binary octets/i })).toBeVisible()
})

test('flash card page launches the cumulative Network+ deck', async ({ page }) => {
  await page.getByRole('button', { name: /flash cards/i }).click()
  await expect(page.getByRole('heading', { name: /Shuffle the whole Network\+ deck/i })).toBeVisible()
  await page.getByRole('button', { name: /Start shuffled deck/i }).click()
  await expect(page.locator('.activity-title h1')).toContainText(/Master Network\+ flashcards/i)
})

test('common ports page supports flashcards, matching, and explanations', async ({ page }) => {
  await page.getByRole('button', { name: /Common Ports/i }).click()
  await expect(page.getByRole('heading', { name: /Build the port-number reflex/i })).toBeVisible()
  await page.getByRole('button', { name: /Tap to reveal port/i }).click()
  await expect(page.locator('.matching-columns').getByRole('button', { name: '20/21', exact: true })).toBeVisible()
  await page.locator('.matching-columns').getByRole('button', { name: /^22$/ }).click()
  await page.locator('.matching-columns').getByRole('button', { name: 'SSH/SFTP/SCP', exact: true }).click()
  await expect(page.getByText(/Matched\. Nice\./i)).toBeVisible()
  const httpsReference = page.locator('.ports-reference__list').getByRole('button', { name: /443 HTTPS/i })
  await httpsReference.scrollIntoViewIfNeeded()
  await httpsReference.click()
  await expect(page.getByText(/Carries encrypted web traffic using TLS/i)).toBeVisible()
})

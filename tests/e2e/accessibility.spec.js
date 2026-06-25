import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem('networkplus-e2e-first-run') === 'true') {
      localStorage.removeItem('networkplus-learner-progress')
    } else {
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
    }
    localStorage.removeItem('network-plus-exam-v4-t6-practice-exam')
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

test('first-run welcome tiers fit narrow viewports @responsive', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'desktop', 'First-run welcome layout runs on tablet and mobile projects.')
  await page.evaluate(() => {
    sessionStorage.setItem('networkplus-e2e-first-run', 'true')
    localStorage.removeItem('networkplus-learner-progress')
  })
  await page.goto('/')
  await expect(page.locator('.welcome-card')).toBeVisible()
  await expect(page.locator('.welcome-tiers')).toContainText('Subnet')
  await expect(page.locator('.welcome-tiers')).not.toContainText('0Subnet')
  const overflow = await page.evaluate(() => {
    const pageWidth = document.documentElement.clientWidth
    const documentOverflow = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > pageWidth + 2
    const tierOverflow = Array.from(document.querySelectorAll('.welcome-tiers span')).map((node) => ({
      text: node.textContent,
      widthOverflow: Math.ceil(node.scrollWidth) > Math.ceil(node.clientWidth) + 2,
      heightOverflow: Math.ceil(node.scrollHeight) > Math.ceil(node.clientHeight) + 2,
    })).filter((entry) => entry.widthOverflow || entry.heightOverflow)
    return { documentOverflow, tierOverflow }
  })
  expect(overflow).toEqual({ documentOverflow: false, tierOverflow: [] })
})

test('shared UI surfaces do not overflow horizontally @responsive', async ({ page }) => {
  const openNavigationIfNeeded = async () => {
    const menuButton = page.getByRole('button', { name: /Open navigation/i })
    if (await menuButton.isVisible()) await menuButton.click()
  }
  const mainNavigation = () => page.getByRole('navigation', { name: /main navigation/i })
  const navigate = async (name) => {
    await openNavigationIfNeeded()
    await mainNavigation().getByRole('button', { name }).click()
  }
  const navigatePacketSection = async (name) => {
    await openNavigationIfNeeded()
    const nav = mainNavigation()
    await nav.getByRole('button', { name: /^Life of a Packet$/i }).click()
    await nav.getByRole('button', { name }).click()
  }
  const checkNoHorizontalOverflow = async (extraSelectors = []) => {
    const overflow = await page.evaluate((selectorsFromTest) => {
      const pageWidth = document.documentElement.clientWidth
      const selectors = [
        'body',
        '.app-shell',
        '.page',
        '.topbar',
        '.sidebar',
        '.start-card--primary',
        '.stats-row',
        '.journey-panel',
        '.domain-grid',
        '.domain-card',
        '.flashcards-hero',
        '.ports-hero',
        '.ports-grid',
        '.packet-lab',
        '.packet-stage',
        '.packet-node',
        '.packet-step-strip',
        '.arp-lab',
        '.arp-mini-network',
        '.arp-visual',
        '.arp-cache-card',
        '.arp-doc-grid',
        '.activity-header',
        '.activity-shell',
        '.exam-mode-picker',
        ...selectorsFromTest,
      ]
      const documentOverflow = Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth,
      ) > pageWidth + 2
        ? [{
            selector: 'document',
            scrollWidth: Math.ceil(Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)),
            clientWidth: Math.ceil(pageWidth),
          }]
        : []
      const selectorOverflow = selectors
        .flatMap((selector) =>
          Array.from(document.querySelectorAll(selector)).slice(0, 12).map((node) => {
          return {
            selector,
            scrollWidth: Math.ceil(node.scrollWidth),
            clientWidth: Math.ceil(node.clientWidth),
          }
        }))
        .filter((entry) => entry.scrollWidth > entry.clientWidth + 2)
      return [...documentOverflow, ...selectorOverflow]
    }, extraSelectors)
    expect(overflow).toEqual([])
  }

  await checkNoHorizontalOverflow()
  await navigatePacketSection(/Packet Path/i)
  await expect(page.locator('.packet-lab')).toBeVisible()
  await expect(page.locator('.arp-lab')).toHaveCount(0)
  await expect(page.locator('.packet-mode-tabs')).toHaveCount(0)
  await expect(page.locator('.packet-step-strip')).toHaveCount(0)
  await expect(page.locator('.device-config-lab')).toHaveCount(0)
  await expect(page.locator('.mac-lab')).toHaveCount(0)
  await expect(page.locator('.packet-guide')).toContainText(/Request goes out/i)
  await expect(page.locator('.packet-dot')).toHaveCount(2)
  await expect(page.locator('.packet-node')).toHaveCount(4)
  await checkNoHorizontalOverflow()
  await navigatePacketSection(/Life of ARP/i)
  await expect(page.locator('.packet-lab')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: /ARP: IP question, MAC answer/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /Replay ARP flow/i })).toBeVisible()
  await expect(page.locator('.arp-mini-network')).toBeVisible()
  await page.getByRole('button', { name: 'Step 3: Broadcast who-has', exact: true }).click()
  await expect(page.locator('.arp-result-card')).toContainText(/every device in the VLAN sees it/i)
  await page.getByRole('button', { name: /Same-LAN neighbor/i }).click()
  await expect(page.locator('.arp-result-card')).toContainText(/Same-subnet traffic uses the neighbor MAC directly/i)
  await checkNoHorizontalOverflow()
  await navigate(/Exam Domains/i)
  await expect(page.locator('.domain-grid')).toBeVisible()
  await checkNoHorizontalOverflow()
  await navigate(/^Flash Cards$/i)
  await expect(page.locator('.flashcards-hero')).toBeVisible()
  await checkNoHorizontalOverflow()
  await navigate(/Common Ports/i)
  await expect(page.locator('.ports-hero')).toBeVisible()
  const matchingColumnCount = await page.locator('.matching-columns').evaluate((node) =>
    getComputedStyle(node).gridTemplateColumns.split(' ').filter(Boolean).length
  )
  expect(matchingColumnCount).toBe(2)
  await checkNoHorizontalOverflow(['.matching-columns', '.port-reference-card'])
  await navigate(/Learning Path/i)
  await page.locator('.tier-node').first().click()
  await page.locator('.activity-row').first().click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await checkNoHorizontalOverflow()
})

test('life of a packet parent expands without navigating', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible()
  const nav = page.getByRole('navigation', { name: /main navigation/i })
  await nav.getByRole('button', { name: /^Life of a Packet$/i }).click()
  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible()
  await expect(nav.getByRole('button', { name: /^Packet Path$/i })).toBeVisible()
  await expect(nav.getByRole('button', { name: /^Life of ARP$/i })).toBeVisible()
  await nav.getByRole('button', { name: /^Packet Path$/i }).click()
  await expect(page.getByRole('heading', { name: 'Life of a Packet', exact: true })).toBeVisible()
})

test('learning path opens the first lesson activity', async ({ page }) => {
  await page.getByRole('button', { name: /Open next activity/i }).click()
  await expect(page.locator('.activity-title h1')).toContainText(/OSI Reference Model/i)
})

test('completing an activity opens the next activity at the top', async ({ page }) => {
  await page.getByRole('button', { name: /Open next activity/i }).click()
  const dialog = page.locator('.activity-overlay')
  await expect(dialog).toBeVisible()
  await dialog.evaluate((node) => {
    node.scrollTop = node.scrollHeight
  })
  await expect.poll(async () => dialog.evaluate((node) => node.scrollTop)).toBeGreaterThan(100)
  await page.locator('.activity-complete').click()
  await expect(page.getByLabel(/activity location/i)).toContainText(/Activity 2 of/i)
  await expect.poll(async () => dialog.evaluate((node) => node.scrollTop)).toBe(0)
})

test('activity skip advances without completing the objective @responsive', async ({ page }) => {
  await page.getByRole('button', { name: /Open next activity/i }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByLabel(/activity location/i)).toContainText(/Activity 1 of/i)
  await page.getByRole('button', { name: /Skip to next objective/i }).click()
  await expect(page.getByLabel(/activity location/i)).toContainText(/Activity 2 of/i)
  const completedIds = await page.evaluate(() => {
    const progress = JSON.parse(localStorage.getItem('networkplus-learner-progress'))
    return progress.completedActivityIds
  })
  expect(completedIds).toEqual([])
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

test('global topbar home button returns to Overview', async ({ page }) => {
  await page.getByRole('navigation', { name: /main navigation/i }).getByRole('button', { name: /Learning Path/i }).click()
  await expect(page.getByRole('heading', { name: /See the whole mountain/i })).toBeVisible()
  await page.locator('.topbar').getByRole('button', { name: /go to overview home/i }).click()
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible()
})

test('global topbar home button scrolls Overview to the top', async ({ page }) => {
  await page.getByRole('navigation', { name: /main navigation/i }).getByRole('button', { name: /Learning Path/i }).click()
  await expect(page.getByRole('heading', { name: /See the whole mountain/i })).toBeVisible()
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await expect.poll(async () => page.evaluate(() => window.scrollY)).toBeGreaterThan(100)
  await page.locator('.topbar').getByRole('button', { name: /go to overview home/i }).click()
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible()
  await expect.poll(async () => page.evaluate(() => window.scrollY)).toBe(0)
})

test('global topbar home button returns from every main app page', async ({ page }) => {
  const navigation = page.getByRole('navigation', { name: /main navigation/i })
  const home = page.locator('.topbar').getByRole('button', { name: /go to overview home/i })
  const routes = [
    { nav: /Learning Path/i, title: 'Learning Path' },
    { nav: /Life of a Packet/i, title: 'Life of a Packet' },
    { nav: /Exam Domains/i, title: 'Exam Domains' },
    { nav: /^Flash Cards$/i, title: 'Flash Cards' },
    { nav: /Common Ports/i, title: 'Common Ports' },
    { nav: /^Progress$/i, title: 'Progress' },
    { nav: /How to Study/i, title: 'How to Study' },
    { nav: /Meet the Developers/i, title: 'Meet the Developers' },
    { nav: /Read Me/i, title: 'Read Me' },
    { nav: /Data & Privacy/i, title: 'Data & Privacy' },
    { nav: /Why Network\+/i, title: 'Why Network+?' },
  ]

  for (const route of routes) {
    await navigation.getByRole('button', { name: route.nav }).click()
    await expect(page.locator('.topbar h1')).toHaveText(route.title)
    await home.click()
    await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible()
    await expect.poll(async () => page.evaluate(() => window.scrollY)).toBe(0)
  }

  await navigation.getByRole('button', { name: /Life of a Packet/i }).click()
  await page.getByRole('button', { name: /Life of ARP/i }).click()
  await expect(page.locator('.topbar h1')).toHaveText('Life of ARP')
  await home.click()
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible()

  await navigation.getByRole('button', { name: /Learning Path/i }).click()
  await page.locator('.tier-node').first().click()
  await expect(page.locator('.tier-detail-page')).toBeVisible()
  await home.click()
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible()
})

test('data privacy page explains local storage and clears local study data', async ({ page }) => {
  await page.getByRole('navigation', { name: /main navigation/i }).getByRole('button', { name: /Data & Privacy/i }).click()
  await expect(page.getByRole('heading', { name: /Your study data stays on this device/i })).toBeVisible()
  await expect(page.getByText(/No tracking stack/i)).toBeVisible()
  await expect(page.getByText(/analytics SDK/i)).toBeVisible()
  await expect(page.getByText(/App Store purchases and Apple ID account handling are managed by Apple/i)).toBeVisible()

  const deleteButton = page.getByRole('button', { name: /Delete local progress/i })
  await expect(deleteButton).toBeDisabled()
  await page.getByLabel(/I understand this deletes local learner progress/i).check()
  await expect(deleteButton).toBeEnabled()
  await deleteButton.click()

  await expect(page.locator('.welcome-card')).toBeVisible()
  await expect.poll(async () => page.evaluate(() => localStorage.getItem('networkplus-learner-progress'))).toBeNull()
})

test('activity Field HQ home button returns to Overview top', async ({ page }) => {
  await page.getByRole('button', { name: /Open next activity/i }).click()
  const dialog = page.locator('.activity-overlay')
  await expect(dialog).toBeVisible()
  await dialog.evaluate((node) => {
    node.scrollTop = node.scrollHeight
  })
  await page.getByRole('button', { name: /Return to Field HQ home/i }).click()
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible()
  await expect(dialog).toHaveCount(0)
  await expect.poll(async () => page.evaluate(() => window.scrollY)).toBe(0)
})

test('activity objectives do not show learner review prompts', async ({ page }) => {
  await page.getByRole('button', { name: /Open next activity/i }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('heading', { name: /Flag this activity for review/i })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: /How solid does this feel/i })).toHaveCount(0)
  await expect(page.getByRole('button', { name: /Save validation note/i })).toHaveCount(0)
  await expect(page.locator('.lesson-objective')).toHaveCount(0)
  await expect(page.locator('.objective-visual')).toHaveCount(0)
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
  await page.evaluate(() => localStorage.removeItem('network-plus-exam-v4-t6-practice-exam'))
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
  await page.getByRole('navigation', { name: /main navigation/i }).getByRole('button', { name: 'Flash Cards', exact: true }).click()
  await expect(page.getByRole('heading', { name: /Shuffle the whole Network\+ deck/i })).toBeVisible()
  await page.getByRole('button', { name: /Start shuffled deck/i }).click()
  await expect(page.locator('.activity-title h1')).toContainText(/Master Network\+ flashcards/i)
})

test('common ports page supports flashcards, matching, and explanations', async ({ page }) => {
  await page.getByRole('navigation', { name: /main navigation/i }).getByRole('button', { name: 'Common Ports', exact: true }).click()
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

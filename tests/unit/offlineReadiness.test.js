import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

function readProjectFile(path) {
  return readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')
}

test('Capacitor packages bundled assets for offline iOS use', () => {
  const config = JSON.parse(readProjectFile('capacitor.config.json'))

  assert.equal(config.webDir, 'dist')
  assert.equal(config.server?.url, undefined)
})

test('runtime app shell does not depend on remote web resources', () => {
  const css = readProjectFile('src/app/app.css')
  const app = readProjectFile('src/app/App.jsx')
  const index = readProjectFile('index.html')

  assert.doesNotMatch(css, /@import\s+url\(["']?https?:/i)
  assert.doesNotMatch(css, /fonts\.(googleapis|gstatic)\.com/i)
  assert.doesNotMatch(app, /href=["']https?:\/\//i)
  assert.doesNotMatch(app, /target=["']_blank["']/i)
  assert.doesNotMatch(index, /https?:\/\//i)
})

test('privacy review documents the local-only offline posture', () => {
  const review = readProjectFile('docs/SECURITY_PRIVACY_REVIEW.md')

  assert.match(review, /offline bundle/i)
  assert.match(review, /No account system, backend API, analytics, or third-party tracking/i)
  assert.match(review, /No remote fonts, remote images, external study links, or runtime API calls/i)
})

test('app exposes privacy controls and local data deletion', () => {
  const app = readProjectFile('src/app/App.jsx')

  assert.match(app, /id: "privacy", label: "Data & Privacy"/)
  assert.match(app, /Your study data stays on this device/)
  assert.match(app, /Delete local progress/)
  assert.match(app, /network-plus-exam-v4-/)
  assert.match(app, /progressRepository\.clear\(\)/)
})

test('iOS metadata declares no tracking, no collected data, and no non-exempt encryption', () => {
  const info = readProjectFile('ios/App/App/Info.plist')
  const privacy = readProjectFile('ios/App/App/PrivacyInfo.xcprivacy')
  const project = readProjectFile('ios/App/App.xcodeproj/project.pbxproj')

  assert.match(info, /<key>ITSAppUsesNonExemptEncryption<\/key>\s*<false\/>/)
  assert.match(privacy, /<key>NSPrivacyTracking<\/key>\s*<false\/>/)
  assert.match(privacy, /<key>NSPrivacyCollectedDataTypes<\/key>\s*<array\/>/)
  assert.match(privacy, /<key>NSPrivacyAccessedAPITypes<\/key>\s*<array\/>/)
  assert.match(project, /PrivacyInfo\.xcprivacy in Resources/)
})

test('privacy policy is ready to publish for App Store Connect', () => {
  const policy = readProjectFile('docs/PRIVACY_POLICY.md')

  assert.match(policy, /The app does not collect personal data/i)
  assert.match(policy, /does not use advertising identifiers, analytics SDKs, remote logging/i)
  assert.match(policy, /Users can delete local learner progress from inside the app/i)
})

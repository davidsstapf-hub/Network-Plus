# Asset Provenance

## First-Party Generated Assets

The app icon and iOS splash images in `ios/App/App/Assets.xcassets` are first-party generated graphics created for this project. They use simple geometric network motifs and do not include third-party logos, certification-provider marks, stock artwork, or copied exam-provider materials.

Current generated files:

- `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png`
- `ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732.png`
- `ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732-1.png`
- `ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732-2.png`

## Release Checklist

- Regenerate icon and splash assets from first-party source artwork when branding changes.
- Confirm generated PNGs do not contain stale editor metadata before submission.
- Do not add external images, fonts, screenshots, or vendor marks without documenting license, source URL, allowed use, and attribution requirements.

# Courierpr.com browser extension

The latest press releases on Courierpr.com from the toolbar, plus the newest in five categories picked fresh each time you open it. Click a release to read it on the site.

Works in Chrome, Microsoft Edge and Firefox. This is the full source of the extension published for Courierpr.com.

## What is a browser extension?

A browser extension is a small add-on that lives in your browser toolbar. Click its icon and a popup opens, so you can use a service without opening its website first. This one is a popup only: it shows a short list and every item opens the real page on Courierpr.com.

## About Courierpr.com

Courierpr.com is a press release wire: companies file releases and each is published as a permanent article, organised into six newsroom desks and twenty categories. Visit it at https://courierpr.com.

## Install

1. Open `chrome://extensions` (Chrome), `edge://extensions` (Edge) or `about:debugging` (Firefox).
2. Turn on Developer mode, then choose Load unpacked (Firefox: Load Temporary Add-on and pick `manifest.json`).
3. Select this folder.
4. Click the toolbar icon.

## Privacy and permissions

It asks for no permissions at all. It has no background worker, no content script, no host permissions, no storage and no sign-in.

It makes one request to a public, read-only feed endpoint on courierpr.com.

The extension collects nothing and stores no credentials. Privacy policy: https://courierpr.com/privacy.

## Build

- Firefox: `node scripts/build-firefox-extension.mjs` writes `courierpr-extension-firefox.zip`. It adds the Firefox-only manifest block (add-on id and the "collects no data" declaration).
- Chrome: zip `manifest.json`, `popup.html`, `popup.js` and `icons/` with forward-slash paths (for example `tar -a -cf ../ext.zip manifest.json popup.html popup.js icons`).

## More from Courierpr.com

- Website: https://courierpr.com
- Developer docs for Claude: https://courierpr.com/docs/claude
- Developer docs for ChatGPT: https://courierpr.com/docs/api
- ChatGPT plugin: https://github.com/ExpatsListORG/courierpr-chatgpt-plugin
- Claude connector: https://github.com/ExpatsListORG/courierpr-claude-connector
- Privacy policy: https://courierpr.com/privacy
- Terms of service: https://courierpr.com/terms
- Contact: https://courierpr.com/contact

## License

MIT. See `LICENSE`.

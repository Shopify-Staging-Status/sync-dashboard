# Test Store Sync Status Dashboard

Radar chart dashboard showing how up to date each area of the test store is compared to production. Hosted on GitHub Pages, embedded in Confluence via iframe.

## Setup (one time)

1. Create a new repository on GitHub (e.g. `test-store-sync-status`)
2. Push the `index.html` and `data.js` files to the `main` branch
3. Go to **Settings > Pages** in the repository
4. Under "Source", select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click Save
7. Wait 1 to 2 minutes. Your dashboard will be live at:
   `https://<your-org>.github.io/test-store-sync-status/`

## Embed in Confluence

In the Confluence page editor, type `/iframe` and select the **iframe macro**. Paste your GitHub Pages URL. Set the height to around `800px`.

## How to update after a sync

You only need to edit `data.js`. Change the date next to the component you synced:

```js
{ component: 'Products', lastSync: '2026-04-15', owner: 'Gersen', category: 'Matrixify' },
```

Commit and push. GitHub Pages will redeploy automatically in about 1 minute.

## How it works

- Each component has a "freshness" score from 0 to 100
- 100 = synced today, shrinks toward 0 over 90 days
- Points change color: green (0 to 7 days), yellow (8 to 30 days), red (30+ days)
- Manual components (Markets, Apps, etc.) show as gray near the center
- Summary boxes at the top count how many components are in each status
- The "Most recent sync" date updates automatically from the data

## File structure

```
index.html   — Dashboard UI and chart (don't need to edit this)
data.js      — Sync dates and owners (edit this after each sync)
README.md    — This file
```

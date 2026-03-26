// ============================================================
// GOOGLE SHEETS INTEGRATION
//
// 1. Create a Google Sheet with columns:
//    Component | Last Synced | Owner | Category
//
// 2. Use these exact date formats in "Last Synced":
//    '2026-03-20'  = synced on that date
//    'manual'      = manually configured, shows gray
//
// 3. Publish the sheet:
//    File > Share > Publish to web > Sheet 1 > CSV > Publish
//
// 4. Paste the published URL below:
// ============================================================
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR3K-WBfU9rutI9ankd2BZiOy-wOqW-oY98sOLAdMAFeNwPciOaoHI-0K7rsfIB_-S6KuH1TXO4QHJV/pub?gid=0&single=true&output=csv';
// Example: 'https://docs.google.com/spreadsheets/d/e/2PACX-XXXXX/pub?gid=0&single=true&output=csv'

// ============================================================
// FALLBACK DATA (used if Google Sheets is unreachable)
// ============================================================
const fallbackData = [
  { component: 'Theme', lastSync: '2026-03-20', owner: 'Gersen', category: 'Shopify CLI' },
  { component: 'CDN media', lastSync: '2026-03-20', owner: 'Gersen', category: 'Shopify CLI' },
  { component: 'Products', lastSync: '2026-03-20', owner: 'Gersen', category: 'Matrixify' },
  { component: 'Collections', lastSync: '2026-03-20', owner: 'Gersen', category: 'Matrixify' },
  { component: 'Pages', lastSync: '2026-03-20', owner: 'Gersen', category: 'Matrixify' },
  { component: 'Blog posts', lastSync: '2026-03-20', owner: 'Gersen', category: 'Matrixify' },
  { component: 'Navigation menus', lastSync: '2026-03-20', owner: 'Gersen', category: 'Matrixify' },
  { component: 'Metaobjects', lastSync: '2026-03-20', owner: 'Gersen', category: 'Matrixify' },
  { component: 'Metafields', lastSync: '2026-03-20', owner: 'Gersen', category: 'Matrixify' },
  { component: 'Discounts', lastSync: '2026-03-20', owner: 'Gersen', category: 'Matrixify' },
  { component: 'Markets', lastSync: 'manual', owner: '', category: 'Manual configuration' },
  { component: 'Apps', lastSync: 'manual', owner: '', category: 'Manual configuration' },
  { component: 'Shipping zones/rates', lastSync: 'manual', owner: '', category: 'Manual configuration' },
  { component: 'Store settings', lastSync: 'manual', owner: '', category: 'Manual configuration' },
];

// ============================================================
// CSV PARSER AND LOADER
// ============================================================
function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

  const compIdx = headers.findIndex(h => h === 'component');
  const syncIdx = headers.findIndex(h => h.includes('last') && h.includes('sync'));
  const ownerIdx = headers.findIndex(h => h === 'owner');
  const catIdx = headers.findIndex(h => h === 'category');

  if (compIdx === -1 || syncIdx === -1) {
    console.warn('Google Sheet columns not recognized. Expected: Component, Last Synced, Owner, Category');
    return null;
  }

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
    const component = cols[compIdx];
    if (!component) continue;

    let lastSync = cols[syncIdx] || 'manual';
    // Normalize date: handle Google Sheets date formats like 3/20/2026 or 2026-03-20
    if (lastSync !== 'manual') {
      const parsed = new Date(lastSync);
      if (!isNaN(parsed.getTime())) {
        const y = parsed.getFullYear();
        const m = String(parsed.getMonth() + 1).padStart(2, '0');
        const d = String(parsed.getDate()).padStart(2, '0');
        lastSync = `${y}-${m}-${d}`;
      } else {
        lastSync = 'manual';
      }
    }

    data.push({
      component: component,
      lastSync: lastSync,
      owner: ownerIdx !== -1 ? (cols[ownerIdx] || '') : '',
      category: catIdx !== -1 ? (cols[catIdx] || '') : '',
    });
  }

  return data.length > 0 ? data : null;
}

async function loadSyncData() {
  if (!SHEET_CSV_URL || SHEET_CSV_URL === 'YOUR_GOOGLE_SHEETS_CSV_URL_HERE') {
    console.log('No Google Sheets URL configured. Using fallback data.');
    return fallbackData;
  }

  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    const parsed = parseCSV(text);
    if (parsed) {
      console.log(`Loaded ${parsed.length} components from Google Sheets.`);
      return parsed;
    }
    console.warn('Could not parse Google Sheets data. Using fallback.');
    return fallbackData;
  } catch (err) {
    console.warn('Could not reach Google Sheets:', err.message, '. Using fallback data.');
    return fallbackData;
  }
}

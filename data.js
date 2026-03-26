// ============================================================
// UPDATE THIS FILE after each sync
//
// lastSync:  'YYYY-MM-DD' or 'manual'
// owner:     Name of the person responsible
// category:  Groups rows in the table
//
// 'manual' = configured manually, shows gray on chart
// ============================================================
const syncData = [
  // Synced via Shopify CLI
  { component: 'Theme',                lastSync: '2026-03-20', owner: 'Gersen',  category: 'Shopify CLI' },
  { component: 'CDN media',            lastSync: '2026-03-20', owner: 'Gersen',  category: 'Shopify CLI' },

  // Synced via Matrixify
  { component: 'Products',             lastSync: '2026-03-20', owner: 'Gersen',  category: 'Matrixify' },
  { component: 'Collections',          lastSync: '2026-03-20', owner: 'Gersen',  category: 'Matrixify' },
  { component: 'Pages',                lastSync: '2026-03-20', owner: 'Gersen',  category: 'Matrixify' },
  { component: 'Blog posts',           lastSync: '2026-03-20', owner: 'Gersen',  category: 'Matrixify' },
  { component: 'Navigation menus',     lastSync: '2026-03-20', owner: 'Gersen',  category: 'Matrixify' },
  { component: 'Metaobjects',          lastSync: '2026-03-20', owner: 'Gersen',  category: 'Matrixify' },
  { component: 'Metafields',           lastSync: '2026-03-20', owner: 'Gersen',  category: 'Matrixify' },
  { component: 'Discounts',            lastSync: '2026-03-20', owner: 'Gersen',  category: 'Matrixify' },

  // Manual configuration required
  { component: 'Markets',              lastSync: 'manual',     owner: '',        category: 'Manual configuration' },
  { component: 'Apps',                 lastSync: 'manual',     owner: '',        category: 'Manual configuration' },
  { component: 'Shipping zones/rates', lastSync: 'manual',     owner: '',        category: 'Manual configuration' },
  { component: 'Store settings',       lastSync: 'manual',     owner: '',        category: 'Manual configuration' },
];

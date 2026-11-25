import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Final public address of the site.
// ConVoglio's domain (Aruba). The same host goes into public/CNAME at launch.
const SITE_URL = process.env.SITE_URL || 'https://www.associazioneconvoglio.it';

// Only used for previews in a sub-folder (e.g. user.github.io/repo/).
// With the custom domain this stays '/'.
const BASE_PATH = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  // Pages load on hover/tap before the click lands.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [sitemap({ filter: (page) => !/^\/(home|cirillico|progetti\/asd-san-paolo-torino)(\/|$)/.test(new URL(page).pathname) })],
  // Old Google Sites addresses keep working after the switch.
  redirects: {
    '/home': '/',
    '/cirillico': '/progetti/uspr-cirillico/',
    '/progetti/asd-san-paolo-torino': 'https://www.sanpaolotorino.it/',
    '/progetti/asd-san-paolo-torino/she7-spt-cup': 'https://www.sanpaolotorino.it/',
  },
  build: { inlineStylesheets: 'auto' },
});

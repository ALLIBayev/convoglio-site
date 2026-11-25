import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Final public address of the site.
// TODO: replace with the real ConVoglio domain (same value goes into public/CNAME).
const SITE_URL = process.env.SITE_URL || 'https://www.convoglio.org';

// Only used for previews in a sub-folder (e.g. user.github.io/repo/).
// With the custom domain this stays '/'.
const BASE_PATH = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});

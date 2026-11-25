/** One place for the site's main areas: label, address and colour. Used by the header, page heads and cards. */
export const sections = {
  chi: { label: 'Chi siamo', href: '/organizzazione/', tone: 'yellow' },
  progetti: { label: 'Progetti', href: '/progetti/', tone: 'blue' },
  eventi: { label: 'Eventi', href: '/eventi/', tone: 'red' },
  contatti: { label: 'Contatti', href: '/contatti/', tone: 'green' },
  sostienici: { label: 'Sostienici', href: '/sostienici/', tone: 'red' },
} as const;
export type SectionKey = keyof typeof sections;
export const navOrder: SectionKey[] = ['chi', 'progetti', 'eventi', 'contatti'];

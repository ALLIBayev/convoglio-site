const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix internal absolute paths with the configured base. External links pass through. */
export function u(path: string | undefined | null): string {
  if (!path) return '';
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${p}`;
}

export function isExternal(path: string | undefined | null): boolean {
  return !!path && /^https?:/.test(path);
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

import { existsSync } from 'node:fs';
import { join } from 'node:path';

/** If a "-480" copy of a public image exists, return a srcset so phones download the light version. */
export function srcsetFor(path: string, fullWidth = 800): string | undefined {
  if (!path || /^https?:/.test(path)) return undefined;
  const small = path.replace(/(\.\w+)$/, '-480$1');
  return existsSync(join(process.cwd(), 'public', small)) ? `${u(small)} 480w, ${u(path)} ${fullWidth}w` : undefined;
}

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

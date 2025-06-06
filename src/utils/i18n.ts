// utils/i18n.ts
export const locales = ['en', 'de', 'bg'];

export function getLocaleFromPath(path: string): string {
  const firstPathPart = path.split('/')[1];
  
  const locale = locales.includes(firstPathPart) ? firstPathPart : locales[0]; // Default to 'en' if not found
  console.log(locale)
  return locale;
}


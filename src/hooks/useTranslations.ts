// src/hooks/useTranslations.ts
import { usePathname } from 'next/navigation';
import { translations } from '../lib/translations';
import { useRouter } from 'next/navigation';

export function useTranslations() {
  const path = usePathname();
  const locale = path.split('/')[1] || 'en'; // /en/about → 'en'
  const router = useRouter();
  
  const changeLanguage = (newLocale: string) => {
    const path = window.location.pathname; // напр. /en/about
    const segments = path.split('/');
    segments[1] = newLocale; // заменяме locale частта
    const newPath = segments.join('/');
    router.push(newPath);
  };
  return {
    t: translations[locale as keyof typeof translations],
    locale,
    changeLanguage
  };
}
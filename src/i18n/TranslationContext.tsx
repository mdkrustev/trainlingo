'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface NestedTranslations {
  [key: string]: NestedTranslations[keyof NestedTranslations] extends never
    ? never
    : NestedTranslations[keyof NestedTranslations] extends string
    ? string
    : NestedTranslations;
}
type Translations = NestedTranslations;

interface TranslationContextType {
  t: (key: string) => string
  locale: string
  switchLanguage: (newLocale: string) => void
  localizePath: (path: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const locale = pathname.split('/')[1] || 'en'
  const [dict, setDict] = useState<Translations | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const module = await import(`@/i18n/locales/${locale}.json`)
        setDict(module.default)
      } catch (e) {
        console.error(`Missing translation for ${locale}`, e)
        setDict({})
      }
    }
    load()
  }, [locale])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = dict

    for (const k of keys) {
      if (!value || !value[k]) return key
      value = value[k]
    }

    return value as string
  }

  const switchLanguage = (newLocale: string) => {
    if (!pathname.startsWith(`/${locale}`)) return
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  const localizePath = (path: string) => {
    return `/${locale}${path}`
  }

  if (!dict) {
    return null
  }

  return (
    <TranslationContext.Provider value={{ t, locale, switchLanguage, localizePath }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslationContext() {
  const context = useContext(TranslationContext)
  if (!context) throw new Error('useTranslationContext must be used inside TranslationProvider')
  return context
}
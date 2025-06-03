'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'

// Тип за вложени преводи (обекти в обекти)
interface NestedTranslations {
  [key: string]: string | NestedTranslations
}

type Translations = NestedTranslations

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
        const translationModule = await import(`@/i18n/locales/${locale}.json`)
        setDict(translationModule.default)
        
        setDict({
          welcome: {
            title: 'Welcome',
            message: 'Hello, world!',
          },
          not_found: 'Not Found',
        })
      } catch (e) {
        console.error(`Missing translation for ${locale}`, e)
        setDict({})
      }
    }

    load()
  }, [locale])

  const t = (key: string): string => {
    if (!dict) return key

    const keys = key.split('.')
    let value: NestedTranslations | string | undefined = dict

    for (const k of keys) {
      if (!value || typeof value !== 'object' || !Object.hasOwn(value, k)) {
        console.warn(`Translation missing for key: "${key}"`)
        return key
      }
      value = value[k]
    }

    if (typeof value === 'string') {
      return value
    }

    console.warn(`Translation is not a string for key: "${key}"`)
    return key
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
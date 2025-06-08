// ProtectedRoute.tsx
'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useTranslations } from '@/hooks/useTranslations'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const {t} = useTranslations();

  const segments = pathname.split('/')
  const locale = segments[1] || 'en'

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/${locale}`)
    }
  }, [status, router, locale])

  if (status === 'loading') {
    return <div>{t.loading}...</div>
  }

  if (!session) {
    return null // или лоадър, но НЕ правим redirect директно в рендера
  }

  return <>{children}</>
}
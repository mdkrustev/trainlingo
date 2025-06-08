'use client'

import '../style/page.scss'
import { useSession } from 'next-auth/react'
import Home from './home/page'
import PublicHome from './public'
import { Suspense } from 'react'
import { useTranslations } from '@/hooks/useTranslations'

export default function Page() {
  const { data: session, status } = useSession()
  const {t} = useTranslations();
  if (status === 'loading') {
    return <div>{t.loading} ...</div>
  }
  return (
    <Suspense fallback={`${t.loading} ...`}>
      {session?.user ? <Home /> : <PublicHome />}
    </Suspense>
  )
}
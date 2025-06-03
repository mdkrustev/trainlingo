'use client'

import '../style/page.scss'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTranslationContext } from '@/i18n/TranslationContext'
import { useEffect } from 'react'
//import AddWorkType from '@/components/AddWorkType'

export default function Home() {
  const { t, locale } = useTranslationContext()
  const { data: session, status } = useSession()
  const router = useRouter()

  const loading = status === 'loading'

  useEffect(() => {
    if (session?.user) {
      //router.push(`/${locale}/start`)
    }
  }, [session?.user, router, locale])

  if (loading || session?.user) {
    return null
  }

  return (
    <div className="content">
   
    </div>
  )
}
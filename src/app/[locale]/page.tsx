'use client'

import '../style/page.scss'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
//import AddWorkType from '@/components/AddWorkType'

export default function Page() {
  
  const { data: session, status } = useSession()
  const router = useRouter()

  const loading = status === 'loading'

  useEffect(() => {
    if (session?.user) {
      //router.push(`/${locale}/start`)
    }
  }, [session?.user, router])

  if (loading || session?.user) {
    return null
  }
  
  
  return (
    <div className="content">
      <h1>Test</h1>
            <h1>Test</h1>      <h1>Test</h1>      <h1>Test</h1>      <h1>Test</h1>      <h1>Test</h1>      <h1>Test</h1>      <h1>Test</h1>
    </div>
  )
}
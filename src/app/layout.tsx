import type { Metadata } from 'next'
import './style/globals.css'
import Providers from '@/contexts/Providers'
import HeaderBar from '@/components/common/HeaderBar'
import { appName } from '@/utils/config'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Trainlingo',
  description:
    'Learn German and English vocabulary naturally through context and interactive quizzes. Improve your language skills by understanding words in real-life situations, not just memorizing lists. Spaced repetition helps you retain what matters most. Start learning smarter today!',
  keywords: ['learn German', 'learn English', 'vocabulary', 'context', 'interactive quizzes', 'spaced repetition'],
  icons: {
    icon: '/img/favicon.ico',
  },
  openGraph: {
    title: appName,
    description: 'Agentra is a smart CRM platform for real estate agencies...',
    url: 'https://trainlingo.vercel.app',
    siteName: appName,
    images: [
      {
        url: 'https://trainlingo.vercel.app/img/logo.png',
        width: 512,
        height: 512,
        alt: appName,
      },
    ],
    type: 'website',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Четем кукито NEXT_LOCALE

  const localeCookie = (await cookies()).get('NEXT_LOCALE');
  const locale = localeCookie?.value || 'en'; // по подразбиране 'en'

  return (
    <Providers>
      <html lang={locale}>
        <body>
          <HeaderBar />
          <div className="pt-[70px]">
            <div className='p-3'>{children}</div>
          </div>
        </body>
      </html>
    </Providers>
  )
}
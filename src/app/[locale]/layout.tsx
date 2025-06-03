// app/[locale]/layout.tsx

import type { Metadata } from "next";
import "../style/globals.css";
import Providers from "@/components/Providers";
import HeaderBar from "@/components/HeaderBar";
import { dir } from 'i18next';

export const metadata: Metadata = {
  title: "Trainlingo",
  description: "Learn German and English vocabulary naturally through context and interactive quizzes. Improve your language skills by understanding words in real-life situations, not just memorizing lists. Spaced repetition helps you retain what matters most. Start learning smarter today!",
  keywords: ["learn German" , "learn English" , "vocabulary" , "context" , "interactive quizzes" , "spaced repetition"],
  icons: {
    icon: "/img/favicon.ico",
  },
  openGraph: {
    title: "Trainlingo",
    description: "Agentra is a smart CRM platform for real estate agencies...",
    url: "https://trainlingo.vercel.app",
    siteName: "Trainlingo",
    images: [
      {
        url: "https://trainlingo.vercel.app/img/logo.png",
        width: 512,
        height: 512,
        alt: "Trainlingo",
      },
    ],
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string }
}) {

  const resolvedParams = await params;
  const { locale } = resolvedParams;

  return (
    <html lang={locale} dir={dir(locale)} >
      <body>
        <Providers>
          <div className="w-full">
            <HeaderBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

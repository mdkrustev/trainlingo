// components/HowItWorksSection.tsx

'use client'

import { useTranslationContext } from "@/i18n/TranslationContext"

export default function HowItWorksSection() {
    const {t} = useTranslationContext()
    return (
    <section className="py-16 bg-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">{t('how_it_works.title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('how_it_works.step_1.title')}</h3>
            <p className="text-gray-600">{t('how_it_works.step_1.description')}</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('how_it_works.step_2.title')}</h3>
            <p className="text-gray-600">{t('how_it_works.step_2.description')}</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('how_it_works.step_3.title')}</h3>
            <p className="text-gray-600">{t('how_it_works.step_3.description')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
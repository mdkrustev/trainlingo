// components/FAQSection.tsx

'use client'

import { useTranslationContext } from "@/i18n/TranslationContext"


export default function FAQSection() {
    const { t } = useTranslationContext()
    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t('faq.title')}</h2>

                <div className="space-y-8">
                    {/* Въпрос 1 */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('faq.q1.question')}</h3>
                        <p className="text-gray-600">{t('faq.q1.answer')}</p>
                    </div>

                    {/* Въпрос 2 */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('faq.q2.question')}</h3>
                        <p className="text-gray-600">{t('faq.q2.answer')}</p>
                    </div>

                    {/* Въпрос 3 */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('faq.q3.question')}</h3>
                        <p className="text-gray-600">{t('faq.q3.answer')}</p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="/contact"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition"
                    >
                        {t('faq.cta_button')}
                    </a>
                </div>
            </div>
        </section>
    )
}
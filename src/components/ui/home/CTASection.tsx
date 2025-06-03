// components/CTASection.tsx

'use client'

import { useDynamicValue } from "@/contexts/DynamicValueContext"
import { useTranslationContext } from "@/i18n/TranslationContext"

export default function CTASection() {
    const { t } = useTranslationContext()
    const {setValue} = useDynamicValue();

    return (
        <section className="py-16 bg-green-600 text-white text-center" id="sign-up">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cta.title')}</h2>
                <p className="text-lg md:text-xl mb-8">{t('cta.subtitle')}</p>
                <div
                    onClick={() => {setValue('openLoginForm', true)}}
                    className="inline-block bg-white text-green-700 font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer"
                >
                    {t('cta.button')}
                </div>
            </div>
        </section>
    )
}
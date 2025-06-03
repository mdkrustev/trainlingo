// components/Footer.tsx

'use client'

import { useTranslationContext } from "@/i18n/TranslationContext"

export default function Footer() {
    const { t } = useTranslationContext()
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand Column */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Archon</h3>
                    <p className="text-gray-400">
                        {t('footer.companyDescription')}
                    </p>
                </div>

                {/* Links: Company */}
                <div>
                    <h4 className="font-semibold text-lg mb-4">{t('footer.company.title')}</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="/about" className="hover:text-green-400 transition">{t('footer.company.about')}</a></li>
                        <li><a href="/contact" className="hover:text-green-400 transition">{t('footer.company.contact')}</a></li>
                        <li><a href="/features" className="hover:text-green-400 transition">{t('footer.company.features')}</a></li>
                    </ul>
                </div>

                {/* Links: Legal */}
                <div>
                    <h4 className="font-semibold text-lg mb-4">{t('footer.legal.title')}</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="/terms" className="hover:text-green-400 transition">{t('footer.legal.terms')}</a></li>
                        <li><a href="/privacy" className="hover:text-green-400 transition">{t('footer.legal.privacy')}</a></li>
                        <li><a href="/faq" className="hover:text-green-400 transition">{t('footer.legal.faq')}</a></li>
                    </ul>
                </div>

                {/* Newsletter / CTA */}
                <div>
                    <h4 className="font-semibold text-lg mb-4">{t('footer.newsletter.title')}</h4>
                    <p className="text-gray-400 mb-4">
                        {t('footer.newsletter.description')}
                    </p>
                    <form className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            placeholder={t('footer.newsletter.placeholder')}
                            className="px-4 py-2 rounded-md text-gray-900 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                        >
                            {t('footer.newsletter.button')}
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Archon. {t('footer.copyright')}</p>
            </div>
        </footer>
    )
}
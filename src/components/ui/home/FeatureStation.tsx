// components/FeaturesSection.tsx

'use client';

import { useTranslationContext } from '@/i18n/TranslationContext';
import { scrollToSection } from '@/utilities/jsfunctions';
import { BookOpen, ClipboardList, Truck } from 'lucide-react';

export default function FeaturesSection() {

  const { t } = useTranslationContext()

  return (
    <section className="py-16 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          {t('features.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="p-6 border-l-4 border-green-600 rounded shadow-sm hover:shadow-md transition">
            <div className="text-green-600 mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t('features.template_based_tasks.title')}
            </h3>
            <p className="text-gray-600">
              {t('features.template_based_tasks.description')}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 border-l-4 border-green-600 rounded shadow-sm hover:shadow-md transition">
            <div className="text-green-600 mb-4">
              <ClipboardList className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t('features.real_time_management.title')}
            </h3>
            <p className="text-gray-600">
              {t('features.real_time_management.description')}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 border-l-4 border-green-600 rounded shadow-sm hover:shadow-md transition">
            <div className="text-green-600 mb-4">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t('features.mobile_workstations.title')}
            </h3>
            <p className="text-gray-600">
              {t('features.mobile_workstations.description')}
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <div
            onClick={() => scrollToSection('sign-up')}
            className="cursor-pointer inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition duration-300"
          >
            {t('features.cta_button')}
          </div>
        </div>
      </div>
    </section>
  );
}
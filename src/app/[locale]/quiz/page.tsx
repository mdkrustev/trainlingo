"use client"

import ProtectedRoute from "@/contexts/ProtectedRoute";
import { useTranslations } from "@/hooks/useTranslations"

export const dynamic = 'force-static';

export default function Quiz() {
    const { t } = useTranslations();
    return (
        <ProtectedRoute>
            <h1 className="">{t.navi.quiz}</h1>
        </ProtectedRoute>
    )
}
"use client"

import ProtectedRoute from "@/contexts/ProtectedRoute";
import { useTranslations } from "@/hooks/useTranslations"

export const dynamic = 'force-static';

export default function Dictionary() {
    const { t } = useTranslations();
    return (
        <ProtectedRoute>
            <h1 className="">{t.navi.dictionary}</h1>
        </ProtectedRoute>
    )
}
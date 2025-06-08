"use client"

import ProtectedRoute from "@/contexts/ProtectedRoute";
import { useTranslations } from "@/hooks/useTranslations"

export default function Videos() {
    const { t } = useTranslations();
    return (
        <ProtectedRoute>
            <h1 className="">{t.navi.videos}</h1>
        </ProtectedRoute>
    )
}
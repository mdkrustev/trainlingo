"use client"

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";


import { TranslationProvider } from '@/i18n/TranslationContext'
import { DynamicValueProvider } from "@/contexts/DynamicValueContext";

interface Props {
    children: ReactNode;
}

export default function Providers(props: Props) {
    return <SessionProvider>
        <TranslationProvider>
            <DynamicValueProvider>
                {props.children}
            </DynamicValueProvider>
        </TranslationProvider>
    </SessionProvider>
}
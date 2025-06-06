"use client"

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";


import { DynamicValueProvider } from "@/contexts/DynamicValueContext";

interface Props {
    children: ReactNode;
}

export default function Providers(props: Props) {
    return <SessionProvider>
        <DynamicValueProvider>
            {props.children}
        </DynamicValueProvider>
    </SessionProvider>
}
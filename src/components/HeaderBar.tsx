"use client"

import Link from "next/link";
import HeaderAuth from "./HeaderAuth";
import HeaderLanguages from "./HeaderLanguages";
import { useTranslationContext } from '@/i18n/TranslationContext'

export default function HeaderBar() {

    const { t, locale, localizePath } = useTranslationContext();

    return (
        <header className="bg-white h-[60px] fixed z-10 w-full shadow-2xs p-[15px]">
            <nav aria-label="Global" className="flex w-full justify-between">
                <div className="flex">
                    <Link href={localizePath('/')} className="cursor-pointer block h-7">
                        <img alt="" src="/img/trainlingo-logo.svg" className="h-full w-auto" />
                    </Link>
                </div>
                <div className="flex flex-grow">
                    <div className="flex flex-grow"></div>
                    <div className="flex">
                        <HeaderLanguages />
                        <HeaderAuth />
                    </div>
                </div>
            </nav>
        </header>
    )
}
"use client"

import Link from "next/link";
import HeaderAuth from "./HeaderAuth";
import HeaderLanguages from "./HeaderLanguages";
import { useTranslationContext } from '@/i18n/TranslationContext'
import TrainLingoLogo from "@/assets/logo";

export default function HeaderBar() {

    const { localizePath } = useTranslationContext();

    return (
        <header className="bg-white h-[60px] fixed z-10 w-full shadow-2xs p-[15px]">
            <nav aria-label="Global" className="flex w-full justify-between">
                <div className="flex">
                    <Link href={localizePath('/')} className="cursor-pointer block h-7">
                        <TrainLingoLogo/>
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
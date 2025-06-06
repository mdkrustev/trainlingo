"use client"

import Link from "next/link";
import HeaderAuth from "./HeaderAuth";
import HeaderLanguages from "./HeaderLanguages";
import TrainLingoLogo from "@/assets/logo";
import { useTranslations } from "@/hooks/useTranslations";

export default function HeaderBar() {

    const {t} = useTranslations();

    return (
        <header className="bg-white h-[60px] fixed z-10 w-full shadow-2xs p-[15px]">
            <nav aria-label="Global" className="flex w-full justify-between">
                <div className="flex">
                    <Link href={'/'} className="cursor-pointer block h-7">
                        <TrainLingoLogo/>
                    </Link>
                </div>
                <div className="flex flex-grow">
                    <div className="flex flex-grow justify-center gap-5">
                        <Link href={'/'}>{t.home}</Link>
                    </div>
                    <div className="flex">
                        <HeaderLanguages />
                        <HeaderAuth />
                    </div>
                </div>
            </nav>
        </header>
    )
}
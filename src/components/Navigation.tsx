import { useTranslations } from "@/hooks/useTranslations";
import Link from "next/link";

export default function Navigation() {
    const { t } = useTranslations();
    return (
        <>
            {(Object.keys(t.navi) as Array<keyof typeof t.navi>).map((key) => (
                <Link key={key} href={`/${key}`}>
                    {t.navi[key]}
                </Link>
            ))}
        </>
    )
}
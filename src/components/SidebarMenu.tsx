// components/SideBarMenu.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslationContext } from '@/i18n/TranslationContext';
import { MenuItem } from '@/utilities/navigation';
import { useSession } from 'next-auth/react';
import { useDynamicValue } from '@/contexts/DynamicValueContext';


const LucideIcon = ({ name }: { name?: string, size?: number }) => {
    if (!name) return null;
    const LucideIcons = require('lucide-react');
    const IconComponent = LucideIcons[name as keyof typeof LucideIcons];
    if (!IconComponent) return null;
    return <IconComponent className="w-5 h-5 mr-3" />;
};

export default function SidebarMenu() {
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const { data: session, status } = useSession();
    const { values, setValue } = useDynamicValue();

    const { localizePath, t } = useTranslationContext()

    useEffect(() => {
        fetch('/api/menu')
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                } else {
                    return []
                }
            })
            .then(data => {
                setMenu(data)
            });
    }, []);

    const renderMenu = (items: MenuItem[]) => {
        if (items && items.length > 0) {
            return items.map((item, index) => (
                <li key={index}>
                    {item.href &&
                        <Link
                            href={localizePath(item.href)}
                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition duration-150 ease-in-out"
                        >
                            {item.icon && <LucideIcon name={item.icon} />}
                            <span className="text-[16px]">{t(item.label)}</span>
                        </Link>}

                    {item.func &&
                        (<div
                            onClick={() => item.func && setValue(item.func, true)}
                            className="cursor-pointer flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition duration-150 ease-in-out"
                        >
                            {item.icon && <LucideIcon name={item.icon} />}
                            <span className="text-[16px]">{t(item.label)}</span>
                        </div>)
                    }

                    {item.children && item.children.length > 0 && (
                        <ul className="mt-1 ml-4 space-y-1">
                            {renderMenu(item.children)}
                        </ul>
                    )}
                </li>
            ));
        } else return '';
    };

    return (
        <>
            {session?.user && <aside className="bg-white w-[300px] h-screen fixed left-0 top-0 border-r border-gray-200 background overflow-y-auto">
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <nav className='mt-15'>
                        <ul>{menu.length > 0 ? renderMenu(menu) : <li className="ml-5">{t('loading')}...</li>}</ul>
                    </nav>
                </div>
            </aside>}
        </>
    );
}
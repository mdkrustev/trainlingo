// components/Breadcrumb.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, ChevronRightIcon, SlashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CustomButton from './CustomButton';

type BreadcrumbLinkItem = [string, string] | [string, string, React.ReactNode];
export type BreadcrumbItem = BreadcrumbLinkItem | string;

type Alignment = 'left' | 'center' | 'right';
type BreadcrumbType = 'link' | 'button';
type SeparatorType = 'slash' | 'arrow' | 'chevron';

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    alignment?: Alignment;
    type?: BreadcrumbType;
    separator?: SeparatorType;
    size?: number;
}




export const Breadcrumb: React.FC<BreadcrumbProps> = ({
    items,
    alignment = 'left',
    type = 'button',
    separator = 'chevron',
    size = 14,
}) => {
    // Функция за избор на разделител
    const getSeparator = () => {
        switch (separator) {
            case 'slash':
                return <SlashIcon size={size} />;
            case 'arrow':
                return <ArrowRightIcon size={size} />;
            case 'chevron':
            default:
                return <ChevronRightIcon size={size} />;
        }
    };

    // Подравняване
    const getAlignmentClass = () => {
        switch (alignment) {
            case 'center':
                return 'justify-center';
            case 'right':
                return 'justify-end';
            case 'left':
            default:
                return 'justify-start';
        }
    };

    const separatorSymbol = getSeparator();


    const router = useRouter();

    const linkTo = (link: string) => {

        router.push(link)
    }

    return (
        <nav aria-label="Breadcrumb">
            <ol className={`flex items-center ${getAlignmentClass()} space-x-2 text-sm text-gray-500`}>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    if (Array.isArray(item)) {
                        const [href, label, icon] = item;

                        const element =
                            type === 'link' ? (
                                <Link href={href} className="flex items-center hover:underline">
                                    {icon && <span style={{ width: size, height: size }} className="mr-1">{icon}</span>}
                                    <span style={{ fontSize: size }}>{label}</span>
                                </Link>
                            ) : (
                                <CustomButton
                                    onClick={() => linkTo(href)}
                                    icon={icon}
                                    size={size}
                                >
                                    {label}
                                </CustomButton>
                            );

                        return (
                            <li key={index} className="flex items-center">
                                <span style={{ fontSize: size }}>{element}</span>
                                {!isLast && <span className="mx-2">{separatorSymbol}</span>}
                            </li>
                        );
                    }

                    return (
                        <li key={index} className="font-medium text-gray-900">
                            <span style={{ fontSize: size }}>{item}</span>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
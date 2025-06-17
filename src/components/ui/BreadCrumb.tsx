// components/Breadcrumb.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, ChevronRightIcon, SlashIcon } from 'lucide-react';
import CustomButton from './CustomButton';
import { useRouter } from 'next/navigation';

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
  maxChars?: number; // Нов props за ограничаване на символите
}

// Функция за обрязване на текста
const truncateText = (text: string, maxChars: number = 20) => {
  return text.length > maxChars ? text.slice(0, maxChars) + '...' : text;
};

const getSeparator = (separator: SeparatorType, size: number) => {
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

const getAlignmentClass = (alignment: Alignment): string => {
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

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  alignment = 'left',
  type = 'button',
  separator = 'chevron',
  size = 14,
  maxChars = 20, // по подразбиране 20 символа
}) => {
  const router = useRouter();

  const linkTo = (link: string) => {
    router.push(link);
  };

  const separatorSymbol = getSeparator(separator, size);
  const alignmentClass = getAlignmentClass(alignment);

  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex items-center ${alignmentClass} space-x-2 text-sm text-gray-500`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (Array.isArray(item)) {
            const [href, label, icon] = item;

            const truncatedLabel = truncateText(label, maxChars);

            const element =
              type === 'link' ? (
                <Link href={href} className="flex items-center hover:underline group">
                  {icon && <span style={{ width: size, height: size }} className="mr-1">{icon}</span>}
                  <span style={{ fontSize: size }} title={label} className="whitespace-nowrap overflow-hidden max-w-[150px] text-ellipsis">
                    {truncatedLabel}
                  </span>
                </Link>
              ) : (
                <CustomButton
                  onClick={() => linkTo(href)}
                  icon={icon}
                  size={size}
                >
                  <span style={{ fontSize: size }} className="whitespace-nowrap overflow-hidden max-w-[150px] text-ellipsis">
                    {truncatedLabel}
                  </span>
                </CustomButton>
              );

            return (
              <li key={index} className="flex items-center">
                <span style={{ fontSize: size }}>{element}</span>
                {!isLast && <span className="mx-2">{separatorSymbol}</span>}
              </li>
            );
          }

          const truncatedItem = truncateText(item, maxChars);

          return (
            <li key={index} className="font-medium text-gray-900 whitespace-nowrap overflow-hidden max-w-[150px] text-ellipsis" title={item}>
              <span style={{ fontSize: size }} title={item}>
                {truncatedItem}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
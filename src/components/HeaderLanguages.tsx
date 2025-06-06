// app/components/HeaderLanguages.tsx
'use client';

import EnFlag from '@/components/ui/flags/EnFlag';
import DeFlag from '@/components/ui/flags/DeFlag';
import BgFlag from '@/components/ui/flags/BgFlag';
import { Button, Dropdown, MenuProps } from 'antd';

import { useTranslations } from '@/hooks/useTranslations';

export default function HeaderLanguages() {

  const {locale, changeLanguage} = useTranslations()

  // Промяна на езика – редиректира към същата страница с новия locale
  

  const items: MenuProps['items'] = [
    {
      key: 'en',
      label: (
        <Button type="link" onClick={() => changeLanguage('en')} className="flex items-center">
          <EnFlag />
          <span className="text-black">EN</span>
        </Button>
      ),
    },
    {
      key: 'de',
      label: (
        <Button type="link" onClick={() => changeLanguage('de')} className="flex items-center">
          <DeFlag />
          <span className="text-black">DE</span>
        </Button>
      ),
    },
    {
      key: 'bg',
      label: (
        <Button type="link" onClick={() => changeLanguage('bg')} className="flex items-center">
          <BgFlag />
          <span className="text-black">BG</span>
        </Button>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" arrow={{ pointAtCenter: true }}>
      <div className="mr-[20px] flex items-center cursor-pointer">
        {locale === 'en' && <EnFlag />}
        {locale === 'de' && <DeFlag />}
        {locale === 'bg' && <BgFlag />}
      </div>
    </Dropdown>
  );
}
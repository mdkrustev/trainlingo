
import EnFlag from './ui/flags/EnFlag'
import DeFlag from './ui/flags/DeFlag'
import BgFlag from './ui/flags/BgFlag'
import { useTranslationContext } from '@/i18n/TranslationContext'
import { Button, Dropdown, MenuProps } from 'antd'


export default function HeaderLanguages() {

    const { switchLanguage, locale } = useTranslationContext()

    const items: MenuProps['items'] = [
        { label: (<Button type="link" onClick={() => switchLanguage('en')}><EnFlag /><span className="text-black">EN</span></Button>), key: '0' },
        { label: (<Button type="link" onClick={() => switchLanguage('de')}><DeFlag /><span className="text-black">DE</span></Button>), key: '1' },
        { label: (<Button type="link" onClick={() => switchLanguage('bg')}><BgFlag /><span className="text-black">BG</span></Button>), key: '2' },
    ]
    return (
        <Dropdown menu={{ items }} trigger={['click']} placement="bottom" arrow={{ pointAtCenter: true }}>
            <div className="mr-[20px] flex items-center cursor-pointer">
                {locale == 'en' && <EnFlag />}
                {locale == 'de' && <DeFlag />}
                {locale == 'bg' && <BgFlag />}
            </div>
        </Dropdown>
    )
}

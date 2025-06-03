'use client'

import { LogOutIcon, UserIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Space } from 'antd';

import { useRouter } from 'next/navigation'
import { useTranslationContext } from "@/i18n/TranslationContext"
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'

export default function HeaderProfile() {
  const router = useRouter()
  const { t, locale } = useTranslationContext()
  const { data: session } = useSession()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)

  const getInitials = (name?: string | null) => {
    return name
      ?.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase() || '?'
  }

  useEffect(() => {
    if (isSigningOut && !session?.user) {
      alert('test')
      router.push(`/${locale}`)
    }
  }, [session?.user, isSigningOut, locale, router])

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut({ redirect: true })
  }

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div className="cursor-pointer" onClick={handleSignOut}>
          {t('logOut')}
        </div>
      ),
    }
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" arrow={{ pointAtCenter: true }}>
      {session?.user?.image ? (<Avatar src={session.user.image} size={35} />) : (<UserIcon />)}
    </Dropdown>

  )
}
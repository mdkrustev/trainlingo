'use client'

import { LogOutIcon, UserIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import type { MenuProps } from 'antd';
import { Avatar, Dropdown } from 'antd';

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'

export default function HeaderProfile() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isSigningOut, setIsSigningOut] = useState(false)


  useEffect(() => {
    if (isSigningOut && !session?.user) {
      alert('test')
      router.push('')
    }
  }, [session?.user, isSigningOut, router])

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut({ redirect: true })
  }

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div className="cursor-pointer flex" onClick={handleSignOut}>
          <LogOutIcon size={16} className="mt-[3px] mr-[5px]" /> {'logOut'}
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
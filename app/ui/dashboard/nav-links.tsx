'use client'
// next는 기본적으로 서버 사이드 렌더링을 한다.
// 리액트 훅을 내부적으로 사용하게 되는 경우에는, 클라이언트 사이드 렌더링 필요하므로 반드시 use client를 최상단에 붙여줘야 함.
// 붙이지 않으면 오류 발생한다.

import { UserGroupIcon, HomeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
]

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              { 'bg-sky-100 text-blue-600': pathname === link.href },
            )}
          >
            {/* a 태그 사용 시 navigating 에서 전체 페이지 재렌더링. Link 태그 사용 시 부분 재렌더링 */}
            {/* 또한, 뷰포트에 Link가 들어오는 경우 방문 가능성이 높으므로 auto code-splitting과 prefetching을 하게 된다. */}
            {/* 사용자가 링크 클릭 시 빠른 렌더링 */}
            <LinkIcon className='w-6' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}

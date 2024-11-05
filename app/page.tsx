import AcmeLogo from '@/app/ui/acme-logo'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import styles from '@/app/ui/home.module.css'
import { lusitana } from '@/app/ui/fonts'
import Image from 'next/image'

export default function Page() {
  return (
    <main className='flex min-h-screen flex-col p-6'>
      <div className='flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52'>
        <AcmeLogo />
      </div>
      <div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
        <div className='flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20'>
          <div className={styles.shape} />
          <div className='relative h-0 w-0 border-b-[26px] border-l-[15px] border-r-[15px] border-b-black border-l-transparent border-r-transparent' />
          <p
            className={`text-xl text-gray-800 md:text-3xl md:leading-normal ${lusitana.className} antialiased`}
          >
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href='https://nextjs.org/learn/' className='text-blue-500'>
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href='/login'
            className='flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base'
          >
            <span>Log in</span> <ArrowRightIcon className='w-5 md:w-6' />
          </Link>
        </div>
        <div className='flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12'>
          <Image
            src='/hero-desktop.png'
            width={1000}
            height={760}
            className='hidden md:block'
            alt='Screenshots of the dashboard project showing desktop version'
          />
          {/* hidden => 모바일일 때 / block => 데스크탑일 때 (min-width: 768px) */}
          {/* 이미지 성능 최적화 : 이미지 가로, 세로 지정을 통해 layout shift 방지. 클래스를 통해서 데스크탑 / 모바일 각각 보여지는 이미지 설정 */}
          {/* Images without dimensions and web fonts are common causes of layout shift. */}

          <Image
            src='/hero-mobile.png'
            width={560}
            height={620}
            className='block sm:hidden'
            alt='Screenshots of the dashboard project showing mobile version'
          />
        </div>
      </div>
    </main>
  )
}

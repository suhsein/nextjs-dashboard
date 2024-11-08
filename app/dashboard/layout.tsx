import SideNav from '@/app/ui/dashboard/sidenav'

export const experimental_ppr = true

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        <SideNav />
      </div>
      <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>{children}</div>
    </div>
  )
}

// 레이아웃 설정의 장점 => 레이아웃은 하위 주소들에 모두 적용되기 때문에 페이지 바뀌어도 레이아웃은 리렌더링 되지 않음

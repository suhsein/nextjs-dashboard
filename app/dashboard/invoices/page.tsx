import Pagination from '@/app/ui/invoices/pagination'
import Search from '@/app/ui/search'
import Table from '@/app/ui/invoices/table'
import { CreateInvoice } from '@/app/ui/invoices/buttons'
import { lusitana } from '@/app/ui/fonts'
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'
import { Suspense } from 'react'
import { fetchInvoicesPages } from '@/app/lib/data'

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await fetchInvoicesPages(query)

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Search invoices...' />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className='mt-5 flex w-full justify-center'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}

/**
 * URL Search Param을 쓰는 이유
 *
 * 클라이언트 측에서 검색 상태를 관리할 때와 달리 다음과 같은 장점들이 존재함.
 *
 * 1. 북마크 가능하고 공유 가능한 URL
 * => 검색 쿼리와 필터를 포함한 애플리케이션의 현재 상태 공유 가능.
 * 2. 서버 사이드 렌더링과 초기 로딩
 * => URL Search Param은 초기 상태를 렌더링하기 위해서 서버 측에서 바로 사용된다.
 * 3. 분석과 트래킹
 * => 추가적인 클라이언트 측 로직 필요 없이 사용자의 행동을 분석 및 트래킹 가능.
 */

/**
 * 서치 파라미터 사용하는 방법.서버와 클라이언트가 다르다.
 *
 * 서버 사이드 => 파라미터로 받아오기
 * 클라이언트 사이드 => useSearchParams 훅 사용하기
 */

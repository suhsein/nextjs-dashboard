import { Card } from '@/app/ui/dashboard/cards'
import RevenueChart from '@/app/ui/dashboard/revenue-chart'
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import { lusitana } from '@/app/ui/fonts'
import { fetchLatestInvoices, fetchRevenue, fetchCardData } from '@/app/lib/data'

export default async function Page() {
  const revenue = await fetchRevenue()
  const latestInvoices = await fetchLatestInvoices()
  const { numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices } =
    await fetchCardData()

  /**
   * 정적 렌더링
   * 장점 1. 빠른 웹사이트. prerendered 페이지는 캐싱되고 전 세계로 분산됨.
   * 장점 2. 서버 부하를 줄임. 서버가 매 요청마다 컨텐츠를 동적으로 생성할 필요가 없음.
   * 장점 3. SEO. prerendered 페이지는 검색 엔진 크롤러가 인덱싱하기 좋음. 페이지 로드 시점에 컨텐츠가 준비됨. 개선된 서치엔진 랭킹을 보여줌.
   *
   *
   * 단점 1. waterfall(순차적 페칭)로 비의도적 성능 악화.
   *  * 만약 페칭 순서가 중요하지 않다면(조건이 필요없다면) parallel하게 데이터 페칭하는 것을 고려하자.
   *  * await Promise.all() 혹은, Promise.allSettled() 사용
   *  * 장점 : 성능 개선. 그러나 자바스크립트 패턴에만 의존하기 때문에, 묶여진 데이터 중 하나가 나머지보다 느리게 페칭될 가능성?
   * 단점 2. static => 데이터가 업데이트 되더라도 바로 애플리케이션으로 반영되지 않음.
   *
   * 정적 렌더링을 쓰는 게 좋은 경우
   * 고로 정적 렌더링은 데이터가 없는 UI 혹은 모든 사용자에게 같은 데이터를 보여주는 UI에 대해서는 효과적이다.
   * ex) 정적 블로그 포스트 혹은 배포 페이지
   *
   * 정적 렌더링을 쓰는 게 좋지 않은 경우
   * 개인마다 다른 정보를 보여줘야 하는 경우 혹은 지속적으로 업데이트가 발생하는 경우에는 정적 렌더링을 사용하지 않는 것이 좋음
   * => 동적 렌더링을 쓰자!
   * */

  /**
   * 동적 렌더링
   * 장점 1. Real-Time Data.
   *  * real-time 데이터 혹은 자주 바뀌는 데이터를 반영해서 애플리케이션에서 보여줌.
   *  * 데이터가 자주 바뀌는 경우, 동적 렌더링을 사용하는 것이 이상적이다.
   * 장점 2. 사용자 지정 컨텐츠. 사용자 인터랙션에 기반하여 개인화된 컨텐츠 제공 가능. 대시보드, 유저 프로필 등.
   * 장점 3. 요청 시 정보. 동적 렌더링은 request time에 알 수 있는 정보에 접근할 수 있도록 한다. ex) 쿠키, url 파라미터 등.
   *
   */

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <Card title='Collected' value={totalPaidInvoices} type='collected' />
        <Card title='Pending' value={totalPendingInvoices} type='pending' />
        <Card title='Total Invoices' value={numberOfInvoices} type='invoices' />
        <Card title='Total Customers' value={numberOfCustomers} type='customers' />
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  )
}

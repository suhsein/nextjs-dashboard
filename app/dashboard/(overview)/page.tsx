import RevenueChart from '@/app/ui/dashboard/revenue-chart'
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import { Suspense } from 'react'
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons'
import { lusitana } from '@/app/ui/fonts'
import CardWrapper from '@/app/ui/dashboard/cards'
import { CardsSkeleton } from '@/app/ui/skeletons'

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
          {/* suspense를 사용하되 card들은 하나의 wrapper로 묶어서 한 번에 보여줄 수 있도록 함. */}
        </Suspense>
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  )
}

/**
 * 정적 렌더링
 * 장점 1. 빠른 웹사이트. prerendered 페이지는 캐싱되고 전 세계로 분산됨.
 * 장점 2. 서버 부하를 줄임. 서버가 매 요청마다 컨텐츠를 동적으로 생성할 필요가 없음.
 * 장점 3. SEO. prerendered 페이지는 검색 엔진 크롤러가 인덱싱하기 좋음. 페이지 로드 시점에 컨텐츠가 준비됨. 개선된 서치엔진 랭킹을 보여줌.
 *
 *
 * 단점 1. waterfall(순차적 페칭)로 비의도적 성능 악화.
 *  * => 만약 페칭 순서가 중요하지 않다면(조건이 필요없다면) 비동기를 사용해 parallel하게 데이터 페칭하는 것을 고려하자.
 *  * await Promise.all() 혹은, Promise.allSettled() 사용
 *  * parallel하게 페칭하면, 성능 개선. 그러나 자바스크립트 패턴에만 의존하기 때문에, 묶여진 데이터 중 하나가 나머지보다 느리게 페칭될 가능성?
 *  * 가장 느리게 페칭되는 데이터의 시간만큼 모든 페이지를 볼 수 없음.
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
 * 한계 : waterfall를 막기 위해 Promise.all()를 사용하여 parallel 하게 데이터 페칭을 하더라도, 가장 느리게 페칭되는 데이터의 페칭 시간에 맞춰서
 * 모든 페이지를 볼 수 없게 됨. => 렌더링 시간이 가장 느리게 페칭되는 데이터의 페칭 시간과 같게 된다.
 * => 이를 극복하기 위해서 streaming을 사용하자!
 */

/**
 * Streaming
 *
 * route들을 작은 chunk들로 쪼갠다. 그리고 chunk들을 병렬적, 점진적으로 렌더링. => streaming
 * 스트리밍을 통해서 slow data request들로 인해 사용자가 하나의 페이지 전체로부터 blocking 되는 것을 방지한다.
 * 즉, 사용자는 UI 내에서 사용되는 모든 데이터들이 페칭될 때까지 기다릴 필요없이 페이지의 일부분을 보거나 상호작용할 수 있다.
 * => UX 높이기 가능.
 *
 *
 * 구현 방법
 * 1. 페이지 레벨일 경우, loading.tsx 파일 사용
 * 2. 특정 컴포넌트에 대해서라면, <Suspense/> 사용.
 *   => 특정 컴포넌트에 특정 조건이 만족할 때까지 렌더링 defer(연기) 가능.
 *   * <Suspense />의 props로 fallback을 넘겨야 함.
 *
 * suspense = fallback UI = 대체 컴포넌트 = 스켈레톤 UI. 실제 컴포넌트가 만들어지기 전에 대신 보여줄 수 있음.
 *
 *
 * Suspense boundary 정하는 방법
 * => 정답은 없으나 다음과 같은 것들에 의존됨
 *
 * 1. stream 동안에 사용자가 페이지를 먼저 접근할 수 있도록 하기
 * 2. 사용자에게 먼저 보여주고픈 컨텐츠
 * 3. 데이터 페칭에 의존하는 컨텐츠
 *
 * loading.tsx 파일로 한 페이지 전체를 하든,
 * Suspense 사용해 각각을 하든(그러나 UI popping 일으킬 수 있음),
 * wrapper로 Suspense 묶어서 page section마다 하든 상관 없음. 개발자 마음
 *
 * 하지만 유의해야 할 것은, 어떤 컴포넌트 내에서 필요로 하는 데이터는 밖에서 페칭하여 props로 전달하기보다는,
 * 해당 데이터를 사용하는 컴포넌트 내에서 비동기로 페칭하는 것이 일반적으로 좋은 관례이다.
 */

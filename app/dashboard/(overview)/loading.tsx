import DashboardSkeleton from '@/app/ui/skeletons'

export default function Loading() {
  return <DashboardSkeleton />
}

/**
 * 예시
 *    1. 전체 페이지가 로드되기 전에, 아직 데이터가 페칭되지 않은 컴포넌트들에 대해서 fallback 컴포넌트(대체 컴포넌트)를 보여준다.
 *    2. 사용자는 모든 페이지가 로딩되기 전에 SideNav와 같은 요소와 인터랙션 할 수 있다.
 *    3. 사용자가 nav의 링크를 클릭해서 다른 페이지로 navigating 할 때 현재 페이지가 완전히 로딩이 끝나길 기다리지 않아도 된다.
 *      => 이를 interruptable navigation 이라고 부른다.
 *
 *    * loading.tsx 파일 내부에 있는 UI는 정적 파일에 내장되어 먼저 보내진다. (suspense UI들). 이것이 실제 페이지 대신 보여짐.
 *    * 이후에 동적 컨텐츠로 구성된 실제 페이지는 서버에서 클라이언트로 stream 된다.
 *
 * 트러블슈팅
 *  * dashboard 하위에 loading.tsx, page.tsx를 두는 경우, dashboard 하위 라우트들(customers, invoices)에 대해서도 모두 스켈레톤 적용되는 오류 발생
 *  * Route Groups 생성하여, 해당 route group 하위로 loading.tsx, page.tsx 이동. => dashboard overview 페이지에만 적용됨.
 *
 * Route Groups
 *  * 소괄호로 묶인 이름을 가진 폴더
 *  * 파일을 논리적 그룹으로 정리할 수 있게 해준다. 이는 URL path 구조에는 아무런 영향을 미치지 않는다.
 *  * 현재는 특정 url에 대해서만 스켈레톤 적용을 위해 사용했으나, 여러 라우트들을 논리적으로 묶기 위해서 사용하기도 함.
 */

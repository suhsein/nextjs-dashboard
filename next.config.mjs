/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
}

export default nextConfig

// PPR 사용을 위한 설정.
// 개발 환경에서는 차이 없으나, 배포 시 UX 큰 차이를 보임
// 코드 수정할 필요없음. Next.js가 Suspense로 감싸진 dynamic parts들을 확인하여 정적 요소와 동적 요소 구분하여 PPR

import { Inter } from 'next/font/google'
import { Lusitana } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })
export const lusitana = Lusitana({ subsets: ['latin'], weight: '400' })

// 폰트 최적화. static하게 미리 받아놓고, 사용자 요청 시 새로운 네트워크 요청 하지 않음
// 효과 : 성능 높이고, layout shift 발생하지 않음. => 웹페이지 점수 올라감

'use client'
// onChange 이벤트 리스너 달려면, 클라이언트에서 렌더링 되어야 함. 또한 hook 사용하려고 해도 클라이언트 컴포넌트여야 함.

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`)
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className='relative flex flex-1 flex-shrink-0'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <input
        className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()} // defaultValue는 state를 사용하는 대신, 자체 상태 관리.
      />
      <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
    </div>
  )
}

/**
 * Debouncing
 *
 * 함수 호출이 계속해서 수행되는 경우, 마지막 호출만 실행할 수 있도록 함.
 * handleSearch가 키를 누를 때마다 호출되기 때문에 비효율적
 * => Debouncing을 하자.
 *
 * Trigger Event -> Wait -> Execution
 *
 * use-debounce 모듈을 import해서 Debouncing 가능.
 *
 * 장점 : 매 요청마다 데이터베이스에 쿼리하지 않아도 됨
 */

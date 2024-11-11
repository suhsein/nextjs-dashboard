'use client'

import { CustomerField, InvoiceForm } from '@/app/lib/definitions'
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Button } from '@/app/ui/button'
import { updateInvoice } from '@/app/lib/actions'

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm
  customers: CustomerField[]
}) {
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id)
  // 1. 넘겨줄 때는 서버 액션의 파라미터에 직접 넣어주는 대신 bind 메서드 사용해서 넘겨주고
  // 서버 액션에서 받을 때는 파라미터로 받음???
  // 2. bind 메서드의 파라미터들이 뭔지 이해가 잘 안감.

  return (
    <form action={updateInvoiceWithId}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        {/* Customer Name */}
        <div className='mb-4'>
          <label htmlFor='customer' className='mb-2 block text-sm font-medium'>
            Choose customer
          </label>
          <div className='relative'>
            <select
              id='customer'
              name='customerId'
              className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              defaultValue={invoice.customer_id}
            >
              <option value='' disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className='mb-4'>
          <label htmlFor='amount' className='mb-2 block text-sm font-medium'>
            Choose an amount
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='amount'
                name='amount'
                type='number'
                step='0.01'
                defaultValue={invoice.amount}
                placeholder='Enter USD amount'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              />
              <CurrencyDollarIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className='mb-2 block text-sm font-medium'>Set the invoice status</legend>
          <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
            <div className='flex gap-4'>
              <div className='flex items-center'>
                <input
                  id='pending'
                  name='status'
                  type='radio'
                  value='pending'
                  defaultChecked={invoice.status === 'pending'}
                  className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                />
                <label
                  htmlFor='pending'
                  className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'
                >
                  Pending <ClockIcon className='h-4 w-4' />
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id='paid'
                  name='status'
                  type='radio'
                  value='paid'
                  defaultChecked={invoice.status === 'paid'}
                  className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                />
                <label
                  htmlFor='paid'
                  className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white'
                >
                  Paid <CheckIcon className='h-4 w-4' />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className='mt-6 flex justify-end gap-4'>
        <Link
          href='/dashboard/invoices'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancel
        </Link>
        <Button type='submit'>Edit Invoice</Button>
      </div>
    </form>
  )
}

/**
 * 서버 액션 호출 시, 클라이언트에서 함수를 직접 실행하는 대신, HTTP 요청을 통해 서버로 전달되어 실행된다.
 * -> 직렬화 과정에서 문제가 발생할 수 있기 때문에, 서버 액션을 호출할 때 인자로 복잡한 값을 넘겨서는 안 된다.
 *
 * 사실 ID는 복잡한 값이 아니기 때문에 넣을 수는 있다고 하는데 어쨌든
 * => 파라미터 대신 bind 함수 사용하기.
 */

/**
 * bind 함수 대신 hidden field를 사용해 값을 넣게 되는 경우
 * -> 이 또한 동작이 가능하지만, 이러한 경우에 아이디 값이 민감한 정보일 경우에는 html 소스로 노출될 수 있기 때문에 권장하지 않는다.
 */

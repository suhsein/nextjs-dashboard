import { BanknotesIcon, ClockIcon, UserGroupIcon, InboxIcon } from '@heroicons/react/24/outline'
import { lusitana } from '@/app/ui/fonts'
import { fetchCardData } from '@/app/lib/data'

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
}

export default async function CardWrapper() {
  const { numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices } =
    await fetchCardData()

  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title='Collected' value={totalPaidInvoices} type='collected' />
      <Card title='Pending' value={totalPendingInvoices} type='pending' />
      <Card title='Total Invoices' value={numberOfInvoices} type='invoices' />
      <Card title='Total Customers' value={numberOfCustomers} type='customers' />
    </>
  )
}
/**
 * cards들과 같이 묶어서 보여주고 싶은 경우 각각이 streaming 되면 사용자가 어지럽게 느낄 수 있음 => wrapper로 묶기
 */

export function Card({
  title,
  value,
  type,
}: {
  title: string
  value: number | string
  type: 'invoices' | 'customers' | 'pending' | 'collected'
}) {
  const Icon = iconMap[type]

  return (
    <div className='rounded-xl bg-gray-50 p-2 shadow-sm'>
      <div className='flex p-4'>
        {Icon ? <Icon className='h-5 w-5 text-gray-700' /> : null}
        <h3 className='ml-2 text-sm font-medium'>{title}</h3>
      </div>
      <p
        className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  )
}

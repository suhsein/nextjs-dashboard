import Form from '@/app/ui/invoices/edit-form'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data'
import { notFound } from 'next/navigation'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()])
  if (!invoice) {
    notFound()
    // Throw 404 code
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  )
}

/**
 * id를 사용해 페이지 매핑
 * params로 아이디를 받은 후, 데이터 페칭 (Promise.all 사용하여 병렬 처리)
 *
 *
 * UUID vs. Auto-incrementing Keys
 * UUID => 길지만, ID 충돌의 위험성을 제거할 수 있다. 글로벌하게 고유하고, enumerate 공격 방지 가능. 큰 데이터베이스에 적합하다.
 * auto-incrementing keys => 깔끔한 URL을 선호한다면 자동 증가 키 사용.
 */

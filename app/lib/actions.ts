'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
})

const CreateInvoice = FormSchema.omit({ id: true, date: true })

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  const amountInCents = amount * 100
  const date = new Date().toISOString().split('T')[0]

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    }
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true })
// zod를 사용해 타입 체킹, validation => dto처럼 보면 되는지?

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  const amountInCents = amount * 100

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' }
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice')
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`
    revalidatePath('/dashboard/invoices')
    return { message: 'Deleted Invoice.' }
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' }
  }
}

/**
 * 서버 액션
 *
 * 리액트 서버 액션은 api 엔드포인트 없이 비동기 코드를 통해 바로 mutation(서버에 side-effect를 일으키도록 하는 함수)를 일으킬 수 있다.
 * 클라이언트 혹은 서버 컴포넌트 내에서 작성한 비동기 함수의 실행을 통해서 상태 변화를 일으킨다.
 *
 * 웹 애플리케이션에서 제일 중요한 것은 보안이다. 다양한 위협들에 대해서 대처할 수 있어야 한다.
 * Server Actions는 효과적인 보안 솔루션을 제공하며 다양한 종류의 공격들로부터 데이터를 보호하고, 인가된 접근을 보장할 수 있다.
 * 서버 액션은 이를 POST 요청, 암호화된 클로저들, 까다로운 input check, 에러 메세지 해싱, 호스트 제한 등을 조합하여 애플리케이션의 안전을 눈에 띄게 향상시킨다.
 *
 * 리액트에서 form 태그 내부에 action attribute를 사용해 action 정의 가능.
 * action은 자동으로 입력받은 데이터를 담은 native formData 객체를 받게 된다.
 *
 *
 * 서버 액션은 Next.js의 캐싱과도 깊이 연관되어 있다. form이 서버 액션을 통해 제출되면,
 * 서버에 mutate를 일으킬 수 있을 뿐만 아니라, revalidatePath혹은 revalidateTag와 같은 API를 통해서
 * 연관된 캐시를 재검증할 수 있다.
 *
 * 서버 액션에서 엔드포인트를 만들지 않아도 되는 이유
 * -> action에 함수를 넣어두면, 서버 액션이 내부에서 자동으로 post api 엔드포인트를 만들고 호출하기 때문에 엔드포인트를 만들어주지 않아도 된다.
 */

/**
 * actions에서 form data를 업데이트 하는 과정은 다음과 같다.
 * 1. form data input 받기
 * 2. zod 스키마를 통한 검증 및 파싱
 * 3. sql로 DB에 insert
 * 4. static page를 revalidatePath를 통해서 revalidate (캐시 삭제 후 재생성)
 * 5. 페이지 리다이렉트
 */

/**
 * zod
 *
 * 타입스크립트 우선 데이터 유효성 검사 라이브러리
 *
 * 타입스크립트는 빌드 타임 타입 체킹
 * 조드는 런타임 타입 체킹
 *
 * 스키마를 만들어 두고, 해당 스키마대로 폼 데이터를 파싱한다.
 */

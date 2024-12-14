import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import Form from '@/app/ui/invoices/edit-form'
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data'
import { notFound } from 'next/navigation'

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;
  const [ customers, invoice ] = await Promise.all([
    fetchCustomers(),
    fetchInvoiceById(id),
  ])

  if (!invoice) {
    notFound();
  }
  
  return (
    <main>
      <Breadcrumbs  breadcrumbs={[
        {
          label: 'Invoices', 
          href: '/dashboard/invoices'
        },
        {
          label: 'Edit Invoice',
          href: `/dashboard/invoices/${id}/edit`,
          active: true
        }
      ]} />
      <Form invoice={invoice} customers={customers} />
    </main>
  )
}

export default page
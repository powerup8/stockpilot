import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { updateProduct } from '@/app/actions/products'
import Link from 'next/link'
import EditForm from './edit-form'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  })

  if (!product || product.userId !== Number(session.user.id)) {
    redirect('/dashboard')
  }

  const updateProductWithId = updateProduct.bind(null, product.id)

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1E293B] rounded-xl border border-white/10 p-8">
        <Link
          href="/dashboard"
          className="text-sm text-slate-400 hover:text-[#F8FAFC] mb-4 inline-block transition-colors duration-150"
        >
          ← Back to dashboard
        </Link>
        <h1 className="text-2xl font-semibold text-[#F8FAFC] mb-1">Edit Product</h1>
        <p className="text-sm text-slate-400 mb-6">Update details for {product.name}</p>

        <EditForm action={updateProductWithId} product={product} />
      </div>
    </div>
  )
}
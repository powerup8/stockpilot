import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { updateProduct } from '@/app/actions/products'
import Link from 'next/link'

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">
          ← Back to dashboard
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Edit Product</h1>
        <p className="text-sm text-gray-500 mb-6">Update details for {product.name}</p>

        <form action={updateProductWithId} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product name</label>
            <input
              name="name"
              defaultValue={product.name}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input
              name="sku"
              defaultValue={product.sku}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              name="category"
              defaultValue={product.category}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                name="quantityOnHand"
                type="number"
                defaultValue={product.quantityOnHand}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Low stock at</label>
              <input
                name="lowStockThreshold"
                type="number"
                defaultValue={product.lowStockThreshold}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white text-sm font-medium rounded-lg py-2 hover:bg-gray-800 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
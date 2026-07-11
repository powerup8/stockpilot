import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { deleteProduct } from '@/app/actions/products'
import Link from 'next/link'
import Sidebar from '@/app/components/Sidebar'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  const { q } = await searchParams
  const query = q?.trim() || ''

  const products = await prisma.product.findMany({
    where: {
      userId: Number(session.user.id),
      ...(query && {
        OR: [
          { name: { contains: query } },
          { category: { contains: query } },
          { sku: { contains: query } },
        ],
      }),
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userEmail={session.user.email!} />

      <div className="md:pl-60">
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Your Products</h1>
              <p className="text-sm text-gray-500 mt-1">
                {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            <Link
              href="/products/new"
              className="bg-gray-900 text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-1"
            >
              + Add Product
            </Link>
          </div>

          <form className="mb-6">
            <input
              name="q"
              defaultValue={query}
              placeholder="Search by name, SKU, or category..."
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow duration-150"
            />
          </form>

          {products.length === 0 ? (
            <div className="border border-gray-200 rounded-lg p-12 text-center">
              <p className="text-gray-500 mb-4">
                {query ? `No products match "${query}".` : "You haven't added any products yet."}
              </p>
              {!query && (
                <Link
                  href="/products/new"
                  className="text-gray-900 font-medium hover:underline text-sm"
                >
                  Add your first product
                </Link>
              )}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors duration-150 ${
                    i !== products.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{p.name}</p>
                      {p.quantityOnHand < p.lowStockThreshold && (
                        <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                          Low stock
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {p.sku} · {p.category} · Qty: {p.quantityOnHand}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/products/${p.id}/edit`}
                      className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150"
                    >
                      Edit
                    </Link>
                    <form action={deleteProduct.bind(null, p.id)}>
                      <button
                        type="submit"
                        className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-150"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
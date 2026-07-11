import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { deleteProduct } from '@/app/actions/products'
import Link from 'next/link'

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
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">StockPilot</h1>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Your Products</h2>
            <p className="text-sm text-gray-500 mt-1">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          <Link
            href="/products/new"
            className="bg-gray-900 text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors"
          >
            + Add Product
          </Link>
        </div>

        <form className="mb-6">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search by name, SKU, or category..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </form>

        {products.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
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
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {products.map((p, i) => (
              <div
                key={p.id}
                className={`flex items-center justify-between px-5 py-4 ${
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
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    Edit
                  </Link>
                  <form action={deleteProduct.bind(null, p.id)}>
                    <button
                      type="submit"
                      className="text-sm font-medium text-red-600 hover:text-red-700"
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
  )
}
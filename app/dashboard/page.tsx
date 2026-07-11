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
    <div className="min-h-screen bg-[#0F172A]">
      <Sidebar userEmail={session.user.email!} />

      <div className="md:pl-60">
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-[#F8FAFC]">Your Products</h1>
              <p className="text-sm text-slate-400 mt-1">
                {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            <Link
              href="/products/new"
              className="bg-[#2563EB] text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-[#1D4ED8] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0F172A]"
            >
              + Add Product
            </Link>
          </div>

          <form className="mb-6">
            <input
              name="q"
              defaultValue={query}
              placeholder="Search by name, SKU, or category..."
              className="w-full rounded-lg border border-white/10 bg-[#1E293B] text-[#F8FAFC] px-4 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow duration-150"
            />
          </form>

          {products.length === 0 ? (
            <div className="border border-white/10 bg-[#1E293B] rounded-lg p-12 text-center">
              <p className="text-slate-400 mb-4">
                {query ? `No products match "${query}".` : "You haven't added any products yet."}
              </p>
              {!query && (
                <Link
                  href="/products/new"
                  className="text-[#60A5FA] hover:text-[#93C5FD] font-medium text-sm transition-colors duration-150"
                >
                  Add your first product
                </Link>
              )}
            </div>
          ) : (
            <div className="border border-white/10 bg-[#1E293B] rounded-lg overflow-hidden">
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors duration-150 ${
                    i !== products.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-[#F8FAFC]">{p.name}</p>
                      {p.quantityOnHand < p.lowStockThreshold && (
                        <span className="text-xs font-medium bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full">
                          Low stock
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mt-0.5">
                      {p.sku} · {p.category} · Qty: {p.quantityOnHand}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/products/${p.id}/edit`}
                      className="text-sm font-medium text-[#60A5FA] hover:text-[#93C5FD] transition-colors duration-150"
                    >
                      Edit
                    </Link>
                    <form action={deleteProduct.bind(null, p.id)}>
                      <button
                        type="submit"
                        className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors duration-150"
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
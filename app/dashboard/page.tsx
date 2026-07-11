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
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <p>Logged in as {session.user.email}</p>
      </div>

      <Link href="/products/new">+ Add Product</Link>

      <form style={{ margin: '16px 0' }}>
        <input
          name="q"
          defaultValue={query}
          placeholder="Search by name, SKU, or category..."
          style={{ width: '100%', padding: 8 }}
        />
      </form>

      <h2>Your Products</h2>
      {products.length === 0 ? (
        <p>{query ? `No products match "${query}".` : 'No products yet.'}</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.map((p) => (
            <li
              key={p.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #ddd',
                padding: '8px 0',
              }}
            >
              <span>
                {p.name} — {p.sku} — Qty: {p.quantityOnHand}
                {p.quantityOnHand < p.lowStockThreshold && (
                  <span style={{ color: 'red', marginLeft: 8 }}>⚠ Low stock</span>
                )}
              </span>
              <span>
                <Link href={`/products/${p.id}/edit`} style={{ marginRight: 12 }}>
                  Edit
                </Link>
                <form
                  action={deleteProduct.bind(null, p.id)}
                  style={{ display: 'inline' }}
                >
                  <button type="submit" style={{ color: 'red' }}>
                    Delete
                  </button>
                </form>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { updateProduct } from '@/app/actions/products'

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
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 20 }}>
      <h1>Edit Product</h1>
      <form action={updateProductWithId}>
        <div style={{ marginBottom: 12 }}>
          <input name="name" defaultValue={product.name} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input name="sku" defaultValue={product.sku} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input name="category" defaultValue={product.category} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input name="quantityOnHand" type="number" defaultValue={product.quantityOnHand} style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input name="lowStockThreshold" type="number" defaultValue={product.lowStockThreshold} style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>Save Changes</button>
      </form>
    </div>
  )
}
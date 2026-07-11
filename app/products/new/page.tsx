import { createProduct } from '@/app/actions/products'

export default function NewProductPage() {
  return (
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 20 }}>
      <h1>Add Product</h1>
      <form action={createProduct}>
        <div style={{ marginBottom: 12 }}>
          <input name="name" placeholder="Product name" required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input name="sku" placeholder="SKU" required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input name="category" placeholder="Category" required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input name="quantityOnHand" type="number" placeholder="Quantity on hand" style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input name="lowStockThreshold" type="number" placeholder="Low stock threshold" style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>Add Product</button>
      </form>
    </div>
  )
}
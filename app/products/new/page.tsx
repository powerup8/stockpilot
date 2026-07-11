import { createProduct } from '@/app/actions/products'
import Link from 'next/link'

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">
          ← Back to dashboard
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Add Product</h1>
        <p className="text-sm text-gray-500 mb-6">Add a new item to your inventory</p>

        <form action={createProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product name</label>
            <input
              name="name"
              placeholder="Wireless Mouse"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input
              name="sku"
              placeholder="WM-100"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              name="category"
              placeholder="Electronics"
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
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Low stock at</label>
              <input
                name="lowStockThreshold"
                type="number"
                placeholder="10"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white text-sm font-medium rounded-lg py-2 hover:bg-gray-800 transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}
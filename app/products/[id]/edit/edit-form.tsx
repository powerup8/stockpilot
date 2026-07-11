'use client'

import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gray-900 text-white text-sm font-medium rounded-lg py-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
    >
      {pending ? 'Saving...' : 'Save Changes'}
    </button>
  )
}

export default function EditForm({
  action,
  product,
}: {
  action: (formData: FormData) => void
  product: {
    name: string
    sku: string
    category: string
    quantityOnHand: number
    lowStockThreshold: number
  }
}) {
  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product name</label>
        <input
          name="name"
          defaultValue={product.name}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow duration-150"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
        <input
          name="sku"
          defaultValue={product.sku}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow duration-150"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <input
          name="category"
          defaultValue={product.category}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow duration-150"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input
            name="quantityOnHand"
            type="number"
            defaultValue={product.quantityOnHand}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow duration-150"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Low stock at</label>
          <input
            name="lowStockThreshold"
            type="number"
            defaultValue={product.lowStockThreshold}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow duration-150"
          />
        </div>
      </div>

      <SubmitButton />
    </form>
  )
}
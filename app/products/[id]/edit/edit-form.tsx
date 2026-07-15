'use client'

import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#2563EB] text-white text-sm font-medium rounded-lg py-2 hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
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
        <label className="block text-sm font-medium text-slate-300 mb-1">Product name</label>
        <input
          name="name"
          defaultValue={product.name}
          required
          className="w-full rounded-lg border border-white/10 bg-[#0F172A] text-[#F8FAFC] px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow duration-150"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">SKU</label>
        <input
          name="sku"
          defaultValue={product.sku}
          required
          className="w-full rounded-lg border border-white/10 bg-[#0F172A] text-[#F8FAFC] px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow duration-150"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
        <input
          name="category"
          defaultValue={product.category}
          required
          className="w-full rounded-lg border border-white/10 bg-[#0F172A] text-[#F8FAFC] px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow duration-150"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Quantity</label>
          <input
            name="quantityOnHand"
            type="number"
            defaultValue={product.quantityOnHand}
            className="w-full rounded-lg border border-white/10 bg-[#0F172A] text-[#F8FAFC] px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow duration-150"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Low stock at</label>
          <input
            name="lowStockThreshold"
            type="number"
            defaultValue={product.lowStockThreshold}
            className="w-full rounded-lg border border-white/10 bg-[#0F172A] text-[#F8FAFC] px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow duration-150"
          />
        </div>
      </div>

      <SubmitButton />
    </form>
  )
}
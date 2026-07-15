'use client'

import { useFormStatus } from 'react-dom'
import { createProduct } from '@/app/actions/products'
import Link from 'next/link'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#2563EB] text-white text-sm font-medium rounded-lg py-2 hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
    >
      {pending ? 'Adding...' : 'Add Product'}
    </button>
  )
}

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1E293B] rounded-xl border border-white/10 p-8">
        <Link
          href="/dashboard"
          className="text-sm text-slate-400 hover:text-[#F8FAFC] mb-4 inline-block transition-colors duration-150"
        >
          ← Back to dashboard
        </Link>
        <h1 className="text-2xl font-semibold text-[#F8FAFC] mb-1">Add Product</h1>
        <p className="text-sm text-slate-400 mb-6">Add a new item to your inventory</p>

        <form action={createProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Product name</label>
            <input
              name="name"
              placeholder="Wireless Mouse"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0F172A] text-[#F8FAFC] px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow duration-150"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">SKU</label>
            <input
              name="sku"
              placeholder="WM-100"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0F172A] text-[#F8FAFC] px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow duration-150"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
            <input
              name="category"
              placeholder="Electronics"
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
                placeholder="0"
                className="w-full rounded-lg border border-white/10 bg-[#0F172A] text-[#F8FAFC] px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow duration-150"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Low stock at</label>
              <input
                name="lowStockThreshold"
                type="number"
                placeholder="10"
                className="w-full rounded-lg border border-white/10 bg-[#0F172A] text-[#F8FAFC] px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow duration-150"
              />
            </div>
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  )
}
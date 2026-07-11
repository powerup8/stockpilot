import Link from 'next/link'
import { Package, Search, ShieldCheck, TrendingDown } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900">StockPilot</span>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-gray-900 text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors duration-150"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <h1 className="text-5xl font-semibold text-gray-900 tracking-tight leading-tight">
          Inventory tracking,
          <br />
          without the spreadsheet.
        </h1>
        <p className="text-lg text-gray-500 mt-6 max-w-xl mx-auto">
          Know exactly what you have, catch low stock before it's a problem, and stop
          guessing what to reorder.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href="/signup"
            className="bg-gray-900 text-white text-sm font-medium rounded-lg px-6 py-3 hover:bg-gray-800 transition-colors duration-150"
          >
            Start tracking — free
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-150"
          >
            Log in →
          </Link>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center mb-4">
              <Package size={18} className="text-white" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              One place for every product
            </h3>
            <p className="text-sm text-gray-500">
              Name, SKU, category, and quantity — organized and searchable in seconds.
            </p>
          </div>
          <div>
            <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center mb-4">
              <TrendingDown size={18} className="text-white" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Low-stock alerts, automatically
            </h3>
            <p className="text-sm text-gray-500">
              Set a threshold once. Get a clear flag the moment stock runs low.
            </p>
          </div>
          <div>
            <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center mb-4">
              <Search size={18} className="text-white" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Find anything instantly
            </h3>
            <p className="text-sm text-gray-500">
              Search by name, SKU, or category — no digging through spreadsheet tabs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Built for the Digital Heroes Full Stack Developer Trial
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck size={14} />
            Your data stays yours
          </div>
        </div>
      </footer>
    </div>
  )
}

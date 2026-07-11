import Link from 'next/link'
import { Package, Search, ShieldCheck, TrendingDown } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Nav */}
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-base font-semibold text-[#F8FAFC]">StockPilot</span>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-400 hover:text-[#F8FAFC] transition-colors duration-150"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-[#2563EB] text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-[#1D4ED8] transition-colors duration-150"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <h1 className="text-5xl font-semibold text-[#F8FAFC] tracking-tight leading-tight">
          Inventory tracking,
          <br />
          without the spreadsheet.
        </h1>
        <p className="text-lg text-slate-400 mt-6 max-w-xl mx-auto">
          Know exactly what you have, catch low stock before it&apos;s a problem, and stop
          guessing what to reorder.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href="/signup"
            className="bg-[#2563EB] text-white text-sm font-medium rounded-lg px-6 py-3 hover:bg-[#1D4ED8] transition-colors duration-150"
          >
            Start tracking — free
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-[#60A5FA] hover:text-[#93C5FD] transition-colors duration-150"
          >
            Log in →
          </Link>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center mb-4">
              <Package size={18} className="text-white" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1">
              One place for every product
            </h3>
            <p className="text-sm text-slate-400">
              Name, SKU, category, and quantity — organized and searchable in seconds.
            </p>
          </div>
          <div>
            <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center mb-4">
              <TrendingDown size={18} className="text-white" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1">
              Low-stock alerts, automatically
            </h3>
            <p className="text-sm text-slate-400">
              Set a threshold once. Get a clear flag the moment stock runs low.
            </p>
          </div>
          <div>
            <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center mb-4">
              <Search size={18} className="text-white" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1">
              Find anything instantly
            </h3>
            <p className="text-sm text-slate-400">
              Search by name, SKU, or category — no digging through spreadsheet tabs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Built for the Digital Heroes Full Stack Developer Trial
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={14} />
            Your data stays yours
          </div>
        </div>
      </footer>
    </div>
  )
}
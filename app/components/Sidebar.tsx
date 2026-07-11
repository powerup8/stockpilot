'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard } from 'lucide-react'

const navItems = [{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }]

export default function Sidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-white/10 bg-[#1E293B]">
      <div className="flex items-center h-16 px-6 border-b border-white/10">
        <span className="text-base font-semibold text-[#F8FAFC]">StockPilot</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-1 focus-visible:ring-offset-[#1E293B] ${
                isActive
                  ? 'bg-[#2563EB] text-white'
                  : 'text-slate-400 hover:bg-white/5 hover:text-[#F8FAFC]'
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-xs text-slate-500 truncate">{userEmail}</p>
      </div>
    </aside>
  )
}
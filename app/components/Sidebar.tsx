'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Settings } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Inventory', href: '/dashboard', icon: Package },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-gray-200 bg-white">
      <div className="flex items-center h-16 px-6 border-b border-gray-100">
        <span className="text-base font-semibold text-gray-900">StockPilot</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-1 ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="px-6 py-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
      </div>
    </aside>
  )
}
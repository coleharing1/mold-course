'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarItem {
  label: string
  href: string
  icon?: React.ReactNode
  badge?: string
}

interface SidebarProps {
  items: SidebarItem[]
  className?: string
}

export function Sidebar({ items, className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn("w-64 bg-white border-r border-gray-200 min-h-screen", className)}>
      <nav className="p-4 space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center">
                {item.icon && (
                  <span className="mr-3">{item.icon}</span>
                )}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
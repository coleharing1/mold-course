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
    <aside className={cn('min-h-screen w-64 border-r border-gray-200 bg-white', className)}>
      <nav className="space-y-1 p-4">
        {items.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <div className="flex items-center">
                {item.icon && <span className="mr-3">{item.icon}</span>}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
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

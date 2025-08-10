'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { MobileMenu } from './mobile-menu'
import { useSession } from '@/lib/hooks/use-session'
import { signOut } from 'next-auth/react'

interface HeaderProps {
  variant?: 'marketing' | 'app'
}

export function Header({ variant = 'marketing' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useSession()

  if (variant === 'marketing') {
    return (
      <>
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  Mold Detox Mastery
                </Link>
              </div>
              <nav className="hidden items-center space-x-8 md:flex">
                <Link
                  href="/#curriculum"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Curriculum
                </Link>
                <Link
                  href="/#tools"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Tools
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Pricing
                </Link>
                <Link
                  href="/preview"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Free Preview
                </Link>
                <Link href="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button>Get Started</Button>
                </Link>
              </nav>
              <button
                className="p-2 md:hidden"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>
        <MobileMenu
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          variant="marketing"
        />
      </>
    )
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="p-2 lg:hidden"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link href="/dashboard" className="text-xl font-bold text-gray-900">
                Mold Detox Mastery
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden text-sm text-gray-600 sm:inline">
                Welcome back{user?.name ? `, ${user.name}` : '!'}
              </span>
              <Link href="/account">
                <Button variant="ghost" size="sm">
                  Account
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: '/signin' })}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} variant="app" />
    </>
  )
}

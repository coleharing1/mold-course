/**
 * @fileoverview Design Lab Header - Navigation and theme switching controls
 * Header component with theme selector and navigation for design lab
 */

'use client'

import Link from 'next/link'
import { useDesignLab } from './design-lab-provider'
import { Button } from '@/components/ui/button'
import { Palette } from 'lucide-react'

export function DesignLabHeader() {
  const { currentTheme, setTheme, availableThemes } = useDesignLab()

  const navItems = [
    { href: '/design-lab', label: 'Overview' },
    { href: '/design-lab/ui-elements', label: 'UI Elements' },
    { href: '/design-lab/dashboard', label: 'Dashboard' },
    { href: '/design-lab/module', label: 'Module Page' }
  ]

  return (
    <header className="design-lab-header sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <Link href="/design-lab" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Design Lab</span>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">Theme:</span>
            <select
              value={currentTheme}
              onChange={(e) => setTheme(e.target.value as any)}
              className="px-3 py-1.5 text-sm border rounded-md bg-background"
            >
              {availableThemes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
            
            {/* Back to Main App */}
            <Button asChild variant="outline" size="sm">
              <Link href="/">Back to App</Link>
            </Button>
          </div>
        </div>

        {/* Current Theme Info */}
        <div className="mt-2 text-xs text-muted-foreground">
          Current: <span className="font-medium">{availableThemes.find(t => t.id === currentTheme)?.name}</span>
          {' - '}
          {availableThemes.find(t => t.id === currentTheme)?.description}
        </div>
      </div>
    </header>
  )
}

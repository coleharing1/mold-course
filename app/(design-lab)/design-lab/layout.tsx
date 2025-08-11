/**
 * @fileoverview Design Lab Layout - Isolated testing environment for UI/UX experiments
 * Provides theme switching context and isolated styling from main app
 */

import { DesignLabProvider } from '@/components/design-lab/design-lab-provider'
import { DesignLabHeader } from '@/components/design-lab/design-lab-header'
import '@/components/design-lab/design-themes.css'
import '@/components/design-lab/design-theme-health.css'
import '@/components/design-lab/design-theme-tan.css'
import '@/components/design-lab/design-theme-tan2.css'
import '@/components/design-lab/design-theme-trend2025.css'

interface DesignLabLayoutProps {
  children: React.ReactNode
}

export default function DesignLabLayout({ children }: DesignLabLayoutProps) {
  return (
    <DesignLabProvider>
      <div className="design-lab-container min-h-screen bg-background">
        {/* Design Lab Header with Theme Switcher */}
        <DesignLabHeader />
        
        {/* Main Content Area */}
        <main className="design-lab-content">
          {children}
        </main>
      </div>
    </DesignLabProvider>
  )
}

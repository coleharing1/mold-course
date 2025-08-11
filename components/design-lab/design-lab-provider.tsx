/**
 * @fileoverview Design Lab Theme Provider - Context for switching between design themes
 * Provides isolated theming system for testing different design approaches
 */

'use client'

import React, { createContext, useContext, useState } from 'react'

// Define available design themes
export const DESIGN_THEMES = {
  current: 'current',
  health: 'health',     // Full theme-rules.md implementation
  tan: 'tan',           // Tan earthy minimalist from TAN-THEME-RULES.md
  tan2: 'tan2',         // Modern health dashboard inspired
  trend2025: 'trend2025', // 2025 UI/UX trends: AI, voice, mental health focus
  emerald: 'emerald', 
  purple: 'purple',
  blue: 'blue',
  minimal: 'minimal',
  bold: 'bold'
} as const

export type DesignTheme = keyof typeof DESIGN_THEMES

interface DesignLabContextType {
  currentTheme: DesignTheme
  setTheme: (theme: DesignTheme) => void
  availableThemes: { id: DesignTheme; name: string; description: string }[]
}

const DesignLabContext = createContext<DesignLabContextType | undefined>(undefined)

export function useDesignLab() {
  const context = useContext(DesignLabContext)
  if (context === undefined) {
    throw new Error('useDesignLab must be used within a DesignLabProvider')
  }
  return context
}

const availableThemes = [
  { 
    id: 'current' as DesignTheme, 
    name: 'Current Theme', 
    description: 'Existing project styling' 
  },
  { 
    id: 'health' as DesignTheme, 
    name: 'Health-Conscious', 
    description: 'Full theme-rules.md implementation with health semantics' 
  },
  { 
    id: 'tan' as DesignTheme, 
    name: 'Tan Earthy', 
    description: 'Warm minimalist design with natural earth tones' 
  },
  { 
    id: 'tan2' as DesignTheme, 
    name: 'Tan Modern', 
    description: 'Clean health dashboard with soft beige and white cards' 
  },
  { 
    id: 'trend2025' as DesignTheme, 
    name: 'Trend 2025', 
    description: 'AI-powered, voice-ready, mental health focused design' 
  },
  { 
    id: 'emerald' as DesignTheme, 
    name: 'Emerald Health', 
    description: 'Emerald-focused with health semantics' 
  },
  { 
    id: 'purple' as DesignTheme, 
    name: 'Purple Wellness', 
    description: 'Purple gradient with wellness vibes' 
  },
  { 
    id: 'blue' as DesignTheme, 
    name: 'Medical Blue', 
    description: 'Clean medical blue aesthetic' 
  },
  { 
    id: 'minimal' as DesignTheme, 
    name: 'Minimal Clean', 
    description: 'Ultra-minimal black and white' 
  },
  { 
    id: 'bold' as DesignTheme, 
    name: 'Bold Gradients', 
    description: 'Vibrant gradients and animations' 
  }
]

interface DesignLabProviderProps {
  children: React.ReactNode
}

export function DesignLabProvider({ children }: DesignLabProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<DesignTheme>('current')

  const setTheme = (theme: DesignTheme) => {
    setCurrentTheme(theme)
    
    // Apply theme class to body for CSS targeting
    document.body.className = document.body.className
      .replace(/design-theme-\w+/g, '')
      .concat(` design-theme-${theme}`)
  }

  return (
    <DesignLabContext.Provider 
      value={{ 
        currentTheme, 
        setTheme, 
        availableThemes 
      }}
    >
      <div className={`design-theme-${currentTheme}`}>
        {children}
      </div>
    </DesignLabContext.Provider>
  )
}

/**
 * @fileoverview Design Lab Overview Page - Central hub for testing different UI designs
 * Provides overview and quick access to all design testing areas
 */

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Palette, 
  AlertTriangle, 
  Component, 
  LayoutDashboard, 
  BookOpen,
  ChevronRight,
  Circle
} from 'lucide-react'

export default function DesignLabPage() {
  const testPages = [
    {
      title: 'UI Elements',
      description: 'Test buttons, inputs, cards, and other interface components',
      href: '/design-lab/ui-elements',
      icon: Component,
      features: ['Buttons & CTAs', 'Form Elements', 'Cards & Containers', 'Typography']
    },
    {
      title: 'Dashboard Example',
      description: 'Preview dashboard layouts, widgets, and user interface patterns',
      href: '/design-lab/dashboard',
      icon: LayoutDashboard,
      features: ['Progress Widgets', 'Stats Cards', 'Navigation', 'User Controls']
    },
    {
      title: 'Module Page Example',
      description: 'Test module content layout, progression, and educational interface',
      href: '/design-lab/module',
      icon: BookOpen,
      features: ['Content Layout', 'Progress Tracking', 'Gating UI', 'Interactive Elements']
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Palette className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Design Laboratory</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A testing environment for exploring different design approaches, color schemes, 
          and UI patterns without affecting the main application.
        </p>
      </div>

      {/* Warning Banner */}
      <Card className="mb-8 border-yellow-200 bg-yellow-50/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-yellow-800">
                <strong className="font-semibold">Testing Environment:</strong> This area is isolated from the main app's styling. 
                Changes here won't affect production.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {testPages.map((page) => {
          const Icon = page.icon
          return (
            <Card key={page.href} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl" />
              <CardHeader className="relative">
                <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl w-fit mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{page.title}</CardTitle>
                <CardDescription>{page.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                  {page.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Circle className="w-1.5 h-1.5 fill-primary text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full group">
                  <Link href={page.href}>
                    Test {page.title}
                    <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Theme Information */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Available Design Themes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-background rounded border">
            <strong>Current Theme:</strong> Existing project styling
          </div>
          <div className="p-3 bg-background rounded border">
            <strong>Emerald Health:</strong> Emerald-focused with health semantics
          </div>
          <div className="p-3 bg-background rounded border">
            <strong>Purple Wellness:</strong> Purple gradient with wellness vibes
          </div>
          <div className="p-3 bg-background rounded border">
            <strong>Medical Blue:</strong> Clean medical blue aesthetic
          </div>
          <div className="p-3 bg-background rounded border">
            <strong>Minimal Clean:</strong> Ultra-minimal black and white
          </div>
          <div className="p-3 bg-background rounded border">
            <strong>Bold Gradients:</strong> Vibrant gradients and animations
          </div>
        </div>
        <p className="text-muted-foreground mt-4">
          Use the theme switcher in the header to preview different design approaches across all test pages.
        </p>
      </div>
    </div>
  )
}

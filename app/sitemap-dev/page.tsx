'use client'

import Link from 'next/link'
import { 
  Home, 
  Layout, 
  BookOpen, 
  Wrench, 
  CreditCard, 
  User, 
  Settings,
  FileText,
  TestTube,
  ExternalLink,
  Lock,
  Unlock
} from 'lucide-react'

export default function SitemapDevPage() {
  const sections = [
    {
      title: '🏠 Marketing Pages',
      icon: Home,
      routes: [
        { path: '/', label: 'Landing Page (Marketing Home)', description: 'Main marketing page with hero, pricing, etc.' },
        { path: '/test', label: 'Tailwind Test Page', description: 'Test page to verify Tailwind CSS is working' },
      ]
    },
    {
      title: '🔐 Authentication Pages',
      icon: Lock,
      note: '(Currently bypassed for development)',
      routes: [
        { path: '/signin', label: 'Sign In', description: 'User login page' },
        { path: '/signup', label: 'Sign Up', description: 'New user registration' },
        { path: '/reset-password', label: 'Reset Password', description: 'Password recovery flow' },
      ]
    },
    {
      title: '📊 Dashboard & User Area',
      icon: Layout,
      routes: [
        { path: '/dashboard', label: 'Dashboard', description: 'User dashboard with progress widgets' },
        { path: '/onboarding', label: 'Onboarding Wizard', description: '5-step onboarding flow' },
      ]
    },
    {
      title: '📚 Learning Modules',
      icon: BookOpen,
      routes: [
        { path: '/modules', label: 'All Modules', description: 'Module list with filtering and search' },
        { path: '/modules/00-quick-start', label: 'Module 00: Quick Start', description: 'Quick Start Guide module' },
        { path: '/modules/01-understanding-mold', label: 'Module 01: Understanding Mold', description: 'Mold illness education' },
        { path: '/modules/02-exposure-assessment', label: 'Module 02: Exposure Assessment', description: 'Remediation guide' },
        { path: '/modules/00-quick-start/lessons/1', label: 'Sample Lesson: Stop Exposure', description: 'Lesson viewer example' },
        { path: '/modules/00-quick-start/lessons/2', label: 'Sample Lesson: Drainage', description: 'Video lesson example' },
      ]
    },
    {
      title: '🛠️ Interactive Tools',
      icon: Wrench,
      note: '(Coming in Week 4)',
      routes: [
        { path: '/tools/exposure-checklist', label: 'Exposure Checklist', description: 'Room-by-room mold assessment', disabled: true },
        { path: '/tools/drainage-readiness', label: 'Drainage Readiness', description: 'Track readiness for detox', disabled: true },
        { path: '/tools/binder-planner', label: 'Binder Planner', description: 'Schedule binders with meals', disabled: true },
        { path: '/tools/symptom-tracker', label: 'Symptom Tracker', description: 'Daily symptom logging', disabled: true },
      ]
    },
    {
      title: '💳 Payment & Checkout',
      icon: CreditCard,
      routes: [
        { path: '/checkout', label: 'Checkout', description: 'Stripe payment page' },
        { path: '/checkout/success', label: 'Payment Success', description: 'Post-payment success page' },
        { path: '/checkout/cancelled', label: 'Payment Cancelled', description: 'Payment cancellation page' },
      ]
    },
    {
      title: '📄 Resources & Library',
      icon: FileText,
      note: '(Planned)',
      routes: [
        { path: '/library', label: 'Resource Library', description: 'Downloadable resources', disabled: true },
        { path: '/library/cheat-sheets', label: 'Cheat Sheets', description: 'Quick reference guides', disabled: true },
        { path: '/library/templates', label: 'Templates', description: 'Printable trackers', disabled: true },
      ]
    },
    {
      title: '⚙️ User Settings',
      icon: Settings,
      note: '(Planned)',
      routes: [
        { path: '/settings', label: 'Account Settings', description: 'User preferences', disabled: true },
        { path: '/settings/subscription', label: 'Subscription', description: 'Manage subscription', disabled: true },
        { path: '/settings/notifications', label: 'Notifications', description: 'Email preferences', disabled: true },
      ]
    },
    {
      title: '🧪 API Endpoints',
      icon: TestTube,
      routes: [
        { path: '/api/auth/[...nextauth]', label: 'NextAuth API', description: 'Authentication endpoints', api: true },
        { path: '/api/auth/register', label: 'Register API', description: 'User registration', api: true },
        { path: '/api/auth/reset-password', label: 'Reset Password API', description: 'Password reset', api: true },
        { path: '/api/checkout', label: 'Checkout API', description: 'Stripe checkout session', api: true },
        { path: '/api/webhooks/stripe', label: 'Stripe Webhook', description: 'Payment webhooks', api: true },
        { path: '/api/onboarding', label: 'Onboarding API', description: 'Save onboarding data', api: true },
        { path: '/api/progress', label: 'Progress API', description: 'Track module progress', api: true },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🗺️ Development Sitemap & Cheatsheet
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            All available routes in the Mold Detox Mastery platform
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg">
            <Unlock className="h-5 w-5" />
            <span className="font-medium">Authentication Bypassed - All routes accessible</span>
          </div>
        </div>

        {/* Quick Links Bar */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">QUICK ACCESS</h2>
          <div className="flex flex-wrap gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" 
               className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-md hover:bg-primary-200 transition-colors text-sm font-medium">
              Home
            </a>
            <a href="/dashboard" target="_blank" rel="noopener noreferrer"
               className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm font-medium">
              Dashboard
            </a>
            <a href="/modules" target="_blank" rel="noopener noreferrer"
               className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors text-sm font-medium">
              Modules
            </a>
            <a href="/onboarding" target="_blank" rel="noopener noreferrer"
               className="px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm font-medium">
              Onboarding
            </a>
            <a href="/checkout" target="_blank" rel="noopener noreferrer"
               className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors text-sm font-medium">
              Checkout
            </a>
          </div>
        </div>

        {/* Route Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div key={section.title} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                    </div>
                    {section.note && (
                      <span className="text-xs text-gray-500">{section.note}</span>
                    )}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  {section.routes.map((route) => (
                    <div key={route.path} className={`${route.disabled ? 'opacity-50' : ''}`}>
                      {route.disabled ? (
                        <div className="flex items-start justify-between p-3 rounded-lg bg-gray-50 cursor-not-allowed">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-400">{route.label}</span>
                              <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded">Coming Soon</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{route.description}</p>
                            <code className="text-xs text-gray-400 mt-1 block">{route.path}</code>
                          </div>
                        </div>
                      ) : route.api ? (
                        <div className="flex items-start justify-between p-3 rounded-lg bg-gray-50">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-700">{route.label}</span>
                              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">API</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{route.description}</p>
                            <code className="text-xs text-gray-500 mt-1 block">{route.path}</code>
                          </div>
                        </div>
                      ) : (
                        <a 
                          href={route.path} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-start justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 group-hover:text-blue-600">
                                {route.label}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{route.description}</p>
                            <code className="text-xs text-gray-500 mt-1 block">{route.path}</code>
                          </div>
                          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 mt-1" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Server Info */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📡 Development Server Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Local URL</p>
              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">http://localhost:3005</code>
            </div>
            <div>
              <p className="text-sm text-gray-600">Framework</p>
              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">Next.js 14.2.31</code>
            </div>
            <div>
              <p className="text-sm text-gray-600">Database</p>
              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">SQLite (Prisma)</code>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📖 Legend</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-gray-400" />
              <span>Click to open in new tab</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">Coming Soon</span>
              <span>Not yet implemented</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">API</span>
              <span>API endpoint (not visitable)</span>
            </div>
            <div className="flex items-center gap-2">
              <Unlock className="h-4 w-4 text-yellow-600" />
              <span>Auth bypassed for development</span>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
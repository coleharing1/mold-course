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
        { path: '/new-home', label: '🆕 Enhanced Home Page (2025 Design)', description: 'Modern redesign with animations, glassmorphism, and interactive elements' },
        { path: '/test', label: 'Tailwind Test Page', description: 'Test page to verify Tailwind CSS is working' },
        { path: '/sitemap-dev', label: 'This Page - Dev Sitemap', description: 'Development sitemap and route directory' },
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
      title: '📚 Learning Modules (11 Total)',
      icon: BookOpen,
      routes: [
        { path: '/modules', label: 'All Modules', description: 'Module list with filtering and search' },
        { path: '/modules/00-quick-start', label: 'Module 00: Quick Start', description: '5-step emergency protocol' },
        { path: '/modules/01-identify-exposure', label: 'Module 01: Identify Exposure', description: 'Finding and addressing mold sources' },
        { path: '/modules/02-testing-diagnosis', label: 'Module 02: Testing & Diagnosis', description: 'Environmental and medical testing' },
        { path: '/modules/03-drainage-pathways', label: 'Module 03: Drainage Pathways', description: 'Preparing body for detox (Critical!)' },
        { path: '/modules/04-mycotoxin-binders', label: 'Module 04: Mycotoxin Binders', description: 'Toxin-specific binding protocols' },
        { path: '/modules/05-binder-protocols-csm', label: 'Module 05: CSM Protocols', description: 'Cholestyramine prescription guide' },
        { path: '/modules/06-antifungal-protocols', label: 'Module 06: Antifungals', description: 'Itraconazole and natural options' },
        { path: '/modules/07-herx-management', label: 'Module 07: Herx Management', description: 'Managing detox reactions' },
        { path: '/modules/08-supporting-modalities', label: 'Module 08: Supporting Modalities', description: 'Sauna, supplements, therapies' },
        { path: '/modules/09-diet-nutrition', label: 'Module 09: Diet & Nutrition', description: 'Anti-mold diet and meal plans' },
        { path: '/modules/10-retesting-prevention', label: 'Module 10: Retesting & Prevention', description: 'Long-term maintenance' },
      ]
    },
    {
      title: '🛠️ Interactive Tools (2/9 Complete)',
      icon: Wrench,
      routes: [
        { path: '/tools/exposure-checklist', label: '✅ Exposure Checklist', description: 'Room-by-room mold assessment with cost estimation' },
        { path: '/tools/drainage-readiness', label: '✅ Drainage Readiness Score', description: 'Critical safety tool - gates binder access' },
        { path: '/tools/binder-planner', label: 'Binder Timing Planner', description: 'Schedule binders with meals/meds', disabled: true },
        { path: '/tools/testing-helper', label: 'Testing Decision Helper', description: 'Environmental vs medical testing guide', disabled: true },
        { path: '/tools/herx-toolkit', label: 'Herx Toolkit', description: 'Managing detox reactions', disabled: true },
        { path: '/tools/sauna-rampup', label: 'Sauna Ramp-Up', description: 'Heat/time progression guide', disabled: true },
        { path: '/tools/diet-builder', label: 'Diet Builder', description: '7-day meal planner', disabled: true },
        { path: '/tools/retest-scheduler', label: 'Retesting Scheduler', description: 'Track VCS and mycotoxin retests', disabled: true },
        { path: '/tools/reexposure', label: 'Re-exposure Triage', description: 'Emergency protocol for new exposure', disabled: true },
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
      title: '🏥 Safety Components',
      icon: FileText,
      note: '(Reusable UI Components)',
      routes: [
        { path: '/test', label: 'Evidence Badge Demo', description: 'Solid/Emerging/Controversial badges' },
        { path: '/test', label: 'Medical Disclaimer Demo', description: 'Health warning component' },
        { path: '/test', label: 'Emergency Warning Demo', description: 'Critical health alerts' },
        { path: '/test', label: 'Herx Guidance Demo', description: 'Herxheimer reaction guidance' },
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
            <a href="/new-home" target="_blank" rel="noopener noreferrer" 
               className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-md hover:bg-pink-200 transition-colors text-sm font-medium">
              🆕 Enhanced Home
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

        {/* Recent Updates */}
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-lg font-semibold text-green-900 mb-4">✅ Recent Updates (2025-08-11)</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700 font-medium">Phase 2 updated with missing elements from Kajsa's guide</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700 font-medium">Critical Phase 1 infrastructure complete (Days 10-12, 18-19)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Drainage Readiness Score tool - Critical safety gate for binders</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Module gating logic with prerequisite checking</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Dashboard widgets: Retest countdown, daily tips, community highlights</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Exposure Checklist tool with room-by-room assessment</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">MDX components for modules (visual diagrams, safety flags, evidence badges)</span>
            </div>
          </div>
        </div>

        {/* Server Info */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📡 Development Server Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Local URL</p>
              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">http://localhost:3003</code>
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

        {/* Project Build Timeline */}
        <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-md border border-indigo-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📅 Detailed Project Build Timeline</h2>
          <p className="text-sm text-gray-600 mb-4">Reverse chronological order - newest changes first (All times in Central Time)</p>
          
          {/* Scrollable Timeline Container */}
          <div className="max-h-96 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100">
            
            {/* Today - Latest Changes */}
            <div className="relative pl-8 border-l-4 border-emerald-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-600 rounded-full animate-pulse"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-emerald-600">2025-08-11 @ 12:30 PM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded">PHASE 2 UPDATE</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phase 2 Enhanced with Kajsa's Missing Elements</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Added Module 10 - Advanced Protocols (HBOT, peptides, ozone)</li>
                <li>• Created Supplement Scheduler Tool for timing/interactions</li>
                <li>• Added Resources Center with product recommendations</li>
                <li>• Enhanced modules with specific dosing schedules</li>
                <li>• Added test interpretation thresholds and cleaning alternatives</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-red-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-red-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-red-600">2025-08-11 @ 10:00 AM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">CRITICAL ⚠️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Critical Phase 1 Infrastructure Complete</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Drainage Readiness Score tool - Primary safety gate</li>
                <li>• Module gating logic enforcing prerequisites</li>
                <li>• 80% drainage for 7 days before binder access</li>
                <li>• Dashboard widgets for progress tracking</li>
                <li>• Weighted scoring algorithm for drainage assessment</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-blue-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-blue-600">2025-08-11 @ 8:00 AM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">MODULES</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Module Enhancement Components</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Created MDX components for all modules</li>
                <li>• Visual diagrams for Quick Start and Exposure</li>
                <li>• Testing flowcharts and cost breakdowns</li>
                <li>• Interactive checklists with progress tracking</li>
                <li>• Evidence badges and safety flags throughout</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-yellow-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-yellow-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-yellow-600">2025-08-10 @ 11:00 PM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">TOOLS</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Exposure & Dampness Checklist Tool</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Room-by-room mold assessment form</li>
                <li>• Photo upload feature for documentation</li>
                <li>• Fix-first list generator with priorities</li>
                <li>• Cost estimation for remediation</li>
                <li>• Inspector brief PDF generation</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-purple-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-purple-600">2025-08-10 @ 5:47 PM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">ENHANCED ✨</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Enhanced Home Page with 2025 Design Trends</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Created `/new-home` with glassmorphism and advanced animations</li>
                <li>• Implemented Framer Motion with magnetic hover effects</li>
                <li>• Added morphing backgrounds and typewriter text effects</li>
                <li>• Fixed hydration errors and dependency issues</li>
                <li>• Server running on localhost:3003 with all animations working</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-blue-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-blue-600">2025-08-10 @ 4:30 PM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">RESEARCH</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Landing Page Enhancement Research</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Researched 2025 web design trends and animation libraries</li>
                <li>• Analyzed glassmorphism, neumorphism, and interactive elements</li>
                <li>• Compiled comprehensive enhancement recommendations</li>
                <li>• Created detailed implementation guide with code examples</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-purple-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-purple-600">2025-08-10 @ 3:15 PM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">ANALYSIS</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Home Page Analysis</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Read entire codebase including marketing components</li>
                <li>• Analyzed current hero, pricing, and transformation sections</li>
                <li>• Provided detailed improvement suggestions</li>
                <li>• Identified conversion optimization opportunities</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-indigo-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-indigo-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-indigo-600">2025-08-10 @ 2:45 PM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">DEPLOYED ✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Successful Vercel Deployment</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Fixed MDX parsing errors and Prisma client generation</li>
                <li>• Resolved routing conflicts and missing dependencies</li>
                <li>• Added build configuration for production</li>
                <li>• Updated sitemap-dev with all current routes</li>
              </ul>
            </div>


            <div className="relative pl-8 border-l-4 border-red-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-red-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-red-600">2025-08-10 @ 10:15 AM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">SAFETY</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Critical Safety Infrastructure</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Implemented module gating logic with prerequisite checking</li>
                <li>• Created drainage gate warning components</li>
                <li>• Added server-side access control for modules</li>
                <li>• Enforced 80% drainage readiness for 7 consecutive days</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-orange-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-orange-600">2025-08-10 @ 8:00 AM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">AUDIT</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Audit Implementation</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Compared 3 AI audits (200+ issues identified)</li>
                <li>• Created evidence badges & medical disclaimers</li>
                <li>• Fixed all TypeScript strict mode errors</li>
                <li>• Implemented P1, P2, and P3 priority fixes</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-green-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-green-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-green-600">2025-08-10 @ 4:30 AM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">CONTENT</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Major Content Restructure Complete</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Aligned with Kajsa's proven mold detox protocol</li>
                <li>• Created 11 comprehensive modules (Weeks 1-11)</li>
                <li>• Added specific dosing, timelines, and scripts</li>
                <li>• Implemented safety gates and medical warnings</li>
                <li>• Created Kajsa's Exact Protocol special section</li>
                <li>• Built Medical Advocacy Center resources</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-blue-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-blue-600">2025-08-10 @ 2:00 AM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">PHASE 1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phase 1 Weeks 1-3 Implementation</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Completed authentication system with NextAuth</li>
                <li>• Integrated Stripe payment processing & webhooks</li>
                <li>• Built 5-step onboarding wizard with personalization</li>
                <li>• Set up MDX/Contentlayer module infrastructure</li>
                <li>• Created dashboard with progress widgets</li>
                <li>• Fixed Tailwind CSS compilation issues</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-slate-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-slate-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-slate-600">2025-08-09 @ 5:30 PM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded">SETUP</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phase 0 Complete Development Setup</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Git repository initialization with main branch</li>
                <li>• ESLint & Prettier configuration with pre-commit hooks</li>
                <li>• TypeScript strict mode enabled and configured</li>
                <li>• Husky pre-commit hooks for code quality</li>
                <li>• All base dependencies installed (Radix UI, Zustand, etc.)</li>
                <li>• Cursor Rules v2.1 with modular system</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-gray-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-gray-600">2025-08-09 @ 1:00 PM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">FOUNDATION</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Architecture & Foundation Setup</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Created comprehensive Prisma schema (16 models)</li>
                <li>• Built base UI component library with Tailwind</li>
                <li>• Established project documentation structure</li>
                <li>• Set up Next.js 14 App Router architecture</li>
                <li>• Configured SQLite database for development</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-rose-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-rose-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-rose-600">2025-08-09 @ 8:30 AM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-rose-100 text-rose-700 text-xs rounded">START</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Project Initialization & Planning</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Project conception based on Opus4 specifications</li>
                <li>• Generated comprehensive documentation suite</li>
                <li>• Created detailed phase implementation plans</li>
                <li>• Established mold detox platform requirements</li>
                <li>• Set up workspace and development environment</li>
              </ul>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-8 pt-6 border-t border-indigo-200">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-indigo-600">3</p>
                <p className="text-xs text-gray-600">Days Active</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">11</p>
                <p className="text-xs text-gray-600">Modules Created</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">2/9</p>
                <p className="text-xs text-gray-600">Tools Complete</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">Phase 2</p>
                <p className="text-xs text-gray-600">Updated</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">90%</p>
                <p className="text-xs text-gray-600">Phase 1 Complete</p>
              </div>
            </div>
          </div>

          {/* Next Milestones */}
          <div className="mt-6 p-4 bg-white/50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">🎯 Current Status & Next Milestones</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                <span className="font-medium text-emerald-700">✅ Phase 2 Updated with Kajsa's missing elements</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="font-medium text-green-700">✅ Critical Phase 1 Infrastructure Complete (Drainage tool, gating)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="font-medium text-green-700">✅ 2 of 9 Interactive Tools Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span>Binder Timing Planner (Phase 1 remaining)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                <span>Email system and Resources vault</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>Phase 2: Complete module content, remaining 7 tools, community</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>Phase 3: Protocol Builder, Supabase migration, production deployment</span>
              </div>
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
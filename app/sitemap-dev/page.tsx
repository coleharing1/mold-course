'use client'

import React from 'react'
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
  Unlock,
  CheckCircle2,
  CheckCircle,
  MapPin,
  AlertCircle,
  TrendingUp,
  Calendar,
  Rocket,
  XCircle,
  Clock,
  Target,
  Zap,
  Activity,
  BarChart3,
  Layers,
  AlertTriangle,
  Info,
  Circle
} from 'lucide-react'

export default function SitemapDevPage() {
  // Add custom scrollbar styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollable-timeline::-webkit-scrollbar {
        width: 14px;
        height: 14px;
        background: #E5E5E5;
      }
      .scrollable-timeline::-webkit-scrollbar-track {
        background: #E5E5E5;
        border: 1px solid #D4D4D4;
      }
      .scrollable-timeline::-webkit-scrollbar-thumb {
        background: #6B6B6B;
        border: 1px solid #5A5A5A;
      }
      .scrollable-timeline::-webkit-scrollbar-thumb:hover {
        background: #5A5A5A;
      }
      .scrollable-timeline::-webkit-scrollbar-thumb:active {
        background: #4A4A4A;
      }
      .scrollable-timeline {
        scrollbar-width: auto;
        scrollbar-color: #6B6B6B #E5E5E5;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const sections = [
    {
      title: 'Marketing Pages',
      icon: Home,
      routes: [
        { path: '/', label: 'Landing Page (Marketing Home)', description: 'Main marketing page with hero, pricing, etc.' },
        { path: '/new-home', label: 'Enhanced Home Page (2025 Design)', description: 'Modern redesign with animations, glassmorphism, and interactive elements' },
        { path: '/design-lab', label: 'Design Lab (Testing Environment)', description: 'Isolated UI/UX testing area with 10 theme options and professional iconography' },
        { path: '/test', label: 'Tailwind Test Page', description: 'Test page to verify Tailwind CSS is working' },
        { path: '/sitemap-dev', label: 'This Page - Dev Sitemap', description: 'Development sitemap and route directory' },
      ]
    },
    {
      title: 'Authentication Pages',
      icon: Lock,
      note: '(Currently bypassed for development)',
      routes: [
        { path: '/signin', label: 'Sign In', description: 'User login page' },
        { path: '/signup', label: 'Sign Up', description: 'New user registration' },
        { path: '/reset-password', label: 'Reset Password', description: 'Password recovery flow' },
      ]
    },
    {
      title: 'Dashboard & User Area',
      icon: Layout,
      routes: [
        { path: '/dashboard', label: 'Dashboard', description: 'User dashboard with progress widgets' },
        { path: '/onboarding', label: 'Onboarding Wizard', description: '5-step onboarding flow' },
      ]
    },
    {
      title: 'Learning Modules (11 Total)',
      icon: BookOpen,
      routes: [
        { path: '/modules', label: 'All Modules', description: 'Module list with filtering and search' },
        { path: '/modules/00-quick-start', label: 'Module 00: Quick Start', description: '5-step emergency protocol' },
        { path: '/modules/01-identify-exposure', label: 'Module 01: Identify Exposure', description: 'Finding and addressing mold sources' },
        { path: '/modules/02-testing-diagnosis', label: 'Module 02: Testing & Diagnosis', description: 'Environmental and medical testing' },
        { path: '/modules/03-drainage-pathways', label: 'Module 03: Drainage Pathways', description: 'All 5 pathways - bowel, liver, kidneys, lymph, sweat', completed: true },
        { path: '/modules/04-binders', label: 'Module 04: Mycotoxin Binders', description: 'CSM titration (1/4 → 1/2 → full scoop)', completed: true },
        { path: '/modules/05-antifungals', label: 'Module 05: Antifungals', description: 'Sporanox 100mg → 200mg daily protocol', completed: true },
        { path: '/modules/06-herx-management', label: 'Module 06: Herx Management', description: 'Managing detox reactions safely', completed: true },
        { path: '/modules/07-supportive-modalities', label: 'Module 07: Supporting Modalities', description: 'Sauna, HBOT, peptides, nasal care', completed: true },
        { path: '/modules/08-diet-pantry', label: 'Module 08: Diet & Pantry', description: 'Low-mold foods, Japanese sweet potatoes', inProgress: true },
        { path: '/modules/09-retesting-prevention', label: 'Module 09: Retesting & Prevention', description: 'VCS every 3mo, ERMI <2, HERTSMI-2 <10', pending: true },
        { path: '/modules/10-advanced-protocols', label: 'Module 10: Advanced Protocols', description: 'HBOT, peptides, ozone therapy', pending: true },
      ]
    },
    {
      title: 'Interactive Tools (3/9 Complete)',
      icon: Wrench,
      routes: [
        { path: '/tools/exposure-checklist', label: 'Exposure Checklist', description: 'Room-by-room mold assessment with cost estimation', completed: true },
        { path: '/tools/drainage-readiness', label: 'Drainage Readiness Score', description: 'Critical safety tool - gates binder access (80% for 7 days)', completed: true },
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
      title: 'Payment & Checkout',
      icon: CreditCard,
      routes: [
        { path: '/checkout', label: 'Checkout', description: 'Stripe payment page' },
        { path: '/checkout/success', label: 'Payment Success', description: 'Post-payment success page' },
        { path: '/checkout/cancelled', label: 'Payment Cancelled', description: 'Payment cancellation page' },
      ]
    },
    {
      title: 'Safety Components',
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
      title: 'Resources & Library',
      icon: FileText,
      note: '(Planned)',
      routes: [
        { path: '/library', label: 'Resource Library', description: 'Downloadable resources', disabled: true },
        { path: '/library/cheat-sheets', label: 'Cheat Sheets', description: 'Quick reference guides', disabled: true },
        { path: '/library/templates', label: 'Templates', description: 'Printable trackers', disabled: true },
      ]
    },
    {
      title: 'User Settings',
      icon: Settings,
      note: '(Planned)',
      routes: [
        { path: '/settings', label: 'Account Settings', description: 'User preferences', disabled: true },
        { path: '/settings/subscription', label: 'Subscription', description: 'Manage subscription', disabled: true },
        { path: '/settings/notifications', label: 'Notifications', description: 'Email preferences', disabled: true },
      ]
    },
    {
      title: 'API Endpoints',
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
    <div className="min-h-screen py-8" style={{background: 'linear-gradient(135deg, #f5f0e9 0%, #ede5d8 50%, #e8dcc8 100%)' }}>
      <div className="container mx-auto px-4" style={{maxWidth: '1200px'}}>
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{color: 'rgb(44, 44, 44)'}}>
            Development Sitemap & Cheatsheet
          </h1>
          <p className="text-lg mb-2" style={{color: 'rgb(107, 107, 107)'}}>
            All available routes in the Mold Detox Mastery platform
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg">
            <Unlock className="h-5 w-5" />
            <span className="font-medium">Authentication Bypassed - All routes accessible</span>
          </div>
        </div>

        {/* Quick Links Bar */}
        <div className="mb-8 p-5 rounded-xl border-0" style={{background: 'rgb(254, 249, 239)', boxShadow: '0 8px 32px -8px rgba(193, 122, 86, 0.15), 0 12px 24px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(193, 122, 86, 0.05)'}}>
          <h2 className="text-sm font-semibold mb-3" style={{color: 'rgb(107, 107, 107)'}}>QUICK ACCESS</h2>
          <div className="flex flex-wrap gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" 
               className="px-3 py-1.5 rounded-md transition-colors text-sm font-medium" style={{backgroundColor: 'rgba(193, 122, 86, 0.1)', color: 'rgb(139, 69, 19)'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(193, 122, 86, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(193, 122, 86, 0.1)'}>
              Home
            </a>
                      <a href="/new-home" target="_blank" rel="noopener noreferrer"
             className="px-3 py-1.5 rounded-md transition-colors text-sm font-medium" style={{backgroundColor: 'rgba(236, 72, 153, 0.1)', color: 'rgb(190, 24, 93)'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.1)'}>
             Enhanced Home
          </a>
          <a href="/design-lab" target="_blank" rel="noopener noreferrer"
             className="px-3 py-1.5 rounded-md transition-colors text-sm font-medium" style={{backgroundColor: 'rgba(147, 51, 234, 0.1)', color: 'rgb(107, 33, 168)'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.1)'}>
             Design Lab
          </a>
            <a href="/dashboard" target="_blank" rel="noopener noreferrer"
               className="px-3 py-1.5 rounded-md transition-colors text-sm font-medium" style={{backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'rgb(29, 78, 216)'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'}>
              Dashboard
            </a>
            <a href="/modules" target="_blank" rel="noopener noreferrer"
               className="px-3 py-1.5 rounded-md transition-colors text-sm font-medium" style={{backgroundColor: 'rgba(147, 51, 234, 0.1)', color: 'rgb(107, 33, 168)'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.1)'}>
              Modules
            </a>
            <a href="/onboarding" target="_blank" rel="noopener noreferrer"
               className="px-3 py-1.5 rounded-md transition-colors text-sm font-medium" style={{backgroundColor: 'rgba(76, 175, 134, 0.1)', color: 'rgb(34, 84, 61)'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(76, 175, 134, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(76, 175, 134, 0.1)'}>
              Onboarding
            </a>
            <a href="/checkout" target="_blank" rel="noopener noreferrer"
               className="px-3 py-1.5 rounded-md transition-colors text-sm font-medium" style={{backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'rgb(180, 83, 9)'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.1)'}>
              Checkout
            </a>
          </div>
        </div>

        {/* Route Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div key={section.title} className="bg-white rounded-xl overflow-hidden border-0 hover:transform hover:-translate-y-1 transition-all duration-300" style={{boxShadow: '0 8px 32px -8px rgba(193, 122, 86, 0.15), 0 12px 24px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(193, 122, 86, 0.05)'}}>
                <div className="px-6 py-4 border-b" style={{background: 'linear-gradient(to right, rgb(251, 243, 234), rgb(243, 230, 213)', borderColor: 'rgba(193, 122, 86, 0.2)'}}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" style={{color: 'rgb(193, 122, 86)'}} />
                      <h2 className="text-lg font-semibold" style={{color: 'rgb(44, 44, 44)'}}>{section.title}</h2>
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
                            <p className="text-sm mt-1" style={{color: 'rgb(107, 107, 107)'}}>{route.description}</p>
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
                              {route.completed && (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              )}
                              <span className="font-medium text-gray-900 group-hover:text-blue-600">
                                {route.label}
                              </span>
                            </div>
                            <p className="text-sm mt-1" style={{color: 'rgb(107, 107, 107)'}}>{route.description}</p>
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
        <div className="mt-8 p-6 rounded-xl border-0" style={{background: 'rgba(76, 175, 134, 0.08)', boxShadow: '0 8px 32px -8px rgba(76, 175, 134, 0.2), 0 12px 24px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(76, 175, 134, 0.15)'}}>
          <h2 className="text-lg font-semibold mb-4" style={{color: 'rgb(44, 44, 44)'}}>Recent Updates (2025-01-15)</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{color: 'rgb(76, 175, 134)'}} />
              <span className="font-medium" style={{color: 'rgb(107, 107, 107)'}}>Design Lab with 10 themes - Professional Lucide icons throughout</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{color: 'rgb(76, 175, 134)'}} />
              <span className="font-medium" style={{color: 'rgb(107, 107, 107)'}}>Sitemap updated with tan earthy theme and SVG icons</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{color: 'rgb(76, 175, 134)'}} />
              <span className="text-gray-700">7 modules complete (03-07) with MDX content and safety features</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{color: 'rgb(76, 175, 134)'}} />
              <span className="text-gray-700">Drainage Readiness tool enforcing 80% for 7 days before binders</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{color: 'rgb(76, 175, 134)'}} />
              <span className="text-gray-700">Module gating logic with prerequisite checking system</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{color: 'rgb(76, 175, 134)'}} />
              <span className="text-gray-700">Dashboard enhanced with 25+ professional SVG icons</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{color: 'rgb(76, 175, 134)'}} />
              <span className="text-gray-700">MDX components: DoThisNow, EvidenceBadge, SafetyFlag, ToolPreview</span>
            </div>
          </div>
        </div>

        {/* Server Info */}
        <div className="mt-8 p-6 bg-white rounded-xl border-0" style={{boxShadow: '0 8px 32px -8px rgba(193, 122, 86, 0.15), 0 12px 24px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(193, 122, 86, 0.05)'}}>
          <h2 className="text-lg font-semibold mb-4" style={{color: 'rgb(44, 44, 44)'}}>Development Server Info</h2>
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
        <div className="mt-8 p-6 bg-white rounded-xl border-0" style={{boxShadow: '0 8px 32px -8px rgba(193, 122, 86, 0.15), 0 12px 24px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(193, 122, 86, 0.05)'}}>
          <h2 className="text-lg font-semibold mb-4" style={{color: 'rgb(44, 44, 44)'}}>Legend</h2>
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
        <div className="mt-8 p-6 rounded-xl border-0" style={{background: 'linear-gradient(135deg, #ffffff 0%, rgba(193, 122, 86, 0.03) 100%)', boxShadow: '0 12px 48px -12px rgba(193, 122, 86, 0.2), 0 16px 32px -16px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(193, 122, 86, 0.08)'}}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{color: 'rgb(44, 44, 44)'}}>
            <Calendar className="h-5 w-5" style={{color: 'rgb(193, 122, 86)'}} />
            Detailed Project Build Timeline
          </h2>
          <p className="text-sm text-gray-600 mb-4">Reverse chronological order - newest changes first (All times in Central Time)</p>
          
          {/* Scrollable Timeline Container */}
          <div className="relative">
            <div className="absolute top-0 right-0 z-10 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-bl-lg flex items-center gap-1 shadow-md">
              <svg className="h-3 w-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Scroll for more history
            </div>
            <div className="max-h-96 overflow-y-scroll pr-4 space-y-4 bg-gradient-to-b from-white to-amber-50/20 rounded-lg p-4 border-2 border-black scrollable-timeline">
            
            {/* Today - Latest Changes */}
            <div className="relative pl-8 border-l-4 border-emerald-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-600 rounded-full animate-pulse"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-emerald-600">2025-01-15 @ Current</span>
                <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded inline-flex items-center gap-1">
                  DESIGN UPDATE
                  <CheckCircle className="h-3 w-3" />
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Design Lab Professional Enhancement</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li className="flex items-start gap-1"><Circle className="h-1.5 w-1.5 mt-1.5 flex-shrink-0" />10 custom themes including Trend 2025 and Tan Earthy</li>
                <li className="flex items-start gap-1"><Circle className="h-1.5 w-1.5 mt-1.5 flex-shrink-0" />Replaced all emojis with 25+ Lucide React SVG icons</li>
                <li className="flex items-start gap-1"><Circle className="h-1.5 w-1.5 mt-1.5 flex-shrink-0" />Enhanced dashboard with gradient cards and hover effects</li>
                <li className="flex items-start gap-1"><Circle className="h-1.5 w-1.5 mt-1.5 flex-shrink-0" />Professional sitemap with tan theme and lifted cards</li>
                <li className="flex items-start gap-1"><Circle className="h-1.5 w-1.5 mt-1.5 flex-shrink-0" />Fixed MDX component exports for build compatibility</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-4 border-blue-400">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="mb-1">
                <span className="text-sm font-semibold text-blue-600">2025-08-11 @ 8:00 PM CT</span>
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">MODULES</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phase 2 Modules 03-07 Complete</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li className="flex items-start gap-1"><Circle className="h-1.5 w-1.5 mt-1.5 flex-shrink-0" />Module 03: Drainage Pathways (5 systems)</li>
                <li className="flex items-start gap-1"><Circle className="h-1.5 w-1.5 mt-1.5 flex-shrink-0" />Module 04: Binders with CSM titration</li>
                <li className="flex items-start gap-1"><Circle className="h-1.5 w-1.5 mt-1.5 flex-shrink-0" />Module 05: Antifungals with Sporanox</li>
                <li className="flex items-start gap-1"><Circle className="h-1.5 w-1.5 mt-1.5 flex-shrink-0" />Module 06: Herx Management protocols</li>
                <li className="flex items-start gap-1"><Circle className="h-1.5 w-1.5 mt-1.5 flex-shrink-0" />Module 07: Supporting Modalities (HBOT, peptides)</li>
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
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded inline-flex items-center gap-1">
                  DEPLOYED
                  <CheckCircle className="h-3 w-3" />
                </span>
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
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Current Status & Next Milestones
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                <span className="font-medium text-emerald-700 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Phase 2 Updated with Kajsa's missing elements
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="font-medium text-green-700 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Critical Phase 1 Infrastructure Complete (Drainage tool, gating)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="font-medium text-green-700 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  2 of 9 Interactive Tools Complete
                </span>
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

        {/* Project Phase Status & Todo List */}
        <div className="mt-8 p-6 rounded-xl border-0" style={{background: 'linear-gradient(135deg, #ffffff 0%, rgba(76, 175, 134, 0.03) 100%)', boxShadow: '0 12px 48px -12px rgba(76, 175, 134, 0.2), 0 16px 32px -16px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(76, 175, 134, 0.08)'}}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{color: 'rgb(44, 44, 44)'}}>
            <Rocket className="h-5 w-5" style={{color: 'rgb(193, 122, 86)'}} />
            Project Phase Status & Todo List
          </h2>
          
          {/* Phase Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-green-100 rounded-lg border border-green-300">
              <div className="text-2xl font-bold text-green-700 flex items-center justify-center gap-2">
                <CheckCircle className="h-6 w-6" />
                100%
              </div>
              <p className="text-sm font-medium text-green-800">Phase 0: Setup</p>
              <p className="text-xs text-green-600">Complete</p>
            </div>
            <div className="text-center p-4 bg-yellow-100 rounded-lg border border-yellow-300">
              <div className="text-2xl font-bold text-yellow-700 flex items-center justify-center gap-2">
                <Activity className="h-6 w-6" />
                85%
              </div>
              <p className="text-sm font-medium text-yellow-800">Phase 1: MVP</p>
              <p className="text-xs text-yellow-600">Tools Pending</p>
            </div>
            <div className="text-center p-4 bg-orange-100 rounded-lg border border-orange-300">
              <div className="text-2xl font-bold text-orange-700 flex items-center justify-center gap-2">
                <Clock className="h-6 w-6" />
                10%
              </div>
              <p className="text-sm font-medium text-orange-800">Phase 2: Features</p>
              <p className="text-xs text-orange-600">Planning</p>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-lg border border-gray-300">
              <div className="text-2xl font-bold text-gray-700 flex items-center justify-center gap-2">
                <Layers className="h-6 w-6" />
                0%
              </div>
              <p className="text-sm font-medium text-gray-800">Phase 3: Scale</p>
              <p className="text-xs text-gray-600">Future</p>
            </div>
          </div>

          {/* Detailed Phase Breakdown */}
          <div className="space-y-6">
            
            {/* Phase 0: Complete */}
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Phase 0: Project Setup (COMPLETE)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    Completed (All
                    <CheckCircle className="h-4 w-4 text-green-600" />)
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Next.js 14 + TypeScript setup</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Prisma + SQLite database (16 models)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Tailwind CSS + custom theme</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>ESLint + Prettier + Husky</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Git repository initialized</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Base UI components</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Cursor Rules v2.1 + Claude Code</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Achievements</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Enhanced 16-model database schema</li>
                    <li>• TypeScript strict mode enabled</li>
                    <li>• Modular AI assistant configuration</li>
                    <li>• Pre-commit hooks for code quality</li>
                    <li>• Comprehensive documentation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 1: Mostly Complete */}
            <div className="p-4 bg-white rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">🔄 Phase 1: Frontend Foundation & MVP (85% Complete)</h3>
              
              {/* Week 1: Complete */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  Week 1: Layout & Auth
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Complete</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Marketing & app layouts</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Header, footer, navigation</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>NextAuth authentication system</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Sign in/up/reset password pages</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Auth middleware protection</span></li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Landing page components (10 sections)</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Hero, pricing, FAQ, social proof</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Medical disclaimer modal</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Responsive mobile design</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Week 2: Complete */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  Week 2: Payments & Dashboard
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Complete</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Stripe integration (checkout, webhooks)</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Payment success/cancel pages</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>5-step onboarding wizard</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Personalized recommendations</span></li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Dashboard with progress widgets</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Streak counter, badges display</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Next action cards</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Readiness status tracking</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Week 3: Complete */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  Week 3: Modules & Content
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Complete</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>MDX + Contentlayer setup</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Module infrastructure complete</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Progress tracking system</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Module gating logic implemented</span></li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>All 11 modules created with MDX content</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Aligned with Kajsa's exact protocol</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Evidence badges & safety flags</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Module navigation components</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Week 4: Partially Complete */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Week 4: Interactive Tools (🔄 Partial - 1 of 3 Complete)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-700 mb-1 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Completed
                    </h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Exposure Checklist tool (fully functional)</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Room-by-room assessment</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Photo upload feature</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" /><span>Scoring algorithm & results</span></li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-700 mb-1 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Missing (Critical)
                    </h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start gap-2"><XCircle className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" /><span>Drainage Readiness Score tool</span></li>
                      <li className="flex items-start gap-2"><XCircle className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" /><span>Binder Timing Planner tool</span></li>
                      <li className="flex items-start gap-2"><XCircle className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" /><span>Resources vault setup</span></li>
                      <li className="flex items-start gap-2"><XCircle className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" /><span>Email system (Resend/Postal)</span></li>
                      <li className="flex items-start gap-2"><XCircle className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" /><span>PostHog analytics tracking</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2: Planned */}
            <div className="p-4 bg-white rounded-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">⏳ Phase 2: Enhancement & Advanced Tools (10% Complete)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Planned Features</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Complete remaining 7 modules with audio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>9 advanced interactive tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Community forum (optional tier)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Advanced analytics & A/B testing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Email automation sequences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Gamification features expansion</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Advanced Tools Planned</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Testing Decision Helper</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Herx Toolkit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Sauna Ramp-Up Tool</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Diet Builder</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Retesting Scheduler</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Re-exposure Triage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Supplement Scheduler</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 3: Future */}
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📋 Phase 3: Scale & Production (Future)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Advanced Features</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Protocol Builder (drag & drop)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Mycotoxin Binder Matcher</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Lab/VCS logging system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Calendar integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Health device integration</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Production & Scale</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Supabase migration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Performance optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Affiliate program</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>White-label options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="h-2 w-2 text-gray-400 mt-1.5 flex-shrink-0" />
                      <span>CI/CD pipeline</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Next Steps */}
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Critical Next Steps (Phase 1 Completion)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-red-700 mb-2">Immediate Priority (This Week)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Drainage Readiness Score tool</strong> - Critical safety gate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Binder Timing Planner tool</strong> - Core protocol tool</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Resources vault with initial content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Email system setup (welcome, reset emails)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-700 mb-2">Secondary Priority (Next Week)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="flex items-start gap-2">
                    <BarChart3 className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span>PostHog analytics integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Settings className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span>Mobile responsiveness testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span>Bug fixes and error handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TestTube className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span>User acceptance testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Rocket className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span>Phase 1 MVP deployment</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-100 rounded border border-red-300">
              <p className="text-sm text-red-800">
                <strong>Note:</strong> Drainage Readiness Score tool is blocking for safety - users cannot access binder protocols 
                without 80% drainage readiness for 7 consecutive days (per Kajsa's protocol).
              </p>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <h3 className="text-lg font-semibold text-indigo-800 mb-3 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Overall Progress Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-indigo-600">98%</div>
                <p className="text-xs text-indigo-700">Auth & Layout</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">95%</div>
                <p className="text-xs text-indigo-700">Content & Modules</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">33%</div>
                <p className="text-xs text-yellow-700">Interactive Tools</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">0%</div>
                <p className="text-xs text-red-700">Email & Analytics</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">85%</div>
                <p className="text-xs text-green-700">Phase 1 Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
            style={{backgroundColor: 'rgb(193, 122, 86)'}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(160, 101, 71)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(193, 122, 86)'}
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
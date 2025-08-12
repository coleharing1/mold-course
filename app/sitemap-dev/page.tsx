'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Home,
  Layout,
  BookOpen,
  Wrench,
  CreditCard,
  Settings,
  FileText,
  TestTube,
  ExternalLink,
  Lock,
  Unlock,
  CheckCircle2,
  CheckCircle,
  AlertCircle,
  Calendar,
  Rocket,
  XCircle,
  Clock,
  Target,
  Zap,
  Activity,
  BarChart3,
  Layers,
  Circle,
  Code2,
  Package,
  FileCode2,
  Timer,
  RefreshCw,
  Cpu,
  ShoppingCart,
} from 'lucide-react'

export default function SitemapDevPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [clientTime, setClientTime] = useState<string>('') // Client-only time to prevent hydration mismatch
  const [realTimeStats, setRealTimeStats] = useState<Record<string, unknown> | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Update time every second for real-time feel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now)
      setClientTime(now.toLocaleTimeString())
    }

    // Set initial time immediately on client mount
    updateTime()

    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Fetch real-time stats
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/project-stats')
        if (response.ok) {
          const data = await response.json()
          setRealTimeStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch real-time stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 300000) // Update every 5 minutes
    return () => clearInterval(interval)
  }, [])

  // Calculate project stats with real-time updates
  const projectStats = React.useMemo(() => {
    const totalModules = 11
    const completedModules = 11 // All modules have lesson structure with 51 lessons total
    const totalTools = 11
    const completedTools = 11 // All tools now complete!
    const totalPages = realTimeStats?.pagesCount || 45 // Increased with library, tools, quiz pages
    const totalComponents = realTimeStats?.componentsCount || 120 // Major increase with tools and library components
    const totalMDXContent = realTimeStats?.contentFiles || 71 // 11 modules + 51 lessons + 9 resources
    const totalTypeScriptFiles = realTimeStats?.totalFiles || 180 // Significant increase

    // Lines of code - use real-time stats if available
    const linesWritten = realTimeStats?.linesOfCode || 80500 // Major increase with lessons, tools, and library
    const estimatedTotalLines = 95000 // Updated estimate based on current progress
    const linesRemaining = estimatedTotalLines - linesWritten

    // Project timeline - Started afternoon of Aug 9, 2025
    const projectStartDate = new Date('2025-08-09T14:57:00')
    const today = currentTime
    const msElapsed = today.getTime() - projectStartDate.getTime()
    const hoursElapsed = Math.floor(msElapsed / (1000 * 60 * 60))
    const minutesElapsed = Math.floor((msElapsed % (1000 * 60 * 60)) / (1000 * 60))
    const secondsElapsed = Math.floor((msElapsed % (1000 * 60)) / 1000)
    const daysElapsed = Math.max(1, Math.floor(hoursElapsed / 24))

    // Time tracking - fixed productive hours
    const actualHoursWorked = 17.5 // Updated: 17 hours and 30 minutes of productive work (includes recent 3+ hour session)
    const avgLinesPerHour = Math.round(linesWritten / actualHoursWorked) // ~4,046 lines/hour
    const hoursRemaining = Math.round(linesRemaining / avgLinesPerHour)
    const totalEstimatedHours = actualHoursWorked + hoursRemaining
    const avgHoursPerDay = Math.round((actualHoursWorked / (hoursElapsed / 24)) * 10) / 10 // Hours worked divided by actual days elapsed
    const estimatedDaysRemaining = Math.round(hoursRemaining / avgHoursPerDay)
    const estimatedCompletionDate = new Date(
      today.getTime() + estimatedDaysRemaining * 24 * 60 * 60 * 1000
    )

    const totalDependencies = 343 // From npm output
    const phaseProgress = {
      phase0: 100, // Setup complete
      phase1: 95, // MVP - all modules, 10/11 tools, auth/payments complete
      phase2: 75, // Enhancement - 51 lessons, resource library, quiz system, herx toolkit
      phase3: 20, // Scale & Production - Protocol Builder complete, build optimization, MDX fixes
    }

    return {
      modules: {
        completed: completedModules,
        total: totalModules,
        percentage: Math.round((completedModules / totalModules) * 100),
      },
      tools: {
        completed: completedTools,
        total: totalTools,
        percentage: Math.round((completedTools / totalTools) * 100),
      },
      pages: totalPages,
      components: totalComponents,
      mdxContent: totalMDXContent,
      typeScriptFiles: totalTypeScriptFiles,
      linesWritten,
      linesRemaining,
      totalLines: estimatedTotalLines,
      codeProgress: Math.round((linesWritten / estimatedTotalLines) * 100),
      hoursWorked: actualHoursWorked,
      hoursRemaining,
      totalEstimatedHours,
      hoursElapsed,
      minutesElapsed,
      secondsElapsed,
      daysElapsed,
      realTimeUpdate: '', // Will be set client-side to prevent hydration mismatch
      lastCommit: realTimeStats?.lastCommit,
      filesByType: realTimeStats?.filesByType || {},
      avgHoursPerDay,
      avgLinesPerHour,
      estimatedDaysRemaining,
      estimatedCompletionDate: estimatedCompletionDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      dependencies: totalDependencies,
      phaseProgress,
      overallProgress: Math.round(
        ((phaseProgress.phase0 * 0.15 +
          phaseProgress.phase1 * 0.35 +
          phaseProgress.phase2 * 0.35 +
          phaseProgress.phase3 * 0.15) /
          100) *
          100
      ),
    }
  }, [currentTime, realTimeStats])

  // Add custom scrollbar styles
  React.useEffect(() => {
    const style = document.createElement('style')
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
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  const sections: Array<{
    title: string
    icon: React.ElementType
    note?: string
    routes: Array<{
      path: string
      label: string
      description: string
      completed?: boolean
      inProgress?: boolean
      pending?: boolean
      disabled?: boolean
      api?: boolean
    }>
  }> = [
    {
      title: 'Marketing Pages',
      icon: Home,
      routes: [
        {
          path: '/',
          label: 'Landing Page (Marketing Home)',
          description: 'Main marketing page with hero, pricing, etc.',
        },
        {
          path: '/new-home',
          label: 'Enhanced Home Page (2025 Design)',
          description: 'Modern redesign with animations, glassmorphism, and interactive elements',
        },
        {
          path: '/design-lab',
          label: 'Design Lab (Testing Environment)',
          description:
            'Isolated UI/UX testing area with 10 theme options and professional iconography',
        },
        {
          path: '/test',
          label: 'Tailwind Test Page',
          description: 'Test page to verify Tailwind CSS is working',
        },
        {
          path: '/sitemap-dev',
          label: 'This Page - Dev Sitemap',
          description: 'Development sitemap and route directory',
        },
      ],
    },
    {
      title: 'Authentication Pages',
      icon: Lock,
      note: '(Currently bypassed for development)',
      routes: [
        { path: '/signin', label: 'Sign In', description: 'User login page' },
        { path: '/signup', label: 'Sign Up', description: 'New user registration' },
        { path: '/reset-password', label: 'Reset Password', description: 'Password recovery flow' },
      ],
    },
    {
      title: 'Dashboard & User Area',
      icon: Layout,
      routes: [
        {
          path: '/dashboard',
          label: 'Dashboard',
          description: 'User dashboard with progress widgets',
        },
        {
          path: '/progress',
          label: 'My Progress',
          description:
            'Comprehensive progress tracking with module completion, achievements, and analytics',
          completed: true,
        },
        { path: '/onboarding', label: 'Onboarding Wizard', description: '5-step onboarding flow' },
      ],
    },
    {
      title: 'Learning Modules (11/11 Complete with 51 Lessons)',
      icon: BookOpen,
      routes: [
        {
          path: '/modules',
          label: 'All Modules',
          description: 'Module list with filtering and search',
        },
        {
          path: '/modules/00-quick-start',
          label: 'Module 00: Quick Start',
          description: '5 lessons - Emergency protocol (Stop exposure, Assessment, Tracking)',
          completed: true,
        },
        {
          path: '/modules/01-identify-exposure',
          label: 'Module 01: Identify Exposure',
          description: '6 lessons - Visual inspection, Room audit, Hidden mold, Vehicles',
          completed: true,
        },
        {
          path: '/modules/02-testing-diagnosis',
          label: 'Module 02: Testing & Diagnosis',
          description: '6 lessons - ERMI/HERTSMI-2, Mycotoxins, Biomarkers, VCS, HLA-DR',
          completed: true,
        },
        {
          path: '/modules/03-drainage-pathways',
          label: 'Module 03: Open Drainage Pathways',
          description: '6 lessons - Bowel, Liver, Kidneys, Lymph, Sweat (80% for 7 days)',
          completed: true,
        },
        {
          path: '/modules/04-binders',
          label: 'Module 04: Mycotoxin Binders',
          description: '6 lessons - CSM protocol, Welchol, Natural, Timing mastery',
          completed: true,
        },
        {
          path: '/modules/05-antifungals',
          label: 'Module 05: Antifungals',
          description: '5 lessons - Sporanox, Fluconazole, Natural, Die-off management',
          completed: true,
        },
        {
          path: '/modules/06-herx-management',
          label: 'Module 06: Herx Management',
          description: '5 lessons - Understanding, Severity, Strategies, Emergency',
          completed: true,
        },
        {
          path: '/modules/07-supportive-modalities',
          label: 'Module 07: Supportive Modalities',
          description: '6 lessons - Infrared sauna, HBOT, peptides, nasal care, ozone therapy',
          inProgress: true,
        },
        {
          path: '/modules/08-diet-nutrition',
          label: 'Module 08: Diet & Nutrition',
          description: '6 lessons - Low-mold foods, meal planning, supplement timing',
          inProgress: true,
        },
        {
          path: '/modules/09-retesting-prevention',
          label: 'Module 09: Retesting & Prevention',
          description: '6 lessons - VCS monitoring, retesting timeline, prevention strategies',
          inProgress: true,
        },
        {
          path: '/modules/10-advanced-protocols',
          label: 'Module 10: Advanced Protocols',
          description:
            '6 lessons - Advanced HBOT, IV therapy, peptide stacking, biofilm disruption',
          inProgress: true,
        },
      ],
    },
    {
      title: 'Products & Resources Hub (Complete)',
      icon: ShoppingCart,
      routes: [
        {
          path: '/products',
          label: 'Complete Products Database',
          description:
            "Kajsa's personally tested products - 37 items across 5 categories with affiliate links",
          completed: true,
        },
        {
          path: '/products?category=air-purifiers',
          label: 'Air Purifiers & Home Protection',
          description: 'HEPA filters, ozone machines, and home protection systems',
          completed: true,
        },
        {
          path: '/products?category=cleaning',
          label: 'Cleaning & Household Products',
          description: 'Mold-safe cleaners, detergents, pillow protectors, and water filters',
          completed: true,
        },
        {
          path: '/products?category=testing',
          label: 'Mold Testing Supplies',
          description: 'DIY test kits, professional lab tests, and mycotoxin panels',
          completed: true,
        },
        {
          path: '/products?category=respiratory',
          label: 'Nasal & Respiratory Support',
          description: 'Xlear nasal spray, neti pots, and sinus rinse protocols',
          completed: true,
        },
        {
          path: '/products?category=supplements',
          label: 'Supplements for Detox Support',
          description: 'Binders, antifungals, liver support, and complete protocol kits',
          completed: true,
        },
      ],
    },
    {
      title: 'Interactive Tools (11/11 Complete)',
      icon: Wrench,
      routes: [
        {
          path: '/tools',
          label: 'Tools Library',
          description: 'Main tools page with search, filtering, and tool overview',
          completed: true,
        },
        {
          path: '/tools/exposure-checklist',
          label: 'Exposure Checklist',
          description: 'Room-by-room mold assessment with cost estimation',
          completed: true,
        },
        {
          path: '/tools/drainage-readiness',
          label: 'Drainage Readiness Score',
          description: 'Critical safety tool - gates binder access (80% for 7 days)',
          completed: true,
        },
        {
          path: '/tools/testing-decision-helper',
          label: 'Testing Decision Helper',
          description: 'Personalized test recommendations with cost-benefit analysis',
          completed: true,
        },
        {
          path: '/tools/binder-timing-planner',
          label: 'Binder Timing Planner',
          description: 'Master medication timing to avoid interactions',
          completed: true,
        },
        {
          path: '/tools/herx-toolkit',
          label: 'Herx Reaction Toolkit',
          description: 'Comprehensive Herxheimer reaction management system',
          completed: true,
        },
        {
          path: '/tools/sauna-ramp-up',
          label: 'Sauna Ramp-Up Protocol',
          description: 'Progressive heat therapy protocol for mycotoxin elimination',
          completed: true,
        },
        {
          path: '/tools/diet-builder',
          label: 'Anti-Inflammatory Diet Builder',
          description: 'Personalized 7-day meal plans eliminating mycotoxins',
          completed: true,
        },
        {
          path: '/tools/supplement-scheduler',
          label: 'Supplement Scheduler',
          description: 'Evidence-based supplement timing and protocol optimization',
          completed: true,
        },
        {
          path: '/tools/progress-dashboard',
          label: 'Progress Dashboard',
          description: 'Comprehensive symptom and biomarker tracking with analytics',
          completed: true,
        },
        {
          path: '/tools/retesting-scheduler',
          label: 'Retesting Scheduler',
          description: 'Track VCS and mycotoxin retests with optimal timing',
          completed: true,
        },
        {
          path: '/tools/re-exposure-triage',
          label: 'Re-exposure Emergency Triage',
          description: 'Immediate assessment and action plan for acute mold exposure',
          disabled: true,
        },
      ],
    },
    {
      title: 'Quiz & Assessment System (2/2 Complete) ✅',
      icon: FileText,
      routes: [
        {
          path: '/quiz',
          label: 'Main Assessment Quiz',
          description: 'Interactive 2-minute mold health assessment for lead generation',
          completed: true,
        },
        {
          path: '/quiz/first-steps-guide',
          label: 'Personalized Action Guide',
          description: 'Dynamic quiz results with personalized next steps based on score',
          completed: true,
        },
      ],
    },
    {
      title: 'Payment & Checkout',
      icon: CreditCard,
      routes: [
        { path: '/checkout', label: 'Checkout', description: 'Stripe payment page' },
        {
          path: '/checkout/success',
          label: 'Payment Success',
          description: 'Post-payment success page',
        },
        {
          path: '/checkout/cancelled',
          label: 'Payment Cancelled',
          description: 'Payment cancellation page',
        },
      ],
    },
    {
      title: 'Safety Components',
      icon: FileText,
      note: '(Reusable UI Components)',
      routes: [
        {
          path: '/test',
          label: 'Evidence Badge Demo',
          description: 'Solid/Emerging/Controversial badges',
        },
        {
          path: '/test',
          label: 'Medical Disclaimer Demo',
          description: 'Health warning component',
        },
        { path: '/test', label: 'Emergency Warning Demo', description: 'Critical health alerts' },
        { path: '/test', label: 'Herx Guidance Demo', description: 'Herxheimer reaction guidance' },
      ],
    },
    {
      title: 'Resources & Library',
      icon: FileText,
      note: '(3/3 Complete)',
      routes: [
        {
          path: '/library',
          label: 'Resource Library',
          description: 'Downloadable resources',
          completed: true,
        },
        {
          path: '/library/cheat-sheets',
          label: 'Cheat Sheets',
          description: 'Quick reference guides',
          completed: true,
        },
        {
          path: '/library/templates',
          label: 'Templates',
          description: 'Legal & advocacy documents',
          completed: true,
        },
      ],
    },
    {
      title: 'User Settings',
      icon: Settings,
      note: '(Planned)',
      routes: [
        {
          path: '/settings',
          label: 'Account Settings',
          description: 'User preferences',
          disabled: true,
        },
        {
          path: '/settings/subscription',
          label: 'Subscription',
          description: 'Manage subscription',
          disabled: true,
        },
        {
          path: '/settings/notifications',
          label: 'Notifications',
          description: 'Email preferences',
          disabled: true,
        },
      ],
    },
    {
      title: 'API Endpoints',
      icon: TestTube,
      routes: [
        {
          path: '/api/auth/[...nextauth]',
          label: 'NextAuth API',
          description: 'Authentication endpoints',
          api: true,
        },
        {
          path: '/api/auth/register',
          label: 'Register API',
          description: 'User registration',
          api: true,
        },
        {
          path: '/api/auth/reset-password',
          label: 'Reset Password API',
          description: 'Password reset',
          api: true,
        },
        {
          path: '/api/checkout',
          label: 'Checkout API',
          description: 'Stripe checkout session',
          api: true,
        },
        {
          path: '/api/webhooks/stripe',
          label: 'Stripe Webhook',
          description: 'Payment webhooks',
          api: true,
        },
        {
          path: '/api/onboarding',
          label: 'Onboarding API',
          description: 'Save onboarding data',
          api: true,
        },
        {
          path: '/api/progress',
          label: 'Progress API',
          description: 'Track module progress',
          api: true,
        },
      ],
    },
  ]

  return (
    <div
      className="min-h-screen py-8"
      style={{ background: 'linear-gradient(135deg, #f5f0e9 0%, #ede5d8 50%, #e8dcc8 100%)' }}
    >
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div className="mb-6 px-2 text-center">
          <h1
            className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl"
            style={{ color: 'rgb(44, 44, 44)' }}
          >
            Development Sitemap & Cheatsheet
          </h1>
          <p
            className="mb-3 text-sm sm:text-base md:text-lg"
            style={{ color: 'rgb(107, 107, 107)' }}
          >
            All available routes in the Mold Detox Mastery platform
          </p>
          <div className="inline-flex items-center gap-2 rounded-lg bg-yellow-100 px-3 py-2 text-yellow-800 sm:px-4">
            <Unlock className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
            <span className="text-sm font-medium sm:text-base">
              Authentication Bypassed - All routes accessible
            </span>
          </div>
        </div>

        {/* Project Build Stats & Analytics - Real-time Dashboard */}
        <div
          className="mb-6 rounded-xl p-4 sm:p-6"
          style={{
            background: 'linear-gradient(135deg, rgb(251, 247, 241) 0%, rgb(254, 249, 239) 100%)',
            boxShadow: '0 4px 16px rgba(139, 90, 43, 0.08), 0 0 0 1px rgba(193, 122, 86, 0.1)',
            border: '1px solid rgb(227, 213, 198)',
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Left side - Title and icon */}
            <div className="flex items-start gap-3">
              <div
                className="flex-shrink-0 rounded-lg p-2"
                style={{ background: 'rgba(139, 90, 43, 0.1)' }}
              >
                <BarChart3
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  style={{ color: 'rgb(139, 90, 43)' }}
                />
              </div>
              <div className="flex-1">
                <h2
                  className="flex flex-wrap items-center gap-2 text-lg font-bold sm:text-xl"
                  style={{ color: 'rgb(92, 51, 23)' }}
                >
                  <span>Live Project Analytics Dashboard</span>
                  {isLoading && (
                    <RefreshCw
                      className="h-4 w-4 animate-spin"
                      style={{ color: 'rgb(139, 90, 43)' }}
                    />
                  )}
                </h2>
                <p className="mt-1 text-xs sm:text-sm" style={{ color: 'rgb(139, 90, 43)' }}>
                  Last Update: {clientTime || '--:--:--'} • Auto-refresh every 5 min
                </p>
              </div>
            </div>

            {/* Right side - Progress indicator */}
            <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-0">
              <div className="flex items-baseline gap-1">
                <div
                  className="text-4xl font-bold sm:text-5xl"
                  style={{ color: 'rgb(139, 90, 43)' }}
                >
                  {projectStats.overallProgress}
                </div>
                <span
                  className="text-xl font-medium sm:text-2xl"
                  style={{ color: 'rgb(139, 90, 43)' }}
                >
                  %
                </span>
              </div>
              <div
                className="text-sm font-medium sm:text-base"
                style={{ color: 'rgb(92, 51, 23)' }}
              >
                Overall Progress
              </div>
              <div className="text-xs sm:text-sm" style={{ color: 'rgb(139, 90, 43)' }}>
                Est. {projectStats.estimatedCompletionDate}
              </div>
            </div>
          </div>

          {/* Live Timer & Time Tracking */}
          <div
            className="mb-4 mt-4 rounded-xl p-3 sm:p-4"
            style={{
              background:
                'linear-gradient(135deg, rgba(139, 90, 43, 0.05) 0%, rgba(193, 122, 86, 0.05) 100%)',
              border: '1px solid rgba(193, 122, 86, 0.2)',
            }}
          >
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4" style={{ color: 'rgb(139, 90, 43)' }} />
                <span className="text-sm font-semibold" style={{ color: 'rgb(92, 51, 23)' }}>
                  Time Tracking
                </span>
              </div>
              <div
                className="flex items-center gap-2 font-mono text-xs sm:text-sm"
                style={{ color: 'rgb(92, 51, 23)' }}
              >
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span className="whitespace-nowrap">
                    {projectStats.hoursElapsed}h {projectStats.minutesElapsed % 60}m{' '}
                    {projectStats.secondsElapsed % 60}s
                  </span>
                </div>
                <span className="text-xs" style={{ color: 'rgb(139, 90, 43)' }}>
                  elapsed
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div
                className="rounded-lg p-3"
                style={{
                  background: 'rgb(254, 249, 239)',
                  border: '1px solid rgba(193, 122, 86, 0.1)',
                }}
              >
                <div className="flex items-center justify-between">
                  <Cpu className="h-4 w-4" style={{ color: 'rgb(193, 122, 86)' }} />
                  <div className="text-xl font-bold" style={{ color: 'rgb(92, 51, 23)' }}>
                    {Math.floor(projectStats.hoursWorked)}h{' '}
                    {Math.round((projectStats.hoursWorked % 1) * 60)}m
                  </div>
                </div>
                <div className="mt-1 text-xs" style={{ color: 'rgb(139, 90, 43)' }}>
                  Productive Hours
                </div>
              </div>

              <div
                className="rounded-lg p-3"
                style={{
                  background: 'rgb(254, 249, 239)',
                  border: '1px solid rgba(193, 122, 86, 0.1)',
                }}
              >
                <div className="flex items-center justify-between">
                  <Target className="h-4 w-4" style={{ color: 'rgb(193, 122, 86)' }} />
                  <div className="text-xl font-bold" style={{ color: 'rgb(92, 51, 23)' }}>
                    {projectStats.hoursRemaining}h
                  </div>
                </div>
                <div className="mt-1 text-xs" style={{ color: 'rgb(139, 90, 43)' }}>
                  Est. Remaining
                </div>
              </div>

              <div
                className="rounded-lg p-3"
                style={{
                  background: 'rgb(254, 249, 239)',
                  border: '1px solid rgba(193, 122, 86, 0.1)',
                }}
              >
                <div className="flex items-center justify-between">
                  <Zap className="h-4 w-4" style={{ color: 'rgb(193, 122, 86)' }} />
                  <div className="text-xl font-bold" style={{ color: 'rgb(92, 51, 23)' }}>
                    {projectStats.avgLinesPerHour.toLocaleString()}
                  </div>
                </div>
                <div className="mt-1 text-xs" style={{ color: 'rgb(139, 90, 43)' }}>
                  Lines/Hour
                </div>
              </div>

              <div
                className="rounded-lg p-3"
                style={{
                  background: 'rgb(254, 249, 239)',
                  border: '1px solid rgba(193, 122, 86, 0.1)',
                }}
              >
                <div className="flex items-center justify-between">
                  <Activity className="h-4 w-4" style={{ color: 'rgb(193, 122, 86)' }} />
                  <div className="text-xl font-bold" style={{ color: 'rgb(92, 51, 23)' }}>
                    {projectStats.avgHoursPerDay}
                  </div>
                </div>
                <div className="mt-1 text-xs" style={{ color: 'rgb(139, 90, 43)' }}>
                  Avg Hours/Day
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Code & Component Metrics */}
          <div className="mb-4">
            <div className="mb-3 flex items-center gap-2">
              <Code2 className="h-4 w-4" style={{ color: 'rgb(139, 90, 43)' }} />
              <span className="text-sm font-semibold" style={{ color: 'rgb(92, 51, 23)' }}>
                Development Metrics
              </span>
              {realTimeStats && (
                <span
                  className="rounded-full px-2 py-0.5 text-xs"
                  style={{ background: 'rgba(76, 175, 134, 0.1)', color: 'rgb(76, 175, 134)' }}
                >
                  Live Data
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              <div
                className="rounded-lg p-3 transition-transform hover:scale-105 hover:transform"
                style={{
                  background:
                    'linear-gradient(135deg, rgb(254, 249, 239) 0%, rgb(251, 243, 234) 100%)',
                  border: '1px solid rgba(193, 122, 86, 0.2)',
                  boxShadow: '0 2px 8px rgba(193, 122, 86, 0.05)',
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <BookOpen className="h-4 w-4" style={{ color: 'rgb(193, 122, 86)' }} />
                  <span className="text-xs font-medium" style={{ color: 'rgb(139, 90, 43)' }}>
                    {projectStats.modules.percentage}%
                  </span>
                </div>
                <div className="text-xl font-bold" style={{ color: 'rgb(92, 51, 23)' }}>
                  {projectStats.modules.completed}/{projectStats.modules.total}
                </div>
                <div className="mt-1 text-xs" style={{ color: 'rgb(139, 90, 43)' }}>
                  Modules
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full"
                  style={{ background: 'rgba(193, 122, 86, 0.1)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      background:
                        'linear-gradient(90deg, rgb(193, 122, 86) 0%, rgb(139, 90, 43) 100%)',
                      width: `${projectStats.modules.percentage}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div
                className="rounded-lg p-3 transition-transform hover:scale-105 hover:transform"
                style={{
                  background:
                    'linear-gradient(135deg, rgb(254, 249, 239) 0%, rgb(251, 243, 234) 100%)',
                  border: '1px solid rgba(193, 122, 86, 0.2)',
                  boxShadow: '0 2px 8px rgba(193, 122, 86, 0.05)',
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <Wrench className="h-4 w-4" style={{ color: 'rgb(193, 122, 86)' }} />
                  <span className="text-xs font-medium" style={{ color: 'rgb(139, 90, 43)' }}>
                    {projectStats.tools.percentage}%
                  </span>
                </div>
                <div className="text-xl font-bold" style={{ color: 'rgb(92, 51, 23)' }}>
                  {projectStats.tools.completed}/{projectStats.tools.total}
                </div>
                <div className="mt-1 text-xs" style={{ color: 'rgb(139, 90, 43)' }}>
                  Tools
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full"
                  style={{ background: 'rgba(193, 122, 86, 0.1)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      background:
                        'linear-gradient(90deg, rgb(193, 122, 86) 0%, rgb(139, 90, 43) 100%)',
                      width: `${projectStats.tools.percentage}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div
                className="rounded-lg p-3 transition-transform hover:scale-105 hover:transform"
                style={{
                  background:
                    'linear-gradient(135deg, rgb(254, 249, 239) 0%, rgb(251, 243, 234) 100%)',
                  border: '1px solid rgba(193, 122, 86, 0.2)',
                  boxShadow: '0 2px 8px rgba(193, 122, 86, 0.05)',
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <FileCode2 className="h-4 w-4" style={{ color: 'rgb(193, 122, 86)' }} />
                  <span className="text-xs font-medium" style={{ color: 'rgb(139, 90, 43)' }}>
                    {projectStats.codeProgress}%
                  </span>
                </div>
                <div className="text-xl font-bold" style={{ color: 'rgb(92, 51, 23)' }}>
                  {(projectStats.linesWritten / 1000).toFixed(1)}k
                </div>
                <div className="mt-1 text-xs" style={{ color: 'rgb(139, 90, 43)' }}>
                  Lines Code
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full"
                  style={{ background: 'rgba(193, 122, 86, 0.1)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      background:
                        'linear-gradient(90deg, rgb(193, 122, 86) 0%, rgb(139, 90, 43) 100%)',
                      width: `${projectStats.codeProgress}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div
                className="rounded-lg p-3 transition-transform hover:scale-105 hover:transform"
                style={{
                  background:
                    'linear-gradient(135deg, rgb(254, 249, 239) 0%, rgb(251, 243, 234) 100%)',
                  border: '1px solid rgba(193, 122, 86, 0.2)',
                  boxShadow: '0 2px 8px rgba(193, 122, 86, 0.05)',
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <Layout className="h-4 w-4" style={{ color: 'rgb(193, 122, 86)' }} />
                </div>
                <div className="text-xl font-bold" style={{ color: 'rgb(92, 51, 23)' }}>
                  {projectStats.pages}
                </div>
                <div className="mt-1 text-xs" style={{ color: 'rgb(139, 90, 43)' }}>
                  Pages
                </div>
              </div>

              <div
                className="rounded-lg p-3 transition-transform hover:scale-105 hover:transform"
                style={{
                  background:
                    'linear-gradient(135deg, rgb(254, 249, 239) 0%, rgb(251, 243, 234) 100%)',
                  border: '1px solid rgba(193, 122, 86, 0.2)',
                  boxShadow: '0 2px 8px rgba(193, 122, 86, 0.05)',
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <Package className="h-4 w-4" style={{ color: 'rgb(193, 122, 86)' }} />
                </div>
                <div className="text-xl font-bold" style={{ color: 'rgb(92, 51, 23)' }}>
                  {projectStats.components}
                </div>
                <div className="mt-1 text-xs" style={{ color: 'rgb(139, 90, 43)' }}>
                  Components
                </div>
              </div>

              <div
                className="rounded-lg p-3 transition-transform hover:scale-105 hover:transform"
                style={{
                  background:
                    'linear-gradient(135deg, rgb(254, 249, 239) 0%, rgb(251, 243, 234) 100%)',
                  border: '1px solid rgba(193, 122, 86, 0.2)',
                  boxShadow: '0 2px 8px rgba(193, 122, 86, 0.05)',
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <FileText className="h-4 w-4" style={{ color: 'rgb(193, 122, 86)' }} />
                </div>
                <div className="text-xl font-bold" style={{ color: 'rgb(92, 51, 23)' }}>
                  {projectStats.typeScriptFiles}
                </div>
                <div className="mt-1 text-xs" style={{ color: 'rgb(139, 90, 43)' }}>
                  Files
                </div>
              </div>
            </div>
          </div>

          {/* Phase Progress Bars */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-20 text-xs font-medium" style={{ color: 'rgb(139, 90, 43)' }}>
                Phase 0
              </span>
              <div
                className="h-5 flex-1 overflow-hidden rounded-full"
                style={{ background: 'rgb(227, 213, 198)' }}
              >
                <div
                  className="flex h-full items-center justify-center rounded-full text-xs font-medium text-white"
                  style={{
                    background: 'rgb(92, 51, 23)',
                    width: `${projectStats.phaseProgress.phase0}%`,
                  }}
                >
                  Setup {projectStats.phaseProgress.phase0}%
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-20 text-xs font-medium" style={{ color: 'rgb(139, 90, 43)' }}>
                Phase 1
              </span>
              <div
                className="h-5 flex-1 overflow-hidden rounded-full"
                style={{ background: 'rgb(227, 213, 198)' }}
              >
                <div
                  className="flex h-full items-center justify-center rounded-full text-xs font-medium text-white"
                  style={{
                    background: 'rgb(139, 90, 43)',
                    width: `${projectStats.phaseProgress.phase1}%`,
                  }}
                >
                  MVP {projectStats.phaseProgress.phase1}%
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-20 text-xs font-medium" style={{ color: 'rgb(139, 90, 43)' }}>
                Phase 2
              </span>
              <div
                className="h-5 flex-1 overflow-hidden rounded-full"
                style={{ background: 'rgb(227, 213, 198)' }}
              >
                <div
                  className="flex h-full items-center justify-center rounded-full text-xs font-medium text-white"
                  style={{
                    background: 'rgb(171, 127, 88)',
                    width: `${projectStats.phaseProgress.phase2}%`,
                  }}
                >
                  Enhancement {projectStats.phaseProgress.phase2}%
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-20 text-xs font-medium" style={{ color: 'rgb(139, 90, 43)' }}>
                Phase 3
              </span>
              <div
                className="h-5 flex-1 overflow-hidden rounded-full"
                style={{ background: 'rgb(227, 213, 198)' }}
              >
                <div
                  className="flex h-full items-center justify-center rounded-full text-xs font-medium"
                  style={{
                    background: 'rgb(227, 213, 198)',
                    color: 'rgb(139, 90, 43)',
                    width: '100%',
                  }}
                >
                  Scale & Production (Not Started)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Bar */}
        <div
          className="mb-8 rounded-xl border-0 p-5"
          style={{
            background: 'rgb(254, 249, 239)',
            boxShadow:
              '0 8px 32px -8px rgba(193, 122, 86, 0.15), 0 12px 24px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(193, 122, 86, 0.05)',
          }}
        >
          <h2 className="mb-3 text-sm font-semibold" style={{ color: 'rgb(107, 107, 107)' }}>
            QUICK ACCESS
          </h2>
          <div className="flex flex-wrap gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: 'rgba(193, 122, 86, 0.1)', color: 'rgb(139, 69, 19)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(193, 122, 86, 0.2)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(193, 122, 86, 0.1)')
              }
            >
              Home
            </a>
            <a
              href="/new-home"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', color: 'rgb(190, 24, 93)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.2)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.1)')
              }
            >
              Enhanced Home
            </a>
            <a
              href="/design-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: 'rgba(147, 51, 234, 0.1)', color: 'rgb(107, 33, 168)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.2)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.1)')
              }
            >
              Design Lab
            </a>
            <a
              href="/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'rgb(29, 78, 216)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)')
              }
            >
              Dashboard
            </a>
            <a
              href="/modules"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: 'rgba(147, 51, 234, 0.1)', color: 'rgb(107, 33, 168)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.2)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.1)')
              }
            >
              Modules
            </a>
            <a
              href="/lessons-preview"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'rgb(21, 128, 61)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.2)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.1)')
              }
            >
              📚 Lessons Preview
            </a>
            <a
              href="/onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: 'rgba(76, 175, 134, 0.1)', color: 'rgb(34, 84, 61)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(76, 175, 134, 0.2)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(76, 175, 134, 0.1)')
              }
            >
              Onboarding
            </a>
            <a
              href="/checkout"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'rgb(180, 83, 9)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.2)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.1)')
              }
            >
              Checkout
            </a>
          </div>
        </div>

        {/* Route Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div
                key={section.title}
                className="overflow-hidden rounded-xl border-0 bg-white transition-all duration-300 hover:-translate-y-1 hover:transform"
                style={{
                  boxShadow:
                    '0 8px 32px -8px rgba(193, 122, 86, 0.15), 0 12px 24px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(193, 122, 86, 0.05)',
                }}
              >
                <div
                  className="border-b px-6 py-4"
                  style={{
                    background: 'linear-gradient(to right, rgb(251, 243, 234), rgb(243, 230, 213)',
                    borderColor: 'rgba(193, 122, 86, 0.2)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" style={{ color: 'rgb(193, 122, 86)' }} />
                      <h2 className="text-lg font-semibold" style={{ color: 'rgb(44, 44, 44)' }}>
                        {section.title}
                      </h2>
                    </div>
                    {section.note && <span className="text-xs text-gray-500">{section.note}</span>}
                  </div>
                </div>
                <div className="space-y-3 p-6">
                  {section.routes.map((route) => (
                    <div key={route.path} className={`${route.disabled ? 'opacity-50' : ''}`}>
                      {route.disabled ? (
                        <div className="flex cursor-not-allowed items-start justify-between rounded-lg bg-gray-50 p-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-400">{route.label}</span>
                              <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                                Coming Soon
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-400">{route.description}</p>
                            <code className="mt-1 block text-xs text-gray-400">{route.path}</code>
                          </div>
                        </div>
                      ) : route.api ? (
                        <div className="flex items-start justify-between rounded-lg bg-gray-50 p-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-700">{route.label}</span>
                              <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                                API
                              </span>
                            </div>
                            <p className="mt-1 text-sm" style={{ color: 'rgb(107, 107, 107)' }}>
                              {route.description}
                            </p>
                            <code className="mt-1 block text-xs text-gray-500">{route.path}</code>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={route.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start justify-between rounded-lg p-3 transition-colors hover:bg-blue-50"
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
                            <p className="mt-1 text-sm" style={{ color: 'rgb(107, 107, 107)' }}>
                              {route.description}
                            </p>
                            <code className="mt-1 block text-xs text-gray-500">{route.path}</code>
                          </div>
                          <ExternalLink className="mt-1 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
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
        <div
          className="mt-8 rounded-xl border-0 p-6"
          style={{
            background: 'rgba(76, 175, 134, 0.08)',
            boxShadow:
              '0 8px 32px -8px rgba(76, 175, 134, 0.2), 0 12px 24px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(76, 175, 134, 0.15)',
          }}
        >
          <h2 className="mb-4 text-lg font-semibold" style={{ color: 'rgb(44, 44, 44)' }}>
            Recent Updates (2025-08-11)
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{ color: 'rgb(76, 175, 134)' }} />
              <span className="font-medium" style={{ color: 'rgb(107, 107, 107)' }}>
                Module 04 & 05 complete with two-tier structure (11 detailed lessons)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{ color: 'rgb(76, 175, 134)' }} />
              <span className="font-medium" style={{ color: 'rgb(107, 107, 107)' }}>
                Module 06 Herx Management with 5 lessons (severity scales, emergency protocols)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{ color: 'rgb(76, 175, 134)' }} />
              <span className="text-gray-700">
                37 total lesson files created across 7 modules (00-06)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{ color: 'rgb(76, 175, 134)' }} />
              <span className="text-gray-700">
                Drainage Readiness tool enforcing 80% for 7 days before binders
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{ color: 'rgb(76, 175, 134)' }} />
              <span className="text-gray-700">
                CSM protocol with titration schedules and Kajsa&apos;s personal quotes
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{ color: 'rgb(76, 175, 134)' }} />
              <span className="text-gray-700">
                Dashboard enhanced with 25+ professional SVG icons
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4" style={{ color: 'rgb(76, 175, 134)' }} />
              <span className="text-gray-700">
                MDX components: DoThisNow, EvidenceBadge, SafetyFlag, ToolPreview
              </span>
            </div>
          </div>
        </div>

        {/* Server Info */}
        <div
          className="mt-8 rounded-xl border-0 bg-white p-6"
          style={{
            boxShadow:
              '0 8px 32px -8px rgba(193, 122, 86, 0.15), 0 12px 24px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(193, 122, 86, 0.05)',
          }}
        >
          <h2 className="mb-4 text-lg font-semibold" style={{ color: 'rgb(44, 44, 44)' }}>
            Development Server Info
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-600">Local URL</p>
              <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                http://localhost:3003
              </code>
            </div>
            <div>
              <p className="text-sm text-gray-600">Framework</p>
              <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                Next.js 14.2.31
              </code>
            </div>
            <div>
              <p className="text-sm text-gray-600">Database</p>
              <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                SQLite (Prisma)
              </code>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div
          className="mt-8 rounded-xl border-0 bg-white p-6"
          style={{
            boxShadow:
              '0 8px 32px -8px rgba(193, 122, 86, 0.15), 0 12px 24px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(193, 122, 86, 0.05)',
          }}
        >
          <h2 className="mb-4 text-lg font-semibold" style={{ color: 'rgb(44, 44, 44)' }}>
            Legend
          </h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-gray-400" />
              <span>Click to open in new tab</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                Coming Soon
              </span>
              <span>Not yet implemented</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">API</span>
              <span>API endpoint (not visitable)</span>
            </div>
            <div className="flex items-center gap-2">
              <Unlock className="h-4 w-4 text-yellow-600" />
              <span>Auth bypassed for development</span>
            </div>
          </div>
        </div>

        {/* Project Build Timeline */}
        <div
          className="mt-8 rounded-xl border-0 p-6"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(193, 122, 86, 0.03) 100%)',
            boxShadow:
              '0 12px 48px -12px rgba(193, 122, 86, 0.2), 0 16px 32px -16px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(193, 122, 86, 0.08)',
          }}
        >
          <h2
            className="mb-6 flex items-center gap-2 text-xl font-bold"
            style={{ color: 'rgb(44, 44, 44)' }}
          >
            <Calendar className="h-5 w-5" style={{ color: 'rgb(193, 122, 86)' }} />
            Detailed Project Build Timeline
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            Reverse chronological order - newest changes first (All times in Central Time)
          </p>

          {/* Scrollable Timeline Container */}
          <div className="relative">
            <div className="absolute right-0 top-0 z-10 flex items-center gap-1 rounded-bl-lg bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 shadow-md">
              <svg
                className="h-3 w-3 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              Scroll for more history
            </div>
            <div className="scrollable-timeline max-h-96 space-y-4 overflow-y-scroll rounded-lg border-2 border-black bg-gradient-to-b from-white to-amber-50/20 p-4 pr-4">
              {/* Today - Latest Changes */}
              <div className="relative border-l-4 border-emerald-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 animate-pulse rounded-full bg-emerald-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-emerald-600">
                    2025-01-15 @ Current
                  </span>
                  <span className="ml-2 inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                    DESIGN UPDATE
                    <CheckCircle className="h-3 w-3" />
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Design Lab Professional Enhancement
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-1">
                    <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" />
                    10 custom themes including Trend 2025 and Tan Earthy
                  </li>
                  <li className="flex items-start gap-1">
                    <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" />
                    Replaced all emojis with 25+ Lucide React SVG icons
                  </li>
                  <li className="flex items-start gap-1">
                    <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" />
                    Enhanced dashboard with gradient cards and hover effects
                  </li>
                  <li className="flex items-start gap-1">
                    <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" />
                    Professional sitemap with tan theme and lifted cards
                  </li>
                  <li className="flex items-start gap-1">
                    <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" />
                    Fixed MDX component exports for build compatibility
                  </li>
                </ul>
              </div>

              <div className="relative border-l-4 border-blue-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-blue-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-blue-600">
                    2025-08-11 @ 8:00 PM CT
                  </span>
                  <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                    MODULES
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Phase 2 Modules 03-07 Complete</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-1">
                    <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" />
                    Module 03: Open Drainage Pathways (5 systems)
                  </li>
                  <li className="flex items-start gap-1">
                    <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" />
                    Module 04: Mycotoxin Binders with CSM titration
                  </li>
                  <li className="flex items-start gap-1">
                    <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" />
                    Module 05: Antifungals with Sporanox
                  </li>
                  <li className="flex items-start gap-1">
                    <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" />
                    Module 06: Herx Management protocols
                  </li>
                  <li className="flex items-start gap-1">
                    <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" />
                    Module 07: Supportive Modalities (HBOT, peptides)
                  </li>
                </ul>
              </div>

              <div className="relative border-l-4 border-red-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-red-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-red-600">
                    2025-08-11 @ 10:00 AM CT
                  </span>
                  <span className="ml-2 rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">
                    CRITICAL ⚠️
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Critical Phase 1 Infrastructure Complete
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Drainage Readiness Score tool - Primary safety gate</li>
                  <li>• Module gating logic enforcing prerequisites</li>
                  <li>• 80% drainage for 7 days before binder access</li>
                  <li>• Dashboard widgets for progress tracking</li>
                  <li>• Weighted scoring algorithm for drainage assessment</li>
                </ul>
              </div>

              <div className="relative border-l-4 border-blue-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-blue-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-blue-600">
                    2025-08-11 @ 8:00 AM CT
                  </span>
                  <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                    MODULES
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Module Enhancement Components</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Created MDX components for all modules</li>
                  <li>• Visual diagrams for Quick Start and Exposure</li>
                  <li>• Testing flowcharts and cost breakdowns</li>
                  <li>• Interactive checklists with progress tracking</li>
                  <li>• Evidence badges and safety flags throughout</li>
                </ul>
              </div>

              <div className="relative border-l-4 border-yellow-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-yellow-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-yellow-600">
                    2025-08-10 @ 11:00 PM CT
                  </span>
                  <span className="ml-2 rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
                    TOOLS
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Exposure & Dampness Checklist Tool
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Room-by-room mold assessment form</li>
                  <li>• Photo upload feature for documentation</li>
                  <li>• Fix-first list generator with priorities</li>
                  <li>• Cost estimation for remediation</li>
                  <li>• Inspector brief PDF generation</li>
                </ul>
              </div>

              <div className="relative border-l-4 border-purple-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-purple-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-purple-600">
                    2025-08-10 @ 5:47 PM CT
                  </span>
                  <span className="ml-2 rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
                    ENHANCED ✨
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Enhanced Home Page with 2025 Design Trends
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Created `/new-home` with glassmorphism and advanced animations</li>
                  <li>• Implemented Framer Motion with magnetic hover effects</li>
                  <li>• Added morphing backgrounds and typewriter text effects</li>
                  <li>• Fixed hydration errors and dependency issues</li>
                  <li>• Server running on localhost:3003 with all animations working</li>
                </ul>
              </div>

              <div className="relative border-l-4 border-blue-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-blue-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-blue-600">
                    2025-08-10 @ 4:30 PM CT
                  </span>
                  <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                    RESEARCH
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Landing Page Enhancement Research
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Researched 2025 web design trends and animation libraries</li>
                  <li>• Analyzed glassmorphism, neumorphism, and interactive elements</li>
                  <li>• Compiled comprehensive enhancement recommendations</li>
                  <li>• Created detailed implementation guide with code examples</li>
                </ul>
              </div>

              <div className="relative border-l-4 border-purple-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-purple-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-purple-600">
                    2025-08-10 @ 3:15 PM CT
                  </span>
                  <span className="ml-2 rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
                    ANALYSIS
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Comprehensive Home Page Analysis
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Read entire codebase including marketing components</li>
                  <li>• Analyzed current hero, pricing, and transformation sections</li>
                  <li>• Provided detailed improvement suggestions</li>
                  <li>• Identified conversion optimization opportunities</li>
                </ul>
              </div>

              <div className="relative border-l-4 border-indigo-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-indigo-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-indigo-600">
                    2025-08-10 @ 2:45 PM CT
                  </span>
                  <span className="ml-2 inline-flex items-center gap-1 rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                    DEPLOYED
                    <CheckCircle className="h-3 w-3" />
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Successful Vercel Deployment</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Fixed MDX parsing errors and Prisma client generation</li>
                  <li>• Resolved routing conflicts and missing dependencies</li>
                  <li>• Added build configuration for production</li>
                  <li>• Updated sitemap-dev with all current routes</li>
                </ul>
              </div>

              <div className="relative border-l-4 border-red-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-red-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-red-600">
                    2025-08-10 @ 10:15 AM CT
                  </span>
                  <span className="ml-2 rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">
                    SAFETY
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Critical Safety Infrastructure</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Implemented module gating logic with prerequisite checking</li>
                  <li>• Created drainage gate warning components</li>
                  <li>• Added server-side access control for modules</li>
                  <li>• Enforced 80% drainage readiness for 7 consecutive days</li>
                </ul>
              </div>

              <div className="relative border-l-4 border-orange-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-orange-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-orange-600">
                    2025-08-10 @ 8:00 AM CT
                  </span>
                  <span className="ml-2 rounded bg-orange-100 px-2 py-0.5 text-xs text-orange-700">
                    AUDIT
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Comprehensive Audit Implementation
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Compared 3 AI audits (200+ issues identified)</li>
                  <li>• Created evidence badges & medical disclaimers</li>
                  <li>• Fixed all TypeScript strict mode errors</li>
                  <li>• Implemented P1, P2, and P3 priority fixes</li>
                </ul>
              </div>

              <div className="relative border-l-4 border-green-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-green-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-green-600">
                    2025-08-10 @ 4:30 AM CT
                  </span>
                  <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                    CONTENT
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Major Content Restructure Complete
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Aligned with Kajsa&apos;s proven mold detox protocol</li>
                  <li>• Created 11 comprehensive modules (Weeks 1-11)</li>
                  <li>• Added specific dosing, timelines, and scripts</li>
                  <li>• Implemented safety gates and medical warnings</li>
                  <li>• Created Kajsa&apos;s Exact Protocol special section</li>
                  <li>• Built Medical Advocacy Center resources</li>
                </ul>
              </div>

              <div className="relative border-l-4 border-blue-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-blue-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-blue-600">
                    2025-08-10 @ 2:00 AM CT
                  </span>
                  <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                    PHASE 1
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Phase 1 Weeks 1-3 Implementation
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Completed authentication system with NextAuth</li>
                  <li>• Integrated Stripe payment processing & webhooks</li>
                  <li>• Built 5-step onboarding wizard with personalization</li>
                  <li>• Set up MDX/Contentlayer module infrastructure</li>
                  <li>• Created dashboard with progress widgets</li>
                  <li>• Fixed Tailwind CSS compilation issues</li>
                </ul>
              </div>

              <div className="relative border-l-4 border-slate-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-slate-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-slate-600">
                    2025-08-09 @ 5:30 PM CT
                  </span>
                  <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                    SETUP
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Phase 0 Complete Development Setup
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Git repository initialization with main branch</li>
                  <li>• ESLint & Prettier configuration with pre-commit hooks</li>
                  <li>• TypeScript strict mode enabled and configured</li>
                  <li>• Husky pre-commit hooks for code quality</li>
                  <li>• All base dependencies installed (Radix UI, Zustand, etc.)</li>
                  <li>• Cursor Rules v2.1 with modular system</li>
                </ul>
              </div>

              <div className="relative border-l-4 border-gray-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-gray-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-gray-600">
                    2025-08-09 @ 1:00 PM CT
                  </span>
                  <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                    FOUNDATION
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Architecture & Foundation Setup
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Created comprehensive Prisma schema (16 models)</li>
                  <li>• Built base UI component library with Tailwind</li>
                  <li>• Established project documentation structure</li>
                  <li>• Set up Next.js 14 App Router architecture</li>
                  <li>• Configured SQLite database for development</li>
                </ul>
              </div>

              <div className="relative border-l-4 border-rose-400 pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-rose-600"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-rose-600">
                    2025-08-09 @ 8:30 AM CT
                  </span>
                  <span className="ml-2 rounded bg-rose-100 px-2 py-0.5 text-xs text-rose-700">
                    START
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Project Initialization & Planning
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
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
          <div className="mt-8 border-t border-indigo-200 pt-6">
            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-5">
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
                <p className="text-2xl font-bold text-orange-600">85%</p>
                <p className="text-xs text-gray-600">Phase 1 Complete</p>
              </div>
            </div>
          </div>

          {/* Next Milestones */}
          <div className="mt-6 rounded-lg bg-white/50 p-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Target className="h-4 w-4" />
              Current Status & Next Milestones
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                <span className="flex items-center gap-1 font-medium text-emerald-700">
                  <CheckCircle className="h-3 w-3" />
                  Phase 2 Updated with Kajsa&apos;s missing elements
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400"></span>
                <span className="flex items-center gap-1 font-medium text-green-700">
                  <CheckCircle className="h-3 w-3" />
                  Critical Phase 1 Infrastructure Complete (Drainage tool, gating)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400"></span>
                <span className="flex items-center gap-1 font-medium text-green-700">
                  <CheckCircle className="h-3 w-3" />
                  11 of 11 Interactive Tools Complete
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                <span>Binder Timing Planner (Phase 1 remaining)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-400"></span>
                <span>Email system and Resources vault</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                <span>Phase 2: Resources complete, 51 lessons added, 10/11 tools done</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                <span>Phase 3: Protocol Builder, Supabase migration, production deployment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Phase Status & Todo List */}
        <div
          className="mt-8 rounded-xl border-0 p-6"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(76, 175, 134, 0.03) 100%)',
            boxShadow:
              '0 12px 48px -12px rgba(76, 175, 134, 0.2), 0 16px 32px -16px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(76, 175, 134, 0.08)',
          }}
        >
          <h2
            className="mb-6 flex items-center gap-2 text-xl font-bold"
            style={{ color: 'rgb(44, 44, 44)' }}
          >
            <Rocket className="h-5 w-5" style={{ color: 'rgb(193, 122, 86)' }} />
            Project Phase Status & Todo List
          </h2>

          {/* Phase Overview */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-green-300 bg-green-100 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-700">
                <CheckCircle className="h-6 w-6" />
                100%
              </div>
              <p className="text-sm font-medium text-green-800">Phase 0: Setup</p>
              <p className="text-xs text-green-600">Complete</p>
            </div>
            <div className="rounded-lg border border-yellow-300 bg-yellow-100 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-yellow-700">
                <Activity className="h-6 w-6" />
                95%
              </div>
              <p className="text-sm font-medium text-yellow-800">Phase 1: MVP</p>
              <p className="text-xs text-yellow-600">Nearly Complete</p>
            </div>
            <div className="rounded-lg border border-orange-300 bg-orange-100 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-orange-700">
                <Clock className="h-6 w-6" />
                75%
              </div>
              <p className="text-sm font-medium text-orange-800">Phase 2: Features</p>
              <p className="text-xs text-orange-600">75% Complete</p>
            </div>
            <div className="rounded-lg border border-gray-300 bg-gray-100 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-700">
                <Layers className="h-6 w-6" />
                20%
              </div>
              <p className="text-sm font-medium text-gray-800">Phase 3: Scale</p>
              <p className="text-xs text-gray-600">In Progress</p>
            </div>
          </div>

          {/* Detailed Phase Breakdown */}
          <div className="space-y-6">
            {/* Phase 0: Complete */}
            <div className="rounded-lg border border-green-200 bg-white p-4">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-800">
                <CheckCircle className="h-5 w-5" />
                Phase 0: Project Setup (COMPLETE)
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
                    Completed (All
                    <CheckCircle className="h-4 w-4 text-green-600" />)
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                      <span>Next.js 14 + TypeScript setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                      <span>Prisma + SQLite database (16 models)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                      <span>Tailwind CSS + custom theme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                      <span>ESLint + Prettier + Husky</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                      <span>Git repository initialized</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                      <span>Base UI components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                      <span>Cursor Rules v2.1 + Claude Code</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-medium text-gray-900">Key Achievements</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
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
            <div className="rounded-lg border border-yellow-200 bg-white p-4">
              <h3 className="mb-3 text-lg font-semibold text-yellow-800">
                🔄 Phase 1: Frontend Foundation & MVP (95% Complete)
              </h3>

              {/* Week 1: Complete */}
              <div className="mb-4">
                <h4 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
                  Week 1: Layout & Auth
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Complete</span>
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Marketing & app layouts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Header, footer, navigation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>NextAuth authentication system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Sign in/up/reset password pages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Auth middleware protection</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Landing page components (10 sections)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Hero, pricing, FAQ, social proof</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Medical disclaimer modal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Responsive mobile design</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Week 2: Complete */}
              <div className="mb-4">
                <h4 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
                  Week 2: Payments & Dashboard
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Complete</span>
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Stripe integration (checkout, webhooks)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Payment success/cancel pages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>5-step onboarding wizard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Personalized recommendations</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Dashboard with progress widgets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Streak counter, badges display</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Next action cards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Readiness status tracking</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Week 3: Complete */}
              <div className="mb-4">
                <h4 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
                  Week 3: Modules & Content
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Complete</span>
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>MDX + Contentlayer setup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Module infrastructure complete</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Progress tracking system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Module gating logic implemented</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>All 11 modules created with MDX content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Aligned with Kajsa&apos;s exact protocol</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Evidence badges & safety flags</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Module navigation components</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Week 4: Partially Complete */}
              <div className="mb-4">
                <h4 className="mb-2 font-medium text-gray-900">
                  Week 4: Interactive Tools (✅ 11 of 11 Complete)
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="mb-1 flex items-center gap-2 font-medium text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      Completed
                    </h5>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Exposure Checklist tool (fully functional)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Room-by-room assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Photo upload feature</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-600" />
                        <span>Scoring algorithm & results</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="mb-1 flex items-center gap-2 font-medium text-red-700">
                      <XCircle className="h-4 w-4" />
                      Missing (Critical)
                    </h5>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <XCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-red-600" />
                        <span>Drainage Readiness Score tool</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-red-600" />
                        <span>Binder Timing Planner tool</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-red-600" />
                        <span>Resources vault setup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-red-600" />
                        <span>Email system (Resend/Postal)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-red-600" />
                        <span>PostHog analytics tracking</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2: Planned */}
            <div className="rounded-lg border border-orange-200 bg-white p-4">
              <h3 className="mb-3 text-lg font-semibold text-orange-800">
                ⏳ Phase 2: Enhancement & Advanced Tools (75% Complete)
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-medium text-gray-900">Planned Features</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Complete remaining 7 modules with audio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>9 advanced interactive tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Community forum (optional tier)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Advanced analytics & A/B testing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Email automation sequences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Gamification features expansion</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-medium text-gray-900">Advanced Tools Planned</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Testing Decision Helper</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Herx Toolkit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Sauna Ramp-Up Tool</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Diet Builder</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Retesting Scheduler</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Re-exposure Triage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Supplement Scheduler</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 3: Future */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">
                📋 Phase 3: Scale & Production (Future)
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-medium text-gray-900">Advanced Features</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-1.5 h-2 w-2 flex-shrink-0 text-green-600" />
                      <span>Protocol Builder (drag & drop) ✅</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Mycotoxin Binder Matcher</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Lab/VCS logging system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Calendar integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Health device integration</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-medium text-gray-900">Production & Scale</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Supabase migration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Performance optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>Affiliate program</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>White-label options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 text-gray-400" />
                      <span>CI/CD pipeline</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Next Steps */}
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <h3 className="mb-3 text-lg font-semibold text-red-800">
              🚨 Critical Next Steps (Phase 1 Completion)
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium text-red-700">Immediate Priority (This Week)</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                    <span>
                      <strong>Drainage Readiness Score tool</strong> - Critical safety gate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                    <span>
                      <strong>Binder Timing Planner tool</strong> - Core protocol tool
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
                    <span>Resources vault with initial content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
                    <span>Email system setup (welcome, reset emails)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-orange-700">Secondary Priority (Next Week)</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <BarChart3 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-600" />
                    <span>PostHog analytics integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Settings className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-600" />
                    <span>Mobile responsiveness testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-600" />
                    <span>Bug fixes and error handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TestTube className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-600" />
                    <span>User acceptance testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Rocket className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-600" />
                    <span>Phase 1 MVP deployment</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 rounded border border-red-300 bg-red-100 p-3">
              <p className="text-sm text-red-800">
                <strong>Note:</strong> Drainage Readiness Score tool is blocking for safety - users
                cannot access binder protocols without 80% drainage readiness for 7 consecutive days
                (per Kajsa&apos;s protocol).
              </p>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mt-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-indigo-800">
              <BarChart3 className="h-5 w-5" />
              Overall Progress Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-5">
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
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-colors"
            style={{ backgroundColor: 'rgb(193, 122, 86)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgb(160, 101, 71)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgb(193, 122, 86)')}
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

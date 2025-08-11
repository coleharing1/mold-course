'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProgressWidget } from '@/components/dashboard/progress-widget'
import { NextActionCard } from '@/components/dashboard/next-action'
import { ReadinessStatus } from '@/components/dashboard/readiness-status'
import { StreakCounter } from '@/components/dashboard/streak-counter'
import { BadgesDisplay } from '@/components/dashboard/badges'
import { RetestCountdown } from '@/components/dashboard/retest-countdown'
import { DailyTip } from '@/components/dashboard/daily-tip'
import { CommunityHighlight } from '@/components/dashboard/community-highlight'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="mt-2 text-gray-600">
          You&apos;re on Day 7 of your recovery journey. Keep up the great work!
        </p>
      </div>

      {/* Main Dashboard Content with Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="next-action">Next Action</TabsTrigger>
          <TabsTrigger value="readiness">Readiness</TabsTrigger>
          <TabsTrigger value="streak">Streak</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ProgressWidget />
        </TabsContent>

        <TabsContent value="next-action" className="space-y-6">
          <NextActionCard />
        </TabsContent>

        <TabsContent value="readiness" className="space-y-6">
          <ReadinessStatus />
        </TabsContent>

        <TabsContent value="streak" className="space-y-6">
          <StreakCounter />
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <BadgesDisplay />
        </TabsContent>
      </Tabs>

      {/* Additional Dashboard Widgets */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Retest Countdown */}
        <RetestCountdown />
        
        {/* Daily Tip */}
        <DailyTip />

        {/* Recent Modules */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Quick Start Guide</p>
                  <p className="text-xs text-gray-500">Completed 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Identify Exposure</p>
                  <p className="text-xs text-gray-500">Completed yesterday</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Testing & Diagnosis</p>
                  <p className="text-xs text-gray-500">In progress - 35% complete</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Highlight */}
      <CommunityHighlight />
    </div>
  )
}

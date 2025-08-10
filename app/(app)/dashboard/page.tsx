'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProgressWidget } from '@/components/dashboard/progress-widget'
import { NextActionCard } from '@/components/dashboard/next-action'
import { ReadinessStatus } from '@/components/dashboard/readiness-status'
import { StreakCounter } from '@/components/dashboard/streak-counter'
import { BadgesDisplay } from '@/components/dashboard/badges'
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

      {/* Additional Info Section */}
      <div className="grid gap-6 md:grid-cols-2">
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

        <Card>
          <CardHeader>
            <CardTitle>Daily Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              <strong>Hydration is key!</strong> Aim for at least 64oz of clean, filtered water
              daily to support your body&apos;s natural detoxification processes. Add a pinch of
              high-quality sea salt to help with mineral balance.
            </p>
            <div className="mt-4">
              <Link href="/library/hydration-guide">
                <Button variant="outline" size="sm">
                  Learn More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Highlight */}
      <Card>
        <CardHeader>
          <CardTitle>Community Highlight</CardTitle>
          <CardDescription>Success story from a fellow student</CardDescription>
        </CardHeader>
        <CardContent>
          <blockquote className="border-l-4 border-primary-200 pl-4 italic text-gray-600">
            &ldquo;After following the drainage protocol for 2 weeks, my brain fog has significantly
            improved. The step-by-step approach made all the difference!&rdquo;
          </blockquote>
          <p className="mt-2 text-sm text-gray-500">- Sarah M., Module 4 Student</p>
        </CardContent>
      </Card>
    </div>
  )
}

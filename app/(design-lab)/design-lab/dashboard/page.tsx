/**
 * @fileoverview Dashboard Example Page - Test dashboard layouts and widgets
 * Example dashboard interface for testing different design approaches
 */

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  Activity, 
  Target, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Search,
  Droplets,
  Clock,
  BarChart3,
  FileText,
  Users,
  Settings,
  Home,
  BookOpen,
  LineChart,
  Heart,
  Brain,
  Zap,
  Sun,
  ArrowUp,
  ArrowDown,
  Minus,
  MoreVertical,
  ExternalLink,
  Info
} from 'lucide-react'

export default function DashboardExamplePage() {
  const mockStats = {
    modulesCompleted: 7,
    totalModules: 11,
    streakDays: 12,
    drainageScore: 85,
    binderReadiness: true
  }

  const recentActivity = [
    { date: '2025-01-15', action: 'Completed Module 7: Herx Management', type: 'completion', icon: CheckCircle2 },
    { date: '2025-01-14', action: 'Updated Drainage Readiness Score', type: 'assessment', icon: Activity },
    { date: '2025-01-13', action: 'Started Binder Protocol', type: 'milestone', icon: Target },
    { date: '2025-01-12', action: 'Completed Exposure Checklist', type: 'tool', icon: FileText }
  ]

  const nextActions = [
    { title: 'Complete Module 8', description: 'Supporting Modalities', urgent: false, icon: BookOpen, progress: 0 },
    { title: 'Weekly Drainage Assessment', description: 'Due in 2 days', urgent: true, icon: Droplets, progress: 75 },
    { title: 'Review Binder Protocol', description: 'Check progress and adjust', urgent: false, icon: Activity, progress: 30 }
  ]

  const quickAccessTools = [
    { label: 'Exposure Checklist', icon: Search, usage: '2.3k uses', trending: 'up' },
    { label: 'Drainage Score', icon: Droplets, usage: '1.8k uses', trending: 'up' },
    { label: 'Binder Planner', icon: Clock, usage: '945 uses', trending: 'stable' },
    { label: 'Progress Report', icon: BarChart3, usage: '1.2k uses', trending: 'down' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Dashboard Example
              </h1>
            </div>
            <p className="text-muted-foreground">
              Preview dashboard layouts, widgets, and user interface patterns
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Customize
          </Button>
        </div>
      </div>

      {/* Welcome Section - Enhanced Card */}
      <Card className="mb-8 relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl" />
        <CardContent className="pt-8 pb-8 relative">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider">Welcome back</p>
              <h2 className="text-3xl font-bold text-gray-900">Sarah Chen</h2>
              <p className="text-gray-600 mt-2">You're making excellent progress on your recovery journey.</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">Active Now</span>
                </div>
                <div className="text-sm text-gray-500">|</div>
                <span className="text-sm text-gray-600">Last seen: 2 hours ago</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-2xl blur-xl opacity-50" />
              <div className="relative p-4 bg-white rounded-2xl shadow-lg">
                <TrendingUp className="h-10 w-10 text-emerald-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview - Enhanced Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Progress Card */}
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl" />
          <CardHeader className="pb-3 relative">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-1">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="text-2xl font-bold mt-4">
              {mockStats.modulesCompleted}/{mockStats.totalModules}
            </CardTitle>
            <p className="text-sm text-muted-foreground">Modules Completed</p>
          </CardHeader>
          <CardContent>
            <Progress 
              value={(mockStats.modulesCompleted / mockStats.totalModules) * 100} 
              className="h-2 bg-blue-100" 
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">64% Complete</span>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <ArrowUp className="h-3 w-3" />
                <span>12% this week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streak Card */}
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-2xl" />
          <CardHeader className="pb-3 relative">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="h-5 w-5 text-orange-600" />
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-0">Best</Badge>
            </div>
            <CardTitle className="text-2xl font-bold mt-4 flex items-baseline gap-2">
              {mockStats.streakDays}
              <span className="text-sm font-normal text-muted-foreground">days</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">Current Streak</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-8 rounded ${
                    i < 5 ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">5 days this week</span>
              <div className="flex items-center gap-1 text-xs text-orange-600">
                <Activity className="h-3 w-3" />
                <span>On fire!</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Drainage Score Card */}
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-2xl" />
          <CardHeader className="pb-3 relative">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-green-100 rounded-lg">
                <Droplets className="h-5 w-5 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-700 border-0">Optimal</Badge>
            </div>
            <CardTitle className="text-2xl font-bold mt-4 text-green-600">
              {mockStats.drainageScore}%
            </CardTitle>
            <p className="text-sm text-muted-foreground">Drainage Score</p>
          </CardHeader>
          <CardContent>
            <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                style={{ width: `${mockStats.drainageScore}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-700">Ready for Binders</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">Target: 80%</span>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <ArrowUp className="h-3 w-3" />
                <span>+5 points</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Binder Status Card */}
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl" />
          <CardHeader className="pb-3 relative">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Heart className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-600 font-medium">Active</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold mt-4">Day 5</CardTitle>
            <p className="text-sm text-muted-foreground">Binder Protocol</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Morning Dose</span>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Evening Dose</span>
                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              Log Dose
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Next Actions - Enhanced */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="border-b bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle>Your Next Actions</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                View All
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <CardDescription>Recommended steps to continue your progress</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {nextActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-xl ${
                        action.urgent 
                          ? 'bg-red-100' 
                          : 'bg-gray-100'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          action.urgent 
                            ? 'text-red-600' 
                            : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{action.title}</h4>
                            <p className="text-sm text-muted-foreground mt-0.5">{action.description}</p>
                          </div>
                          {action.urgent && (
                            <Badge variant="destructive" className="text-xs ml-2">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <Progress value={action.progress} className="flex-1 h-1.5" />
                          <span className="text-xs text-muted-foreground">{action.progress}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Started 2 days ago
                          </span>
                          <Button size="sm" variant={action.urgent ? "default" : "outline"}>
                            {action.progress > 0 ? 'Continue' : 'Start'}
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity - Enhanced */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle>Recent Activity</CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>Your latest progress updates</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon
                const colors = {
                  completion: 'bg-green-100 text-green-600',
                  assessment: 'bg-blue-100 text-blue-600',
                  milestone: 'bg-purple-100 text-purple-600',
                  tool: 'bg-orange-100 text-orange-600'
                }
                return (
                  <div key={index} className="flex items-start gap-3 group cursor-pointer">
                    <div className="relative">
                      <div className={`p-2 rounded-lg ${colors[activity.type as keyof typeof colors]} transition-all group-hover:scale-110`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {index < recentActivity.length - 1 && (
                        <div className="absolute left-1/2 top-full w-0.5 h-6 bg-gray-200 -translate-x-1/2" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{activity.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View Full History
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Tools - Enhanced */}
      <Card className="mt-6 border-0 shadow-lg">
        <CardHeader className="border-b bg-gray-50/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Quick Access Tools
              </CardTitle>
              <CardDescription>Jump to commonly used tools and assessments</CardDescription>
            </div>
            <Badge variant="secondary">4 Tools</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickAccessTools.map((tool, index) => {
              const Icon = tool.icon
              const trendColors = {
                up: 'text-green-600',
                down: 'text-red-600',
                stable: 'text-gray-600'
              }
              const TrendIcon = tool.trending === 'up' ? ArrowUp : tool.trending === 'down' ? ArrowDown : Minus
              
              return (
                <Card 
                  key={index}
                  className="border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2.5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className={`flex items-center gap-0.5 text-xs ${trendColors[tool.trending as keyof typeof trendColors]}`}>
                        <TrendIcon className="h-3 w-3" />
                      </div>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{tool.label}</h4>
                    <p className="text-xs text-muted-foreground">{tool.usage}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Navigation - Enhanced */}
      <Card className="mt-6 border-0 shadow-lg">
        <CardContent className="p-2">
          <div className="flex items-center justify-around">
            {[
              { icon: Home, label: 'Home', active: true },
              { icon: BookOpen, label: 'Modules', active: false },
              { icon: BarChart3, label: 'Analytics', active: false },
              { icon: Users, label: 'Community', active: false },
              { icon: Settings, label: 'Settings', active: false }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <Button 
                  key={index}
                  variant={item.active ? "secondary" : "ghost"} 
                  className="flex flex-col items-center gap-1 h-auto py-3 px-4 rounded-xl"
                >
                  <Icon className={`h-5 w-5 ${item.active ? 'text-primary' : ''}`} />
                  <span className={`text-xs ${item.active ? 'font-medium' : ''}`}>{item.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
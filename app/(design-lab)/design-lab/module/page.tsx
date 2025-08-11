/**
 * @fileoverview Module Example Page - Test module content layouts and progression
 * Example module page interface for testing educational content presentation
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Lock, 
  PlayCircle,
  FileText,
  Users,
  TestTube,
  TrendingUp,
  XCircle,
  Circle,
  Target
} from 'lucide-react'

export default function ModuleExamplePage() {
  const [lessonProgress, setLessonProgress] = useState(3)
  const totalLessons = 5

  const moduleInfo = {
    number: "01",
    title: "Understanding Mold Exposure",
    description: "Learn to identify and assess mold exposure in your environment",
    duration: "45 minutes",
    status: "in_progress",
    completionRate: 60
  }

  const lessons = [
    { id: 1, title: "What is Mold Toxicity?", duration: "8 min", completed: true },
    { id: 2, title: "Common Sources of Exposure", duration: "12 min", completed: true },
    { id: 3, title: "Symptoms and Health Effects", duration: "10 min", completed: true },
    { id: 4, title: "Testing Your Environment", duration: "15 min", current: true },
    { id: 5, title: "Creating an Action Plan", duration: "10 min", locked: false }
  ]

  const keyTakeaways = [
    "Mold exposure can cause a wide range of health symptoms",
    "Testing your environment is crucial for identifying sources",
    "Professional remediation may be necessary for severe infestations",
    "Prevention is key to avoiding re-exposure"
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Module Example</h1>
        </div>
        <p className="text-muted-foreground">
          Test module content layout, progression, and educational interface
        </p>
      </div>

      {/* Module Header */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-xl relative overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  Module {moduleInfo.number}
                </Badge>
                <Badge variant="outline">{moduleInfo.duration}</Badge>
              </div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">{moduleInfo.title}</h2>
              <p className="text-blue-700">{moduleInfo.description}</p>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <TestTube className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 mb-1">Progress: {moduleInfo.completionRate}%</p>
              <Progress value={moduleInfo.completionRate} className="w-48" />
            </div>
            <Button>Continue Learning</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Content Tabs */}
          <Card className="relative overflow-hidden border-0 shadow-lg">
            <CardContent className="pt-6">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="mt-6 space-y-4">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-3">Current Lesson: Testing Your Environment</h3>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <strong className="text-yellow-800">Safety First</strong>
                      </div>
                      <p className="text-yellow-700 text-sm">
                        Always ensure proper safety equipment when collecting mold samples. 
                        Consider professional testing for severe infestations.
                      </p>
                    </div>

                    <p className="mb-4">
                      Environmental testing is a crucial step in identifying mold exposure sources. 
                      There are several methods available, each with their own advantages and limitations.
                    </p>

                    <h4 className="font-semibold mb-2">Testing Methods:</h4>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                      <li><strong>Air Quality Testing:</strong> Measures airborne mold spores</li>
                      <li><strong>Surface Sampling:</strong> Tests visible mold growth areas</li>
                      <li><strong>Bulk Sampling:</strong> Analyzes materials suspected of contamination</li>
                      <li><strong>Professional Inspection:</strong> Comprehensive assessment by experts</li>
                    </ul>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Pro Tip
                      </h4>
                      <p className="text-blue-700 text-sm">
                        Start with visual inspection and air quality testing before moving to more 
                        expensive professional assessments.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Your Notes</h3>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-500">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>Take notes as you progress through the module</p>
                      <Button variant="outline" className="mt-2">Add Note</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="resources" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Additional Resources</h3>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Mold Testing Checklist</div>
                          <div className="text-sm text-muted-foreground">PDF Download</div>
                        </div>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">EPA Mold Guidelines</div>
                          <div className="text-sm text-muted-foreground">External Link</div>
                        </div>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="quiz" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Knowledge Check</h3>
                    <div className="p-4 border rounded-lg">
                      <p className="font-medium mb-2">What is the most important safety consideration when testing for mold?</p>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="radio" name="safety" value="a" />
                          <span className="text-sm">Using expensive equipment</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="safety" value="b" />
                          <span className="text-sm">Wearing proper protective equipment</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="safety" value="c" />
                          <span className="text-sm">Testing during daytime only</span>
                        </label>
                      </div>
                      <Button className="mt-4" size="sm">Submit Answer</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <Button variant="outline">← Previous Lesson</Button>
                <span className="text-sm text-muted-foreground">
                  Lesson {lessonProgress} of {totalLessons}
                </span>
                <Button>Next Lesson →</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Lesson Progress */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4" />
                Lesson Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      lesson.completed 
                        ? 'bg-green-100 text-green-700' 
                        : lesson.current 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {lesson.completed ? <CheckCircle2 className="h-3 w-3" /> : lesson.id}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${lesson.current ? 'text-blue-700' : ''}`}>
                        {lesson.title}
                      </div>
                      <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Module Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start group">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Progress
                <ChevronRight className="h-3 w-3 ml-auto transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start group">
                <FileText className="h-4 w-4 mr-2" />
                Take Notes
                <ChevronRight className="h-3 w-3 ml-auto transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start group">
                <Users className="h-4 w-4 mr-2" />
                Ask Question
                <ChevronRight className="h-3 w-3 ml-auto transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start group">
                <BookOpen className="h-4 w-4 mr-2" />
                Print Module
                <ChevronRight className="h-3 w-3 ml-auto transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

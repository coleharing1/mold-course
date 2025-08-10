'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  PlayCircle,
  Lock,
  FileText,
  Video,
  HelpCircle,
  Download,
  ChevronRight,
  Target,
  AlertCircle
} from 'lucide-react'

// Mock data - will come from Contentlayer
const moduleData = {
  '00-quick-start': {
    title: 'Quick Start Guide',
    description: 'Your first 5 essential steps to begin mold detoxification safely and effectively',
    moduleNumber: 0,
    duration: '30 minutes',
    difficulty: 'beginner',
    category: 'foundation',
    progress: 100,
    objectives: [
      'Understand the immediate safety steps for mold exposure',
      'Learn the foundation of mold detoxification',
      'Set up your recovery environment',
      'Begin basic detox support protocols',
      'Create your recovery tracking system'
    ],
    lessons: [
      {
        id: 1,
        title: 'Stop the Exposure',
        type: 'reading',
        duration: '5 min',
        completed: true,
        description: 'Learn to identify and eliminate mold sources'
      },
      {
        id: 2,
        title: 'Open Drainage Pathways',
        type: 'video',
        duration: '8 min',
        completed: true,
        description: 'Prepare your body for safe detoxification'
      },
      {
        id: 3,
        title: 'Reduce Inflammation',
        type: 'reading',
        duration: '6 min',
        completed: true,
        description: 'Anti-inflammatory strategies for healing'
      },
      {
        id: 4,
        title: 'Bind and Remove Toxins',
        type: 'exercise',
        duration: '7 min',
        completed: true,
        description: 'Introduction to binder protocols'
      },
      {
        id: 5,
        title: 'Track Your Progress',
        type: 'quiz',
        duration: '4 min',
        completed: true,
        description: 'Set up your recovery tracking system'
      }
    ],
    resources: [
      { title: 'Exposure Checklist PDF', type: 'pdf', size: '245 KB' },
      { title: 'Symptom Tracker Template', type: 'excel', size: '128 KB' },
      { title: 'Quick Reference Guide', type: 'pdf', size: '512 KB' }
    ],
    nextModule: '01-understanding-mold',
    previousModule: null
  },
  '01-understanding-mold': {
    title: 'Understanding Mold Illness',
    description: 'Comprehensive overview of mold toxicity, mycotoxins, and how they affect your body',
    moduleNumber: 1,
    duration: '45 minutes',
    difficulty: 'beginner',
    category: 'foundation',
    progress: 60,
    objectives: [
      'Understand the science of mold illness and CIRS',
      'Identify different types of toxic molds and mycotoxins',
      'Learn how mold affects different body systems',
      'Recognize the stages of mold illness',
      'Understand genetic susceptibility factors'
    ],
    lessons: [
      {
        id: 1,
        title: 'What Makes Mold Toxic',
        type: 'video',
        duration: '7 min',
        completed: true,
        description: 'Introduction to mycotoxins and biotoxins'
      },
      {
        id: 2,
        title: 'Types of Toxic Molds',
        type: 'reading',
        duration: '5 min',
        completed: true,
        description: 'Common indoor molds and their effects'
      },
      {
        id: 3,
        title: 'The Biotoxin Pathway',
        type: 'video',
        duration: '8 min',
        completed: true,
        description: 'How mycotoxins affect your body'
      },
      {
        id: 4,
        title: 'CIRS Explained',
        type: 'reading',
        duration: '6 min',
        completed: true,
        description: 'Chronic Inflammatory Response Syndrome'
      },
      {
        id: 5,
        title: 'Body Systems Affected',
        type: 'video',
        duration: '9 min',
        completed: true,
        description: 'Multi-system impacts of mold illness'
      },
      {
        id: 6,
        title: 'Genetic Susceptibility',
        type: 'reading',
        duration: '5 min',
        completed: false,
        description: 'HLA-DR genes and mold sensitivity'
      },
      {
        id: 7,
        title: 'Testing Options',
        type: 'exercise',
        duration: '6 min',
        completed: false,
        description: 'Overview of mold and mycotoxin testing'
      },
      {
        id: 8,
        title: 'Knowledge Check',
        type: 'quiz',
        duration: '4 min',
        completed: false,
        description: 'Test your understanding'
      }
    ],
    resources: [
      { title: 'Mycotoxin Reference Guide', type: 'pdf', size: '890 KB' },
      { title: 'CIRS Diagnostic Criteria', type: 'pdf', size: '456 KB' },
      { title: 'Lab Test Interpretation Guide', type: 'pdf', size: '1.2 MB' }
    ],
    nextModule: '02-exposure-assessment',
    previousModule: '00-quick-start'
  }
}

const getLessonIcon = (type: string) => {
  switch(type) {
    case 'video': return <Video className="h-4 w-4" />
    case 'reading': return <FileText className="h-4 w-4" />
    case 'exercise': return <Target className="h-4 w-4" />
    case 'quiz': return <HelpCircle className="h-4 w-4" />
    default: return <BookOpen className="h-4 w-4" />
  }
}

const getLessonTypeColor = (type: string) => {
  switch(type) {
    case 'video': return 'bg-blue-100 text-blue-800'
    case 'reading': return 'bg-green-100 text-green-800'
    case 'exercise': return 'bg-purple-100 text-purple-800'
    case 'quiz': return 'bg-orange-100 text-orange-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('lessons')
  
  const module = moduleData[params.slug as keyof typeof moduleData]
  
  if (!module) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Module Not Found</h2>
            <p className="text-gray-600 mb-4">The module you're looking for doesn't exist.</p>
            <Link href="/modules">
              <Button>Back to Modules</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const completedLessons = module.lessons.filter(l => l.completed).length
  const currentLesson = module.lessons.find(l => !l.completed) || module.lessons[0]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Navigation */}
      <Link href="/modules" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Modules
      </Link>

      {/* Module Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="outline">Module {String(module.moduleNumber).padStart(2, '0')}</Badge>
          <Badge className={
            module.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }>
            {module.difficulty}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{module.title}</h1>
        <p className="text-gray-600 mb-4">{module.description}</p>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {completedLessons} of {module.lessons.length} lessons completed
            </span>
            <span className="font-semibold">{module.progress}%</span>
          </div>
          <Progress value={module.progress} className="h-3" />
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {module.duration}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {module.lessons.length} lessons
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            {module.resources.length} resources
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {module.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Tabs for Lessons and Resources */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-4 mt-6">
          {/* Continue Learning Card */}
          {module.progress < 100 && (
            <Card className="bg-primary-50 border-primary-200 mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Continue where you left off</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{currentLesson.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{currentLesson.description}</p>
                  </div>
                  <Button>
                    Start Lesson
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lessons List */}
          <div className="space-y-3">
            {module.lessons.map((lesson) => (
              <Card 
                key={lesson.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  lesson.completed ? 'bg-gray-50' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Status Icon */}
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : lesson === currentLesson ? (
                          <PlayCircle className="h-6 w-6 text-blue-600" />
                        ) : (
                          <Lock className="h-6 w-6 text-gray-400" />
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">
                            Lesson {lesson.id}: {lesson.title}
                          </h3>
                          <Badge className={getLessonTypeColor(lesson.type)}>
                            {getLessonIcon(lesson.type)}
                            <span className="ml-1">{lesson.type}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{lesson.description}</p>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {lesson.duration}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <div className="grid gap-4">
            {module.resources.map((resource, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-gray-600">
                          {resource.type.toUpperCase()} • {resource.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation Footer */}
      <div className="mt-8 flex justify-between">
        {module.previousModule ? (
          <Link href={`/modules/${module.previousModule}`}>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Module
            </Button>
          </Link>
        ) : (
          <div />
        )}
        
        {module.nextModule ? (
          <Link href={`/modules/${module.nextModule}`}>
            <Button>
              Next Module
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  ArrowLeft, 
  ArrowRight,
  Clock, 
  CheckCircle, 
  PlayCircle,
  FileText,
  Video,
  Target,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  Bookmark,
  Share2,
  MessageSquare
} from 'lucide-react'

// Mock lesson content - will come from Contentlayer
const lessonContent = {
  '00-quick-start': {
    '1': {
      title: 'Stop the Exposure',
      type: 'reading',
      duration: '5 min',
      content: `
# Stop the Exposure

The single most important factor in recovery is removing yourself from ongoing mold exposure.

## Why This Step Comes First

You cannot heal while still being poisoned. It's like trying to bail water out of a boat with a hole in it. No matter how many supplements you take or protocols you follow, continuous exposure will prevent recovery.

## Immediate Actions

### 1. Identify Potential Sources
- Check all areas where water damage has occurred
- Look for visible mold growth
- Notice musty odors
- Document everything with photos

### 2. Quick Assessment Questions
- Have you had any water leaks in the past year?
- Do you see any water stains on walls or ceilings?
- Is there a musty smell anywhere in your home?
- Do you feel worse in certain rooms?
- Do symptoms improve when you leave the building?

### 3. Emergency Measures
If you've identified active mold exposure:
- **Create distance:** Spend as little time as possible in affected areas
- **Seal off:** Close doors to moldy rooms, use plastic sheeting if needed
- **Filter air:** Run HEPA air purifiers on high
- **Open windows:** When outdoor humidity is low (below 50%)

## The "Safe Room" Strategy

If you can't immediately leave a moldy environment, create one safe space:

1. Choose a room with:
   - No visible mold or water damage
   - Good ventilation
   - Minimal furniture and belongings

2. Deep clean everything:
   - HEPA vacuum all surfaces
   - Wipe with borax solution
   - Wash all fabrics

3. Install protection:
   - Quality HEPA air purifier
   - Dehumidifier if needed
   - Door seal to prevent cross-contamination

## When to Consider Relocation

Sometimes leaving is the only option. Consider temporary relocation if:
- Extensive visible mold (>10 sq ft)
- Mold inside walls or HVAC system
- Landlord refuses to remediate
- Severe symptoms that worsen at home
- Black mold (Stachybotrys) confirmed

## Action Checklist

- [ ] Complete visual inspection of living space
- [ ] Document all findings with photos
- [ ] Identify your worst exposure areas
- [ ] Implement immediate protective measures
- [ ] Consider air quality testing
- [ ] Make relocation plan if needed

## Key Takeaway

**Your environment is the foundation of recovery.** Every other intervention builds on this first crucial step. Take it seriously, act quickly, and don't compromise on creating a safe space for healing.
      `,
      nextLesson: '2',
      previousLesson: null,
      moduleSlug: '00-quick-start'
    },
    '2': {
      title: 'Open Drainage Pathways',
      type: 'video',
      duration: '8 min',
      videoUrl: 'https://example.com/video-placeholder',
      content: `
# Open Your Drainage Pathways

Before you can safely detox from mold, you must ensure your body's elimination routes are functioning properly.

## Video Transcript

[Video content would be embedded here]

## The Drainage Hierarchy

Your body has a specific order for opening drainage pathways:

1. **Colon** (most important)
2. **Liver and Bile Flow**
3. **Kidneys**
4. **Lymphatic System**
5. **Skin**

Think of it like unclogging a drain - you have to start at the bottom and work your way up.

## Supporting Each Pathway

### Colon Support
- **Goal:** 1-3 bowel movements daily
- **Solutions:**
  - Magnesium citrate: 400-800mg before bed
  - Vitamin C to bowel tolerance
  - Psyllium husk: 1 tbsp in water
  - Triphala: Traditional Ayurvedic blend

### Liver and Bile Support
- **Coffee enemas** (controversial but effective)
- **Castor oil packs** over liver area
- **Milk thistle:** 250mg 2x daily
- **Dandelion root tea:** 2-3 cups daily

### Kidney Support
- **Hydration:** Half body weight in ounces
- **Lemon water:** Fresh lemon in warm water
- **Parsley tea:** Natural diuretic
- **Reduce sodium intake**

### Lymphatic Support
- **Dry brushing:** 5 minutes before shower
- **Rebounding:** 10 minutes daily
- **Deep breathing:** Moves lymph fluid
- **Lymphatic massage**

### Skin Support
- **Sweating:** Sauna, exercise, hot baths
- **Epsom salt baths:** 2 cups in hot water
- **Dry brushing:** Removes dead skin
- **Clean personal care products**

## Quick Start Protocol

Start with these basics for 1 week before adding binders:

**Morning:**
- Warm lemon water (16 oz)
- Deep breathing (5 minutes)
- Dry brushing before shower

**Throughout Day:**
- Hydrate consistently
- Move every hour
- Take stairs when possible

**Evening:**
- Magnesium citrate (400mg)
- Epsom salt bath (20 minutes)
- Castor oil pack (optional)

## Warning Signs

Stop and reassess if you experience:
- Severe constipation
- Extreme fatigue
- Skin breakouts
- Worsening symptoms

These may indicate drainage pathways need more support.
      `,
      nextLesson: '3',
      previousLesson: '1',
      moduleSlug: '00-quick-start'
    }
  }
}

export default function LessonViewerPage() {
  const params = useParams()
  const router = useRouter()
  const [completed, setCompleted] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  
  const moduleSlug = params.slug as string
  const lessonId = params.lessonId as string
  
  const lesson = lessonContent[moduleSlug]?.[lessonId]
  
  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Lesson Not Found</h2>
            <p className="text-gray-600 mb-4">The lesson you're looking for doesn't exist.</p>
            <Link href={`/modules/${moduleSlug}`}>
              <Button>Back to Module</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleComplete = () => {
    setCompleted(true)
    // Save progress to database
    // Redirect to next lesson after delay
    if (lesson.nextLesson) {
      setTimeout(() => {
        router.push(`/modules/${moduleSlug}/lessons/${lesson.nextLesson}`)
      }, 1500)
    }
  }

  const getLessonIcon = () => {
    switch(lesson.type) {
      case 'video': return <Video className="h-5 w-5" />
      case 'reading': return <FileText className="h-5 w-5" />
      case 'exercise': return <Target className="h-5 w-5" />
      default: return <BookOpen className="h-5 w-5" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Link 
          href={`/modules/${moduleSlug}`}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Module
        </Link>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setBookmarked(!bookmarked)}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Badge className="flex items-center gap-1">
            {getLessonIcon()}
            {lesson.type}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            {lesson.duration}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{lesson.title}</h1>
      </div>

      {/* Video Player (if video lesson) */}
      {lesson.type === 'video' && lesson.videoUrl && (
        <Card className="mb-8">
          <CardContent className="p-0">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <PlayCircle className="h-16 w-16 text-gray-400" />
              <span className="sr-only">Video player placeholder</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lesson Content */}
      <Card className="mb-8">
        <CardContent className="prose prose-lg max-w-none p-8">
          <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox 
                id="complete"
                checked={completed}
                onCheckedChange={() => handleComplete()}
              />
              <label 
                htmlFor="complete" 
                className="text-sm font-medium cursor-pointer"
              >
                Mark as complete
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask Question
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Notes
              </Button>
            </div>
          </div>
          
          {completed && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-800">
                Great job! Moving to next lesson...
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center">
        {lesson.previousLesson ? (
          <Link href={`/modules/${moduleSlug}/lessons/${lesson.previousLesson}`}>
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Lesson
            </Button>
          </Link>
        ) : (
          <div />
        )}
        
        {lesson.nextLesson ? (
          <Link href={`/modules/${moduleSlug}/lessons/${lesson.nextLesson}`}>
            <Button>
              Next Lesson
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        ) : (
          <Link href={`/modules/${moduleSlug}`}>
            <Button>
              Complete Module
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
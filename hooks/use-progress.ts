import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface ModuleProgress {
  moduleId: string
  completedLessons: string[]
  lastAccessed: Date
  isCompleted: boolean
}

interface ProgressData {
  progress: Record<string, ModuleProgress>
  totalModulesCompleted: number
  lastActivity: Date | null
}

export function useProgress() {
  const { data: session, status } = useSession()
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch progress data
  const fetchProgress = async () => {
    if (!session?.user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/progress')
      
      if (!response.ok) {
        throw new Error('Failed to fetch progress')
      }

      const data = await response.json()
      setProgress(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching progress:', err)
      setError('Failed to load progress')
    } finally {
      setLoading(false)
    }
  }

  // Update progress for a lesson
  const updateLessonProgress = async (
    moduleId: string, 
    lessonId: string, 
    completed: boolean = true
  ) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId,
          lessonId,
          completed
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update progress')
      }

      // Refresh progress data
      await fetchProgress()
      
      return { success: true }
    } catch (err) {
      console.error('Error updating progress:', err)
      return { success: false, error: 'Failed to update progress' }
    }
  }

  // Mark entire module as complete
  const completeModule = async (moduleId: string) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId,
          completed: true,
          moduleCompleted: true
        })
      })

      if (!response.ok) {
        throw new Error('Failed to complete module')
      }

      await fetchProgress()
      
      return { success: true }
    } catch (err) {
      console.error('Error completing module:', err)
      return { success: false, error: 'Failed to complete module' }
    }
  }

  // Reset progress for a module
  const resetModuleProgress = async (moduleId: string) => {
    try {
      const response = await fetch(`/api/progress?moduleId=${moduleId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to reset progress')
      }

      await fetchProgress()
      
      return { success: true }
    } catch (err) {
      console.error('Error resetting progress:', err)
      return { success: false, error: 'Failed to reset progress' }
    }
  }

  // Calculate progress percentage for a module
  const getModuleProgress = (moduleId: string, totalLessons: number): number => {
    if (!progress?.progress[moduleId]) return 0
    
    const completedCount = progress.progress[moduleId].completedLessons.length
    return Math.round((completedCount / totalLessons) * 100)
  }

  // Check if a lesson is completed
  const isLessonCompleted = (moduleId: string, lessonId: string): boolean => {
    if (!progress?.progress[moduleId]) return false
    return progress.progress[moduleId].completedLessons.includes(lessonId)
  }

  // Check if a module is completed
  const isModuleCompleted = (moduleId: string): boolean => {
    if (!progress?.progress[moduleId]) return false
    return progress.progress[moduleId].isCompleted
  }

  // Get next uncompleted lesson in a module
  const getNextLesson = (moduleId: string, lessons: string[]): string | null => {
    if (!progress?.progress[moduleId]) return lessons[0] || null
    
    const completedLessons = progress.progress[moduleId].completedLessons
    const nextLesson = lessons.find(lessonId => !completedLessons.includes(lessonId))
    
    return nextLesson || null
  }

  // Load progress on mount and when session changes
  useEffect(() => {
    if (status === 'authenticated') {
      fetchProgress()
    } else if (status === 'unauthenticated') {
      setProgress(null)
      setLoading(false)
    }
  }, [status])

  return {
    progress,
    loading,
    error,
    updateLessonProgress,
    completeModule,
    resetModuleProgress,
    getModuleProgress,
    isLessonCompleted,
    isModuleCompleted,
    getNextLesson,
    refreshProgress: fetchProgress
  }
}
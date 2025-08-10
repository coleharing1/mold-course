import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-options'
import { prisma } from '@/lib/db/prisma'
import { getMockServerSession, getMockUser } from '@/lib/auth/mock-session'

// GET user's progress for all modules
export async function GET(req: Request) {
  try {
    // TODO: RE-ENABLE REAL AUTH IN PHASE 3
    // const session = await getServerSession(authOptions)
    const session = await getMockServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to view progress' },
        { status: 401 }
      )
    }

    // TODO: RE-ENABLE REAL DATABASE LOOKUP IN PHASE 3
    // For now, return mock progress data for development
    const mockProgress = {
      '00-quick-start': {
        moduleId: '00-quick-start',
        completedLessons: ['1', '2', '3', '4', '5'],
        lastAccessed: new Date(),
        isCompleted: true
      },
      '01-understanding-mold': {
        moduleId: '01-understanding-mold',
        completedLessons: ['1', '2', '3', '4', '5'],
        lastAccessed: new Date(),
        isCompleted: false
      }
    }

    return NextResponse.json({
      progress: mockProgress,
      totalModulesCompleted: 1,
      lastActivity: new Date()
    })
  } catch (error) {
    console.error('Get progress error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve progress' },
      { status: 500 }
    )
  }
}

// POST to update progress for a lesson or module
export async function POST(req: Request) {
  try {
    // TODO: RE-ENABLE REAL AUTH IN PHASE 3
    // const session = await getServerSession(authOptions)
    const session = await getMockServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to update progress' },
        { status: 401 }
      )
    }

    const { moduleId, lessonId, completed, moduleCompleted } = await req.json()

    if (!moduleId) {
      return NextResponse.json(
        { error: 'Module ID is required' },
        { status: 400 }
      )
    }

    // TODO: RE-ENABLE REAL DATABASE UPDATES IN PHASE 3
    // For now, just return success for development
    const mockProgress = {
      id: 'mock-progress-id',
      userId: 'dev-user-001',
      moduleId,
      lessonId: lessonId || 'module-complete',
      completed,
      moduleCompleted: moduleCompleted || false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return NextResponse.json({
      success: true,
      progress: mockProgress,
      message: 'Progress updated successfully (mock)'
    })
  } catch (error) {
    console.error('Update progress error:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}

// DELETE to reset progress for a module
export async function DELETE(req: Request) {
  try {
    // TODO: RE-ENABLE REAL AUTH IN PHASE 3
    // const session = await getServerSession(authOptions)
    const session = await getMockServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to reset progress' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const moduleId = searchParams.get('moduleId')

    if (!moduleId) {
      return NextResponse.json(
        { error: 'Module ID is required' },
        { status: 400 }
      )
    }

    // TODO: RE-ENABLE REAL DATABASE DELETION IN PHASE 3
    // For now, just return success for development

    return NextResponse.json({
      success: true,
      message: 'Module progress reset successfully (mock)'
    })
  } catch (error) {
    console.error('Reset progress error:', error)
    return NextResponse.json(
      { error: 'Failed to reset progress' },
      { status: 500 }
    )
  }
}
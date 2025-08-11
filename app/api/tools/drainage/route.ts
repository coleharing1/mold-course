import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-options'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      // Allow saving to localStorage only (no database)
      return NextResponse.json({ 
        success: true, 
        message: 'Data saved locally only (not logged in)' 
      })
    }

    const body = await request.json()
    const { entries } = body

    // Save or update the tool state
    const toolState = await prisma.toolState.upsert({
      where: {
        userId_toolType: {
          userId: session.user.id,
          toolType: 'drainage-readiness'
        }
      },
      update: {
        state: JSON.stringify({ entries }),
        lastSaved: new Date()
      },
      create: {
        userId: session.user.id,
        toolType: 'drainage-readiness',
        state: JSON.stringify({ entries }),
        lastSaved: new Date()
      }
    })

    // Also save today's readiness score to the Readiness table for gating logic
    if (entries.length > 0) {
      const latestEntry = entries[entries.length - 1]
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      await prisma.readiness.upsert({
        where: {
          userId_date: {
            userId: session.user.id,
            date: today
          }
        },
        update: {
          score: latestEntry.score,
          metrics: JSON.stringify(latestEntry.metrics)
        },
        create: {
          userId: session.user.id,
          date: today,
          score: latestEntry.score,
          metrics: JSON.stringify(latestEntry.metrics)
        }
      })

      // Check if user has unlocked binders (7 consecutive days >= 80%)
      if (entries.length >= 7) {
        const last7Days = entries.slice(-7)
        const allAbove80 = last7Days.every((e: any) => e.score >= 80)
        
        if (allAbove80) {
          // Award badge if not already earned
          await prisma.badge.upsert({
            where: {
              userId_type: {
                userId: session.user.id,
                type: 'drainage-unlocked'
              }
            },
            update: {},
            create: {
              userId: session.user.id,
              type: 'drainage-unlocked'
            }
          })
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Data saved successfully',
      id: toolState.id
    })
  } catch (error) {
    console.error('Error saving drainage readiness:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const toolState = await prisma.toolState.findUnique({
      where: {
        userId_toolType: {
          userId: session.user.id,
          toolType: 'drainage-readiness'
        }
      }
    })

    if (!toolState) {
      return NextResponse.json({ 
        success: true, 
        data: null,
        message: 'No saved data found'
      })
    }

    const data = JSON.parse(toolState.state as string)
    
    // Also get historical readiness scores
    const historicalScores = await prisma.readiness.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        date: 'asc'
      },
      take: 30 // Last 30 days
    })

    return NextResponse.json({ 
      success: true,
      data,
      historicalScores,
      lastSaved: toolState.lastSaved
    })
  } catch (error) {
    console.error('Error loading drainage readiness:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load data' },
      { status: 500 }
    )
  }
}
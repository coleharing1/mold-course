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
    const { rooms, score, riskLevel } = body

    // Save or update the tool state
    const toolState = await prisma.toolState.upsert({
      where: {
        userId_toolType: {
          userId: session.user.id,
          toolType: 'exposure-checklist'
        }
      },
      update: {
        state: JSON.stringify({ rooms, score, riskLevel }),
        lastSaved: new Date()
      },
      create: {
        userId: session.user.id,
        toolType: 'exposure-checklist',
        state: JSON.stringify({ rooms, score, riskLevel }),
        lastSaved: new Date()
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Data saved successfully',
      id: toolState.id
    })
  } catch (error) {
    console.error('Error saving exposure checklist:', error)
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
          toolType: 'exposure-checklist'
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
    
    return NextResponse.json({ 
      success: true,
      data,
      lastSaved: toolState.lastSaved
    })
  } catch (error) {
    console.error('Error loading exposure checklist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load data' },
      { status: 500 }
    )
  }
}
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-options'
import { prisma } from '@/lib/db/prisma'

export async function POST(req: Request) {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to save onboarding data' },
        { status: 401 }
      )
    }

    // Get onboarding data from request
    const data = await req.json()
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Prepare the onboarding profile data
    const profileData = {
      livingSituation: data.profile?.livingSituation || null,
      exposureHistory: JSON.stringify({
        location: data.exposure?.location || [],
        duration: data.exposure?.duration || '',
        visible: data.exposure?.visible || [],
        notes: data.exposure?.notes || '',
      }),
      symptoms: JSON.stringify({
        severity: data.symptoms?.severity || '5',
        primary: data.symptoms?.primary || [],
        duration: data.symptoms?.duration || '',
        triggers: data.symptoms?.triggers || [],
      }),
      priorTests: JSON.stringify(data.exposure?.tests || []),
      budget: data.constraints?.budget || null,
      equipment: JSON.stringify(data.constraints?.equipment || []),
      dietConstraints: JSON.stringify(data.constraints?.diet || []),
      timezone: data.profile?.timezone || null,
      preferredPace: data.constraints?.pace || 'moderate',
    }

    // Create or update onboarding profile
    const onboardingProfile = await prisma.onboardingProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        ...profileData,
      },
      update: profileData,
    })

    // Generate initial recommendations based on the profile
    const recommendations = generateRecommendations(data)

    // Create initial badges based on onboarding completion
    await prisma.badge.upsert({
      where: { 
        userId_type: {
          userId: user.id,
          type: 'onboarding-complete',
        },
      },
      create: {
        userId: user.id,
        type: 'onboarding-complete',
      },
      update: {},
    })

    // Initialize user's streak
    await prisma.streak.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        currentDays: 1,
        longestDays: 1,
      },
      update: {
        lastCheckIn: new Date(),
      },
    })

    // Update user's last active timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        lastActive: new Date(),
        name: data.profile?.name || user.name,
      },
    })

    return NextResponse.json({
      success: true,
      profileId: onboardingProfile.id,
      recommendations,
      message: 'Onboarding completed successfully',
    })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Failed to save onboarding data' },
      { status: 500 }
    )
  }
}

// Helper function to generate personalized recommendations
function generateRecommendations(data: any) {
  const recommendations = {
    startModule: 'quick-start',
    priorityTools: [] as string[],
    focusAreas: [] as string[],
    warnings: [] as string[],
  }

  // Check severity
  const severity = parseInt(data.symptoms?.severity || '5')
  if (severity >= 8) {
    recommendations.warnings.push('severe-symptoms')
    recommendations.focusAreas.push('gentle-approach')
  }

  // Check if still in moldy environment
  if (data.exposure?.duration === 'current') {
    recommendations.priorityTools.push('exposure-checklist')
    recommendations.focusAreas.push('source-identification')
    recommendations.warnings.push('active-exposure')
  }

  // Check budget and adjust recommendations
  if (data.constraints?.budget === 'minimal') {
    recommendations.focusAreas.push('diy-protocols')
  }

  // Recommend tools based on symptoms
  if (data.symptoms?.primary?.includes('brain-fog')) {
    recommendations.priorityTools.push('drainage-readiness')
  }

  // Set pace-based recommendations
  if (data.constraints?.pace === 'gentle') {
    recommendations.focusAreas.push('slow-introduction')
  } else if (data.constraints?.pace === 'aggressive') {
    recommendations.focusAreas.push('accelerated-protocol')
  }

  // Ensure we have at least one tool recommendation
  if (recommendations.priorityTools.length === 0) {
    recommendations.priorityTools.push('exposure-checklist')
  }

  return recommendations
}

// GET endpoint to retrieve onboarding data
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to view onboarding data' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        profile: true,
      },
    })

    if (!user || !user.profile) {
      return NextResponse.json(
        { completed: false },
        { status: 200 }
      )
    }

    // Parse JSON fields
    const profile = {
      ...user.profile,
      exposureHistory: user.profile.exposureHistory ? JSON.parse(user.profile.exposureHistory) : null,
      symptoms: user.profile.symptoms ? JSON.parse(user.profile.symptoms) : null,
      priorTests: user.profile.priorTests ? JSON.parse(user.profile.priorTests) : null,
      equipment: user.profile.equipment ? JSON.parse(user.profile.equipment) : null,
      dietConstraints: user.profile.dietConstraints ? JSON.parse(user.profile.dietConstraints) : null,
    }

    return NextResponse.json({
      completed: true,
      profile,
    })
  } catch (error) {
    console.error('Get onboarding error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve onboarding data' },
      { status: 500 }
    )
  }
}
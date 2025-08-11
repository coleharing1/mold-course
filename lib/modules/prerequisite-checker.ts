import prisma from '@/lib/db/prisma'

export interface ModulePrerequisite {
  moduleSlug: string
  requiredModules?: string[]
  requiredDrainageScore?: number
  requiredDrainageDays?: number
  requiredCompletionRate?: number
  customCheck?: () => Promise<boolean>
}

export interface PrerequisiteResult {
  isUnlocked: boolean
  reason?: string
  missingRequirements?: string[]
  progressPercentage?: number
}

// Module prerequisite definitions based on Kajsa's protocol
export const modulePrerequisites: Record<string, ModulePrerequisite> = {
  '00-quick-start': {
    moduleSlug: '00-quick-start',
    // Always available
  },
  '01-identify-exposure': {
    moduleSlug: '01-identify-exposure',
    // Available on enrollment
  },
  '02-testing-diagnosis': {
    moduleSlug: '02-testing-diagnosis',
    requiredModules: ['01-identify-exposure'],
  },
  '03-drainage': {
    moduleSlug: '03-drainage',
    requiredModules: ['02-testing-diagnosis'],
  },
  '04-binders': {
    moduleSlug: '04-binders',
    requiredModules: ['03-drainage'],
    requiredDrainageScore: 80, // Must have 80% drainage readiness
    requiredDrainageDays: 7, // For 7 consecutive days
  },
  '05-antifungals': {
    moduleSlug: '05-antifungals',
    requiredModules: ['04-binders'],
    // Additional tolerance check would be needed
  },
  '06-herx': {
    moduleSlug: '06-herx',
    requiredModules: ['04-binders'], // Available with binders
  },
  '07-modalities': {
    moduleSlug: '07-modalities',
    requiredModules: ['04-binders'], // Available with binders
  },
  '08-diet': {
    moduleSlug: '08-diet',
    // Always available
  },
  '09-prevention': {
    moduleSlug: '09-prevention',
    requiredCompletionRate: 50, // 50% total completion
  },
  '10-community': {
    moduleSlug: '10-community',
    // Always available for optional tier
  },
}

export async function checkModulePrerequisites(
  moduleSlug: string,
  userId: string
): Promise<PrerequisiteResult> {
  const prerequisites = modulePrerequisites[moduleSlug]
  
  if (!prerequisites) {
    return { isUnlocked: true }
  }

  const missingRequirements: string[] = []

  // Check required modules completion
  if (prerequisites.requiredModules?.length) {
    const completedModules = await prisma.moduleProgress.findMany({
      where: {
        userId,
        moduleId: { in: prerequisites.requiredModules },
        status: 'completed',
      },
      select: { moduleId: true },
    })

    const completedIds = completedModules.map(m => m.moduleId)
    const missingModules = prerequisites.requiredModules.filter(
      id => !completedIds.includes(id)
    )

    if (missingModules.length > 0) {
      missingRequirements.push(
        `Complete modules: ${missingModules.join(', ')}`
      )
    }
  }

  // Check drainage readiness score
  if (prerequisites.requiredDrainageScore) {
    const drainageReadiness = await checkDrainageReadiness(
      userId,
      prerequisites.requiredDrainageScore,
      prerequisites.requiredDrainageDays || 1
    )

    if (!drainageReadiness.isReady) {
      missingRequirements.push(drainageReadiness.message || 'Drainage readiness not met')
    }
  }

  // Check overall completion rate
  if (prerequisites.requiredCompletionRate) {
    const completionRate = await calculateOverallCompletion(userId)
    
    if (completionRate < prerequisites.requiredCompletionRate) {
      missingRequirements.push(
        `Need ${prerequisites.requiredCompletionRate}% overall completion (current: ${completionRate}%)`
      )
    }
  }

  // Run custom check if provided
  if (prerequisites.customCheck) {
    const customResult = await prerequisites.customCheck()
    if (!customResult) {
      missingRequirements.push('Additional requirements not met')
    }
  }

  if (missingRequirements.length > 0) {
    return {
      isUnlocked: false,
      reason: missingRequirements[0],
      missingRequirements,
    }
  }

  return { isUnlocked: true }
}

async function checkDrainageReadiness(
  userId: string,
  requiredScore: number,
  requiredDays: number
): Promise<{ isReady: boolean; message?: string; currentScore?: number }> {
  // Get drainage readiness records for the past N days
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - requiredDays)

  const readinessRecords = await prisma.readiness.findMany({
    where: {
      userId,
      date: { gte: startDate },
    },
    orderBy: { date: 'desc' },
  })

  if (readinessRecords.length < requiredDays) {
    return {
      isReady: false,
      message: `Need ${requiredDays} days of drainage tracking (have ${readinessRecords.length})`,
    }
  }

  // Check if all days meet the required score
  const allDaysMeetScore = readinessRecords.every(
    record => record.score >= requiredScore
  )

  if (!allDaysMeetScore) {
    const currentScore = readinessRecords[0]?.score || 0
    return {
      isReady: false,
      message: `Drainage readiness must be ≥${requiredScore}% for ${requiredDays} consecutive days (current: ${currentScore}%)`,
      currentScore,
    }
  }

  return { isReady: true, currentScore: readinessRecords[0].score }
}

async function calculateOverallCompletion(userId: string): Promise<number> {
  const allModules = await prisma.moduleProgress.count({
    where: { userId },
  })

  if (allModules === 0) return 0

  const completedModules = await prisma.moduleProgress.count({
    where: {
      userId,
      status: 'completed',
    },
  })

  return Math.round((completedModules / allModules) * 100)
}

export async function getUnlockedModules(userId: string): Promise<string[]> {
  const unlockedModules: string[] = []

  for (const [slug, _] of Object.entries(modulePrerequisites)) {
    const result = await checkModulePrerequisites(slug, userId)
    if (result.isUnlocked) {
      unlockedModules.push(slug)
    }
  }

  return unlockedModules
}

// Safety check for critical modules
export function isCriticalSafetyGate(moduleSlug: string): boolean {
  // Binders module is critical - must have proper drainage
  return moduleSlug === '04-binders'
}

export async function getModuleGatingStatus(
  userId: string
): Promise<Record<string, PrerequisiteResult>> {
  const status: Record<string, PrerequisiteResult> = {}

  for (const [slug, _] of Object.entries(modulePrerequisites)) {
    status[slug] = await checkModulePrerequisites(slug, userId)
  }

  return status
}
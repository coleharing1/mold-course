import { checkModulePrerequisites, isCriticalSafetyGate } from './prerequisite-checker'
import prisma from '@/lib/db/prisma'

export interface GatingRule {
  type: 'module' | 'drainage' | 'completion' | 'time' | 'custom'
  condition: any
  message: string
  priority: 'critical' | 'important' | 'normal'
}

export interface GatingResult {
  isLocked: boolean
  lockReason?: string
  unlockHint?: string
  progress?: {
    current: number
    required: number
    unit: string
  }
  estimatedUnlockDate?: Date
  isSafetyGate?: boolean
}

// Comprehensive gating rules based on Kajsa's protocol
export const gatingRules: Record<string, GatingRule[]> = {
  '00-quick-start': [],
  '01-identify-exposure': [],
  '02-testing-diagnosis': [
    {
      type: 'module',
      condition: { requiredModule: '01-identify-exposure' },
      message: 'Complete "Identify Exposure" module first',
      priority: 'normal',
    },
  ],
  '03-drainage': [
    {
      type: 'module',
      condition: { requiredModule: '02-testing-diagnosis' },
      message: 'Complete "Testing & Diagnosis" module first',
      priority: 'normal',
    },
  ],
  '04-binders': [
    {
      type: 'module',
      condition: { requiredModule: '03-drainage' },
      message: 'Complete "Open Drainage Pathways" module first',
      priority: 'important',
    },
    {
      type: 'drainage',
      condition: { minScore: 80, consecutiveDays: 7 },
      message: 'Drainage readiness must be ≥80% for 7 consecutive days',
      priority: 'critical', // This is a safety gate
    },
  ],
  '05-antifungals': [
    {
      type: 'module',
      condition: { requiredModule: '04-binders' },
      message: 'Complete "Binders" module first',
      priority: 'important',
    },
    {
      type: 'custom',
      condition: { checkToleranceTest: true },
      message: 'Must pass binder tolerance check before starting antifungals',
      priority: 'critical',
    },
  ],
  '06-herx': [
    {
      type: 'module',
      condition: { requiredModule: '04-binders' },
      message: 'Available after starting binders',
      priority: 'normal',
    },
  ],
  '07-modalities': [
    {
      type: 'module',
      condition: { requiredModule: '04-binders' },
      message: 'Available after starting binders',
      priority: 'normal',
    },
  ],
  '08-diet': [],
  '09-prevention': [
    {
      type: 'completion',
      condition: { minPercentage: 50 },
      message: 'Requires 50% overall course completion',
      priority: 'normal',
    },
  ],
  '10-community': [],
}

export async function checkModuleGating(
  moduleSlug: string,
  userId: string
): Promise<GatingResult> {
  const rules = gatingRules[moduleSlug] || []
  
  if (rules.length === 0) {
    return { isLocked: false }
  }

  // Check each rule
  for (const rule of rules) {
    const result = await checkGatingRule(rule, userId)
    
    if (result.isLocked) {
      // Add safety gate flag for critical modules
      if (rule.priority === 'critical' || isCriticalSafetyGate(moduleSlug)) {
        result.isSafetyGate = true
      }
      return result
    }
  }

  return { isLocked: false }
}

async function checkGatingRule(
  rule: GatingRule,
  userId: string
): Promise<GatingResult> {
  switch (rule.type) {
    case 'module':
      return checkModuleRequirement(rule, userId)
    
    case 'drainage':
      return checkDrainageRequirement(rule, userId)
    
    case 'completion':
      return checkCompletionRequirement(rule, userId)
    
    case 'time':
      return checkTimeRequirement(rule, userId)
    
    case 'custom':
      return checkCustomRequirement(rule, userId)
    
    default:
      return { isLocked: false }
  }
}

async function checkModuleRequirement(
  rule: GatingRule,
  userId: string
): Promise<GatingResult> {
  const { requiredModule } = rule.condition
  
  const progress = await prisma.moduleProgress.findFirst({
    where: {
      userId,
      moduleId: requiredModule,
      status: 'completed',
    },
  })

  if (!progress) {
    return {
      isLocked: true,
      lockReason: rule.message,
      unlockHint: `Complete the "${requiredModule}" module to unlock this content`,
    }
  }

  return { isLocked: false }
}

async function checkDrainageRequirement(
  rule: GatingRule,
  userId: string
): Promise<GatingResult> {
  const { minScore, consecutiveDays } = rule.condition
  
  // Get drainage readiness for the past N days
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - consecutiveDays)
  
  const readinessRecords = await prisma.readiness.findMany({
    where: {
      userId,
      date: { gte: startDate },
    },
    orderBy: { date: 'desc' },
  })

  // Not enough days tracked
  if (readinessRecords.length < consecutiveDays) {
    const daysTracked = readinessRecords.length
    return {
      isLocked: true,
      lockReason: rule.message,
      unlockHint: `Track your drainage readiness for ${consecutiveDays - daysTracked} more days`,
      progress: {
        current: daysTracked,
        required: consecutiveDays,
        unit: 'days',
      },
    }
  }

  // Check if all days meet the minimum score
  const failedDays = readinessRecords.filter(r => r.score < minScore)
  
  if (failedDays.length > 0) {
    const currentScore = readinessRecords[0]?.score || 0
    const daysUntilUnlock = failedDays.length
    
    return {
      isLocked: true,
      lockReason: rule.message,
      unlockHint: `Improve your drainage readiness score to ${minScore}% or higher`,
      progress: {
        current: currentScore,
        required: minScore,
        unit: '%',
      },
      estimatedUnlockDate: new Date(Date.now() + daysUntilUnlock * 24 * 60 * 60 * 1000),
    }
  }

  return { isLocked: false }
}

async function checkCompletionRequirement(
  rule: GatingRule,
  userId: string
): Promise<GatingResult> {
  const { minPercentage } = rule.condition
  
  const totalModules = await prisma.moduleProgress.count({
    where: { userId },
  })
  
  const completedModules = await prisma.moduleProgress.count({
    where: {
      userId,
      status: 'completed',
    },
  })
  
  const completionRate = totalModules > 0 
    ? Math.round((completedModules / totalModules) * 100)
    : 0

  if (completionRate < minPercentage) {
    const modulesNeeded = Math.ceil((minPercentage / 100) * totalModules) - completedModules
    
    return {
      isLocked: true,
      lockReason: rule.message,
      unlockHint: `Complete ${modulesNeeded} more modules to unlock`,
      progress: {
        current: completionRate,
        required: minPercentage,
        unit: '%',
      },
    }
  }

  return { isLocked: false }
}

async function checkTimeRequirement(
  rule: GatingRule,
  userId: string
): Promise<GatingResult> {
  const { daysFromEnrollment } = rule.condition
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { createdAt: true },
  })
  
  if (!user) {
    return { isLocked: true, lockReason: 'User not found' }
  }
  
  const daysSinceEnrollment = Math.floor(
    (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
  )
  
  if (daysSinceEnrollment < daysFromEnrollment) {
    const daysRemaining = daysFromEnrollment - daysSinceEnrollment
    const unlockDate = new Date(Date.now() + daysRemaining * 24 * 60 * 60 * 1000)
    
    return {
      isLocked: true,
      lockReason: rule.message,
      unlockHint: `Available in ${daysRemaining} days`,
      estimatedUnlockDate: unlockDate,
      progress: {
        current: daysSinceEnrollment,
        required: daysFromEnrollment,
        unit: 'days',
      },
    }
  }

  return { isLocked: false }
}

async function checkCustomRequirement(
  rule: GatingRule,
  userId: string
): Promise<GatingResult> {
  // Handle custom requirements like tolerance tests
  const { checkToleranceTest } = rule.condition
  
  if (checkToleranceTest) {
    // Check if user has passed binder tolerance test
    const toleranceTest = await prisma.toolState.findFirst({
      where: {
        userId,
        toolType: 'binder-tolerance',
      },
    })
    
    if (!toleranceTest) {
      return {
        isLocked: true,
        lockReason: rule.message,
        unlockHint: 'Complete the binder tolerance assessment in your tools',
      }
    }
    
    const state = JSON.parse(toleranceTest.state as string)
    if (!state.passed) {
      return {
        isLocked: true,
        lockReason: rule.message,
        unlockHint: 'Continue with binders until you pass the tolerance check',
      }
    }
  }

  return { isLocked: false }
}

// Helper function to get user-friendly unlock instructions
export async function getUnlockInstructions(
  moduleSlug: string,
  userId: string
): Promise<string[]> {
  const result = await checkModuleGating(moduleSlug, userId)
  
  if (!result.isLocked) {
    return []
  }

  const instructions: string[] = []
  const rules = gatingRules[moduleSlug] || []

  for (const rule of rules) {
    const ruleResult = await checkGatingRule(rule, userId)
    if (ruleResult.isLocked && ruleResult.unlockHint) {
      instructions.push(ruleResult.unlockHint)
    }
  }

  return instructions
}

// Check if user can safely proceed with a module
export async function canSafelyProceed(
  moduleSlug: string,
  userId: string
): Promise<{ safe: boolean; warnings: string[] }> {
  const warnings: string[] = []
  
  // Special safety checks for critical modules
  if (moduleSlug === '04-binders') {
    const drainageResult = await checkGatingRule(
      {
        type: 'drainage',
        condition: { minScore: 80, consecutiveDays: 7 },
        message: 'Critical: Drainage pathways must be open before starting binders',
        priority: 'critical',
      },
      userId
    )
    
    if (drainageResult.isLocked) {
      warnings.push('⚠️ WARNING: Starting binders without proper drainage preparation can cause severe detox reactions')
      warnings.push('Please ensure your drainage readiness is at least 80% for 7 consecutive days')
      return { safe: false, warnings }
    }
  }

  if (moduleSlug === '05-antifungals') {
    warnings.push('Consult with your healthcare provider before starting antifungal protocols')
    warnings.push('Monitor for die-off reactions and adjust dosing as needed')
  }

  return { safe: true, warnings }
}
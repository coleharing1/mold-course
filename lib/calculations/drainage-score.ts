export interface DrainageMetrics {
  bowelMovements: number // 1-10 scale
  hydration: number // 1-10 scale
  urineColor: number // 1-10 scale (1=dark, 10=light yellow)
  energy: number // 1-10 scale
  sleep: number // 1-10 scale
  skinClarity: number // 1-10 scale
  lymphMovement: number // 1-10 scale (exercise, dry brushing, etc.)
  liverSupport: number // 1-10 scale (no nausea, right side pain)
  brainFog: number // 1-10 scale (10=clear minded)
  sweating: number // 1-10 scale (regular sweating through exercise/sauna)
}

interface WeightedMetric {
  key: keyof DrainageMetrics
  weight: number
  critical: boolean
}

// Weighted scoring based on importance for mold detox
// Critical pathways have higher weights
const metricWeights: WeightedMetric[] = [
  { key: 'bowelMovements', weight: 0.20, critical: true }, // Most important - primary exit route
  { key: 'liverSupport', weight: 0.15, critical: true }, // Processes toxins
  { key: 'hydration', weight: 0.12, critical: true }, // Essential for all pathways
  { key: 'lymphMovement', weight: 0.10, critical: false }, // Transports toxins
  { key: 'urineColor', weight: 0.08, critical: false }, // Kidney function indicator
  { key: 'sweating', weight: 0.08, critical: false }, // Secondary detox route
  { key: 'energy', weight: 0.08, critical: false }, // Overall system health
  { key: 'sleep', weight: 0.08, critical: false }, // Recovery and detox time
  { key: 'brainFog', weight: 0.06, critical: false }, // Neurological function
  { key: 'skinClarity', weight: 0.05, critical: false }, // Detox pathway indicator
]

export function calculateDrainageScore(metrics: DrainageMetrics): number {
  let totalScore = 0
  let criticalPathwaysOk = true

  for (const { key, weight, critical } of metricWeights) {
    const value = metrics[key]
    const normalizedValue = value / 10 // Convert to 0-1 scale
    
    // Check if critical pathways meet minimum threshold
    if (critical && value < 6) {
      criticalPathwaysOk = false
    }
    
    totalScore += normalizedValue * weight
  }

  // Convert to percentage
  let finalScore = Math.round(totalScore * 100)

  // Apply penalty if critical pathways are compromised
  // This ensures people don't get high scores with blocked primary pathways
  if (!criticalPathwaysOk) {
    finalScore = Math.min(finalScore, 60)
  }

  return Math.max(0, Math.min(100, finalScore))
}

export function analyzeDrainageWeaknesses(metrics: DrainageMetrics): {
  weakestAreas: Array<{ area: string; score: number; recommendation: string }>
  strongestAreas: Array<{ area: string; score: number }>
  overallAssessment: string
} {
  const areas = [
    { 
      key: 'bowelMovements', 
      name: 'Bowel Movements',
      recommendation: 'Increase fiber, magnesium, and hydration. Consider digestive bitters.'
    },
    { 
      key: 'hydration', 
      name: 'Hydration',
      recommendation: 'Drink half your body weight in ounces of water daily with electrolytes.'
    },
    { 
      key: 'urineColor', 
      name: 'Kidney Function',
      recommendation: 'Increase water intake and consider kidney support herbs like nettle.'
    },
    { 
      key: 'energy', 
      name: 'Energy Levels',
      recommendation: 'Ensure adequate sleep, nutrition, and gentle movement.'
    },
    { 
      key: 'sleep', 
      name: 'Sleep Quality',
      recommendation: 'Maintain consistent sleep schedule, reduce blue light, try magnesium.'
    },
    { 
      key: 'skinClarity', 
      name: 'Skin Health',
      recommendation: 'Increase sweating, dry brushing, and consider detox baths.'
    },
    { 
      key: 'lymphMovement', 
      name: 'Lymphatic System',
      recommendation: 'Add rebounding, dry brushing, and lymphatic massage.'
    },
    { 
      key: 'liverSupport', 
      name: 'Liver/Gallbladder',
      recommendation: 'Try castor oil packs, bitter foods, and milk thistle.'
    },
    { 
      key: 'brainFog', 
      name: 'Mental Clarity',
      recommendation: 'Support with omega-3s, meditation, and adequate hydration.'
    },
    { 
      key: 'sweating', 
      name: 'Sweating/Detox',
      recommendation: 'Add sauna sessions or exercise to promote regular sweating.'
    },
  ]

  const scores = areas.map(area => ({
    ...area,
    score: metrics[area.key as keyof DrainageMetrics]
  }))

  const weakestAreas = scores
    .filter(a => a.score < 7)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(({ name, score, recommendation }) => ({ 
      area: name, 
      score, 
      recommendation 
    }))

  const strongestAreas = scores
    .filter(a => a.score >= 8)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ name, score }) => ({ area: name, score }))

  const overallScore = calculateDrainageScore(metrics)
  
  let overallAssessment = ''
  if (overallScore >= 80) {
    overallAssessment = 'Excellent! Your drainage pathways are well-prepared for detox protocols.'
  } else if (overallScore >= 60) {
    overallAssessment = 'Good progress. Continue supporting drainage before starting intensive detox.'
  } else if (overallScore >= 40) {
    overallAssessment = 'Needs improvement. Focus on opening drainage pathways for 2-4 more weeks.'
  } else {
    overallAssessment = 'Critical: Do not start any detox. Focus entirely on drainage support.'
  }

  return {
    weakestAreas,
    strongestAreas,
    overallAssessment
  }
}

export function getDrainageReadinessLevel(score: number): {
  level: 'not-ready' | 'improving' | 'almost-ready' | 'ready'
  color: string
  message: string
  canStartBinders: boolean
} {
  if (score >= 80) {
    return {
      level: 'ready',
      color: 'green',
      message: 'Ready for binder protocols',
      canStartBinders: true
    }
  } else if (score >= 60) {
    return {
      level: 'almost-ready',
      color: 'yellow',
      message: 'Almost ready - continue drainage support',
      canStartBinders: false
    }
  } else if (score >= 40) {
    return {
      level: 'improving',
      color: 'orange',
      message: 'Improving but needs more support',
      canStartBinders: false
    }
  } else {
    return {
      level: 'not-ready',
      color: 'red',
      message: 'Not ready - focus on drainage',
      canStartBinders: false
    }
  }
}

// Check if user has maintained required score for required days
export function checkBinderReadiness(
  scores: number[],
  requiredScore: number = 80,
  requiredDays: number = 7
): {
  isReady: boolean
  consecutiveDays: number
  daysRemaining: number
  message: string
} {
  if (scores.length < requiredDays) {
    return {
      isReady: false,
      consecutiveDays: 0,
      daysRemaining: requiredDays - scores.length,
      message: `Need ${requiredDays - scores.length} more days of tracking`
    }
  }

  // Check last N days
  const recentScores = scores.slice(-requiredDays)
  const consecutiveDays = recentScores.filter(s => s >= requiredScore).length
  const allDaysMeetRequirement = recentScores.every(s => s >= requiredScore)

  if (allDaysMeetRequirement) {
    return {
      isReady: true,
      consecutiveDays: requiredDays,
      daysRemaining: 0,
      message: 'Ready to start binder protocols safely!'
    }
  }

  // Count consecutive days from the end
  let consecutiveFromEnd = 0
  for (let i = scores.length - 1; i >= 0; i--) {
    if (scores[i] >= requiredScore) {
      consecutiveFromEnd++
    } else {
      break
    }
  }

  return {
    isReady: false,
    consecutiveDays: consecutiveFromEnd,
    daysRemaining: requiredDays - consecutiveFromEnd,
    message: `${requiredDays - consecutiveFromEnd} more days at ${requiredScore}% needed`
  }
}
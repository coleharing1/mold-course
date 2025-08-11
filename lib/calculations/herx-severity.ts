/**
 * @fileoverview Herx severity calculation algorithms
 */

export interface HerxAssessment {
  physicalScore: number
  cognitiveScore: number
  emotionalScore: number
  overallSeverity: number
  riskLevel: 'low' | 'moderate' | 'high' | 'emergency'
  recommendations: string[]
}

export interface AssessmentInputs {
  physical: {
    fatigue: number
    headache: number
    bodyAches: number
    nausea: number
    fever: number
  }
  cognitive: {
    brainFog: number
    concentration: number
    memory: number
    processing: number
  }
  emotional: {
    mood: number
    anxiety: number
    irritability: number
    motivation: number
  }
  symptoms: {
    physical: string[]
    cognitive: string[]
    emotional: string[]
  }
}

export function calculateHerxSeverity(inputs: AssessmentInputs): HerxAssessment {
  // Calculate individual domain scores
  const physicalScore = Math.round(
    (inputs.physical.fatigue + 
     inputs.physical.headache + 
     inputs.physical.bodyAches + 
     inputs.physical.nausea + 
     inputs.physical.fever) / 5
  )

  const cognitiveScore = Math.round(
    (inputs.cognitive.brainFog + 
     inputs.cognitive.concentration + 
     inputs.cognitive.memory + 
     inputs.cognitive.processing) / 4
  )

  const emotionalScore = Math.round(
    (inputs.emotional.mood + 
     inputs.emotional.anxiety + 
     inputs.emotional.irritability + 
     inputs.emotional.motivation) / 4
  )

  // Calculate weighted overall severity
  // Physical symptoms are weighted more heavily as they indicate more severe systemic impact
  const overallSeverity = Math.round(
    (physicalScore * 0.5 + cognitiveScore * 0.3 + emotionalScore * 0.2)
  )

  // Determine risk level
  let riskLevel: 'low' | 'moderate' | 'high' | 'emergency'
  
  // Emergency indicators
  const hasEmergencySymptoms = 
    inputs.symptoms.physical.includes('Chest pain') ||
    inputs.symptoms.physical.includes('Difficulty breathing') ||
    inputs.symptoms.emotional.includes('Suicidal thoughts') ||
    inputs.physical.fever >= 9 ||
    overallSeverity >= 9

  if (hasEmergencySymptoms || overallSeverity >= 9) {
    riskLevel = 'emergency'
  } else if (overallSeverity >= 7) {
    riskLevel = 'high'
  } else if (overallSeverity >= 4) {
    riskLevel = 'moderate'
  } else {
    riskLevel = 'low'
  }

  return {
    physicalScore,
    cognitiveScore,
    emotionalScore,
    overallSeverity,
    riskLevel,
    recommendations: [] // Will be populated by recommendations utility
  }
}

export function getTrendAnalysis(history: any[]): {
  trend: 'improving' | 'stable' | 'worsening'
  change: number
  confidence: 'low' | 'medium' | 'high'
} {
  if (history.length < 3) {
    return { trend: 'stable', change: 0, confidence: 'low' }
  }

  // Take recent vs older entries
  const recentCount = Math.min(3, Math.floor(history.length / 2))
  const recent = history.slice(0, recentCount)
  const older = history.slice(-recentCount)

  const recentAvg = recent.reduce((sum, entry) => sum + entry.severity, 0) / recent.length
  const olderAvg = older.reduce((sum, entry) => sum + entry.severity, 0) / older.length

  const change = recentAvg - olderAvg

  let trend: 'improving' | 'stable' | 'worsening'
  if (change > 0.5) {
    trend = 'worsening'
  } else if (change < -0.5) {
    trend = 'improving'
  } else {
    trend = 'stable'
  }

  // Confidence based on number of data points
  let confidence: 'low' | 'medium' | 'high'
  if (history.length >= 10) {
    confidence = 'high'
  } else if (history.length >= 5) {
    confidence = 'medium'
  } else {
    confidence = 'low'
  }

  return { trend, change, confidence }
}

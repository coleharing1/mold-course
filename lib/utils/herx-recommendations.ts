/**
 * @fileoverview Herx recommendations utility functions
 */

export function getRecommendations(
  severity: number, 
  riskLevel: string,
  symptoms?: {
    physical: string[]
    cognitive: string[]
    emotional: string[]
  }
): string[] {
  const recommendations: string[] = []

  // Emergency level recommendations
  if (severity >= 9 || riskLevel === 'emergency') {
    recommendations.push('🚨 EMERGENCY: Consider calling 911 or going to ER immediately')
    recommendations.push('Stop all treatments immediately except essential binders')
    recommendations.push('Do not leave person alone')
    recommendations.push('Have emergency contacts ready and accessible')
    recommendations.push('Prepare emergency medical information packet')
    return recommendations
  }

  // High severity recommendations (7-8)
  if (severity >= 7 || riskLevel === 'high') {
    recommendations.push('⚠️ STOP all antimicrobials/antifungals immediately')
    recommendations.push('Continue binders only (may increase frequency)')
    recommendations.push('Seek medical evaluation within 24 hours')
    recommendations.push('Implement emergency support protocols')
    recommendations.push('Have support person monitor closely')
    recommendations.push('Consider IV therapy for hydration/nutrients')
    recommendations.push('Do not restart treatment without medical clearance')
    return recommendations
  }

  // Moderate severity recommendations (4-6)
  if (severity >= 4) {
    recommendations.push('🔄 REDUCE treatment dose by 50% immediately')
    recommendations.push('Increase binder frequency (add activated charcoal 2-3x daily)')
    recommendations.push('Enhance drainage protocols aggressively')
    recommendations.push('Plan for 2-3 days recovery time')
    recommendations.push('Consider medical check-in if no improvement in 48 hours')
    
    // Specific recommendations based on severity level
    if (severity >= 6) {
      recommendations.push('Consider reducing dose by 75% or stopping temporarily')
      recommendations.push('Implement coffee enema daily if experienced')
      recommendations.push('Daily Epsom salt baths')
    } else {
      recommendations.push('Add Epsom salt baths 2-3x weekly')
      recommendations.push('Consider coffee enema weekly if experienced')
    }
    
    return recommendations
  }

  // Mild severity recommendations (1-3)
  recommendations.push('✅ Continue current protocol with enhanced monitoring')
  recommendations.push('Increase hydration by 25% with electrolytes')
  recommendations.push('Add gentle drainage support (dry brushing, walking)')
  recommendations.push('Extra rest and self-care')
  recommendations.push('Monitor closely for any escalation')
  
  if (severity >= 2) {
    recommendations.push('Consider adding activated charcoal 1-2x daily between doses')
    recommendations.push('Increase sleep by 30-60 minutes nightly')
  }

  return recommendations
}

export function getSpecificInterventions(
  severity: number,
  physicalScore: number,
  cognitiveScore: number,
  emotionalScore: number
): {
  immediate: string[]
  drainage: string[]
  support: string[]
} {
  const immediate: string[] = []
  const drainage: string[] = []
  const support: string[] = []

  // Immediate interventions based on severity
  if (severity >= 4) {
    immediate.push('Activated charcoal 2-4 capsules with large glass of water')
    immediate.push('Alka-Seltzer Gold 2 tablets in 8oz water')
    immediate.push('Electrolyte push: 24oz water + ½ tsp sea salt + lemon')
  } else {
    immediate.push('Extra hydration: 16-24oz water with electrolytes')
    immediate.push('Gentle breathing exercises (4-7-8 technique)')
  }

  // Drainage interventions
  if (severity >= 6) {
    drainage.push('Coffee enema (if experienced and not dehydrated)')
    drainage.push('Epsom salt bath daily (2 cups, 20 minutes)')
    drainage.push('Castor oil pack over liver 45 minutes daily')
    drainage.push('Lymphatic drainage massage or dry brushing 2x daily')
  } else if (severity >= 4) {
    drainage.push('Epsom salt bath every other day')
    drainage.push('Castor oil pack 30 minutes before bed')
    drainage.push('Daily dry brushing before shower')
    drainage.push('Gentle rebounding or walking 10-15 minutes')
  } else {
    drainage.push('Dry brushing 3x weekly')
    drainage.push('Regular walking for lymphatic movement')
    drainage.push('Weekly Epsom salt bath for relaxation')
  }

  // System support based on domain scores
  if (physicalScore >= 6) {
    support.push('NAC increase to 1800mg daily for liver support')
    support.push('Vitamin C to bowel tolerance + 1000mg')
    support.push('Magnesium glycinate 800mg before bed')
    support.push('Complete rest - no exercise or strenuous activity')
  } else if (physicalScore >= 4) {
    support.push('NAC increase to 1200mg daily')
    support.push('Vitamin C increase by 50%')
    support.push('Magnesium glycinate 600mg before bed')
    support.push('Reduce activity level by 50%')
  }

  if (cognitiveScore >= 6) {
    support.push('B-complex with extra B1 and B5 for brain support')
    support.push('Phosphatidylcholine for brain membrane support')
    support.push('Avoid complex mental tasks')
    support.push('Extra sleep and brain rest')
  }

  if (emotionalScore >= 6) {
    support.push('Consider professional mental health support')
    support.push('Stress reduction techniques (meditation, gentle yoga)')
    support.push('Ensure support person is available')
    support.push('Monitor for any concerning thoughts')
  }

  return { immediate, drainage, support }
}

export function getDosageAdjustments(
  currentSeverity: number,
  treatmentType: 'binders' | 'antifungals' | 'both'
): {
  action: 'continue' | 'reduce' | 'stop'
  newDose: string
  timeline: string
} {
  if (currentSeverity >= 7) {
    return {
      action: 'stop',
      newDose: 'Stop all antimicrobials/antifungals. Continue binders only.',
      timeline: 'Do not restart without medical clearance and full recovery'
    }
  }

  if (currentSeverity >= 6) {
    return {
      action: 'reduce',
      newDose: 'Reduce to 25% of current dose',
      timeline: 'Maintain reduced dose for 5-7 days, then reassess'
    }
  }

  if (currentSeverity >= 4) {
    return {
      action: 'reduce',
      newDose: 'Reduce to 50% of current dose',
      timeline: 'Maintain reduced dose for 3-5 days, then reassess'
    }
  }

  return {
    action: 'continue',
    newDose: 'Continue current dose with enhanced monitoring',
    timeline: 'Reassess daily for any changes'
  }
}

export function getTimelineExpectations(severity: number): {
  peakDuration: string
  totalDuration: string
  recoveryMilestones: string[]
} {
  if (severity >= 7) {
    return {
      peakDuration: '2-4 days',
      totalDuration: '5-10 days',
      recoveryMilestones: [
        'Day 1-2: Symptom management and stabilization',
        'Day 3-4: Gradual improvement should begin',
        'Day 5-7: Significant improvement expected',
        'Day 8-10: Near baseline or baseline function'
      ]
    }
  }

  if (severity >= 4) {
    return {
      peakDuration: '1-2 days',
      totalDuration: '3-5 days',
      recoveryMilestones: [
        'Day 1: Peak symptoms, implement support protocols',
        'Day 2: Symptoms should plateau or begin improving',
        'Day 3: Noticeable improvement expected',
        'Day 4-5: Return to baseline function'
      ]
    }
  }

  return {
    peakDuration: '4-12 hours',
    totalDuration: '24-48 hours',
    recoveryMilestones: [
      'Hours 1-6: Monitor and provide basic support',
      'Hours 6-12: Peak symptoms, gentle interventions',
      'Hours 12-24: Gradual improvement',
      'Hours 24-48: Return to normal function'
    ]
  }
}

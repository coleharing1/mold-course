import type { RoomData } from '@/app/(app)/tools/exposure-checklist/page'

export function calculateExposureScore(rooms: RoomData[]): {
  score: number
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  details: {
    criticalIssues: number
    moderateIssues: number
    minorIssues: number
    affectedRooms: number
  }
} {
  let totalScore = 0
  let criticalIssues = 0
  let moderateIssues = 0
  let minorIssues = 0
  let affectedRooms = 0

  // Scoring weights for different issues
  const issueWeights = {
    visibleMold: 15,      // Critical - highest weight
    waterDamage: 12,      // Critical - water damage often leads to mold
    mustySmell: 8,        // High - strong indicator
    leaks: 10,            // High - active moisture source
    humidity: 6,          // Moderate - environmental factor
    condensation: 5,      // Moderate - moisture risk
    peeling: 4,           // Minor - potential indicator
    discoloration: 4      // Minor - potential indicator
  }

  // Severity multipliers
  const severityMultipliers = {
    none: 0,
    mild: 1,
    moderate: 1.5,
    severe: 2
  }

  // Room importance weights (some rooms are more critical)
  const roomWeights: Record<string, number> = {
    'Bathroom 1': 1.2,
    'Bathroom 2': 1.2,
    'Kitchen': 1.1,
    'Basement': 1.5,      // Basements are high risk
    'Attic': 1.3,         // Attics often have hidden issues
    'Master Bedroom': 1.2, // Where people sleep
    'Living Room': 1.0,
    'HVAC System': 2.0    // HVAC spreads mold throughout house
  }

  rooms.forEach(room => {
    let roomScore = 0
    const roomWeight = roomWeights[room.name] || 1.0
    const severityMultiplier = severityMultipliers[room.severity]

    // Count issues in this room
    let roomIssueCount = 0
    Object.entries(room.issues).forEach(([issue, present]) => {
      if (present) {
        const issueKey = issue as keyof typeof issueWeights
        const baseScore = issueWeights[issueKey] || 0
        roomScore += baseScore * severityMultiplier * roomWeight
        roomIssueCount++

        // Categorize issues
        if (issue === 'visibleMold' || issue === 'waterDamage') {
          criticalIssues++
        } else if (issue === 'mustySmell' || issue === 'leaks') {
          moderateIssues++
        } else {
          minorIssues++
        }
      }
    })

    if (roomIssueCount > 0) {
      affectedRooms++
    }

    // Bonus penalty for multiple issues in same room (compound effect)
    if (roomIssueCount >= 3) {
      roomScore *= 1.2
    }
    if (roomIssueCount >= 5) {
      roomScore *= 1.3
    }

    totalScore += roomScore
  })

  // Normalize score to 0-100 scale
  // Maximum theoretical score is around 400-500, so we'll cap at 100
  const normalizedScore = Math.min(100, Math.round(totalScore / 2))

  // Determine risk level based on score and critical factors
  let riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  
  if (criticalIssues >= 3 || normalizedScore >= 75) {
    riskLevel = 'critical'
  } else if (criticalIssues >= 1 || normalizedScore >= 50) {
    riskLevel = 'high'
  } else if (moderateIssues >= 2 || normalizedScore >= 25) {
    riskLevel = 'moderate'
  } else {
    riskLevel = 'low'
  }

  // Special case: HVAC system with any issues is automatically high risk
  const hvacRoom = rooms.find(r => r.name === 'HVAC System')
  if (hvacRoom && Object.values(hvacRoom.issues).some(Boolean)) {
    if (riskLevel === 'low') riskLevel = 'moderate'
    if (riskLevel === 'moderate') riskLevel = 'high'
  }

  return {
    score: normalizedScore,
    riskLevel,
    details: {
      criticalIssues,
      moderateIssues,
      minorIssues,
      affectedRooms
    }
  }
}
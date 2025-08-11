import type { RoomData } from '@/app/(app)/tools/exposure-checklist/page'

export interface CostEstimate {
  diy: number
  professional: number
  testing: number
  total: {
    min: number
    max: number
  }
}

export function estimateCosts(rooms: RoomData[]): CostEstimate {
  let diyTotal = 0
  let professionalTotal = 0
  
  // Base costs for common items
  const baseCosts = {
    airPurifier: 300,
    dehumidifier: 250,
    moldTestKit: 50,
    cleaningSupplies: 100,
    protectiveGear: 75,
    moistureMeter: 30
  }

  // Room-specific remediation costs
  rooms.forEach(room => {
    const issueCount = Object.values(room.issues).filter(Boolean).length
    
    if (issueCount === 0) return

    // Calculate based on severity and room type
    let roomDiyCost = 0
    let roomProCost = 0

    // Base costs by severity
    switch (room.severity) {
      case 'severe':
        roomDiyCost = 500
        roomProCost = 3000
        break
      case 'moderate':
        roomDiyCost = 300
        roomProCost = 1500
        break
      case 'mild':
        roomDiyCost = 150
        roomProCost = 500
        break
      default:
        roomDiyCost = 0
        roomProCost = 0
    }

    // Specific issue multipliers
    if (room.issues.visibleMold) {
      roomDiyCost *= 1.5
      roomProCost *= 1.5
    }
    if (room.issues.waterDamage) {
      roomDiyCost *= 1.4
      roomProCost *= 1.4
    }
    if (room.issues.leaks) {
      roomDiyCost += 200
      roomProCost += 800
    }

    // Room-specific multipliers
    const roomMultipliers: Record<string, number> = {
      'Basement': 1.5,      // Harder to remediate
      'Attic': 1.3,         // Access difficulty
      'HVAC System': 2.0,   // Requires professional
      'Bathroom 1': 1.2,
      'Bathroom 2': 1.2,
      'Kitchen': 1.2
    }

    const multiplier = roomMultipliers[room.name] || 1.0
    roomDiyCost *= multiplier
    roomProCost *= multiplier

    diyTotal += Math.round(roomDiyCost)
    professionalTotal += Math.round(roomProCost)
  })

  // Add essential equipment for DIY
  const affectedRooms = rooms.filter(r => r.severity !== 'none').length
  if (affectedRooms > 0) {
    diyTotal += baseCosts.cleaningSupplies
    diyTotal += baseCosts.protectiveGear
    diyTotal += baseCosts.moistureMeter
    
    // Add air purifiers for affected rooms
    const purifiersNeeded = Math.min(affectedRooms, 3)
    diyTotal += baseCosts.airPurifier * purifiersNeeded
    
    // Add dehumidifiers if needed
    const needsDehumidifier = rooms.some(r => r.issues.humidity || r.issues.condensation)
    if (needsDehumidifier) {
      diyTotal += baseCosts.dehumidifier
    }
  }

  // Testing costs
  const testingCosts = {
    ermi: 290,
    mycotoxin: 400,
    airQuality: 300,
    professionalInspection: 500
  }

  // Recommend testing based on severity
  let testingTotal = 0
  const hasSignificantIssues = rooms.some(r => r.severity === 'severe' || r.severity === 'moderate')
  
  if (hasSignificantIssues) {
    testingTotal += testingCosts.ermi
    testingTotal += testingCosts.professionalInspection
  } else if (rooms.some(r => r.severity === 'mild')) {
    testingTotal += baseCosts.moldTestKit * 2
  }

  // Special case: HVAC issues require professional
  const hvacHasIssues = rooms.find(r => r.name === 'HVAC System' && r.severity !== 'none')
  if (hvacHasIssues) {
    // DIY not recommended for HVAC
    const hvacDiyCost = diyTotal * 0.2 // Remove HVAC portion from DIY
    diyTotal -= hvacDiyCost
    professionalTotal += 2000 // Minimum for professional HVAC cleaning
  }

  return {
    diy: Math.round(diyTotal),
    professional: Math.round(professionalTotal),
    testing: Math.round(testingTotal),
    total: {
      min: Math.round(diyTotal + testingTotal),
      max: Math.round(professionalTotal + testingTotal)
    }
  }
}
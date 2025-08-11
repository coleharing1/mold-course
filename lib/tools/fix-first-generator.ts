import type { RoomData } from '@/app/(app)/tools/exposure-checklist/page'

export interface FixItem {
  action: string
  room: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  estimatedCost: {
    diy: number
    professional: number
  }
  timeframe: string
}

export function generateFixFirstList(rooms: RoomData[]): FixItem[] {
  const fixItems: FixItem[] = []

  rooms.forEach(room => {
    // Critical: Visible mold
    if (room.issues.visibleMold) {
      fixItems.push({
        action: 'Remove visible mold and remediate affected area',
        room: room.name,
        priority: 'critical',
        estimatedCost: {
          diy: room.severity === 'severe' ? 500 : 200,
          professional: room.severity === 'severe' ? 3000 : 1000
        },
        timeframe: 'Immediately'
      })
    }

    // Critical: Active water damage
    if (room.issues.waterDamage) {
      fixItems.push({
        action: 'Fix water damage source and dry affected materials',
        room: room.name,
        priority: 'critical',
        estimatedCost: {
          diy: 300,
          professional: 1500
        },
        timeframe: 'Within 24-48 hours'
      })
    }

    // High: Active leaks
    if (room.issues.leaks) {
      fixItems.push({
        action: 'Repair active leaks and check for hidden damage',
        room: room.name,
        priority: 'high',
        estimatedCost: {
          diy: 100,
          professional: 500
        },
        timeframe: 'Within 1 week'
      })
    }

    // High: Musty smell (indicates hidden mold)
    if (room.issues.mustySmell && !room.issues.visibleMold) {
      fixItems.push({
        action: 'Investigate musty odor source - possible hidden mold',
        room: room.name,
        priority: 'high',
        estimatedCost: {
          diy: 50,
          professional: 300
        },
        timeframe: 'Within 1 week'
      })
    }

    // Medium: High humidity
    if (room.issues.humidity) {
      fixItems.push({
        action: 'Install dehumidifier and improve ventilation',
        room: room.name,
        priority: 'medium',
        estimatedCost: {
          diy: 200,
          professional: 400
        },
        timeframe: 'Within 2 weeks'
      })
    }

    // Medium: Condensation issues
    if (room.issues.condensation) {
      fixItems.push({
        action: 'Address condensation - improve insulation or ventilation',
        room: room.name,
        priority: 'medium',
        estimatedCost: {
          diy: 100,
          professional: 500
        },
        timeframe: 'Within 2 weeks'
      })
    }

    // Low: Peeling paint
    if (room.issues.peeling && !room.issues.waterDamage) {
      fixItems.push({
        action: 'Scrape and repaint peeling areas after moisture check',
        room: room.name,
        priority: 'low',
        estimatedCost: {
          diy: 50,
          professional: 300
        },
        timeframe: 'Within 1 month'
      })
    }

    // Low: Discoloration
    if (room.issues.discoloration && !room.issues.waterDamage) {
      fixItems.push({
        action: 'Investigate and clean discolored areas',
        room: room.name,
        priority: 'low',
        estimatedCost: {
          diy: 30,
          professional: 200
        },
        timeframe: 'Within 1 month'
      })
    }
  })

  // Special recommendations for specific rooms
  const hvacRoom = rooms.find(r => r.name === 'HVAC System')
  if (hvacRoom && Object.values(hvacRoom.issues).some(Boolean)) {
    fixItems.unshift({
      action: 'Professional HVAC cleaning and mold remediation',
      room: 'HVAC System',
      priority: 'critical',
      estimatedCost: {
        diy: 0, // Not recommended for DIY
        professional: 2000
      },
      timeframe: 'Immediately - affects entire house'
    })
  }

  const basement = rooms.find(r => r.name === 'Basement')
  if (basement && basement.severity !== 'none') {
    const hasWaterproofing = fixItems.some(item => 
      item.room === 'Basement' && item.action.includes('waterproofing')
    )
    if (!hasWaterproofing) {
      fixItems.push({
        action: 'Consider basement waterproofing system',
        room: 'Basement',
        priority: 'medium',
        estimatedCost: {
          diy: 500,
          professional: 5000
        },
        timeframe: 'Within 3 months'
      })
    }
  }

  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
  fixItems.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  return fixItems
}
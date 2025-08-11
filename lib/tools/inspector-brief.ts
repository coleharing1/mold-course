import type { RoomData } from '@/app/(app)/tools/exposure-checklist/page'

export function generateInspectorBrief(
  rooms: RoomData[],
  score: number,
  riskLevel: string
): string {
  const date = new Date().toLocaleDateString()
  const problemRooms = rooms.filter(r => r.severity !== 'none')
  
  const brief = `
PROFESSIONAL MOLD INSPECTION REQUEST
Generated: ${date}

PROPERTY ASSESSMENT SUMMARY
============================

Overall Risk Assessment: ${riskLevel.toUpperCase()}
Exposure Score: ${score}/100
Rooms with Issues: ${problemRooms.length} of ${rooms.length}

AREAS OF CONCERN
================

${problemRooms.map(room => {
  const issues = Object.entries(room.issues)
    .filter(([_, present]) => present)
    .map(([issue]) => issue)
  
  return `
${room.name.toUpperCase()}
Severity: ${room.severity}
Issues Identified:
${issues.map(issue => `  • ${formatIssue(issue)}`).join('\n')}
${room.notes ? `Notes: ${room.notes}` : ''}
---`
}).join('\n')}

CRITICAL FINDINGS
=================

${rooms.some(r => r.issues.visibleMold) ? '⚠️ VISIBLE MOLD DETECTED - Immediate remediation required\n' : ''}
${rooms.some(r => r.issues.waterDamage) ? '⚠️ WATER DAMAGE PRESENT - Source identification needed\n' : ''}
${rooms.some(r => r.issues.leaks) ? '⚠️ ACTIVE LEAKS FOUND - Repair urgently needed\n' : ''}
${rooms.find(r => r.name === 'HVAC System' && Object.values(r.issues).some(Boolean)) ? '⚠️ HVAC CONTAMINATION - System-wide spread risk\n' : ''}

REQUESTED INSPECTION SERVICES
==============================

☑ Comprehensive moisture mapping
☑ Air quality testing (spore counts)
☑ Surface sampling of visible growth
☑ Infrared thermal imaging
☑ HVAC system inspection
☑ Hidden mold detection (wall cavities)
${score > 50 ? '☑ ERMI testing recommended\n' : ''}
${problemRooms.length > 3 ? '☑ Whole-house assessment needed\n' : ''}

SPECIFIC AREAS TO INVESTIGATE
==============================

${generateInvestigationList(rooms)}

OCCUPANT HEALTH CONCERNS
========================

Please note: Occupants may be experiencing mold-related health symptoms.
Consider expedited inspection if symptoms are severe.

PHOTOS AVAILABLE
================

${rooms.reduce((total, room) => total + room.photos.length, 0)} photos have been taken documenting the issues.
These will be provided to the inspector upon scheduling.

CONTACT INFORMATION
===================

Please provide:
- Earliest available inspection date
- Cost estimate for inspection
- Remediation estimate (if applicable)
- Certification and insurance information

ADDITIONAL NOTES
================

This assessment was completed using a comprehensive room-by-room checklist.
The property ${riskLevel === 'critical' ? 'requires IMMEDIATE professional attention' : 
             riskLevel === 'high' ? 'needs prompt professional assessment' :
             'would benefit from professional verification'}.

Thank you for your prompt attention to this matter.
  `.trim()
  
  return brief
}

function formatIssue(issue: string): string {
  const issueMap: Record<string, string> = {
    visibleMold: 'Visible mold growth',
    waterDamage: 'Water stains/damage',
    mustySmell: 'Musty odor detected',
    peeling: 'Peeling paint/wallpaper',
    discoloration: 'Wall/ceiling discoloration',
    humidity: 'Excessive humidity (>50%)',
    leaks: 'Active leaks present',
    condensation: 'Condensation issues'
  }
  return issueMap[issue] || issue
}

function generateInvestigationList(rooms: RoomData[]): string {
  const investigations: string[] = []
  
  // Check specific room combinations
  const bathroom = rooms.find(r => r.name.includes('Bathroom') && r.severity !== 'none')
  if (bathroom) {
    investigations.push('• Behind bathroom fixtures and under vanities')
    investigations.push('• Shower pan integrity and grout condition')
  }
  
  const basement = rooms.find(r => r.name === 'Basement' && r.severity !== 'none')
  if (basement) {
    investigations.push('• Foundation walls for water intrusion')
    investigations.push('• Basement floor for moisture wicking')
    investigations.push('• Sump pump functionality')
  }
  
  const attic = rooms.find(r => r.name === 'Attic' && r.severity !== 'none')
  if (attic) {
    investigations.push('• Roof deck for leak evidence')
    investigations.push('• Attic ventilation adequacy')
    investigations.push('• Insulation for moisture retention')
  }
  
  const kitchen = rooms.find(r => r.name === 'Kitchen' && r.severity !== 'none')
  if (kitchen) {
    investigations.push('• Under-sink plumbing connections')
    investigations.push('• Behind and under appliances')
    investigations.push('• Dishwasher seal integrity')
  }
  
  const hvac = rooms.find(r => r.name === 'HVAC System' && r.severity !== 'none')
  if (hvac) {
    investigations.push('• ENTIRE HVAC system including all ductwork')
    investigations.push('• Coil cleanliness and drip pan condition')
    investigations.push('• Filter housing for bypassed air')
  }
  
  // General areas always worth checking
  investigations.push('• Window frames and sills throughout')
  investigations.push('• Behind furniture on exterior walls')
  investigations.push('• Crawl spaces and utility areas')
  
  return investigations.join('\n')
}
'use client'

import { Shield, AlertTriangle, Info } from 'lucide-react'

interface EvidenceBadgeProps {
  level: 'solid' | 'emerging' | 'controversial'
  tooltip?: string
}

function EvidenceBadge({ level, tooltip }: EvidenceBadgeProps) {
  const config = {
    solid: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
      icon: Shield,
      label: 'Solid Evidence',
      description: tooltip || 'Supported by multiple peer-reviewed studies and clinical practice'
    },
    emerging: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300',
      icon: Info,
      label: 'Emerging Evidence',
      description: tooltip || 'Promising preliminary research, more studies needed'
    },
    controversial: {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      border: 'border-orange-300',
      icon: AlertTriangle,
      label: 'Controversial',
      description: tooltip || 'Mixed evidence, consult your healthcare provider'
    }
  }

  const { bg, text, border, icon: Icon, label, description } = config[level]

  return (
    <div className="inline-flex items-center group relative">
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text} border ${border}`}>
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap max-w-xs z-10">
        <div className="text-center">{description}</div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
          <div className="border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  )
}

export { EvidenceBadge };
export default EvidenceBadge;
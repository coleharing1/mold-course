'use client'

import Link from 'next/link'
import { ArrowRight, Lock, Wrench } from 'lucide-react'

interface ToolPreviewProps {
  name: string
  description: string
  href: string
  status?: 'available' | 'coming-soon' | 'locked'
  prerequisite?: string
}

function ToolPreview({ 
  name, 
  description, 
  href, 
  status = 'available',
  prerequisite 
}: ToolPreviewProps) {
  const isClickable = status === 'available'
  
  const statusConfig = {
    available: {
      bg: 'bg-white hover:bg-gray-50',
      border: 'border-gray-200 hover:border-primary-500',
      text: 'text-gray-900',
      subtext: 'text-gray-600',
      badge: null,
      icon: Wrench,
      iconColor: 'text-primary-600'
    },
    'coming-soon': {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-500',
      subtext: 'text-gray-400',
      badge: 'Coming Soon',
      icon: Wrench,
      iconColor: 'text-gray-400'
    },
    locked: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-500',
      subtext: 'text-gray-400',
      badge: 'Locked',
      icon: Lock,
      iconColor: 'text-gray-400'
    }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  const CardContent = () => (
    <div className={`relative p-4 rounded-lg border-2 ${config.bg} ${config.border} transition-all duration-200 ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-gray-100 ${config.iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold ${config.text} mb-1`}>
            {name}
          </h4>
          <p className={`text-sm ${config.subtext} mb-2`}>
            {description}
          </p>
          {prerequisite && status === 'locked' && (
            <p className="text-xs text-orange-600 font-medium">
              Requires: {prerequisite}
            </p>
          )}
          {config.badge && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded-full mt-2">
              {config.badge}
            </span>
          )}
        </div>
        {isClickable && (
          <ArrowRight className={`h-4 w-4 ${config.iconColor} flex-shrink-0 mt-1`} />
        )}
      </div>
    </div>
  )

  if (isClickable) {
    return (
      <Link href={href}>
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}

export { ToolPreview };
export default ToolPreview;
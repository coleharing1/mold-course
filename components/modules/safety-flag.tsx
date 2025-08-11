'use client'

import { AlertTriangle, XCircle, Info } from 'lucide-react'

interface SafetyFlagProps {
  type: 'critical' | 'warning' | 'info'
  message: string
  title?: string
}

export function SafetyFlag({ type, message, title }: SafetyFlagProps) {
  const config = {
    critical: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      icon: XCircle,
      iconColor: 'text-red-600',
      titleColor: 'text-red-900',
      textColor: 'text-red-800',
      defaultTitle: '⚠️ CRITICAL SAFETY WARNING'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-900',
      textColor: 'text-yellow-800',
      defaultTitle: '⚠️ Important Warning'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      icon: Info,
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-900',
      textColor: 'text-blue-800',
      defaultTitle: 'ℹ️ Safety Information'
    }
  }

  const { bg, border, icon: Icon, iconColor, titleColor, textColor, defaultTitle } = config[type]

  return (
    <div className={`${bg} p-4 rounded-lg mb-6 border-2 ${border}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-6 w-6 ${iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <h3 className={`font-bold ${titleColor} mb-2`}>
            {title || defaultTitle}
          </h3>
          <p className={`${textColor} leading-relaxed`}>
            {message}
          </p>
          {type === 'critical' && (
            <p className={`${textColor} text-sm mt-2 font-semibold`}>
              Consult your healthcare provider before proceeding.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
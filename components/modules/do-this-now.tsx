'use client'

import { AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface DoThisNowProps {
  title: string
  action: string
  urgency?: 'high' | 'medium' | 'low'
  checklist?: string[]
  timeframe?: string
}

function DoThisNow({ 
  title, 
  action, 
  urgency = 'medium',
  checklist,
  timeframe
}: DoThisNowProps) {
  const urgencyStyles = {
    high: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      icon: 'text-red-600',
      title: 'text-red-900',
      text: 'text-red-800'
    },
    medium: {
      bg: 'bg-orange-50',
      border: 'border-orange-500',
      icon: 'text-orange-600',
      title: 'text-orange-900',
      text: 'text-orange-800'
    },
    low: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      icon: 'text-yellow-600',
      title: 'text-yellow-900',
      text: 'text-yellow-800'
    }
  }

  const styles = urgencyStyles[urgency]

  return (
    <div className={`${styles.bg} p-4 rounded-lg mb-6 border-l-4 ${styles.border}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className={`h-6 w-6 ${styles.icon} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <h3 className={`font-bold ${styles.title} mb-2 text-lg`}>
            📋 {title}
          </h3>
          <p className={`${styles.text} mb-3`}>
            {action}
          </p>
          
          {timeframe && (
            <div className="flex items-center gap-2 mb-3">
              <Clock className={`h-4 w-4 ${styles.icon}`} />
              <span className={`text-sm font-medium ${styles.text}`}>
                Timeframe: {timeframe}
              </span>
            </div>
          )}
          
          {checklist && checklist.length > 0 && (
            <div className="mt-3 space-y-2">
              {checklist.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className={`h-4 w-4 ${styles.icon} mt-0.5 flex-shrink-0`} />
                  <span className={`text-sm ${styles.text}`}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoThisNow;

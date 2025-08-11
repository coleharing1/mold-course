/**
 * @fileoverview Protocol Element - Draggable/sortable protocol step component
 */

'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  GripVertical,
  Plus,
  X,
  AlertTriangle,
  CheckCircle,
  Info,
  DollarSign,
  Clock,
  Shield
} from 'lucide-react'
import { ProtocolStep } from '@/app/(app)/tools/protocol-builder/page'

interface ProtocolElementProps {
  step: ProtocolStep
  index?: number
  onAdd?: () => void
  onRemove?: () => void
  isDraggable?: boolean
  isSelected?: boolean
}

export function ProtocolElement({
  step,
  index,
  onAdd,
  onRemove,
  isDraggable = false,
  isSelected = false
}: ProtocolElementProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: step.id,
    disabled: !isDraggable
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'drainage': return 'bg-blue-50 border-blue-200 text-blue-700'
      case 'binder': return 'bg-purple-50 border-purple-200 text-purple-700'
      case 'antifungal': return 'bg-orange-50 border-orange-200 text-orange-700'
      case 'support': return 'bg-green-50 border-green-200 text-green-700'
      case 'lifestyle': return 'bg-gray-50 border-gray-200 text-gray-700'
      default: return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'required': return 'bg-red-100 text-red-700'
      case 'recommended': return 'bg-yellow-100 text-yellow-700'
      case 'optional': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getSafetyIcon = (safety: string) => {
    switch (safety) {
      case 'safe': return <CheckCircle className="h-3 w-3 text-green-600" />
      case 'caution': return <AlertTriangle className="h-3 w-3 text-yellow-600" />
      case 'medical-supervision': return <Shield className="h-3 w-3 text-red-600" />
      default: return <Info className="h-3 w-3 text-gray-600" />
    }
  }

  const getEvidenceColor = (evidence: string) => {
    switch (evidence) {
      case 'solid': return 'bg-green-100 text-green-700'
      case 'emerging': return 'bg-blue-100 text-blue-700'
      case 'anecdotal': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={isDraggable ? style : undefined}
      className={`${isSelected ? 'opacity-50' : ''}`}
    >
      <Card className={`p-3 ${getCategoryColor(step.category)} border transition-all hover:shadow-md`}>
        <div className="flex items-start gap-3">
          {isDraggable && (
            <div
              {...attributes}
              {...listeners}
              className="mt-1 cursor-grab hover:cursor-grabbing"
            >
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
          )}
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {index !== undefined && (
                    <span className="text-xs font-medium text-gray-500">
                      Week {step.weekStart}
                    </span>
                  )}
                  <h4 className="font-medium text-sm">{step.name}</h4>
                  {getSafetyIcon(step.safetyLevel)}
                </div>
                <p className="text-xs text-gray-600 mt-1">{step.description}</p>
              </div>
              
              {onAdd && !isSelected && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onAdd}
                  className="h-6 w-6 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
              
              {onRemove && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onRemove}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Details */}
            <div className="flex flex-wrap gap-2 text-xs">
              {step.dosage && (
                <span className="text-gray-600">
                  <strong>Dose:</strong> {step.dosage}
                </span>
              )}
              {step.frequency && (
                <span className="text-gray-600">
                  <strong>Frequency:</strong> {step.frequency}
                </span>
              )}
              {step.timing && (
                <span className="text-gray-600">
                  <strong>Timing:</strong> {step.timing}
                </span>
              )}
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary" className={`text-xs ${getPriorityColor(step.priority)}`}>
                {step.priority}
              </Badge>
              <Badge variant="secondary" className={`text-xs ${getEvidenceColor(step.evidence)}`}>
                {step.evidence}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {step.duration} days
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <DollarSign className="h-3 w-3 mr-1" />
                ${step.cost}/mo
              </Badge>
            </div>
            
            {/* Prerequisites */}
            {step.prerequisites.length > 0 && (
              <div className="text-xs text-gray-500">
                <strong>Requires:</strong> {step.prerequisites.join(', ')}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
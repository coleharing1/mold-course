'use client'

import { useState } from 'react'
import { Check, Square, CheckSquare } from 'lucide-react'

interface ChecklistComponentProps {
  title: string
  items: string[]
  saveProgress?: boolean
}

export function ChecklistComponent({ 
  title, 
  items,
  saveProgress = false 
}: ChecklistComponentProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedItems(newChecked)
    
    // Save to localStorage if enabled
    if (saveProgress) {
      localStorage.setItem(`checklist-${title}`, JSON.stringify(Array.from(newChecked)))
    }
  }

  const progress = (checkedItems.size / items.length) * 100

  return (
    <div className="my-6 p-4 bg-white rounded-lg border-2 border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {checkedItems.size} of {items.length} completed
        </p>
      </div>
      
      <div className="space-y-2">
        {items.map((item, index) => {
          const isChecked = checkedItems.has(index)
          return (
            <label
              key={index}
              className="flex items-start gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleItem(index)}
                  className="sr-only"
                />
                {isChecked ? (
                  <CheckSquare className="h-5 w-5 text-green-600" />
                ) : (
                  <Square className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <span className={`text-sm ${isChecked ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {item}
              </span>
            </label>
          )
        })}
      </div>
      
      {progress === 100 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              All items completed! Great job!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
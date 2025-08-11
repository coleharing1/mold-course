/**
 * @fileoverview Simple Checklist Component for MDX content
 */

'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

interface ChecklistComponentProps {
  title: string;
  items: string[];
}

export function ChecklistComponent({ title, items }: ChecklistComponentProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <label
            key={index}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <div
              className={`
                w-5 h-5 border-2 rounded flex items-center justify-center mt-0.5 transition-all
                ${checkedItems.has(index) 
                  ? 'bg-green-600 border-green-600' 
                  : 'border-gray-300 group-hover:border-green-500'
                }
              `}
              onClick={() => toggleItem(index)}
            >
              {checkedItems.has(index) && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <span 
              className={`
                text-gray-700 transition-all
                ${checkedItems.has(index) ? 'line-through text-gray-500' : ''}
              `}
            >
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}


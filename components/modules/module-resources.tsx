/**
 * @fileoverview Module Resources Component - Collection of downloadable resources for a module
 */

'use client';

import { DownloadResource } from './download-resource';
import { Package, Download } from 'lucide-react';

interface ModuleResourcesProps {
  moduleSlug: string;
  moduleTitle?: string;
}

const moduleResources = {
  '01-identify-exposure': [
    {
      title: 'Comprehensive Exposure Checklist',
      description: 'Complete systematic checklist for assessing all mold exposure sources in your environment',
      filename: 'comprehensive-exposure-checklist.md',
      type: 'checklist' as const,
      size: '8 pages'
    },
    {
      title: 'Mold Identification Quick Reference',
      description: 'Visual guide to identifying different types of mold by color, texture, and location',
      filename: 'mold-identification-guide.md', 
      type: 'guide' as const,
      size: '12 pages'
    },
    {
      title: 'Vehicle Inspection Checklist',
      description: 'Detailed checklist for assessing mold contamination in cars, trucks, and other vehicles',
      filename: 'vehicle-inspection-checklist.md',
      type: 'checklist' as const,
      size: '6 pages'
    },
    {
      title: 'Low-Mold Food Guide',
      description: 'Comprehensive guide to eliminating dietary sources of mycotoxins and meal planning during detox',
      filename: 'low-mold-food-guide.md',
      type: 'guide' as const,
      size: '10 pages'
    }
  ],
  '03-drainage-pathways': [
    {
      title: 'Drainage Supplements Shopping Guide',
      description: 'Complete shopping list with specific brands, doses, and costs for optimal drainage support ($50-100/month)',
      filename: 'drainage-supplements-guide.md',
      type: 'guide' as const,
      size: '15 pages'
    },
    {
      title: 'Castor Oil Pack Protocol',
      description: 'Step-by-step instructions for liver support through castor oil packs with photos and troubleshooting',
      filename: 'castor-oil-pack-protocol.md',
      type: 'guide' as const,
      size: '8 pages'
    },
    {
      title: 'Coffee Enema Protocol (Advanced)',
      description: 'Detailed advanced protocol for powerful liver detoxification through coffee enemas',
      filename: 'coffee-enema-protocol.md',
      type: 'guide' as const,
      size: '12 pages'
    },
    {
      title: 'Daily Drainage Tracking Checklist',
      description: 'Printable daily checklist for tracking all 5 drainage pathways toward 80% readiness',
      filename: 'daily-drainage-checklist.md',
      type: 'checklist' as const,
      size: '6 pages'
    }
  ]
};

export function ModuleResources({ moduleSlug, moduleTitle }: ModuleResourcesProps) {
  const resources = moduleResources[moduleSlug as keyof typeof moduleResources] || [];

  if (resources.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
          <Package className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Module Resources
          </h3>
          <p className="text-sm text-gray-600">
            Downloadable guides and checklists for {moduleTitle || 'this module'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {resources.map((resource, index) => (
          <DownloadResource
            key={index}
            title={resource.title}
            description={resource.description}
            filename={resource.filename}
            type={resource.type}
            size={resource.size}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Download className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">
              How to Use These Resources
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Print checklists and take them with you during inspections</li>
              <li>• Use guides as quick reference during mold identification</li>
              <li>• Keep copies in your car, workplace, and with family members</li>
              <li>• Share with professionals when getting assessments or quotes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

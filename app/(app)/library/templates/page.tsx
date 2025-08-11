/**
 * @fileoverview Templates Resource Page - Legal and advocacy document templates
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  Search, 
  Download, 
  FileText, 
  Scale, 
  Shield,
  Eye,
  Package,
  AlertTriangle,
  Users,
  Building,
  Heart
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Template {
  id: string
  title: string
  description: string
  category: 'legal' | 'medical' | 'insurance' | 'professional' | 'advocacy'
  complexity: 'simple' | 'moderate' | 'complex'
  size: string
  downloadCount: number
  lastUpdated: string
  useFrequency: 'common' | 'occasional' | 'rare'
  tags: string[]
  filename: string
  legalDisclaimer: boolean
}

const templates: Template[] = [
  {
    id: 'landlord-notification',
    title: 'Landlord Mold Notification Letter',
    description: 'Formal legal template for notifying landlords about mold issues with proper documentation requirements',
    category: 'legal',
    complexity: 'simple',
    size: '3 pages',
    downloadCount: 1654,
    lastUpdated: '2024-01-15',
    useFrequency: 'common',
    tags: ['landlord', 'notification', 'legal', 'tenant-rights'],
    filename: 'landlord-notification-template.docx',
    legalDisclaimer: true
  },
  {
    id: 'insurance-appeal',
    title: 'Insurance Denial Appeal Letter',
    description: 'Template for appealing insurance denials for mold-related testing and treatment with medical justification',
    category: 'insurance',
    complexity: 'complex',
    size: '5 pages',
    downloadCount: 2134,
    lastUpdated: '2024-01-12',
    useFrequency: 'common',
    tags: ['insurance', 'appeal', 'denial', 'medical'],
    filename: 'insurance-appeal-template.docx',
    legalDisclaimer: true
  },
  {
    id: 'doctor-visit-prep',
    title: 'Medical Appointment Preparation Form',
    description: 'Comprehensive template to organize symptoms, test results, and questions for healthcare visits',
    category: 'medical',
    complexity: 'simple',
    size: '4 pages',
    downloadCount: 987,
    lastUpdated: '2024-01-10',
    useFrequency: 'common',
    tags: ['medical', 'appointment', 'symptoms', 'preparation'],
    filename: 'doctor-visit-prep-template.docx',
    legalDisclaimer: false
  },
  {
    id: 'inspector-brief',
    title: 'Environmental Inspector Brief',
    description: 'Template to brief environmental inspectors on mold-specific concerns and testing priorities',
    category: 'professional',
    complexity: 'moderate',
    size: '3 pages',
    downloadCount: 543,
    lastUpdated: '2024-01-08',
    useFrequency: 'occasional',
    tags: ['inspector', 'professional', 'briefing', 'testing'],
    filename: 'inspector-brief-template.docx',
    legalDisclaimer: false
  },
  {
    id: 'workplace-accommodation',
    title: 'Workplace Accommodation Request',
    description: 'ADA-compliant template for requesting workplace accommodations due to mold sensitivity',
    category: 'advocacy',
    complexity: 'complex',
    size: '4 pages',
    downloadCount: 765,
    lastUpdated: '2024-01-06',
    useFrequency: 'occasional',
    tags: ['workplace', 'ada', 'accommodation', 'disability'],
    filename: 'workplace-accommodation-template.docx',
    legalDisclaimer: true
  },
  {
    id: 'school-notification',
    title: 'School Mold Concern Letter',
    description: 'Template for parents to notify schools about mold concerns affecting their child\'s health',
    category: 'advocacy',
    complexity: 'moderate',
    size: '2 pages',
    downloadCount: 432,
    lastUpdated: '2024-01-05',
    useFrequency: 'occasional',
    tags: ['school', 'children', 'health', 'notification'],
    filename: 'school-notification-template.docx',
    legalDisclaimer: false
  },
  {
    id: 'medical-records-request',
    title: 'Medical Records Request Form',
    description: 'HIPAA-compliant template for requesting medical records related to mold illness',
    category: 'medical',
    complexity: 'simple',
    size: '2 pages',
    downloadCount: 876,
    lastUpdated: '2024-01-04',
    useFrequency: 'common',
    tags: ['medical-records', 'hipaa', 'request', 'documentation'],
    filename: 'medical-records-request-template.docx',
    legalDisclaimer: true
  },
  {
    id: 'symptom-documentation',
    title: 'Symptom Documentation Log',
    description: 'Structured template for documenting symptoms for medical and legal purposes',
    category: 'medical',
    complexity: 'simple',
    size: '3 pages',
    downloadCount: 1456,
    lastUpdated: '2024-01-03',
    useFrequency: 'common',
    tags: ['symptoms', 'documentation', 'tracking', 'medical'],
    filename: 'symptom-documentation-template.docx',
    legalDisclaimer: false
  },
  {
    id: 'lease-termination',
    title: 'Mold-Related Lease Termination Letter',
    description: 'Legal template for terminating lease due to habitability issues caused by mold',
    category: 'legal',
    complexity: 'complex',
    size: '4 pages',
    downloadCount: 654,
    lastUpdated: '2024-01-02',
    useFrequency: 'rare',
    tags: ['lease', 'termination', 'habitability', 'legal'],
    filename: 'lease-termination-template.docx',
    legalDisclaimer: true
  },
  {
    id: 'expert-witness-request',
    title: 'Expert Witness Engagement Letter',
    description: 'Template for engaging medical or environmental experts for legal proceedings',
    category: 'legal',
    complexity: 'complex',
    size: '3 pages',
    downloadCount: 234,
    lastUpdated: '2024-01-01',
    useFrequency: 'rare',
    tags: ['expert-witness', 'legal', 'proceedings', 'engagement'],
    filename: 'expert-witness-template.docx',
    legalDisclaimer: true
  }
]

const categoryColors = {
  legal: 'bg-red-100 text-red-800',
  medical: 'bg-blue-100 text-blue-800',
  insurance: 'bg-green-100 text-green-800',
  professional: 'bg-purple-100 text-purple-800',
  advocacy: 'bg-orange-100 text-orange-800'
}

const complexityColors = {
  simple: 'bg-green-100 text-green-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  complex: 'bg-red-100 text-red-800'
}

const categoryIcons = {
  legal: Scale,
  medical: Heart,
  insurance: Shield,
  professional: Building,
  advocacy: Users
}

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleDownload = (template: Template) => {
    console.log('Downloading:', template.filename)
    // Placeholder download functionality
  }

  const categories = [
    { id: 'all', label: 'All Templates', icon: FileText },
    { id: 'legal', label: 'Legal', icon: Scale },
    { id: 'medical', label: 'Medical', icon: Heart },
    { id: 'insurance', label: 'Insurance', icon: Shield },
    { id: 'professional', label: 'Professional', icon: Building },
    { id: 'advocacy', label: 'Advocacy', icon: Users }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/library">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Legal & Advocacy Templates</h1>
            <p className="text-gray-600">
              Professional document templates for medical advocacy, legal protection, and healthcare navigation
            </p>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">Legal Disclaimer</h3>
              <p className="text-sm text-yellow-800">
                These templates are for informational purposes only and do not constitute legal advice. 
                Always consult with qualified attorneys or professionals before using legal documents.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="text-2xl font-bold text-purple-600">{templates.length}</div>
          <div className="text-sm text-gray-600">Total Templates</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">
            {templates.filter(t => t.legalDisclaimer).length}
          </div>
          <div className="text-sm text-gray-600">Legal Documents</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">
            {templates.filter(t => t.useFrequency === 'common').length}
          </div>
          <div className="text-sm text-gray-600">Commonly Used</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-orange-600">
            {templates.reduce((sum, t) => sum + t.downloadCount, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Downloads</div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-8">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const CategoryIcon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                    selectedCategory === category.id
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  <CategoryIcon className="w-4 h-4" />
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing {filteredTemplates.length} of {templates.length} templates
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const CategoryIcon = categoryIcons[template.category]
          return (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-5 h-5 text-gray-600" />
                    <Badge className={cn('text-xs', categoryColors[template.category])}>
                      {template.category}
                    </Badge>
                    {template.legalDisclaimer && (
                      <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                        Legal
                      </Badge>
                    )}
                  </div>
                  <Badge className={cn('text-xs', complexityColors[template.complexity])}>
                    {template.complexity}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{template.title}</CardTitle>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{template.size}</span>
                  <span>{template.downloadCount.toLocaleString()} downloads</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Updated {new Date(template.lastUpdated).toLocaleDateString()}</span>
                  <Badge variant="outline" className="text-xs">
                    {template.useFrequency}
                  </Badge>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDownload(template)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Template Collections */}
      <Card className="mt-8 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Template Collections
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4 border-red-200 bg-red-50">
            <h4 className="font-medium text-red-900 mb-2">Legal Protection Kit</h4>
            <p className="text-sm text-red-700 mb-3">Essential legal documents for tenant protection</p>
            <div className="space-y-1 text-xs text-red-600">
              <div>• Landlord Notification Letter</div>
              <div>• Lease Termination Template</div>
              <div>• Expert Witness Engagement</div>
            </div>
            <Button size="sm" className="mt-3 w-full bg-red-600 hover:bg-red-700">
              Download Legal Kit
            </Button>
          </Card>

          <Card className="p-4 border-blue-200 bg-blue-50">
            <h4 className="font-medium text-blue-900 mb-2">Medical Advocacy Pack</h4>
            <p className="text-sm text-blue-700 mb-3">Templates for healthcare navigation</p>
            <div className="space-y-1 text-xs text-blue-600">
              <div>• Doctor Visit Preparation</div>
              <div>• Medical Records Request</div>
              <div>• Symptom Documentation</div>
            </div>
            <Button size="sm" className="mt-3 w-full bg-blue-600 hover:bg-blue-700">
              Download Medical Pack
            </Button>
          </Card>

          <Card className="p-4 border-green-200 bg-green-50">
            <h4 className="font-medium text-green-900 mb-2">Insurance Navigator</h4>
            <p className="text-sm text-green-700 mb-3">Templates for insurance challenges</p>
            <div className="space-y-1 text-xs text-green-600">
              <div>• Insurance Appeal Letter</div>
              <div>• Medical Justification</div>
              <div>• Coverage Documentation</div>
            </div>
            <Button size="sm" className="mt-3 w-full bg-green-600 hover:bg-green-700">
              Download Insurance Kit
            </Button>
          </Card>
        </div>
      </Card>

      {/* Usage Guidelines */}
      <Card className="mt-6 p-6 border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Template Usage Guidelines</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-medium mb-2">Before Using Templates:</h4>
            <ul className="space-y-1">
              <li>• Review local and state laws</li>
              <li>• Consult with qualified professionals</li>
              <li>• Gather all relevant documentation</li>
              <li>• Customize for your specific situation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Best Practices:</h4>
            <ul className="space-y-1">
              <li>• Keep copies of all sent documents</li>
              <li>• Use certified mail when required</li>
              <li>• Document all communications</li>
              <li>• Follow up on submissions</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

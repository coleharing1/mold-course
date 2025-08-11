/**
 * @fileoverview Cheat Sheets Resource Page - Quick reference guides and printable materials
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
  CheckSquare, 
  Clock,
  Eye,
  Package,
  PrinterIcon,
  Wallet
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheatSheet {
  id: string
  title: string
  description: string
  type: 'reference' | 'checklist' | 'guide' | 'emergency'
  size: string
  downloadCount: number
  printFriendly: boolean
  walletSize: boolean
  module?: string
  tags: string[]
  filename: string
}

const cheatSheets: CheatSheet[] = [
  {
    id: 'quick-reference-card',
    title: 'Emergency Reference Card',
    description: 'Wallet-sized card with emergency contacts, key dosages, and critical warning signs',
    type: 'emergency',
    size: '1 page',
    downloadCount: 2134,
    printFriendly: true,
    walletSize: true,
    tags: ['emergency', 'contact', 'dosages', 'portable'],
    filename: 'emergency-reference-card.pdf'
  },
  {
    id: 'supplement-timing-chart',
    title: 'Supplement Timing Quick Chart',
    description: 'Visual chart showing optimal timing for all supplements to avoid interactions',
    type: 'reference',
    size: '2 pages',
    downloadCount: 1876,
    printFriendly: true,
    walletSize: false,
    module: 'Module 04',
    tags: ['supplements', 'timing', 'interactions', 'chart'],
    filename: 'supplement-timing-chart.pdf'
  },
  {
    id: 'mold-types-guide',
    title: 'Mold Identification Quick Guide',
    description: 'Visual guide with photos of common mold types, colors, and risk levels',
    type: 'guide',
    size: '4 pages',
    downloadCount: 3245,
    printFriendly: true,
    walletSize: false,
    module: 'Module 01',
    tags: ['mold', 'identification', 'visual', 'types'],
    filename: 'mold-types-quick-guide.pdf'
  },
  {
    id: 'drainage-score-card',
    title: 'Daily Drainage Score Card',
    description: 'Simple daily tracking card for all 5 drainage pathways with scoring guide',
    type: 'checklist',
    size: '2 pages',
    downloadCount: 2456,
    printFriendly: true,
    walletSize: false,
    module: 'Module 03',
    tags: ['drainage', 'tracking', 'daily', 'score'],
    filename: 'drainage-score-card.pdf'
  },
  {
    id: 'herx-action-plan',
    title: 'Herx Response Action Plan',
    description: 'Step-by-step action card for managing Herxheimer reactions by severity level',
    type: 'emergency',
    size: '2 pages',
    downloadCount: 1923,
    printFriendly: true,
    walletSize: true,
    module: 'Module 06',
    tags: ['herx', 'emergency', 'action-plan', 'severity'],
    filename: 'herx-action-plan.pdf'
  },
  {
    id: 'safe-foods-list',
    title: 'Low-Mold Foods Cheat Sheet',
    description: 'Comprehensive list of safe foods vs. foods to avoid during mold detox',
    type: 'guide',
    size: '3 pages',
    downloadCount: 2987,
    printFriendly: true,
    walletSize: false,
    module: 'Module 08',
    tags: ['diet', 'foods', 'safe', 'avoid'],
    filename: 'safe-foods-cheat-sheet.pdf'
  },
  {
    id: 'testing-timeline',
    title: 'Testing & Retesting Timeline',
    description: 'Visual timeline showing when to do various tests during recovery',
    type: 'guide',
    size: '2 pages',
    downloadCount: 1654,
    printFriendly: true,
    walletSize: false,
    module: 'Module 02',
    tags: ['testing', 'timeline', 'schedule', 'tracking'],
    filename: 'testing-timeline.pdf'
  },
  {
    id: 'binder-dosing-guide',
    title: 'Binder Quick Dosing Guide',
    description: 'Reference chart for binder types, dosages, and timing by body weight',
    type: 'reference',
    size: '1 page',
    downloadCount: 2156,
    printFriendly: true,
    walletSize: true,
    module: 'Module 04',
    tags: ['binders', 'dosing', 'weight', 'timing'],
    filename: 'binder-dosing-guide.pdf'
  },
  {
    id: 'symptom-severity-scale',
    title: 'Symptom Severity Scale',
    description: 'Standardized scale for rating and tracking symptom severity over time',
    type: 'checklist',
    size: '1 page',
    downloadCount: 1789,
    printFriendly: true,
    walletSize: true,
    tags: ['symptoms', 'tracking', 'severity', 'scale'],
    filename: 'symptom-severity-scale.pdf'
  },
  {
    id: 'travel-safety-checklist',
    title: 'Travel Safety Quick Checklist',
    description: 'Essential checklist for avoiding mold exposure while traveling',
    type: 'checklist',
    size: '2 pages',
    downloadCount: 892,
    printFriendly: true,
    walletSize: true,
    tags: ['travel', 'safety', 'hotels', 'prevention'],
    filename: 'travel-safety-checklist.pdf'
  }
]

const typeColors = {
  reference: 'bg-blue-100 text-blue-800',
  checklist: 'bg-green-100 text-green-800',
  guide: 'bg-purple-100 text-purple-800',
  emergency: 'bg-red-100 text-red-800'
}

export default function CheatSheetsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSheets = cheatSheets.filter(sheet => 
    sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sheet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sheet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleDownload = (sheet: CheatSheet) => {
    console.log('Downloading:', sheet.filename)
    // Placeholder download functionality
  }

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
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cheat Sheets</h1>
            <p className="text-gray-600">
              Quick reference guides and printable materials for easy access during your mold detox journey
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <PrinterIcon className="w-4 h-4" />
            <span>Print-friendly formats</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            <span>Wallet-sized options</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Quick reference</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">{cheatSheets.length}</div>
          <div className="text-sm text-gray-600">Total Cheat Sheets</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">
            {cheatSheets.filter(s => s.walletSize).length}
          </div>
          <div className="text-sm text-gray-600">Wallet-sized</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-purple-600">
            {cheatSheets.filter(s => s.type === 'emergency').length}
          </div>
          <div className="text-sm text-gray-600">Emergency Cards</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-orange-600">
            {cheatSheets.reduce((sum, s) => sum + s.downloadCount, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Downloads</div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search cheat sheets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing {filteredSheets.length} of {cheatSheets.length} cheat sheets
        </p>
      </div>

      {/* Cheat Sheets Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSheets.map((sheet) => (
          <Card key={sheet.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-gray-600" />
                  <Badge className={cn('text-xs', typeColors[sheet.type])}>
                    {sheet.type}
                  </Badge>
                  {sheet.walletSize && (
                    <Badge variant="outline" className="text-xs">
                      <Wallet className="w-3 h-3 mr-1" />
                      Wallet
                    </Badge>
                  )}
                </div>
                {sheet.printFriendly && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <PrinterIcon className="w-3 h-3" />
                    <span>Print-ready</span>
                  </div>
                )}
              </div>
              <CardTitle className="text-lg">{sheet.title}</CardTitle>
              <CardDescription className="text-sm">
                {sheet.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>{sheet.size}</span>
                <span>{sheet.downloadCount.toLocaleString()} downloads</span>
              </div>
              
              {sheet.module && (
                <Badge variant="outline" className="mb-4 text-xs">
                  {sheet.module}
                </Badge>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {sheet.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {sheet.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{sheet.tags.length - 3}
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
                  onClick={() => handleDownload(sheet)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access Section */}
      <Card className="mt-8 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Quick Access Collections
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 border-red-200 bg-red-50">
            <h4 className="font-medium text-red-900 mb-2">Emergency Kit</h4>
            <p className="text-sm text-red-700 mb-3">Essential cards for crisis situations</p>
            <div className="space-y-1 text-xs text-red-600">
              <div>• Emergency Reference Card</div>
              <div>• Herx Response Action Plan</div>
              <div>• Symptom Severity Scale</div>
            </div>
            <Button size="sm" className="mt-3 w-full bg-red-600 hover:bg-red-700">
              Download Emergency Kit
            </Button>
          </Card>

          <Card className="p-4 border-blue-200 bg-blue-50">
            <h4 className="font-medium text-blue-900 mb-2">Daily Trackers</h4>
            <p className="text-sm text-blue-700 mb-3">Cards for everyday monitoring</p>
            <div className="space-y-1 text-xs text-blue-600">
              <div>• Drainage Score Card</div>
              <div>• Supplement Timing Chart</div>
              <div>• Symptom Severity Scale</div>
            </div>
            <Button size="sm" className="mt-3 w-full bg-blue-600 hover:bg-blue-700">
              Download Tracker Kit
            </Button>
          </Card>

          <Card className="p-4 border-green-200 bg-green-50">
            <h4 className="font-medium text-green-900 mb-2">Reference Pack</h4>
            <p className="text-sm text-green-700 mb-3">Quick guides for decision making</p>
            <div className="space-y-1 text-xs text-green-600">
              <div>• Mold Types Guide</div>
              <div>• Safe Foods List</div>
              <div>• Binder Dosing Guide</div>
            </div>
            <Button size="sm" className="mt-3 w-full bg-green-600 hover:bg-green-700">
              Download Reference Pack
            </Button>
          </Card>
        </div>
      </Card>

      {/* Printing Tips */}
      <Card className="mt-6 p-6 border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <PrinterIcon className="w-5 h-5" />
          Printing Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-medium mb-2">For Best Results:</h4>
            <ul className="space-y-1">
              <li>• Use cardstock (80-110 lb) for wallet cards</li>
              <li>• Regular paper (20 lb) fine for larger sheets</li>
              <li>• Print in color for visual guides</li>
              <li>• Consider laminating emergency cards</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Organization Ideas:</h4>
            <ul className="space-y-1">
              <li>• Keep emergency cards in wallet/purse</li>
              <li>• Post daily trackers on refrigerator</li>
              <li>• File reference guides in binder</li>
              <li>• Share copies with family members</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

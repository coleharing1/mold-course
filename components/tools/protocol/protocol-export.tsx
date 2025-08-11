/**
 * @fileoverview Protocol Export - Export protocol to PDF, Calendar, or share link
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Download,
  Calendar,
  Share2,
  Copy,
  Check,
  FileText,
  Mail,
  X
} from 'lucide-react'
import { ProtocolStep } from '@/app/(app)/tools/protocol-builder/page'

interface ProtocolExportProps {
  protocol: {
    name: string
    steps: ProtocolStep[]
    duration: number
    cost: number
  }
  onClose: () => void
}

export function ProtocolExport({ protocol, onClose }: ProtocolExportProps) {
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const generateShareLink = () => {
    // In production, this would generate a unique shareable link
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const protocolData = encodeURIComponent(JSON.stringify({
      name: protocol.name,
      steps: protocol.steps.map(s => s.id)
    }))
    return `${baseUrl}/tools/protocol-builder?template=${protocolData}`
  }

  const copyToClipboard = async () => {
    const link = generateShareLink()
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exportToPDF = () => {
    // In production, this would generate a proper PDF
    const content = generateProtocolText()
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${protocol.name.replace(/\s+/g, '-')}-protocol.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportToCalendar = () => {
    // Generate ICS file for calendar import
    const icsContent = generateICSContent()
    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${protocol.name.replace(/\s+/g, '-')}-schedule.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  const generateProtocolText = () => {
    let text = `${protocol.name}\n${'='.repeat(protocol.name.length)}\n\n`
    text += `Duration: ${protocol.duration} weeks\n`
    text += `Estimated Cost: $${protocol.cost}/month\n\n`
    
    text += 'Protocol Steps:\n'
    text += '-'.repeat(20) + '\n\n'
    
    const phases = {
      drainage: 'Phase 1: Drainage & Foundation',
      binder: 'Phase 2: Mycotoxin Binding',
      antifungal: 'Phase 3: Antifungal Treatment',
      support: 'Support Supplements',
      lifestyle: 'Lifestyle Modifications'
    }
    
    Object.entries(phases).forEach(([category, phaseName]) => {
      const categorySteps = protocol.steps.filter(s => s.category === category)
      if (categorySteps.length > 0) {
        text += `\n${phaseName}\n${'-'.repeat(phaseName.length)}\n`
        categorySteps.forEach(step => {
          text += `\nWeek ${step.weekStart}: ${step.name}\n`
          text += `  ${step.description}\n`
          if (step.dosage) text += `  Dosage: ${step.dosage}\n`
          if (step.frequency) text += `  Frequency: ${step.frequency}\n`
          if (step.timing) text += `  Timing: ${step.timing}\n`
          text += `  Duration: ${step.duration} days\n`
          text += `  Cost: $${step.cost}/month\n`
        })
      }
    })
    
    text += '\n\nIMPORTANT SAFETY NOTES:\n'
    text += '-'.repeat(20) + '\n'
    text += '• Never skip drainage preparation (minimum 2-4 weeks)\n'
    text += '• Start binders slowly and increase gradually\n'
    text += '• Monitor for Herxheimer reactions\n'
    text += '• Consult with a healthcare provider before starting\n'
    text += '• This protocol is for educational purposes only\n'
    
    return text
  }

  const generateICSContent = () => {
    const now = new Date()
    const startDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // Start in 1 week
    
    let ics = 'BEGIN:VCALENDAR\n'
    ics += 'VERSION:2.0\n'
    ics += 'PRODID:-//Mold Detox Mastery//Protocol Builder//EN\n'
    ics += 'CALSCALE:GREGORIAN\n'
    ics += 'METHOD:PUBLISH\n'
    
    protocol.steps.forEach((step, index) => {
      const eventStart = new Date(startDate.getTime() + (step.weekStart - 1) * 7 * 24 * 60 * 60 * 1000)
      const eventEnd = new Date(eventStart.getTime() + step.duration * 24 * 60 * 60 * 1000)
      
      ics += 'BEGIN:VEVENT\n'
      ics += `UID:${step.id}-${Date.now()}@molddetoxmastery.com\n`
      ics += `DTSTAMP:${formatICSDate(now)}\n`
      ics += `DTSTART:${formatICSDate(eventStart)}\n`
      ics += `DTEND:${formatICSDate(eventEnd)}\n`
      ics += `SUMMARY:${step.name}\n`
      ics += `DESCRIPTION:${step.description}\\n`
      if (step.dosage) ics += `Dosage: ${step.dosage}\\n`
      if (step.frequency) ics += `Frequency: ${step.frequency}\\n`
      if (step.timing) ics += `Timing: ${step.timing}\\n`
      ics += `CATEGORIES:${step.category.toUpperCase()}\n`
      ics += `PRIORITY:${step.priority === 'required' ? '1' : step.priority === 'recommended' ? '5' : '9'}\n`
      ics += 'END:VEVENT\n'
    })
    
    ics += 'END:VCALENDAR\n'
    return ics
  }

  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  }

  const sendEmail = async () => {
    // In production, this would send via email API
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Export Protocol</CardTitle>
            <CardDescription>
              Save, share, or sync your {protocol.name}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="download" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="download">
                <Download className="h-4 w-4 mr-2" />
                Download
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="share">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </TabsTrigger>
            </TabsList>

            <TabsContent value="download" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Download Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={exportToPDF}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download as Text File
                  </Button>
                  <p className="text-sm text-gray-600">
                    Get a detailed text document with all protocol steps, dosing, timing, and safety notes
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Calendar Integration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={exportToCalendar}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Export to Calendar (.ics)
                  </Button>
                  <p className="text-sm text-gray-600">
                    Import into Google Calendar, Apple Calendar, or Outlook
                  </p>
                  
                  <Alert>
                    <AlertDescription>
                      Calendar events will be created starting 1 week from today. 
                      You can adjust dates in your calendar app after importing.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="share" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Share Protocol</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Share Link</Label>
                    <div className="flex gap-2">
                      <Input
                        value={generateShareLink()}
                        readOnly
                        className="font-mono text-xs"
                      />
                      <Button
                        variant="outline"
                        onClick={copyToClipboard}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email Protocol</Label>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Button
                        onClick={sendEmail}
                        disabled={!email || emailSent}
                      >
                        {emailSent ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Mail className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {emailSent && (
                      <p className="text-sm text-green-600">Protocol sent!</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Protocol Summary */}
          <Card className="mt-4 bg-gray-50">
            <CardContent className="pt-6">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Protocol:</span>
                  <span className="font-medium">{protocol.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{protocol.duration} weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Steps:</span>
                  <span className="font-medium">{protocol.steps.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Cost:</span>
                  <span className="font-medium">${protocol.cost}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
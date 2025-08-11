/**
 * @fileoverview Emergency Guide component for critical Herx situations
 */

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Phone, 
  AlertTriangle, 
  Heart, 
  Brain, 
  Activity,
  Clock,
  User,
  MapPin
} from 'lucide-react'

interface EmergencyGuideProps {
  currentAssessment: any
}

export function EmergencyGuide({ currentAssessment }: EmergencyGuideProps) {
  const handleCall911 = () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'tel:911'
    }
  }

  const handleCallSuicideLine = () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'tel:988'
    }
  }

  return (
    <div className="space-y-6">
      {/* Emergency Header */}
      <Alert className="border-red-500 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Emergency Protocols & Red Flag Symptoms</AlertTitle>
        <AlertDescription>
          Know when to seek immediate medical attention during Herx reactions
        </AlertDescription>
      </Alert>

      {/* Immediate Emergency Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <Phone className="w-5 h-5" />
              Call 911 Immediately
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-700 mb-4">Call 911 for these symptoms:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-red-500 mt-0.5" />
                  <span>Chest pain or severe heart rhythm problems</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-red-500 mt-0.5" />
                  <span>Difficulty breathing or gasping for air</span>
                </li>
                <li className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-red-500 mt-0.5" />
                  <span>Seizures or loss of consciousness</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                  <span>Severe confusion or altered mental state</span>
                </li>
              </ul>
              <Button 
                onClick={handleCall911}
                className="w-full bg-red-600 hover:bg-red-700"
                size="lg"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 911 Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Heart className="w-5 h-5" />
              Mental Health Crisis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-700 mb-4">Call for mental health emergencies:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-purple-500 mt-0.5" />
                  <span>Thoughts of self-harm or suicide</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-purple-500 mt-0.5" />
                  <span>Severe panic that won't resolve</span>
                </li>
                <li className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-purple-500 mt-0.5" />
                  <span>Hallucinations or psychotic episodes</span>
                </li>
                <li className="flex items-start gap-2">
                  <User className="w-4 h-4 text-purple-500 mt-0.5" />
                  <span>Feeling hopeless or trapped</span>
                </li>
              </ul>
              <Button 
                onClick={handleCallSuicideLine}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 988 (Suicide Line)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Room Preparation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            Emergency Room Preparation
          </CardTitle>
          <CardDescription>
            What to bring and what to tell ER staff
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Bring to ER:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Current medications list
                </li>
                <li className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  Emergency contact information
                </li>
                <li className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-blue-500" />
                  Insurance card and photo ID
                </li>
                <li className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  Support person who knows your protocol
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Tell ER Staff:</h4>
              <ul className="space-y-2 text-sm">
                <li>"I'm being treated for mold illness/CIRS"</li>
                <li>"I'm having a severe reaction to my treatment"</li>
                <li>"These symptoms started [timeframe] after taking [medication]"</li>
                <li>"My treating physician is Dr. [Name]"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Risk Assessment */}
      {currentAssessment && (
        <Card className={`border-2 ${
          currentAssessment.riskLevel === 'emergency' ? 'border-red-500 bg-red-50' :
          currentAssessment.riskLevel === 'high' ? 'border-orange-500 bg-orange-50' :
          'border-gray-200'
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Your Current Risk Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold">
                Severity: {currentAssessment.overallSeverity}/10
              </span>
              <Badge className={`text-lg px-4 py-2 ${
                currentAssessment.riskLevel === 'emergency' ? 'bg-red-100 text-red-800' :
                currentAssessment.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                currentAssessment.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {currentAssessment.riskLevel.toUpperCase()} RISK
              </Badge>
            </div>

            {currentAssessment.riskLevel === 'emergency' && (
              <Alert className="border-red-500 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>IMMEDIATE ACTION REQUIRED</AlertTitle>
                <AlertDescription>
                  Your symptoms indicate a medical emergency. Consider calling 911 or going to the ER immediately.
                  Do not delay seeking medical care.
                </AlertDescription>
              </Alert>
            )}

            {currentAssessment.riskLevel === 'high' && (
              <Alert className="border-orange-500 bg-orange-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>HIGH RISK - MEDICAL EVALUATION RECOMMENDED</AlertTitle>
                <AlertDescription>
                  Your symptoms are severe. Stop all treatments except binders and consider 
                  seeking medical evaluation today.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Emergency Contacts Template */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact Template</CardTitle>
          <CardDescription>
            Keep this information easily accessible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg font-mono text-sm">
            <div>
              <strong>PRIMARY DOCTOR:</strong><br />
              Name: ___________________<br />
              Phone: __________________<br />
              After-hours: ______________
            </div>
            
            <div>
              <strong>EMERGENCY CONTACTS:</strong><br />
              911 - Emergency Services<br />
              988 - Suicide & Crisis Lifeline<br />
              Poison Control: 1-800-222-1222
            </div>

            <div>
              <strong>CURRENT PROTOCOL:</strong><br />
              Binders: ________________<br />
              Antifungals: _____________<br />
              Start Date: ______________
            </div>

            <div>
              <strong>MEDICAL CONDITIONS:</strong><br />
              Mold Illness/CIRS<br />
              Other: __________________
            </div>

            <div>
              <strong>ALLERGIES:</strong><br />
              Medications: _____________<br />
              Foods: __________________
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important Disclaimer</AlertTitle>
        <AlertDescription>
          This tool provides educational information only and does not replace professional 
          medical advice. Always trust your instincts - if you feel something is seriously 
          wrong, seek immediate medical attention regardless of what this tool indicates.
        </AlertDescription>
      </Alert>
    </div>
  )
}

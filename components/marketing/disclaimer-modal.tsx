'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasAccepted, setHasAccepted] = useState(false)

  useEffect(() => {
    // Check if user has already accepted the disclaimer
    const accepted = localStorage.getItem('disclaimer-accepted')
    if (!accepted) {
      // Show modal after a short delay
      const timer = setTimeout(() => setIsOpen(true), 2000)
      return () => clearTimeout(timer)
    } else {
      setHasAccepted(true)
    }
    return undefined
  }, [])

  const handleAccept = () => {
    localStorage.setItem('disclaimer-accepted', 'true')
    setHasAccepted(true)
    setIsOpen(false)
  }

  if (hasAccepted || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 transition-opacity" />

        {/* Modal */}
        <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Important Medical Disclaimer
              </h3>
              
              <div className="mt-4 space-y-4 text-sm text-gray-600">
                <p>
                  <strong>This program is for educational purposes only</strong> and is not intended 
                  to diagnose, treat, cure, or prevent any disease. The information provided should 
                  not replace professional medical advice, diagnosis, or treatment.
                </p>

                <p>
                  <strong>Always consult with qualified healthcare providers</strong> before making 
                  any changes to your health regimen, especially if you:
                </p>
                
                <ul className="ml-5 list-disc space-y-1">
                  <li>Have chronic health conditions</li>
                  <li>Take prescription medications</li>
                  <li>Are pregnant or nursing</li>
                  <li>Have severe mold exposure symptoms</li>
                  <li>Experience any adverse reactions</li>
                </ul>

                <p>
                  <strong>Emergency situations:</strong> If you experience severe symptoms such as 
                  difficulty breathing, chest pain, severe allergic reactions, or other medical 
                  emergencies, seek immediate medical attention.
                </p>

                <p>
                  <strong>Individual results may vary.</strong> The protocols and recommendations 
                  in this program are based on general principles and may not be suitable for 
                  everyone. Your healthcare provider can help determine what&apos;s appropriate 
                  for your specific situation.
                </p>

                <p className="font-semibold text-gray-700">
                  By using this program, you acknowledge that you have read and understood this 
                  disclaimer and agree to use the information at your own risk.
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button onClick={handleAccept} className="flex-1">
                  I Understand and Accept
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/'}
                  className="flex-1"
                >
                  Learn More First
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
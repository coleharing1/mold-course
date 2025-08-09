import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Mold Detox Mastery
            </h3>
            <p className="text-sm text-gray-600">
              Evidence-based mold illness recovery with personalized protocols and tracking tools.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Learn
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/modules" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Course Modules
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Interactive Tools
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/medical-disclaimer" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Medical Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Mold Detox Mastery. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-gray-500">
                This content is for informational purposes only and not medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
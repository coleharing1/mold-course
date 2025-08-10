import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Mold Detox Mastery</h3>
            <p className="text-sm text-gray-600">
              Evidence-based mold illness recovery with personalized protocols and tracking tools.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Learn
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/modules"
                  className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                >
                  Course Modules
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                >
                  Interactive Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/medical-disclaimer"
                  className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                >
                  Medical Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
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

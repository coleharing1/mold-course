import { Shield, Lock, RefreshCw, CreditCard, Users, Award } from 'lucide-react'

const trustItems = [
  {
    icon: Shield,
    title: '30-Day Guarantee',
    description: 'Full refund if not satisfied, no questions asked',
  },
  {
    icon: Lock,
    title: 'Bank-Level Security',
    description: '256-bit SSL encryption protects your data',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Powered by Stripe with PCI compliance',
  },
  {
    icon: Users,
    title: '5,000+ Members',
    description: 'Join our growing recovery community',
  },
  {
    icon: RefreshCw,
    title: 'Regular Updates',
    description: 'Content reviewed quarterly by experts',
  },
  {
    icon: Award,
    title: 'Evidence-Based',
    description: 'All protocols backed by research',
  },
]

export function TrustSignals() {
  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {trustItems.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-xs text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Payment methods and certifications */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Trusted Payment Partners</p>
            <div className="flex items-center space-x-8">
              {/* Placeholder for payment logos - in production these would be actual images */}
              <div className="flex items-center space-x-2 text-gray-400">
                <CreditCard className="h-8 w-8" />
                <span className="text-sm font-medium">Stripe</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Shield className="h-8 w-8" />
                <span className="text-sm font-medium">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Lock className="h-8 w-8" />
                <span className="text-sm font-medium">PCI Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security badges */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Your personal information is encrypted and never shared with third parties
          </p>
        </div>
      </div>
    </section>
  )
}
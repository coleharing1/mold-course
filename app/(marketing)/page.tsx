import { Hero } from '@/components/marketing/hero'
import { Transformation } from '@/components/marketing/transformation'
import { Evidence } from '@/components/marketing/evidence'
import { DisclaimerModal } from '@/components/marketing/disclaimer-modal'
import { Curriculum } from '@/components/marketing/curriculum'
import { ToolsPreview } from '@/components/marketing/tools-preview'
import { PricingTable } from '@/components/marketing/pricing-table'
import { FAQ } from '@/components/marketing/faq'
import { SocialProof } from '@/components/marketing/social-proof'
import { TrustSignals } from '@/components/marketing/trust-signals'

export default function MarketingHome() {
  return (
    <>
      {/* Medical Disclaimer Modal - Shows on first visit */}
      <DisclaimerModal />
      
      {/* Hero Section with Enhanced Promise */}
      <Hero />
      
      {/* Social Proof & Stats */}
      <SocialProof />
      
      {/* Transformation Journey */}
      <Transformation />
      
      {/* Evidence-Based Content Display */}
      <Evidence />
      
      {/* Comprehensive Curriculum */}
      <Curriculum />
      
      {/* Interactive Tools Preview */}
      <ToolsPreview />
      
      {/* Pricing Options */}
      <PricingTable />
      
      {/* Frequently Asked Questions */}
      <FAQ />
      
      {/* Trust Signals & Security */}
      <TrustSignals />
    </>
  )
}
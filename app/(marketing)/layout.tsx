import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} flex min-h-screen flex-col`}>
      <Header variant="marketing" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

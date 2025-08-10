import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Mold Detox Mastery',
  description:
    'Your complete guide to mold illness recovery with evidence-based protocols and personalized tracking tools',
  keywords: 'mold detox, mold illness, mycotoxins, biotoxin illness, CIRS, detoxification',
  authors: [{ name: 'Mold Detox Mastery' }],
  openGraph: {
    title: 'Mold Detox Mastery',
    description: 'Your complete guide to mold illness recovery',
    type: 'website',
    locale: 'en_US',
    url: 'https://molddetoxmastery.com',
    siteName: 'Mold Detox Mastery',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mold Detox Mastery',
    description: 'Your complete guide to mold illness recovery',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

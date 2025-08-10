import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { AppSidebar } from '@/components/layout/app-sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`}>
      <Header variant="app" />
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 lg:pl-64">
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}

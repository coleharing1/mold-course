import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-600">
                Mold Detox Mastery
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/modules" className="text-gray-700 hover:text-primary-600 transition-colors">
              Modules
            </Link>
            <Link href="/tools" className="text-gray-700 hover:text-primary-600 transition-colors">
              Tools
            </Link>
            <Link href="/progress" className="text-gray-700 hover:text-primary-600 transition-colors">
              Progress
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-primary-600 transition-colors">
              Resources
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
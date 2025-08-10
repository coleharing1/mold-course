import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-600">Mold Detox Mastery</span>
            </Link>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/modules"
              className="text-gray-700 transition-colors hover:text-primary-600"
            >
              Modules
            </Link>
            <Link href="/tools" className="text-gray-700 transition-colors hover:text-primary-600">
              Tools
            </Link>
            <Link
              href="/progress"
              className="text-gray-700 transition-colors hover:text-primary-600"
            >
              Progress
            </Link>
            <Link
              href="/resources"
              className="text-gray-700 transition-colors hover:text-primary-600"
            >
              Resources
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 transition-colors hover:text-primary-600">
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

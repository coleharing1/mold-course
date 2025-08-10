export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">Mold Detox Mastery</h1>
          <p className="mb-8 text-xl text-gray-600">
            Your evidence-based guide to mold illness recovery
          </p>
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">Welcome to Your Recovery Journey</h2>
            <p className="mb-6 text-gray-600">
              Coming soon: A comprehensive platform for mold detoxification with gated modules,
              interactive tools, and personalized tracking.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold">10 Modules</h3>
                <p className="text-sm text-gray-600">
                  Structured progression from exposure to prevention
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold">9 Interactive Tools</h3>
                <p className="text-sm text-gray-600">
                  Calculators and planners for personalized protocols
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold">Evidence-Based</h3>
                <p className="text-sm text-gray-600">
                  All content marked with research quality indicators
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

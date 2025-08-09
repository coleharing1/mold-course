export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Mold Detox Mastery
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your evidence-based guide to mold illness recovery
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome to Your Recovery Journey
            </h2>
            <p className="text-gray-600 mb-6">
              Coming soon: A comprehensive platform for mold detoxification with gated modules, 
              interactive tools, and personalized tracking.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">10 Modules</h3>
                <p className="text-sm text-gray-600">
                  Structured progression from exposure to prevention
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">9 Interactive Tools</h3>
                <p className="text-sm text-gray-600">
                  Calculators and planners for personalized protocols
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Evidence-Based</h3>
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
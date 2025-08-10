export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tailwind CSS Test Page</h1>
        <p className="text-lg text-gray-600 mb-8">Testing if Tailwind styles are working correctly.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-primary-600 mb-2">Card 1</h2>
            <p className="text-gray-500">This card should have a white background with shadow.</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Card 2</h2>
            <p>This card should have a gradient background.</p>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Card 3</h2>
            <p className="text-gray-500">This card should have a dashed border.</p>
          </div>
        </div>
        
        <div className="mt-8 space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Blue Button
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
            Green Button
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Outline Button
          </button>
        </div>
      </div>
    </div>
  )
}
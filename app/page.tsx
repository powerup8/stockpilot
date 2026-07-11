import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">StockPilot</h1>
        <p className="text-lg text-gray-600 mb-8">
          Simple inventory tracking with real-time low-stock alerts. Know what you have,
          before you run out.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="bg-gray-900 text-white text-sm font-medium rounded-lg px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="text-gray-700 text-sm font-medium hover:text-gray-900"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}

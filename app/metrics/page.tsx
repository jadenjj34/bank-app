import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Service Metrics | Metro Bank",
  description: "View Metro Bank's service performance and quality metrics",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Service Quality Metrics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Performance Metrics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Performance Metrics</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Uptime</span>
                <span className="font-semibold text-green-600">99.99%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Transaction Success Rate</span>
                <span className="font-semibold text-green-600">99.85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Customer Satisfaction</span>
                <span className="font-semibold text-green-600">98.5%</span>
              </div>
            </div>
          </div>

          {/* Response Times */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Response Times</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Transaction Time</span>
                <span className="font-semibold">1.2s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Customer Support Response</span>
                <span className="font-semibold">2m 30s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mobile App Load Time</span>
                <span className="font-semibold">1.5s</span>
              </div>
            </div>
          </div>

          {/* Customer Feedback */}
          <div className="col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Feedback</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-gray-600">Overall Rating</span>
                <div className="flex items-center ml-4">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="ml-2 text-gray-600">4.8/5</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600">Net Promoter Score</span>
                <div className="ml-4">
                  <span className="text-blue-600">+85</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Service Commitments</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>24/7 customer support availability</li>
            <li>99.99% system uptime guarantee</li>
            <li>Real-time transaction processing</li>
            <li>Regular security updates and improvements</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

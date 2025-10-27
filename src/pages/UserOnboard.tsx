import { useAuth } from '../context/AuthContext'

function UserOnboard() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">User Onboarding</h1>
            <p className="text-lg text-gray-600">
              Welcome! Let's get you set up with your AWS management dashboard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Connect AWS Account</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Link your AWS account to start managing your cloud resources.
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Connect AWS
              </button>
            </div>

            {/* Step 2 */}
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Configure Permissions</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Set up the necessary IAM roles and permissions for resource management.
              </p>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Configure
              </button>
            </div>

            {/* Step 3 */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Set Up Monitoring</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Configure CloudWatch alarms and monitoring for your resources.
              </p>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                Set Up
              </button>
            </div>

            {/* Step 4 */}
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  4
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Review & Complete</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Review your configuration and complete the onboarding process.
              </p>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Complete
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
              <p className="text-gray-600">
                Check out our documentation or contact support if you need assistance with the onboarding process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserOnboard

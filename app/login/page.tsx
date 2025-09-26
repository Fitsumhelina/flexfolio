import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-lg mx-auto mb-6 flex items-center justify-center">
            <div className="flex-shrink-0 flex items-center space-x-4">
              {/* Logo */}
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="flexfolio logo"
                  className="w-26 h-20 object-contain"
                />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your FlexFolio account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Check, X, ArrowLeft } from "lucide-react"
import { authClient } from "@/lib/auth-client"

interface RegisterStep2Props {
  userData: { name: string; email: string; password: string }
  onBack: () => void
}

export function RegisterStep2({ userData, onBack }: RegisterStep2Props) {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'available' | 'unavailable' | 'invalid'>('idle')
  const [error, setError] = useState("")
  const router = useRouter()

  // Debounced username availability check
  useEffect(() => {
    if (!username || username.length < 3) {
      setUsernameStatus('idle')
      return
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
      setUsernameStatus('invalid')
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsCheckingUsername(true)
      try {
        const response = await fetch('/api/auth/check-username', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        })

        const data = await response.json()
        
        console.log('Username availability response:', data)
        
        if (data.available) {
          setUsernameStatus('available')
        } else {
          setUsernameStatus('unavailable')
        }
      } catch (error) {
        console.error('Error checking username:', error)
        // If the API fails, assume username is available for now
        setUsernameStatus('available')
      } finally {
        setIsCheckingUsername(false)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [username])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (usernameStatus !== 'available') {
      setError("Please choose a valid and available username")
      return
    }

    setIsLoading(true)

    try {
      console.log('Attempting registration with:', { email: userData.email, name: userData.name, username })
      
      // Try Better Auth first, fallback to custom API
      try {
        const { data, error } = await authClient.signUp.email({
          email: userData.email,
          password: userData.password,
          name: userData.name,
          username: username,
        })

        console.log('Better Auth registration response:', { data, error })

        if (error) {
          throw new Error(error.message || 'Better Auth registration failed')
        } else if (data) {
          // Redirect to login page with success message
          router.push('/login?registered=true')
          return
        }
      } catch (betterAuthError) {
        console.log('Better Auth failed, trying custom API:', betterAuthError)
        
        // Fallback to custom registration API
        const response = await fetch('/api/auth/register-better-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            name: userData.name,
            username: username,
          }),
        })

        const data = await response.json()
        console.log('Custom API registration response:', data)

        if (response.ok) {
          // Redirect to login page with success message
          router.push('/login?registered=true')
        } else {
          setError(data.error || 'Registration failed')
        }
      }
    } catch (error) {
      console.error('Registration catch error:', error)
      setError('Network error. Please try again.')
    }

    setIsLoading(false)
  }

  const getUsernameIcon = () => {
    if (isCheckingUsername) {
      return <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    }
    
    switch (usernameStatus) {
      case 'available':
        return <Check className="h-4 w-4 text-green-500" />
      case 'unavailable':
      case 'invalid':
        return <X className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getUsernameMessage = () => {
    if (isCheckingUsername) return "Checking availability..."
    
    switch (usernameStatus) {
      case 'available':
        return "Username is available!"
      case 'unavailable':
        return "Username is already taken"
      case 'invalid':
        return "Username can only contain letters, numbers, underscores, and dots"
      default:
        return "Choose a unique username (3-30 characters)"
    }
  }

  const isFormValid = usernameStatus === 'available' && !isLoading

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Choose Username</CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Step 2 of 2: Select your unique username
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 pr-10"
                required
                minLength={3}
                maxLength={30}
              />
              <div className="absolute right-3 top-3">
                {getUsernameIcon()}
              </div>
            </div>
            <p className={`text-xs ${
              usernameStatus === 'available' ? 'text-green-600' : 
              usernameStatus === 'unavailable' || usernameStatus === 'invalid' ? 'text-red-600' : 
              'text-muted-foreground'
            }`}>
              {getUsernameMessage()}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Your username will be used in your portfolio URL: <br />
              <span className="font-mono text-blue-600">
                flexfolio.com/{username || 'your-username'}
              </span>
            </p>
          </div>

          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button 
              type="submit" 
              className="flex-1" 
              disabled={!isFormValid}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

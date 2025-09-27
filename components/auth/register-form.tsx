"use client"

import { useState } from "react"
import { RegisterStep1 } from "./register-step1"
import { RegisterStep2 } from "./register-step2"

export function RegisterForm() {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState<{ name: string; email: string; password: string } | null>(null)

  const handleStep1Next = (data: { name: string; email: string; password: string }) => {
    setUserData(data)
    setStep(2)
  }

  const handleStep2Back = () => {
    setStep(1)
  }

  if (step === 1) {
    return <RegisterStep1 onNext={handleStep1Next} />
  }

  if (step === 2 && userData) {
    return <RegisterStep2 userData={userData} onBack={handleStep2Back} />
  }

  return null
}
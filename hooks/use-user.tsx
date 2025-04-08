"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  email: string
  firstName: string
  lastName: string
  profileImage: string | null
  netWorth: number
  tier: string
  phone: string
  address: string
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if we have user info in localStorage
    const email = localStorage.getItem("userEmail")
    if (!email) {
      setIsLoading(false)
      return
    }

    // In a real application, we would fetch user info from API
    // This is a mock implementation
    const mockUser = {
      email,
      firstName: localStorage.getItem("userFirstName") || "John",
      lastName: localStorage.getItem("userLastName") || "Doe",
      profileImage: localStorage.getItem("userProfileImage") || null,
      netWorth: Number.parseFloat(localStorage.getItem("userNetWorth") || "14000000"),
      tier: localStorage.getItem("userTier") || "premium",
      phone: localStorage.getItem("userPhone") || "+1 (555) 123-4567",
      address: localStorage.getItem("userAddress") || "123 Luxury Ave, New York, NY 10001",
    }

    setUser(mockUser)
    setIsLoading(false)
  }, [])

  const updateUser = (updates: Partial<User>) => {
    if (!user) return

    // Update localStorage
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        localStorage.setItem(`user£{key.charAt(0).toUpperCase() + key.slice(1)}`, value.toString())
      }
    })

    // Update user state
    setUser({
      ...user,
      ...updates,
    })
  }

  const logout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userFirstName")
    localStorage.removeItem("userLastName")
    localStorage.removeItem("userProfileImage")
    localStorage.removeItem("userNetWorth")
    localStorage.removeItem("userTier")
    localStorage.removeItem("userPhone")
    localStorage.removeItem("userAddress")

    // Reset user state
    setUser(null)

    // Redirect to login page
    router.push("/")
  }

  return {
    user,
    isLoading,
    updateUser,
    logout,
  }
}


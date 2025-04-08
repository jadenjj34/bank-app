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
  city: string
  state: string
  zipCode: string
  country: string
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

    // Load all user data from localStorage
    const mockUser = {
      email,
      firstName: localStorage.getItem("userFirstName") || "Victoria",
      lastName: localStorage.getItem("userLastName") || "Porter",
      profileImage: localStorage.getItem("userProfileImage"),
      netWorth: Number.parseFloat(localStorage.getItem("userNetWorth") || "14000000"),
      tier: localStorage.getItem("userTier") || "premium",
      phone: localStorage.getItem("userPhone") || "+44 7537 134076",
      address: localStorage.getItem("userAddress") || "15854 Wolf Mountain Rd",
      city: localStorage.getItem("userCity") || "Grass Valley",
      state: localStorage.getItem("userState") || "California",
      zipCode: localStorage.getItem("userZipCode") || "95949",
      country: localStorage.getItem("userCountry") || "United States",
    }

    setUser(mockUser)
    setIsLoading(false)
  }, [])

  const updateUser = (updates: Partial<User>) => {
    if (!user) return

    // Update localStorage for each field that changed
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        const storageKey = `user${key.charAt(0).toUpperCase() + key.slice(1)}`
        localStorage.setItem(storageKey, value.toString())
      }
    })

    // Update state with new values
    setUser(prev => {
      if (!prev) return null
      return {
        ...prev,
        ...updates
      }
    })
  }

  const logout = () => {
    // Clear all user-related data from localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('user')) {
        localStorage.removeItem(key)
      }
    })
    setUser(null)
    router.push('/login')
  }

  return { user, isLoading, updateUser, logout }
}

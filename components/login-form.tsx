"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simple validation
      if (username) {
        // Store user email in localStorage for use across app
        localStorage.setItem("userEmail", email)
        localStorage.setItem("username", username)

        // Set up mock user data for high-net-worth customer
        localStorage.setItem("userFirstName", email.split("@")[0].split(".")[0])
        localStorage.setItem("userLastName", email.split("@")[0].split(".")[1] || "Smith")
        localStorage.setItem("userNetWorth", "14000000")
        localStorage.setItem("userTier", "premium")
        localStorage.setItem("userPhone", "+1 (555) 123-4567")
        localStorage.setItem("userAddress", "123 Luxury Ave, New York, NY 10001")

        toast({
          title: "Login successful",
          description: "Welcome back to Hamilton Bank",
        })
        router.push("/dashboard")
      } else {
        throw new Error("Please enter both email and password")
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username" className="font-semibold  ">Enter your 12-digit customer number or username </Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="h-12"
        />
        <span className="text-gray-600 mt-1 text-[10px]">(Your customer number should only include numbers)</span>
      </div>

      {/* <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="#" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-12"
        />
      </div> */}

      <div className="text-center">
        <Link href="/forgot" className="text-blue-800 underline font-light hover:text-blue-700">Forgot your customer number or username</Link>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <label
          htmlFor="remember"
          className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me (Don't tick if you are on a shared computer)
        </label>
      </div>
      <div className="flex items-center justify-center">
        <Button type="submit" className="w-1/2 h-12 rounded-full px-5" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
      {/* <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="text-primary font-medium hover:underline">
          Create an account
        </a>
      </div> */}
      {/* 
      <div className="pt-4 flex items-center justify-center space-x-4">
        <Image src="/images/visa-logo.png" alt="Visa" width={40} height={25} />
        <Image src="/images/mastercard-logo.png" alt="Mastercard" width={40} height={25} />
      </div> */}
    </form>
  )
}


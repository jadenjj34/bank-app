"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function AddAccountForm() {
  const [formData, setFormData] = useState({
    accountType: "",
    nickname: "",
    initialDeposit: "",
    currency: "usd",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Validation
      if (!formData.accountType || !formData.nickname || !formData.initialDeposit) {
        throw new Error("Please fill in all required fields")
      }

      if (Number.parseFloat(formData.initialDeposit) < 100) {
        throw new Error("Initial deposit must be at least £100")
      }

      toast({
        title: "Account created successfully",
        description: `Your new £{formData.accountType} account has been created with ££{formData.initialDeposit} initial deposit.`,
      })

      // Reset form
      setFormData({
        accountType: "",
        nickname: "",
        initialDeposit: "",
        currency: "usd",
      })

      // Redirect to accounts page
      router.push("/dashboard/accounts")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while creating account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Open New Account</CardTitle>
        <CardDescription>Create a new bank account with Hamilton Bank</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type *</Label>
            <Select
              value={formData.accountType}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, accountType: value }))}
            >
              <SelectTrigger id="accountType">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">Checking Account</SelectItem>
                <SelectItem value="savings">Savings Account</SelectItem>
                <SelectItem value="moneyMarket">Money Market Account</SelectItem>
                <SelectItem value="cd">Certificate of Deposit</SelectItem>
                <SelectItem value="investment">Investment Account</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">Account Nickname *</Label>
            <Input
              id="nickname"
              placeholder="e.g., Primary Checking, Vacation Savings"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="initialDeposit">Initial Deposit Amount (Minimum £100) *</Label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">£</span>
              <Input
                id="initialDeposit"
                type="number"
                min="100"
                step="0.01"
                placeholder="0.00"
                className="pl-7"
                value={formData.initialDeposit}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={formData.currency}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, currency: value }))}
            >
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD - US Dollar</SelectItem>
                <SelectItem value="eur">EUR - Euro</SelectItem>
                <SelectItem value="gbp">GBP - British Pound</SelectItem>
                <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Open New Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AddBeneficiaryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    accountNumber: "",
    confirmAccountNumber: "",
    bankName: "",
    routingNumber: "",
    type: "",
  })
  const [isLoading, setIsLoading] = useState(false)
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

      // Simple validation
      if (!formData.name || !formData.accountNumber || !formData.confirmAccountNumber || !formData.bankName) {
        throw new Error("Please fill in all required fields")
      }

      if (formData.accountNumber !== formData.confirmAccountNumber) {
        throw new Error("Account numbers do not match")
      }

      toast({
        title: "Beneficiary added",
        description: `£{formData.name} has been added to your beneficiaries`,
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        accountNumber: "",
        confirmAccountNumber: "",
        bankName: "",
        routingNumber: "",
        type: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Beneficiary Name *</Label>
          <Input
            id="name"
            placeholder="Full name or company name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number *</Label>
          <Input
            id="accountNumber"
            placeholder="Account number"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmAccountNumber">Confirm Account Number *</Label>
          <Input
            id="confirmAccountNumber"
            placeholder="Re-enter account number"
            value={formData.confirmAccountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name *</Label>
          <Input id="bankName" placeholder="Bank name" value={formData.bankName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="routingNumber">Routing Number</Label>
          <Input
            id="routingNumber"
            placeholder="Routing number"
            value={formData.routingNumber}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Beneficiary Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Family">Family</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Rent">Rent</SelectItem>
              <SelectItem value="Utility">Utility</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Beneficiary...
            </>
          ) : (
            "Add Beneficiary"
          )}
        </Button>
      </div>
    </form>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Mail, MessageSquare, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      if (!formData.name || !formData.email || !formData.category || !formData.subject || !formData.message) {
        throw new Error("Please fill in all fields")
      }

      toast({
        title: "Support ticket created",
        description: "We'll get back to you as soon as possible",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        category: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit support request",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col items-center p-4 rounded-lg border text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-3">
            <Phone className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium mb-1">Call Us</h3>
          <p className="text-sm text-muted-foreground mb-2">Available 24/7</p>
          <p className="font-medium">1-800-HAMILTON</p>
        </div>

        <div className="flex flex-col items-center p-4 rounded-lg border text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-3">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium mb-1">Email Us</h3>
          <p className="text-sm text-muted-foreground mb-2">Response within 24 hours</p>
          <p className="font-medium">support@hamiltonbank.com</p>
        </div>

        <div className="flex flex-col items-center p-4 rounded-lg border text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-3">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium mb-1">Live Chat</h3>
          <p className="text-sm text-muted-foreground mb-2">Available 8AM - 8PM</p>
          <Button variant="outline" size="sm">
            Start Chat
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Your name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Your email" value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="account">Account Issues</SelectItem>
              <SelectItem value="transfers">Transfers & Payments</SelectItem>
              <SelectItem value="cards">Cards</SelectItem>
              <SelectItem value="loans">Loans & Mortgages</SelectItem>
              <SelectItem value="technical">Technical Support</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="Brief description of your issue"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Please describe your issue in detail"
            rows={5}
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Support Request"
          )}
        </Button>
      </form>
    </div>
  )
}


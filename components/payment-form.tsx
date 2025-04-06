"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2, Check } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"

export default function PaymentForm() {
  const [fromAccount, setFromAccount] = useState("")
  const [payee, setPayee] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [memo, setMemo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simple validation
      if (!fromAccount || !payee || !amount || !date) {
        throw new Error("Please fill in all required fields")
      }

      // Show success state
      setIsSuccess(true)

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)

        // Reset form
        setAmount("")
        setMemo("")

        toast({
          title: "Payment scheduled",
          description: `£{formatCurrency(Number.parseFloat(amount))} will be paid to £{payee} on £{format(date, "PPP")}`,
        })
      }, 2000)
    } catch (error) {
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "Please check your details and try again",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">Payment Scheduled</h3>
            <p className="text-center text-muted-foreground mb-6">
              {formatCurrency(Number.parseFloat(amount || "0"))} will be paid to {payee} on{" "}
              {format(date || new Date(), "PPP")}
            </p>
            <div className="space-y-2 w-full">
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-500">From Account</span>
                <span className="text-sm font-medium">
                  {fromAccount === "checking" ? "Checking Account (**** 4832)" : "Savings Account (**** 7291)"}
                </span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-500">To</span>
                <span className="text-sm font-medium">{payee}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-500">Amount</span>
                <span className="text-sm font-medium">{formatCurrency(Number.parseFloat(amount || "0"))}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-500">Date</span>
                <span className="text-sm font-medium">{format(date || new Date(), "PPP")}</span>
              </div>
              {memo && (
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-500">Memo</span>
                  <span className="text-sm font-medium">{memo}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay a Bill</CardTitle>
        <CardDescription>Make a one-time payment or schedule a future payment</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from-account">From Account</Label>
            <Select value={fromAccount} onValueChange={setFromAccount}>
              <SelectTrigger id="from-account">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">Checking Account (**** 4832)</SelectItem>
                <SelectItem value="savings">Savings Account (**** 7291)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payee">Payee</Label>
            <Select value={payee} onValueChange={setPayee}>
              <SelectTrigger id="payee">
                <SelectValue placeholder="Select payee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electricity Company">Electricity Company</SelectItem>
                <SelectItem value="Water Utility">Water Utility</SelectItem>
                <SelectItem value="Internet Provider">Internet Provider</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Phone Bill">Phone Bill</SelectItem>
                <SelectItem value="new">+ Add New Payee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">£</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="pl-7"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Payment Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="memo">Memo (Optional)</Label>
            <Input id="memo" placeholder="Add a memo" value={memo} onChange={(e) => setMemo(e.target.value)} />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Schedule Payment"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}


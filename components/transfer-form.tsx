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

export default function TransferForm() {
  const [fromAccount, setFromAccount] = useState("")
  const [toAccount, setToAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [description, setDescription] = useState("")
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
      if (!fromAccount || !toAccount || !amount || !date) {
        throw new Error("Please fill in all required fields")
      }

      if (fromAccount === toAccount) {
        throw new Error("Source and destination accounts cannot be the same")
      }

      // Simulate balance check
      const transferAmount = Number.parseFloat(amount)
      if (fromAccount === "checking" && transferAmount > 5000) {
        throw new Error("Insufficient funds in checking account")
      }

      // Show success state
      setIsSuccess(true)

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)

        // Reset form
        setAmount("")
        setDescription("")

        toast({
          title: "Transfer initiated",
          description: `£{formatCurrency(Number.parseFloat(amount))} will be transferred from £{
            fromAccount === "checking"
              ? "Checking Account"
              : fromAccount === "savings"
                ? "Savings Account"
                : "Investment Account"
          } to £{toAccount} on £{format(date, "PPP")}`,
        })
      }, 2000)
    } catch (error) {
      toast({
        title: "Transfer failed",
        description: error instanceof Error ? error.message : "Please check your details and try again",
        variant: "destructive",
      })
      setIsLoading(false)
    } finally {
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
            <h3 className="text-xl font-medium mb-2">Transfer Successful</h3>
            <p className="text-center text-muted-foreground mb-6">
              {formatCurrency(Number.parseFloat(amount || "0"))} will be transferred on{" "}
              {format(date || new Date(), "PPP")}
            </p>
            <div className="space-y-2 w-full">
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-500">From</span>
                <span className="text-sm font-medium">
                  {fromAccount === "checking"
                    ? "Checking Account (**** 4832)"
                    : fromAccount === "savings"
                      ? "Savings Account (**** 7291)"
                      : "Investment Account (**** 1548)"}
                </span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-500">To</span>
                <span className="text-sm font-medium">
                  {toAccount === "savings"
                    ? "My Savings Account (**** 7291)"
                    : toAccount === "john"
                      ? "John Smith (**** 5678)"
                      : toAccount === "sarah"
                        ? "Sarah Johnson (**** 9012)"
                        : toAccount === "rent"
                          ? "Mike's Rent (**** 3456)"
                          : toAccount === "mom"
                            ? "Mom (**** 7890)"
                            : toAccount === "electricity"
                              ? "Electricity Bill (**** 1234)"
                              : "New Recipient"}
                </span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-500">Amount</span>
                <span className="text-sm font-medium">{formatCurrency(Number.parseFloat(amount || "0"))}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-500">Date</span>
                <span className="text-sm font-medium">{format(date || new Date(), "PPP")}</span>
              </div>
              {description && (
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-500">Description</span>
                  <span className="text-sm font-medium">{description}</span>
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
        <CardTitle>New Transfer</CardTitle>
        <CardDescription>Transfer money between your accounts or to other recipients</CardDescription>
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
                <SelectItem value="investment">Investment Account (**** 1548)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-account">To Account</Label>
            <Select value={toAccount} onValueChange={setToAccount}>
              <SelectTrigger id="to-account">
                <SelectValue placeholder="Select recipient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="savings">My Savings Account (**** 7291)</SelectItem>
                <SelectItem value="john">John Smith (**** 5678)</SelectItem>
                <SelectItem value="sarah">Sarah Johnson (**** 9012)</SelectItem>
                <SelectItem value="rent">Mike's Rent (**** 3456)</SelectItem>
                <SelectItem value="mom">Mom (**** 7890)</SelectItem>
                <SelectItem value="electricity">Electricity Bill (**** 1234)</SelectItem>
                <SelectItem value="new">+ Add New Recipient</SelectItem>
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
            <Label htmlFor="date">Transfer Date</Label>
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
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Add a note"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
            "Continue"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}


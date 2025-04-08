"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/utils"

interface Recipient {
  id: string
  name: string
  type: "business" | "charity" | "investment" | "personal"
  amount: number
  lastTransaction: string
  frequency: "monthly" | "quarterly" | "yearly" | "one-time"
  notes?: string
}

export default function RecentRecipients() {
  const router = useRouter()

  const recipients: Recipient[] = [
    {
      id: "1",
      name: "Luxury Property Development Fund",
      type: "investment",
      amount: 8500000,
      lastTransaction: "Apr 1, 2023",
      frequency: "quarterly",
      notes: "Q1 2023 investment"
    },
    {
      id: "2",
      name: "Education Foundation UK",
      type: "charity",
      amount: 1000000,
      lastTransaction: "Oct 10, 2022",
      frequency: "yearly",
      notes: "Annual educational grant"
    },
    {
      id: "3",
      name: "Monaco Real Estate Holdings",
      type: "business",
      amount: 25000000,
      lastTransaction: "Aug 25, 2021",
      frequency: "one-time",
      notes: "Property acquisition"
    },
    {
      id: "4",
      name: "AI Innovation Fund",
      type: "investment",
      amount: 5000000,
      lastTransaction: "Nov 18, 2019",
      frequency: "monthly",
      notes: "Venture capital investment"
    },
    {
      id: "5",
      name: "Medical Research Institute",
      type: "charity",
      amount: 500000,
      lastTransaction: "May 8, 2021",
      frequency: "quarterly",
      notes: "Research funding"
    }
  ]

  const handleAddRecipient = () => {
    router.push("/dashboard/transfers/new-recipient")
  }

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Recipients</CardTitle>
          <CardDescription>Your most frequent transfer destinations</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddRecipient}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Recipient
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recipients.map((recipient) => (
            <div
              key={recipient.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <p className="font-medium">{recipient.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {recipient.type.charAt(0).toUpperCase() + recipient.type.slice(1)}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-medium">{formatCurrency(recipient.amount)}</p>
                  <p className="text-sm text-muted-foreground">
                    {recipient.frequency.charAt(0).toUpperCase() + recipient.frequency.slice(1)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/dashboard/transfers/${recipient.id}`)}
                >
                  Transfer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

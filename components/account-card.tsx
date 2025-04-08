"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, CreditCard, Wallet, LineChart, Banknote } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AccountDetails from "./account-details"

interface AccountCardProps {
  account: {
    id: string
    name: string
    number: string
    balance: number
    type: string
    features?: string[]
  }
}

export default function AccountCard({ account }: AccountCardProps) {
  const [showBalance, setShowBalance] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const router = useRouter()

  const getIcon = () => {
    switch (account.type) {
      case "checking":
        return <CreditCard className="h-6 w-6 text-primary" />
      case "savings":
        return <Wallet className="h-6 w-6 text-green-600" />
      case "investment":
        return <LineChart className="h-6 w-6 text-blue-600" />
      case "moneyMarket":
        return <Banknote className="h-6 w-6 text-purple-600" />
      case "credit":
        return <CreditCard className="h-6 w-6 text-pink-600" />
      default:
        return <CreditCard className="h-6 w-6 text-primary" />
    }
  }

  const handleTransfer = () => {
    router.push("/dashboard/transfers")
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setShowBalance(!showBalance)} className="h-8 w-8">
          {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-primary/10 p-2">{getIcon()}</div>
          <div>
            <div className="text-2xl font-bold">{showBalance ? formatCurrency(account.balance) : "••••••••"}</div>
            <p className="text-xs text-muted-foreground">{account.number}</p>
            {account.features && (
              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium">Features:</p>
                <ul className="space-y-1">
                  {account.features.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      <span className="mr-2">•</span>{feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <Button className="w-full" variant="outline">
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>{account.name}</DialogTitle>
                <DialogDescription>Account details and recent transactions</DialogDescription>
              </DialogHeader>
              <AccountDetails account={account} />
            </DialogContent>
          </Dialog>
          <Button className="w-full" onClick={handleTransfer}>
            Transfer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

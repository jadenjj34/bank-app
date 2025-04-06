"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Eye, EyeOff, Wallet, BanknoteIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useUser } from "@/hooks/use-user"
import { formatCurrency } from "@/lib/utils"

export default function AccountSummary() {
  const [showBalance, setShowBalance] = useState(true)
  const { user } = useUser()

  // Set fixed balance for our high-net-worth customer
  const mainAccountBalance = 14000000 // £14 million
  const savingsBalance = 5000000 // £5 million for savings
  const investmentBalance = 9000000 // £9 million in investments

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Premium Accounts</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setShowBalance(!showBalance)} className="h-8 w-8">
          {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-primary/10 p-2">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Account</p>
              <div className="text-2xl font-bold">
                {showBalance ? formatCurrency(mainAccountBalance) : "••••••••"}
              </div>
              <p className="text-xs text-muted-foreground">Black Card **** 4832</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-green-100 p-2">
              <Wallet className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Savings Account</p>
              <div className="text-xl font-bold">
                {showBalance ? formatCurrency(savingsBalance) : "••••••••"}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-blue-100 p-2">
              <BanknoteIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Investment Account</p>
              <div className="text-xl font-bold">
                {showBalance ? formatCurrency(investmentBalance) : "••••••••"}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button className="w-full" variant="outline" onClick={() => (window.location.href = "/dashboard/transfers")}>
              Transfer
            </Button>
            <Button className="w-full" onClick={() => (window.location.href = "/dashboard/payments")}>
              Pay
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

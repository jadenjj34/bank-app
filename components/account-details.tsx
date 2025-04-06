"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"
import { ArrowDownLeft, ArrowUpRight, CreditCard, Wallet, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface AccountDetailsProps {
  account: {
    id: string
    name: string
    number: string
    balance: number
    type: string
  }
}

export default function AccountDetails({ account }: AccountDetailsProps) {
  const router = useRouter()

  // Mock transaction data
  const transactions = [
    {
      id: "1",
      name: "Starbucks",
      date: "Today, 10:30 AM",
      amount: -12.5,
      type: "expense",
    },
    {
      id: "2",
      name: "Salary Deposit",
      date: "Yesterday, 9:15 AM",
      amount: 3500.0,
      type: "income",
    },
    {
      id: "3",
      name: "Amazon",
      date: "Yesterday, 2:45 PM",
      amount: -89.99,
      type: "expense",
    },
    {
      id: "4",
      name: "Transfer to Savings",
      date: "Mar 15, 2023",
      amount: -500.0,
      type: "expense",
    },
    {
      id: "5",
      name: "Uber",
      date: "Mar 14, 2023",
      amount: -24.75,
      type: "expense",
    },
  ]

  const getIcon = () => {
    switch (account.type) {
      case "checking":
        return <CreditCard className="h-10 w-10 text-primary" />
      case "savings":
        return <Wallet className="h-10 w-10 text-primary" />
      case "investment":
        return <LineChart className="h-10 w-10 text-primary" />
      default:
        return <CreditCard className="h-10 w-10 text-primary" />
    }
  }

  const getAccountDetails = () => {
    switch (account.type) {
      case "checking":
        return {
          interestRate: "0.01% APY",
          openDate: "Jan 15, 2019",
          accountType: "Premium Checking",
          monthlyFee: "£0.00",
          availableBalance: formatCurrency(account.balance - 100),
        }
      case "savings":
        return {
          interestRate: "0.50% APY",
          openDate: "Mar 22, 2019",
          accountType: "High-Yield Savings",
          monthlyFee: "£0.00",
          availableBalance: formatCurrency(account.balance),
        }
      case "investment":
        return {
          interestRate: "Variable",
          openDate: "Jun 10, 2020",
          accountType: "Wealth Management",
          monthlyFee: "£0.00",
          availableBalance: formatCurrency(account.balance),
        }
      default:
        return {
          interestRate: "0.01% APY",
          openDate: "Jan 15, 2019",
          accountType: "Standard Account",
          monthlyFee: "£0.00",
          availableBalance: formatCurrency(account.balance),
        }
    }
  }

  const details = getAccountDetails()

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-start space-x-4">
        <div className="rounded-full bg-primary/10 p-3">{getIcon()}</div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{account.name}</h3>
          <p className="text-sm text-muted-foreground">{account.number}</p>
          <div className="mt-2 text-2xl font-bold">{formatCurrency(account.balance)}</div>
        </div>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="details">Account Details</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4 mt-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div
                  className={`rounded-full p-2 £{
                    transaction.type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <ArrowDownLeft className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className={`font-medium £{transaction.type === "income" ? "text-green-600" : "text-gray-900"}`}>
                {transaction.amount > 0 ? "+" : ""}
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/accounts")}>
            View All Transactions
          </Button>
        </TabsContent>

        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-4">
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Account Type</dt>
                  <dd className="text-sm text-gray-900">{details.accountType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Account Number</dt>
                  <dd className="text-sm text-gray-900">{account.number}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Available Balance</dt>
                  <dd className="text-sm text-gray-900">{details.availableBalance}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Interest Rate</dt>
                  <dd className="text-sm text-gray-900">{details.interestRate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Open Date</dt>
                  <dd className="text-sm text-gray-900">{details.openDate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Monthly Fee</dt>
                  <dd className="text-sm text-gray-900">{details.monthlyFee}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => router.push("/dashboard/statements")}>
              View Statements
            </Button>
            <Button onClick={() => router.push("/dashboard/transfers")}>Make a Transfer</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


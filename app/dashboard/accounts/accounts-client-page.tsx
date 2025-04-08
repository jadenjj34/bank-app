"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"
import AccountCard from "@/components/account-card"
import TransactionTable from "@/components/transaction-table"
import RecentRecipients from "@/components/recent-recipients"
import Transfers from "@/components/transfers"
import { useUser } from "@/hooks/use-user"
import { useRouter } from "next/navigation"

export default function AccountsClientPage() {
  const { user } = useUser()
  const router = useRouter()

  // Calculate account balances based on user's net worth
  const netWorth = user?.netWorth || 14000000

  // Mock account data
  const accounts = [
    {
      id: "1",
      name: "Black Card - Premium Checking",
      number: "**** 4832",
      balance: 14020000, // £14,020,000 - main current account
      type: "checking",
      features: [
        "Unlimited international transactions",
        "24/7 dedicated concierge",
        "Priority access to investment opportunities"
      ]
    },
    {
      id: "2",
      name: "Wealth Management Savings",
      number: "**** 7291",
      balance: 5000000, // £5,000,000 - savings account
      type: "savings",
      features: [
        "3.5% annual interest",
        "Daily compounding",
        "Premium wealth management services"
      ]
    },
    {
      id: "3",
      name: "Private Wealth Investment",
      number: "**** 1548",
      balance: 9000000, // £9,000,000 - investment account
      type: "investment",
      features: [
        "Dedicated portfolio manager",
        "Access to exclusive investment opportunities",
        "Custom investment strategies"
      ]
    },

  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Accounts</h1>
        <Button onClick={() => router.push("/dashboard/accounts/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>

      {/* <div className="grid gap-6 md:grid-cols-2">
        <RecentRecipients /> */}
      <div className="">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Account Activity</CardTitle>
              <CardDescription>View all transactions across your accounts</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Accounts</TabsTrigger>
                {/* <TabsTrigger value="checking">Checking</TabsTrigger> */}
                <TabsTrigger value="savings">Savings</TabsTrigger>
                <TabsTrigger value="investment">Investment</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <TransactionTable />
              </TabsContent>
              <TabsContent value="checking">
                <TransactionTable accountType="checking" />
              </TabsContent>
              <TabsContent value="savings">
                <TransactionTable accountType="savings" />
              </TabsContent>
              <TabsContent value="investment">
                <TransactionTable accountType="investment" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      {/* <div className="mt-10">
        <Transfers />
      </div> */}
    </DashboardLayout>
  )
}

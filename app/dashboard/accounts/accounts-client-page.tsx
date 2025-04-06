"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"
import AccountCard from "@/components/account-card"
import TransactionTable from "@/components/transaction-table"
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
      name: "Checking Account",
      number: "**** 4832",
      balance: netWorth * 0.35, // 35% of net worth
      type: "checking",
    },
    {
      id: "2",
      name: "Savings Account",
      number: "**** 7291",
      balance: netWorth * 0.25, // 25% of net worth
      type: "savings",
    },
    {
      id: "3",
      name: "Investment Account",
      number: "**** 1548",
      balance: netWorth * 0.4, // 40% of net worth
      type: "investment",
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
              <TabsTrigger value="checking">Checking</TabsTrigger>
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
    </DashboardLayout>
  )
}


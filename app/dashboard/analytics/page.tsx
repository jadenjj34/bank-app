import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SpendingChart from "@/components/spending-chart"
import IncomeExpenseChart from "@/components/income-expense-chart"
import CategoryBreakdown from "@/components/category-breakdown"

export const metadata: Metadata = {
  title: "Analytics | Hamilton Bank",
  description: "Track your spending and financial analytics",
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Financial Analytics</h1>
        <p className="text-muted-foreground">Track your spending and financial health</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
                <CardDescription>Your income and expenses for the current month</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <IncomeExpenseChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>Where your money is going this month</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <CategoryBreakdown />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="spending">
          <Card>
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
              <CardDescription>Track your spending over time</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <SpendingChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>Income Analysis</CardTitle>
              <CardDescription>Track your income sources and trends</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <IncomeExpenseChart showIncome={true} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}


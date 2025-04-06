import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import SavingsGoals from "@/components/savings-goals"
import AutoSavingsRules from "@/components/auto-savings-rules"
import SavingsOverview from "@/components/savings-overview"

export const metadata: Metadata = {
  title: "Savings | Hamilton Bank",
  description: "Manage your savings goals and automatic savings",
}

export default function SavingsPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Savings</h1>
          <p className="text-muted-foreground">Track your savings goals and set up automatic savings</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>

      <div className="grid gap-6">
        <SavingsOverview />

        <Card>
          <CardHeader>
            <CardTitle>Savings Goals</CardTitle>
            <CardDescription>Track progress towards your financial goals</CardDescription>
          </CardHeader>
          <CardContent>
            <SavingsGoals />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automatic Savings Rules</CardTitle>
            <CardDescription>Set up rules to save automatically</CardDescription>
          </CardHeader>
          <CardContent>
            <AutoSavingsRules />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}


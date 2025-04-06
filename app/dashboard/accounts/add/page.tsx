import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import AddAccountForm from "@/components/add-account-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Add Account | Hamilton Bank",
  description: "Open a new bank account",
}

export default function AddAccountPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Open New Account</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AddAccountForm />

        <Card>
          <CardHeader>
            <CardTitle>Account Types</CardTitle>
            <CardDescription>Compare our different account types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Checking Account</h3>
              <p className="text-sm text-muted-foreground mt-1">
                For everyday transactions, bill payments, and direct deposits.
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• No minimum balance requirement</li>
                <li>• Free debit card</li>
                <li>• Online and mobile banking</li>
                <li>• 0.01% APY</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Savings Account</h3>
              <p className="text-sm text-muted-foreground mt-1">
                For building your savings with competitive interest rates.
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• £100 minimum balance</li>
                <li>• Limited monthly transactions</li>
                <li>• 0.50% APY</li>
                <li>• Automatic savings options</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Money Market Account</h3>
              <p className="text-sm text-muted-foreground mt-1">Higher interest rates with check-writing privileges.</p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• £1,000 minimum balance</li>
                <li>• Check writing privileges</li>
                <li>• Tiered interest rates up to 0.85% APY</li>
                <li>• ATM card access</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Investment Account</h3>
              <p className="text-sm text-muted-foreground mt-1">Access to stocks, bonds, ETFs, and mutual funds.</p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• No minimum investment</li>
                <li>• Portfolio management options</li>
                <li>• Access to financial advisors</li>
                <li>• Tax-advantaged account options</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}


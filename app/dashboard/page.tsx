import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import AccountSummary from "@/components/account-summary"
import TransactionList from "@/components/transaction-list"
import QuickActions from "@/components/quick-actions"

export const metadata: Metadata = {
  title: "Dashboard | Hamilton Bank",
  description: "Manage your accounts and finances",
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AccountSummary />
        <div className="md:col-span-2">
          <QuickActions />
        </div>
      </div>
      <div className="mt-6">
        <TransactionList />
      </div>
    </DashboardLayout>
  )
}


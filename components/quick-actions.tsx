"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftRight, Receipt, Plus, FileText, PiggyBank, BarChart3, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"

export default function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      title: "Add Account",
      icon: Plus,
      description: "Open a new account",
      color: "bg-purple-100 text-purple-700",
      action: () => router.push("/dashboard/accounts/add"),
    },
    {
      title: "Transfer Money",
      icon: ArrowLeftRight,
      description: "Send money to accounts",
      color: "bg-blue-100 text-blue-700",
      action: () => router.push("/dashboard/transfers"),
    },
    {
      title: "Pay Bills",
      icon: Receipt,
      description: "Pay your monthly bills",
      color: "bg-green-100 text-green-700",
      action: () => router.push("/dashboard/payments"),
    },

    {
      title: "Savings",
      icon: PiggyBank,
      description: "Manage your savings",
      color: "bg-amber-100 text-amber-700",
      action: () => router.push("/dashboard/savings"),
    },
    {
      title: "View Statements",
      icon: FileText,
      description: "Access your statements",
      color: "bg-red-100 text-red-700",
      action: () => router.push("/dashboard/accounts"),
    },
    {
      title: "Wealth Management",
      icon: BarChart3,
      description: "Manage your investments",
      color: "bg-indigo-100 text-indigo-700",
      action: () => router.push("/dashboard/analytics"),
    },
    {
      title: "Investment Portfolio",
      icon: BarChart3,
      description: "Manage your investments",
      color: "bg-amber-100 text-amber-700",
      action: () => router.push("/dashboard/investments"),
    },
    // {
    //   title: "Wealth Planning",
    //   icon: Briefcase,
    //   description: "Tax & estate planning",
    //   color: "bg-indigo-100 text-indigo-700",
    //   action: () => router.push("/dashboard/wealth-planning"),
    // },
  ]


  // const actions = [
  //   {
  //     title: "Global Transfers",
  //     icon: ArrowLeftRight,
  //     description: "International wire transfers",
  //     color: "bg-blue-100 text-blue-700",
  //     action: () => router.push("/dashboard/transfers"),
  //   },
  //   {
  //     title: "Concierge",
  //     icon: Receipt,
  //     description: "Premium lifestyle services",
  //     color: "bg-green-100 text-green-700",
  //     action: () => router.push("/dashboard/concierge"),
  //   },
  //   {
  //     title: "Private Travel",
  //     icon: Plane,
  //     description: "Jet charter & luxury travel",
  //     color: "bg-purple-100 text-purple-700",
  //     action: () => router.push("/dashboard/travel"),
  //   },
  //   {
  //     title: "Investment Portfolio",
  //     icon: BarChart3,
  //     description: "Manage your investments",
  //     color: "bg-amber-100 text-amber-700",
  //     action: () => router.push("/dashboard/investments"),
  //   },
  //   {
  //     title: "Property Services",
  //     icon: Building,
  //     description: "Real estate portfolio",
  //     color: "bg-red-100 text-red-700",
  //     action: () => router.push("/dashboard/property"),
  //   },
  //   {
  //     title: "Wealth Planning",
  //     icon: Briefcase,
  //     description: "Tax & estate planning",
  //     color: "bg-indigo-100 text-indigo-700",
  //     action: () => router.push("/dashboard/wealth-planning"),
  //   },
  // ]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <button
              key={action.title}
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-gray-50 transition-colors"
              onClick={action.action}
            >
              <div className={`rounded-full p-2 ${action.color}`}>
                <action.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-2 font-medium text-sm">{action.title}</h3>
              <p className="text-xs text-gray-500 text-center mt-1">{action.description}</p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


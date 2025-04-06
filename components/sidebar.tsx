"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  CreditCard,
  BarChart3,
  Settings,
  Users,
  Home,
  PiggyBank,
  ArrowLeftRight,
  FileText,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react"
import Image from "next/image"
import { useUser } from "@/hooks/use-user"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Accounts", href: "/dashboard/accounts", icon: CreditCard },
  { name: "Transfers", href: "/dashboard/transfers", icon: ArrowLeftRight },
  { name: "Payments", href: "/dashboard/payments", icon: FileText },
  { name: "Savings", href: "/dashboard/savings", icon: PiggyBank },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Beneficiaries", href: "/dashboard/beneficiaries", icon: Users },
]

const secondaryNavigation = [
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help & Support", href: "/dashboard/support", icon: HelpCircle },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { logout } = useUser()

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center p-4 border-b">
        <Image src="/metrobank-logo.png" alt="Hamilton Bank" className="h-8 w-auto" width={140} height={40} />
      </div>
      <nav className=" px-2 pb-4 space-y-1 pt-5">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-700 hover:bg-gray-100',
                'group flex items-center px-2 py-2 text-sm rounded-md transition-colors'
              )}
            >
              <item.icon className={cn(
                isActive ? 'text-primary' : 'text-gray-500',
                'mr-3 flex-shrink-0 h-5 w-5'
              )} />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="px-2 py-4 border-t">
        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-700 hover:bg-gray-100',
                'group flex items-center px-2 py-2 text-sm rounded-md transition-colors'
              )}
            >
              <item.icon className={cn(
                isActive ? 'text-primary' : 'text-gray-500',
                'mr-3 flex-shrink-0 h-5 w-5'
              )} />
              {item.name}
            </Link>
          )
        })}
        <button
          onClick={logout}
          className="w-full group flex items-center px-2 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-gray-500" />
          Log out
        </button>
      </div>
    </div>
  )
}

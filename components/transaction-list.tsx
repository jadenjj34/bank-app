"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowDownLeft, ArrowUpRight, Search } from "lucide-react"

// Mock transaction data for high-net-worth individual
const transactions = [
  {
    id: "1",
    name: "Investment Portfolio Dividend",
    date: "Today, 10:30 AM",
    amount: "+£175,000.00",
    type: "income",
  },
  {
    id: "2",
    name: "Property Purchase - Mayfair",
    date: "Yesterday, 2:15 PM",
    amount: "-£4,500,000.00",
    type: "expense",
  },
  {
    id: "3",
    name: "Fine Wine Investment",
    date: "Yesterday, 11:45 AM",
    amount: "-£125,000.00",
    type: "expense",
  },
  {
    id: "4",
    name: "Wealth Management Fee",
    date: "Apr 1, 2025",
    amount: "-£45,000.00",
    type: "expense",
  },
  {
    id: "5",
    name: "Art Collection Purchase",
    date: "Mar 30, 2025",
    amount: "-£850,000.00",
    type: "expense",
  },
  {
    id: "6",
    name: "Business Revenue",
    date: "Mar 28, 2025",
    amount: "+£2,300,000.00",
    type: "income",
  },
  {
    id: "7",
    name: "Private Jet Charter",
    date: "Mar 27, 2025",
    amount: "-£85,000.00",
    type: "expense",
  },
  {
    id: "8",
    name: "Stock Portfolio Gains",
    date: "Mar 25, 2025",
    amount: "+£450,000.00",
    type: "income",
  }
]

export default function TransactionList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search transactions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
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
                  {transaction.amount}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">No transactions found</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

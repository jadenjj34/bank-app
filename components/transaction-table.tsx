"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowDownLeft, ArrowUpRight, MoreHorizontal, Search } from "lucide-react"

// Mock transaction data
const allTransactions = [
  {
    id: "1",
    name: "Starbucks",
    date: "Today, 10:30 AM",
    amount: -12.5,
    type: "expense",
    category: "Food & Drink",
    account: "checking",
  },
  {
    id: "2",
    name: "Salary Deposit",
    date: "Yesterday, 9:15 AM",
    amount: 3500.0,
    type: "income",
    category: "Income",
    account: "checking",
  },
  {
    id: "3",
    name: "Amazon",
    date: "Yesterday, 2:45 PM",
    amount: -89.99,
    type: "expense",
    category: "Shopping",
    account: "checking",
  },
  {
    id: "4",
    name: "Transfer to Savings",
    date: "Mar 15, 2023",
    amount: -500.0,
    type: "transfer",
    category: "Transfer",
    account: "checking",
  },
  {
    id: "5",
    name: "Interest Payment",
    date: "Mar 14, 2023",
    amount: 32.75,
    type: "income",
    category: "Interest",
    account: "savings",
  },
  {
    id: "6",
    name: "Stock Dividend",
    date: "Mar 12, 2023",
    amount: 150.25,
    type: "income",
    category: "Dividend",
    account: "investment",
  },
  {
    id: "7",
    name: "Uber",
    date: "Mar 10, 2023",
    amount: -24.75,
    type: "expense",
    category: "Transportation",
    account: "checking",
  },
  {
    id: "8",
    name: "Netflix Subscription",
    date: "Mar 9, 2023",
    amount: -14.99,
    type: "expense",
    category: "Entertainment",
    account: "checking",
  },
  {
    id: "9",
    name: "Stock Purchase",
    date: "Mar 8, 2023",
    amount: -1000.0,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "10",
    name: "Grocery Store",
    date: "Mar 7, 2023",
    amount: -87.32,
    type: "expense",
    category: "Groceries",
    account: "checking",
  },
]

interface TransactionTableProps {
  accountType?: string
}

export default function TransactionTable({ accountType }: TransactionTableProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = allTransactions
    .filter((transaction) => (accountType ? transaction.account === accountType : true))
    .filter(
      (transaction) =>
        transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search transactions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`rounded-full p-2 £{
                          transaction.type === "income"
                            ? "bg-green-100 text-green-700"
                            : transaction.type === "transfer"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <ArrowDownLeft className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>
                      <span className="font-medium">{transaction.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell
                    className={`text-right font-medium £{transaction.amount > 0 ? "text-green-600" : "text-gray-900"}`}
                  >
                    {transaction.amount > 0 ? "+" : ""}£{Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Add note</DropdownMenuItem>
                        <DropdownMenuItem>Dispute transaction</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


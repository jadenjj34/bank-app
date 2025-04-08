"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Edit, Trash2, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { allTransactions } from "./transaction-table"

export interface Transfer {
  id: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  date: string;
  type: string;
  status: string;
  description: string;
}

const accountMappings = {
  investment: {
    name: "Global Investment Portfolio (**** 8765)",
    transactions: [
      "Private Equity",
      "Venture Capital",
      "Hedge Fund",
      "Technology Fund",
      "Real Estate Fund"
    ]
  },
  checking: {
    name: "Elite Private Banking (**** 4321)",
    transactions: [
      "Business Operations",
      "Luxury Purchases",
      "Property Management",
      "Portfolio Management"
    ]
  },
  savings: {
    name: "Private Wealth Management (**** 9876)",
    transactions: [
      "Charitable Foundation",
      "Educational Grants",
      "Philanthropic Initiatives",
      "Social Impact Projects"
    ]
  }
};

export function generateTransferHistory(): Transfer[] {
  const transfers: Transfer[] = [];
  
  // Convert allTransactions into transfers with corresponding accounts
  allTransactions.forEach(transaction => {
    const isExpense = transaction.type === 'expense';
    const fromAccount = isExpense 
      ? accountMappings.checking.name 
      : accountMappings[transaction.account as keyof typeof accountMappings].name;
    
    const toAccount = isExpense 
      ? accountMappings[transaction.account as keyof typeof accountMappings].name 
      : accountMappings.checking.name;

    transfers.push({
      id: transaction.id,
      fromAccount,
      toAccount,
      amount: Math.abs(transaction.amount), // Always positive for transfer amount
      date: transaction.date,
      type: transaction.category.toLowerCase(),
      status: 'completed',
      description: transaction.name
    });
  });

  // Sort transfers by date (newest first)
  transfers.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return transfers;
}

// Example usage:
// const transferHistory = generateTransferHistory();

// Mock transfer history data
const transferHistory = generateTransferHistory();

// Mock scheduled transfers data
const scheduledTransfers = [
  {
    id: "1",
    fromAccount: "Black Card - Premium Checking (**** 4832)",
    toAccount: "AI Innovation Fund (**** 2345)",
    amount: 500000,
    date: "Apr 15, 2023",
    recurring: "Monthly",
    type: "investment",
    description: "Venture capital investment"
  },
  {
    id: "2",
    fromAccount: "Wealth Management Savings (**** 7291)",
    toAccount: "Medical Research Institute (**** 9876)",
    amount: 500000,
    date: "May 8, 2023",
    recurring: "Quarterly",
    type: "charity",
    description: "Research funding"
  },
  {
    id: "3",
    fromAccount: "Private Wealth Investment (**** 1548)",
    toAccount: "Luxury Property Development Fund (**** 1548)",
    amount: 1000000,
    date: "Jun 1, 2023",
    recurring: "Monthly",
    type: "investment",
    description: "Q2 2023 investment"
  },
  {
    id: "4",
    fromAccount: "Black Card - Premium Checking (**** 4832)",
    toAccount: "Education Foundation UK (**** 9876)",
    amount: 1000000,
    date: "Oct 10, 2023",
    recurring: "Yearly",
    type: "charity",
    description: "Annual educational grant"
  }
]

export default function Transfers() {
  const router = useRouter()

  const handleNewTransfer = () => {
    router.push("/dashboard/transfers/new")
  }

  const handleNewScheduledTransfer = () => {
    router.push("/dashboard/transfers/scheduled/new")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Transfers</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewTransfer}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Transfer
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewScheduledTransfer}
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            New Scheduled Transfer
          </Button>
        </div>
      </div>

      <Tabs defaultValue="history">
        <TabsList className="mb-4">
          <TabsTrigger value="history">History</TabsTrigger>
          {/* <TabsTrigger value="scheduled">Scheduled</TabsTrigger> */}
        </TabsList>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Transfer History</CardTitle>
              <CardDescription>Your past transfers and investments</CardDescription>
            </CardHeader>
            <CardContent>
              {transferHistory.length > 0 ? (
                <div className="space-y-4">
                  {transferHistory.map((transfer) => (
                    <div
                      key={transfer.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="space-y-2 md:space-y-1 flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium">{formatCurrency(transfer.amount)}</h3>
                          <span className="mx-2 text-gray-500">→</span>
                          <p className="text-gray-700">{transfer.toAccount}</p>
                        </div>
                        <p className="text-sm text-gray-500">From: {transfer.fromAccount}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span className="mr-3">{transfer.date}</span>
                          <span 
                            className={`px-2 py-1 rounded-full text-xs ${
                              transfer.status === "completed" 
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {transfer.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${
                            transfer.type === "investment" ? "text-blue-600" :
                            transfer.type === "charity" ? "text-purple-600" :
                            transfer.type === "business" ? "text-green-600" :
                            "text-gray-600"
                          }`}>
                            {transfer.type.charAt(0).toUpperCase() + transfer.type.slice(1)}
                          </span>
                          {transfer.description && (
                            <p className="text-sm text-gray-500">{transfer.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-3 md:mt-0">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="outline" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">No transfer history</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
{/* 
        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Transfers</CardTitle>
              <CardDescription>Your upcoming and recurring transfers</CardDescription>
            </CardHeader>
            <CardContent>
              {scheduledTransfers.length > 0 ? (
                <div className="space-y-4">
                  {scheduledTransfers.map((transfer) => (
                    <div
                      key={transfer.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="space-y-2 md:space-y-1 flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium">{formatCurrency(transfer.amount)}</h3>
                          <span className="mx-2 text-gray-500">→</span>
                          <p className="text-gray-700">{transfer.toAccount}</p>
                        </div>
                        <p className="text-sm text-gray-500">From: {transfer.fromAccount}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span className="mr-3">{transfer.date}</span>
                          {transfer.recurring && (
                            <>
                              <Clock className="mr-1 h-3 w-3" />
                              <span>{transfer.recurring}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${
                            transfer.type === "investment" ? "text-blue-600" :
                            transfer.type === "charity" ? "text-purple-600" :
                            transfer.type === "business" ? "text-green-600" :
                            "text-gray-600"
                          }`}>
                            {transfer.type.charAt(0).toUpperCase() + transfer.type.slice(1)}
                          </span>
                          {transfer.description && (
                            <p className="text-sm text-gray-500">{transfer.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-3 md:mt-0">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="outline" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">No scheduled transfers</div>
              )}
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}

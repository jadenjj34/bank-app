"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpRight, MoreHorizontal, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock beneficiaries data
const initialBeneficiaries = [
  {
    id: "1",
    name: "John Smith",
    accountNumber: "**** 5678",
    bankName: "Chase Bank",
    email: "john.smith@example.com",
    type: "Personal",
    lastTransfer: "Mar 15, 2023",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    accountNumber: "**** 9012",
    bankName: "Bank of America",
    email: "sarah.j@example.com",
    type: "Personal",
    lastTransfer: "Feb 28, 2023",
  },
  {
    id: "3",
    name: "Mike's Rent",
    accountNumber: "**** 3456",
    bankName: "Wells Fargo",
    email: "mike@example.com",
    type: "Rent",
    lastTransfer: "Mar 3, 2023",
  },
  {
    id: "4",
    name: "Mom",
    accountNumber: "**** 7890",
    bankName: "Citibank",
    email: "mom@example.com",
    type: "Family",
    lastTransfer: "Feb 15, 2023",
  },
  {
    id: "5",
    name: "Electricity Company",
    accountNumber: "**** 1234",
    bankName: "US Bank",
    email: "billing@electric.com",
    type: "Utility",
    lastTransfer: "Mar 15, 2023",
  },
]

export default function BeneficiaryList() {
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBeneficiaries = beneficiaries.filter(
    (beneficiary) =>
      beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Personal":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
      case "Family":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "Rent":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100/80"
      case "Utility":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search beneficiaries..."
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
              <TableHead>Name</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Bank</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Last Transfer</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBeneficiaries.length > 0 ? (
              filteredBeneficiaries.map((beneficiary) => (
                <TableRow key={beneficiary.id}>
                  <TableCell>
                    <div className="font-medium">{beneficiary.name}</div>
                    <div className="text-sm text-muted-foreground">{beneficiary.email}</div>
                  </TableCell>
                  <TableCell>{beneficiary.accountNumber}</TableCell>
                  <TableCell>{beneficiary.bankName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getBadgeColor(beneficiary.type)}>
                      {beneficiary.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{beneficiary.lastTransfer}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="mr-2">
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                        Transfer
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit details</DropdownMenuItem>
                          <DropdownMenuItem>View history</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  No beneficiaries found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


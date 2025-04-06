import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

// Mock transfer history data
const transferHistory = [
  {
    id: "1",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Savings Account (**** 7291)",
    amount: 500.0,
    date: "Mar 15, 2023",
    status: "Completed",
    reference: "TRF123456789",
  },
  {
    id: "2",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mike's Rent (**** 3456)",
    amount: 1200.0,
    date: "Mar 3, 2023",
    status: "Completed",
    reference: "TRF123456788",
  },
  {
    id: "3",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mom (**** 7890)",
    amount: 200.0,
    date: "Feb 28, 2023",
    status: "Completed",
    reference: "TRF123456787",
  },
  {
    id: "4",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Checking Account (**** 4832)",
    amount: 1000.0,
    date: "Feb 15, 2023",
    status: "Completed",
    reference: "TRF123456786",
  },
  {
    id: "5",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Electricity Bill (**** 1234)",
    amount: 78.5,
    date: "Feb 15, 2023",
    status: "Completed",
    reference: "TRF123456785",
  },
]

export default function TransferHistory() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Transfer History</CardTitle>
          <CardDescription>View your past transfers</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transferHistory.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell>{transfer.date}</TableCell>
                  <TableCell>{transfer.fromAccount}</TableCell>
                  <TableCell>{transfer.toAccount}</TableCell>
                  <TableCell>£{transfer.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                      {transfer.status}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{transfer.reference}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}


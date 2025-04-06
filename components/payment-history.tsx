import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

// Mock payment history data
const paymentHistory = [
  {
    id: "1",
    payee: "Electricity Company",
    amount: 78.5,
    date: "Mar 15, 2023",
    status: "Completed",
    reference: "PAY123456789",
    fromAccount: "Checking Account (**** 4832)",
  },
  {
    id: "2",
    payee: "Water Utility",
    amount: 42.25,
    date: "Mar 18, 2023",
    status: "Completed",
    reference: "PAY123456788",
    fromAccount: "Checking Account (**** 4832)",
  },
  {
    id: "3",
    payee: "Internet Provider",
    amount: 79.99,
    date: "Mar 22, 2023",
    status: "Completed",
    reference: "PAY123456787",
    fromAccount: "Checking Account (**** 4832)",
  },
  {
    id: "4",
    payee: "Credit Card",
    amount: 350.0,
    date: "Mar 25, 2023",
    status: "Completed",
    reference: "PAY123456786",
    fromAccount: "Checking Account (**** 4832)",
  },
  {
    id: "5",
    payee: "Phone Bill",
    amount: 65.0,
    date: "Mar 28, 2023",
    status: "Completed",
    reference: "PAY123456785",
    fromAccount: "Checking Account (**** 4832)",
  },
]

export default function PaymentHistory() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>View your past bill payments</CardDescription>
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
                <TableHead>Payee</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.payee}</TableCell>
                  <TableCell>£{payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                      {payment.status}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{payment.reference}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Download receipt</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}


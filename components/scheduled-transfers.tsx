import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Edit, Trash2 } from "lucide-react"

// Mock scheduled transfers data
const scheduledTransfers = [
  {
    id: "1",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Savings Account (**** 7291)",
    amount: 500.0,
    date: "Apr 1, 2023",
    recurring: "Monthly",
    description: "Savings transfer",
  },
  {
    id: "2",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mike's Rent (**** 3456)",
    amount: 1200.0,
    date: "Apr 3, 2023",
    recurring: "Monthly",
    description: "Rent payment",
  },
  {
    id: "3",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Electricity Bill (**** 1234)",
    amount: 85.5,
    date: "Apr 15, 2023",
    recurring: "Monthly",
    description: "Utility bill",
  },
]

export default function ScheduledTransfers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Transfers</CardTitle>
        <CardDescription>Manage your upcoming and recurring transfers</CardDescription>
      </CardHeader>
      <CardContent>
        {scheduledTransfers.length > 0 ? (
          <div className="space-y-4">
            {scheduledTransfers.map((transfer) => (
              <div
                key={transfer.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border"
              >
                <div className="space-y-2 md:space-y-1">
                  <div className="flex items-center">
                    <h3 className="font-medium">£{transfer.amount.toFixed(2)}</h3>
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
                  {transfer.description && <p className="text-sm text-gray-500">{transfer.description}</p>}
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
  )
}


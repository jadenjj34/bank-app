import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Edit } from "lucide-react"

// Mock upcoming bills data
const upcomingBills = [
  {
    id: "1",
    payee: "Electricity Company",
    amount: 85.5,
    dueDate: "Apr 15, 2023",
    status: "Scheduled",
    accountNumber: "**** 1234",
    recurring: "Monthly",
  },
  {
    id: "2",
    payee: "Water Utility",
    amount: 45.75,
    dueDate: "Apr 18, 2023",
    status: "Not Scheduled",
    accountNumber: "**** 5678",
    recurring: null,
  },
  {
    id: "3",
    payee: "Internet Provider",
    amount: 79.99,
    dueDate: "Apr 22, 2023",
    status: "Scheduled",
    accountNumber: "**** 9012",
    recurring: "Monthly",
  },
  {
    id: "4",
    payee: "Credit Card",
    amount: 250.0,
    dueDate: "Apr 25, 2023",
    status: "Not Scheduled",
    accountNumber: "**** 3456",
    recurring: null,
  },
]

export default function UpcomingBills() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bills</CardTitle>
        <CardDescription>View and manage your upcoming bill payments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingBills.map((bill) => (
            <div
              key={bill.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border"
            >
              <div className="space-y-2 md:space-y-1">
                <div className="flex items-center">
                  <h3 className="font-medium">{bill.payee}</h3>
                  <span
                    className={`ml-2 px-2 py-0.5 text-xs rounded-full £{
                      bill.status === "Scheduled" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {bill.status}
                  </span>
                </div>
                <p className="text-lg font-semibold">£{bill.amount.toFixed(2)}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span className="mr-3">Due: {bill.dueDate}</span>
                  {bill.recurring && (
                    <>
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{bill.recurring}</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500">Account: {bill.accountNumber}</p>
              </div>
              <div className="flex items-center space-x-2 mt-3 md:mt-0">
                {bill.status === "Not Scheduled" ? (
                  <Button size="sm">Pay Now</Button>
                ) : (
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


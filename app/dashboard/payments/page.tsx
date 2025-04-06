import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import PaymentForm from "@/components/payment-form"
import UpcomingBills from "@/components/upcoming-bills"
import PaymentHistory from "@/components/payment-history"

export const metadata: Metadata = {
  title: "Payments | Hamilton Bank",
  description: "Pay your bills and manage payments",
}

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Pay your bills and manage recurring payments</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Payee
        </Button>
      </div>

      <Tabs defaultValue="pay-bill" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pay-bill">Pay a Bill</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Bills</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="pay-bill">
          <div className="grid gap-6 md:grid-cols-2">
            <PaymentForm />

            <Card>
              <CardHeader>
                <CardTitle>Saved Payees</CardTitle>
                <CardDescription>Select from your saved payees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Electricity Company", "Water Utility", "Internet Provider", "Credit Card", "Phone Bill"].map(
                    (name, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-medium text-primary">{name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-sm text-gray-500">Account: **** {1234 + index}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Pay
                        </Button>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <UpcomingBills />
        </TabsContent>

        <TabsContent value="history">
          <PaymentHistory />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}


import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TransferForm from "@/components/transfer-form"
import ScheduledTransfers from "@/components/scheduled-transfers"
import TransferHistory from "@/components/transfer-history"

export const metadata: Metadata = {
  title: "Transfers | Hamilton Bank",
  description: "Transfer money between accounts",
}

export default function TransfersPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Transfers</h1>
        <p className="text-muted-foreground">Transfer money between your accounts or to other recipients</p>
      </div>

      <Tabs defaultValue="new-transfer" className="space-y-6">
        <TabsList>
          <TabsTrigger value="new-transfer">New Transfer</TabsTrigger>
          {/* <TabsTrigger value="scheduled">Scheduled</TabsTrigger> */}
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="new-transfer">
          <div className="grid gap-6 md:grid-cols-2">
            <TransferForm />

            {/* <Card>
              <CardHeader>
                <CardTitle>Recent Recipients</CardTitle>
                <CardDescription>Quickly transfer to your recent recipients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["John Smith", "Sarah Johnson", "Mike's Rent", "Mom", "Electricity Bill"].map((name, index) => (
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
                          <p className="text-sm text-gray-500">Last transfer: 3 days ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <ScheduledTransfers />
        </TabsContent>

        <TabsContent value="history">
          <TransferHistory />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}


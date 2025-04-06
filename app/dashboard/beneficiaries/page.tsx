import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import BeneficiaryList from "@/components/beneficiary-list"
import AddBeneficiaryForm from "@/components/add-beneficiary-form"

export const metadata: Metadata = {
  title: "Beneficiaries | Hamilton Bank",
  description: "Manage your beneficiaries and recipients",
}

export default function BeneficiariesPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Beneficiaries</h1>
          <p className="text-muted-foreground">Manage your payment recipients and transfer beneficiaries</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Beneficiary
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Beneficiaries</CardTitle>
            <CardDescription>People and organizations you send money to</CardDescription>
          </CardHeader>
          <CardContent>
            <BeneficiaryList />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Add New Beneficiary</CardTitle>
            <CardDescription>Enter the details of your new beneficiary</CardDescription>
          </CardHeader>
          <CardContent>
            <AddBeneficiaryForm />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}


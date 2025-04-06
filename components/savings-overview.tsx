import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SavingsOverview() {
  // Mock savings data
  const savingsData = {
    totalSaved: 42891.5,
    totalGoals: 28500.0,
    savingsRate: 15,
    monthlySavings: 750.0,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Saved</CardDescription>
          <CardTitle className="text-2xl">£{savingsData.totalSaved.toLocaleString()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Across all savings accounts</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Goal Target</CardDescription>
          <CardTitle className="text-2xl">£{savingsData.totalGoals.toLocaleString()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Combined savings goals</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Savings Rate</CardDescription>
          <CardTitle className="text-2xl">{savingsData.savingsRate}%</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Of monthly income</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Monthly Savings</CardDescription>
          <CardTitle className="text-2xl">£{savingsData.monthlySavings}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Average per month</p>
        </CardContent>
      </Card>
    </div>
  )
}


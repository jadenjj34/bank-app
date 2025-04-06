// components/portfolio-overview.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

const mockPortfolioData = [
  { month: "Jan", value: 13200000 },
  { month: "Feb", value: 13800000 },
  { month: "Mar", value: 14300000 },
  { month: "Apr", value: 14800000 },
]

export default function PortfolioOverview() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
            <h2 className="text-3xl font-bold">{formatCurrency(14800000)}</h2>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPortfolioData}>
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `££{value / 1000000}M`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0ea5e9" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
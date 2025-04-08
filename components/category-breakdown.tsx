"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

// Mock category data
const categoryData = [
  { name: "Food & Dining", value: 450, color: "#8884d8" },
  { name: "Shopping", value: 300, color: "#82ca9d" },
  { name: "Bills & Utilities", value: 520, color: "#ffc658" },
  { name: "Entertainment", value: 200, color: "#ff8042" },
  { name: "Transportation", value: 180, color: "#0088fe" },
  { name: "Other", value: 150, color: "#00C49F" },
]

export default function CategoryBreakdown() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          dataKey="value"
          label={({ name, value, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `£${value.toLocaleString()}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

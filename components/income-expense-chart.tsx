"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock income/expense data
const financialData = [
  {
    name: "Jan",
    Income: 5000,
    Expenses: 3200,
  },
  {
    name: "Feb",
    Income: 5000,
    Expenses: 3400,
  },
  {
    name: "Mar",
    Income: 5200,
    Expenses: 3600,
  },
  {
    name: "Apr",
    Income: 5100,
    Expenses: 3300,
  },
  {
    name: "May",
    Income: 5300,
    Expenses: 3500,
  },
  {
    name: "Jun",
    Income: 5400,
    Expenses: 3700,
  },
]

interface IncomeExpenseChartProps {
  showIncome?: boolean
}

export default function IncomeExpenseChart({ showIncome = false }: IncomeExpenseChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={financialData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="Income" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
        <Area type="monotone" dataKey="Expenses" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  )
}


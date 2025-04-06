"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock spending data
const spendingData = [
  {
    name: "Jan",
    Food: 400,
    Shopping: 240,
    Entertainment: 180,
    Bills: 500,
    Transportation: 150,
  },
  {
    name: "Feb",
    Food: 380,
    Shopping: 300,
    Entertainment: 200,
    Bills: 510,
    Transportation: 170,
  },
  {
    name: "Mar",
    Food: 450,
    Shopping: 280,
    Entertainment: 220,
    Bills: 500,
    Transportation: 160,
  },
  {
    name: "Apr",
    Food: 420,
    Shopping: 320,
    Entertainment: 190,
    Bills: 520,
    Transportation: 180,
  },
  {
    name: "May",
    Food: 390,
    Shopping: 290,
    Entertainment: 210,
    Bills: 500,
    Transportation: 150,
  },
  {
    name: "Jun",
    Food: 410,
    Shopping: 270,
    Entertainment: 230,
    Bills: 510,
    Transportation: 140,
  },
]

export default function SpendingChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={spendingData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Food" stackId="a" fill="#8884d8" />
        <Bar dataKey="Shopping" stackId="a" fill="#82ca9d" />
        <Bar dataKey="Entertainment" stackId="a" fill="#ffc658" />
        <Bar dataKey="Bills" stackId="a" fill="#ff8042" />
        <Bar dataKey="Transportation" stackId="a" fill="#0088fe" />
      </BarChart>
    </ResponsiveContainer>
  )
}


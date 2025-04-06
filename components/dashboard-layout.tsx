import type React from "react"
import Sidebar from "@/components/sidebar"
import Navbar from "@/components/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-7xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

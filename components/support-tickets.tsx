"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageSquare } from "lucide-react"

// Mock support tickets data
const initialTickets = [
  {
    id: "T-12345",
    subject: "Unable to access my account",
    category: "Account Issues",
    status: "Open",
    priority: "High",
    created: "Apr 1, 2023",
    lastUpdated: "Apr 1, 2023",
    messages: [
      {
        sender: "You",
        message: "I'm unable to log into my account. It says my password is incorrect but I'm sure it's right.",
        timestamp: "Apr 1, 2023 - 10:30 AM",
      },
      {
        sender: "Support Agent",
        message:
          "Hello, I understand you're having trouble accessing your account. For security reasons, could you please verify the last 4 digits of your account number?",
        timestamp: "Apr 1, 2023 - 11:15 AM",
      },
    ],
  },
  {
    id: "T-12344",
    subject: "Question about transfer limits",
    category: "Transfers & Payments",
    status: "In Progress",
    priority: "Medium",
    created: "Mar 28, 2023",
    lastUpdated: "Mar 30, 2023",
    messages: [
      {
        sender: "You",
        message: "I'd like to know what my daily transfer limit is and if it can be increased.",
        timestamp: "Mar 28, 2023 - 2:45 PM",
      },
      {
        sender: "Support Agent",
        message:
          "Hi there, your current daily transfer limit is £5,000. We can certainly look into increasing this for you. Could you please let me know what limit you're looking for?",
        timestamp: "Mar 29, 2023 - 9:20 AM",
      },
      {
        sender: "You",
        message: "I'd like to increase it to £10,000 if possible.",
        timestamp: "Mar 29, 2023 - 10:05 AM",
      },
      {
        sender: "Support Agent",
        message:
          "Thank you for that information. I've submitted a request to increase your limit to £10,000. This typically takes 1-2 business days to process. I'll update you once it's approved.",
        timestamp: "Mar 30, 2023 - 11:30 AM",
      },
    ],
  },
  {
    id: "T-12343",
    subject: "Mobile app crashing",
    category: "Technical Support",
    status: "Resolved",
    priority: "Medium",
    created: "Mar 15, 2023",
    lastUpdated: "Mar 18, 2023",
    messages: [
      {
        sender: "You",
        message: "The mobile app keeps crashing when I try to view my transaction history.",
        timestamp: "Mar 15, 2023 - 3:20 PM",
      },
      {
        sender: "Support Agent",
        message:
          "I'm sorry to hear you're experiencing issues with the app. Could you please tell me what device and operating system version you're using?",
        timestamp: "Mar 16, 2023 - 9:45 AM",
      },
      {
        sender: "You",
        message: "I'm using an iPhone 13 with iOS 16.2.",
        timestamp: "Mar 16, 2023 - 10:30 AM",
      },
      {
        sender: "Support Agent",
        message:
          "Thank you for that information. We've identified a bug affecting some iOS 16 users. We've just released an update (version 3.2.1) that should fix this issue. Could you please update the app and let us know if that resolves the problem?",
        timestamp: "Mar 17, 2023 - 11:15 AM",
      },
      {
        sender: "You",
        message: "I've updated the app and it's working perfectly now. Thank you!",
        timestamp: "Mar 18, 2023 - 9:05 AM",
      },
      {
        sender: "Support Agent",
        message:
          "Excellent! I'm glad to hear that resolved the issue. If you experience any other problems, please don't hesitate to reach out. I'll be closing this ticket now, but feel free to reopen it if needed.",
        timestamp: "Mar 18, 2023 - 10:20 AM",
      },
    ],
  },
]

export default function SupportTickets() {
  const [tickets, setTickets] = useState(initialTickets)
  const [selectedTicket, setSelectedTicket] = useState<(typeof initialTickets)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewTicket = (ticket: (typeof initialTickets)[0]) => {
    setSelectedTicket(ticket)
    setIsDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100/80">
            Open
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100/80">
            In Progress
          </Badge>
        )
      case "Resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100/80">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100/80">
            High
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100/80">
            Medium
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100/80">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>{ticket.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleViewTicket(ticket)}>
                      <MessageSquare className="mr-1 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  No support tickets found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Ticket {selectedTicket?.id}: {selectedTicket?.subject}
            </DialogTitle>
            <DialogDescription>
              {selectedTicket?.category} • {selectedTicket?.status} • Created on {selectedTicket?.created}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Status:</span>
                {selectedTicket && getStatusBadge(selectedTicket.status)}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Priority:</span>
                {selectedTicket && getPriorityBadge(selectedTicket.priority)}
              </div>
            </div>

            <div className="border rounded-md p-4 max-h-96 overflow-y-auto space-y-4">
              {selectedTicket?.messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg £{message.sender === "You" ? "bg-primary/10 ml-8" : "bg-gray-100 mr-8"}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{message.sender}</span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-sm">{message.message}</p>
                </div>
              ))}
            </div>

            {selectedTicket?.status !== "Resolved" && (
              <div className="flex space-x-2">
                <Input placeholder="Type your reply..." className="flex-1" />
                <Button>Send</Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


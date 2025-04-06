"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Edit, Plus, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Mock savings goals data
const initialGoals = [
  {
    id: "1",
    name: "Emergency Fund",
    currentAmount: 8500,
    targetAmount: 10000,
    targetDate: "Dec 2023",
    iconColor: "bg-blue-100 text-blue-700",
    progress: 85,
  },
  {
    id: "2",
    name: "Vacation",
    currentAmount: 3200,
    targetAmount: 5000,
    targetDate: "Jul 2023",
    iconColor: "bg-green-100 text-green-700",
    progress: 64,
  },
  {
    id: "3",
    name: "New Car",
    currentAmount: 12000,
    targetAmount: 25000,
    targetDate: "Jun 2024",
    iconColor: "bg-purple-100 text-purple-700",
    progress: 48,
  },
  {
    id: "4",
    name: "Home Down Payment",
    currentAmount: 15000,
    targetAmount: 50000,
    targetDate: "Jan 2025",
    iconColor: "bg-amber-100 text-amber-700",
    progress: 30,
  },
]

export default function SavingsGoals() {
  const [goals, setGoals] = useState(initialGoals)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    targetDate: "",
  })
  const { toast } = useToast()

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.targetDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const goal = {
      id: `£{goals.length + 1}`,
      name: newGoal.name,
      currentAmount: 0,
      targetAmount: Number.parseFloat(newGoal.targetAmount),
      targetDate: newGoal.targetDate,
      iconColor: "bg-blue-100 text-blue-700",
      progress: 0,
    }

    setGoals([...goals, goal])
    setNewGoal({ name: "", targetAmount: "", targetDate: "" })
    setIsDialogOpen(false)

    toast({
      title: "Goal created",
      description: `£{goal.name} has been added to your savings goals`,
    })
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <div key={goal.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border">
          <div className="space-y-2 md:space-y-1 md:flex-1">
            <div className="flex items-center">
              <div className={`rounded-full p-2 £{goal.iconColor} mr-2`}>
                <span className="font-bold">{goal.name.charAt(0)}</span>
              </div>
              <h3 className="font-medium">{goal.name}</h3>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                £{goal.currentAmount.toLocaleString()} of £{goal.targetAmount.toLocaleString()}
              </p>
              <p className="text-sm font-medium">{goal.progress}%</p>
            </div>
            <Progress value={goal.progress} className="h-2" />
            <p className="text-xs text-gray-500">Target date: {goal.targetDate}</p>
          </div>
          <div className="flex items-center space-x-2 mt-3 md:mt-0 md:ml-4">
            <Button variant="outline" size="sm">
              <Plus className="mr-1 h-3 w-3" />
              Add
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Savings Goal
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Savings Goal</DialogTitle>
            <DialogDescription>Set a new savings goal to help you reach your financial targets.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="goal-name">Goal Name</Label>
              <Input
                id="goal-name"
                placeholder="e.g., Vacation, New Car"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-amount">Target Amount (£)</Label>
              <Input
                id="target-amount"
                type="number"
                placeholder="5000"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-date">Target Date</Label>
              <Input
                id="target-date"
                placeholder="e.g., Dec 2023"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddGoal}>Create Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Mock auto-savings rules data
const initialRules = [
  {
    id: "1",
    name: "Round-Up Savings",
    description: "Round up transactions to the nearest dollar and save the difference",
    enabled: true,
    type: "round-up",
    destination: "Savings Account (**** 7291)",
  },
  {
    id: "2",
    name: "Payday Savings",
    description: "Transfer £200 to savings account on payday (15th and 30th)",
    enabled: true,
    type: "scheduled",
    amount: 200,
    frequency: "Bi-monthly",
    destination: "Savings Account (**** 7291)",
  },
  {
    id: "3",
    name: "Spending Threshold",
    description: "Save £5 when spending over £100 at restaurants",
    enabled: false,
    type: "threshold",
    amount: 5,
    category: "Restaurants",
    threshold: 100,
    destination: "Vacation Goal",
  },
]

export default function AutoSavingsRules() {
  const [rules, setRules] = useState(initialRules)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newRule, setNewRule] = useState({
    name: "",
    type: "",
    amount: "",
    destination: "",
  })
  const { toast } = useToast()

  const handleToggleRule = (id: string) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const handleAddRule = () => {
    if (!newRule.name || !newRule.type || !newRule.destination) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const rule = {
      id: `£{rules.length + 1}`,
      name: newRule.name,
      description: `Auto-savings rule: £{newRule.name}`,
      enabled: true,
      type: newRule.type,
      amount: newRule.amount ? Number.parseFloat(newRule.amount) : undefined,
      destination: newRule.destination,
    }

    setRules([...rules, rule])
    setNewRule({ name: "", type: "", amount: "", destination: "" })
    setIsDialogOpen(false)

    toast({
      title: "Rule created",
      description: `£{rule.name} has been added to your auto-savings rules`,
    })
  }

  return (
    <div className="space-y-4">
      {rules.map((rule) => (
        <div key={rule.id} className="flex flex-col md:flex-row justify-between p-4 rounded-lg border">
          <div className="space-y-1 md:flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{rule.name}</h3>
              <Switch checked={rule.enabled} onCheckedChange={() => handleToggleRule(rule.id)} className="md:hidden" />
            </div>
            <p className="text-sm text-gray-500">{rule.description}</p>
            <p className="text-xs text-gray-500">Destination: {rule.destination}</p>
          </div>
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <Switch
              checked={rule.enabled}
              onCheckedChange={() => handleToggleRule(rule.id)}
              className="hidden md:flex"
            />
            <div className="flex items-center space-x-2">
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
        </div>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Auto-Savings Rule
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Auto-Savings Rule</DialogTitle>
            <DialogDescription>Set up a rule to automatically save money based on your preferences.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rule-name">Rule Name</Label>
              <Input
                id="rule-name"
                placeholder="e.g., Coffee Shop Savings"
                value={newRule.name}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rule-type">Rule Type</Label>
              <Select value={newRule.type} onValueChange={(value) => setNewRule({ ...newRule, type: value })}>
                <SelectTrigger id="rule-type">
                  <SelectValue placeholder="Select rule type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round-up">Round-Up Transactions</SelectItem>
                  <SelectItem value="scheduled">Scheduled Transfer</SelectItem>
                  <SelectItem value="threshold">Spending Threshold</SelectItem>
                  <SelectItem value="percentage">Percentage of Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newRule.type !== "round-up" && (
              <div className="space-y-2">
                <Label htmlFor="rule-amount">Amount (£)</Label>
                <Input
                  id="rule-amount"
                  type="number"
                  placeholder="5.00"
                  value={newRule.amount}
                  onChange={(e) => setNewRule({ ...newRule, amount: e.target.value })}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="rule-destination">Destination</Label>
              <Select
                value={newRule.destination}
                onValueChange={(value) => setNewRule({ ...newRule, destination: value })}
              >
                <SelectTrigger id="rule-destination">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Savings Account (**** 7291)">Savings Account (**** 7291)</SelectItem>
                  <SelectItem value="Emergency Fund">Emergency Fund Goal</SelectItem>
                  <SelectItem value="Vacation Goal">Vacation Goal</SelectItem>
                  <SelectItem value="New Car Goal">New Car Goal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRule}>Create Rule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


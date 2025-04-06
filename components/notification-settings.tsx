"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NotificationSettings() {
  const [notificationSettings, setNotificationSettings] = useState({
    accountAlerts: true,
    transactionAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
    lowBalanceAlerts: true,
    paymentReminders: true,
    newFeatures: true,
  })

  const [deliveryPreferences, setDeliveryPreferences] = useState({
    accountAlerts: "email",
    transactionAlerts: "push",
    securityAlerts: "both",
    marketingEmails: "email",
    lowBalanceAlerts: "push",
    paymentReminders: "both",
    newFeatures: "email",
  })

  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleToggleSetting = (setting: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof notificationSettings],
    }))
  }

  const handleDeliveryChange = (setting: string, value: string) => {
    setDeliveryPreferences((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Account Alerts</h4>
              <p className="text-sm text-muted-foreground">Notifications about account status changes</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={deliveryPreferences.accountAlerts}
                onValueChange={(value) => handleDeliveryChange("accountAlerts", value)}
                disabled={!notificationSettings.accountAlerts}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Delivery method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="push">Push</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
              <Switch
                checked={notificationSettings.accountAlerts}
                onCheckedChange={() => handleToggleSetting("accountAlerts")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Transaction Alerts</h4>
              <p className="text-sm text-muted-foreground">Notifications for deposits, withdrawals, and transfers</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={deliveryPreferences.transactionAlerts}
                onValueChange={(value) => handleDeliveryChange("transactionAlerts", value)}
                disabled={!notificationSettings.transactionAlerts}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Delivery method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="push">Push</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
              <Switch
                checked={notificationSettings.transactionAlerts}
                onCheckedChange={() => handleToggleSetting("transactionAlerts")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Security Alerts</h4>
              <p className="text-sm text-muted-foreground">Notifications about login attempts and security changes</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={deliveryPreferences.securityAlerts}
                onValueChange={(value) => handleDeliveryChange("securityAlerts", value)}
                disabled={!notificationSettings.securityAlerts}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Delivery method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="push">Push</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
              <Switch
                checked={notificationSettings.securityAlerts}
                onCheckedChange={() => handleToggleSetting("securityAlerts")}
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Low Balance Alerts</h4>
              <p className="text-sm text-muted-foreground">
                Notifications when your account balance falls below a threshold
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={deliveryPreferences.lowBalanceAlerts}
                onValueChange={(value) => handleDeliveryChange("lowBalanceAlerts", value)}
                disabled={!notificationSettings.lowBalanceAlerts}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Delivery method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="push">Push</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
              <Switch
                checked={notificationSettings.lowBalanceAlerts}
                onCheckedChange={() => handleToggleSetting("lowBalanceAlerts")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Payment Reminders</h4>
              <p className="text-sm text-muted-foreground">Reminders for upcoming bill payments and due dates</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={deliveryPreferences.paymentReminders}
                onValueChange={(value) => handleDeliveryChange("paymentReminders", value)}
                disabled={!notificationSettings.paymentReminders}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Delivery method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="push">Push</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
              <Switch
                checked={notificationSettings.paymentReminders}
                onCheckedChange={() => handleToggleSetting("paymentReminders")}
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Marketing Emails</h4>
              <p className="text-sm text-muted-foreground">Promotional offers and product updates</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={deliveryPreferences.marketingEmails}
                onValueChange={(value) => handleDeliveryChange("marketingEmails", value)}
                disabled={!notificationSettings.marketingEmails}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Delivery method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="push">Push</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
              <Switch
                checked={notificationSettings.marketingEmails}
                onCheckedChange={() => handleToggleSetting("marketingEmails")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">New Features & Updates</h4>
              <p className="text-sm text-muted-foreground">Notifications about new app features and updates</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={deliveryPreferences.newFeatures}
                onValueChange={(value) => handleDeliveryChange("newFeatures", value)}
                disabled={!notificationSettings.newFeatures}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Delivery method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="push">Push</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
              <Switch
                checked={notificationSettings.newFeatures}
                onCheckedChange={() => handleToggleSetting("newFeatures")}
              />
            </div>
          </div>
        </div>
      </div>

      <Button onClick={handleSaveSettings} className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Notification Settings"
        )}
      </Button>
    </div>
  )
}


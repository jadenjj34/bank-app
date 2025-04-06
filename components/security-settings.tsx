"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SecuritySettings() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginNotifications: true,
    deviceManagement: false,
    sessionTimeout: true,
  })

  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setPasswordData((prev) => ({ ...prev, [id]: value }))
  }

  const handleToggleSetting = (setting: string) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof securitySettings],
    }))
  }

  const handleChangePassword = async () => {
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simple validation
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        throw new Error("Please fill in all password fields")
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("New passwords do not match")
      }

      if (passwordData.newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long")
      }

      toast({
        title: "Password updated",
        description: "Your password has been changed successfully",
      })

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update password",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSecuritySettings = async () => {
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Security settings updated",
        description: "Your security preferences have been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update security settings",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <Button onClick={handleChangePassword} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Switch
              checked={securitySettings.twoFactorAuth}
              onCheckedChange={() => handleToggleSetting("twoFactorAuth")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Login Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive notifications for new login attempts</p>
            </div>
            <Switch
              checked={securitySettings.loginNotifications}
              onCheckedChange={() => handleToggleSetting("loginNotifications")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Device Management</h4>
              <p className="text-sm text-muted-foreground">Manage and restrict which devices can access your account</p>
            </div>
            <Switch
              checked={securitySettings.deviceManagement}
              onCheckedChange={() => handleToggleSetting("deviceManagement")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Session Timeout</h4>
              <p className="text-sm text-muted-foreground">Automatically log out after 30 minutes of inactivity</p>
            </div>
            <Switch
              checked={securitySettings.sessionTimeout}
              onCheckedChange={() => handleToggleSetting("sessionTimeout")}
            />
          </div>

          <Button onClick={handleSaveSecuritySettings} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Security Settings"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}


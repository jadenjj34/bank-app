"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/hooks/use-user"
import ProfileImage from "../public/profile-image.jpeg"

export default function AccountSettings() {
  const { user, updateUser } = useUser()
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Victoria",
    lastName: "Porter",
    email: "sweetvictoria711@gmail.com",
    phone: "+44 7537 134076",
    address: "15854 Wolf Mountain Rd, Grass Valley, CA 95949",
    city: "Grass Valley",
    state: "California",
    zipCode: "95949",
    country: "United States",
  })
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(ProfileImage.src)

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setPersonalInfo((prev) => ({
        ...prev,
        firstName: user.firstName || "Victoria",
        lastName: user.lastName || "Porter",
        email: user.email,
      }))

      if (user.profileImage) {
        setProfileImageUrl(user.profileImage)
      }
    }
  }, [user])

  const [preferences, setPreferences] = useState({
    language: "english",
    dateFormat: "mm/dd/yyyy",
    timeFormat: "12h",
  })

  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [id]: value }))
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfileImage(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImageUrl(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSavePersonalInfo = async () => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update profile image if changed
      if (profileImage && profileImageUrl) {
        // In a real app, we'd upload the image to a server here
        // For this demo, we'll just store the data URL in localStorage
        updateUser({
          profileImage: profileImageUrl,
        })
      }

      // Update user info
      updateUser({
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        email: personalInfo.email,
      })

      toast({
        title: "Settings updated",
        description: "Your personal information has been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update personal information",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSavePreferences = async () => {
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Preferences updated",
        description: "Your account preferences have been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profileImageUrl || "/placeholder.svg"} alt="Profile" />
          <AvatarFallback>
            {personalInfo.firstName?.charAt(0) || ""}
            {personalInfo.lastName?.charAt(0) || "JD"}
          </AvatarFallback>
        </Avatar>
        <div>
          <label htmlFor="profile-image-input" className="cursor-pointer">
            <div className="bg-primary text-white rounded px-3 py-1 text-sm hover:bg-primary/90">Change Avatar</div>
            <input
              id="profile-image-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageChange}
            />
          </label>
          <p className="text-xs text-muted-foreground mt-1">JPG, GIF or PNG. Max size of 2MB.</p>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" value={personalInfo.firstName} onChange={handlePersonalInfoChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" value={personalInfo.lastName} onChange={handlePersonalInfoChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={personalInfo.email} onChange={handlePersonalInfoChange} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={personalInfo.address} onChange={handlePersonalInfoChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" value={personalInfo.city} onChange={handlePersonalInfoChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" value={personalInfo.state} onChange={handlePersonalInfoChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input id="zipCode" value={personalInfo.zipCode} onChange={handlePersonalInfoChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" value={personalInfo.country} onChange={handlePersonalInfoChange} />
          </div>
        </div>
        <Button onClick={handleSavePersonalInfo} className="mt-4" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Account Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={preferences.language}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, language: value }))}
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateFormat">Date Format</Label>
            <Select
              value={preferences.dateFormat}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, dateFormat: value }))}
            >
              <SelectTrigger id="dateFormat">
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeFormat">Time Format</Label>
            <Select
              value={preferences.timeFormat}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, timeFormat: value }))}
            >
              <SelectTrigger id="timeFormat">
                <SelectValue placeholder="Select time format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                <SelectItem value="24h">24-hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleSavePreferences} className="mt-4" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </div>
    </div>
  )
}


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
    firstName: user?.firstName || "Victoria",
    lastName: user?.lastName || "Porter",
    email: user?.email || "sweetvictoria711@gmail.com",
    phone: user?.phone || "+44 7537 134076",
    address: user?.address || "15854 Wolf Mountain Rd, Grass Valley, CA 95949",
    city: user?.city || "Grass Valley",
    state: user?.state || "California",
    zipCode: user?.zipCode || "95949",
    country: user?.country || "United States",
  })
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(ProfileImage.src)

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setPersonalInfo((prev) => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
        city: user.city || prev.city,
        state: user.state || prev.state,
        zipCode: user.zipCode || prev.zipCode,
        country: user.country || prev.country,
      }))

      if (user.profileImage) {
        setProfileImageUrl(user.profileImage)
      }
    }
  }, [user])

  useEffect(() => {
    const storedProfileImage = localStorage.getItem('userProfileImage')
    if (storedProfileImage) {
      setProfileImageUrl(storedProfileImage)
    }
  }, [])

  const [preferences, setPreferences] = useState({
    language: localStorage.getItem("userLanguage") || "english",
    dateFormat: localStorage.getItem("userDateFormat") || "mm/dd/yyyy",
    timeFormat: localStorage.getItem("userTimeFormat") || "12h",
  })

  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => {
      const updated = { ...prev, [field]: value }
      // Only update the specific field that changed
      updateUser({ [field]: value })
      return updated
    })
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfileImage(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const previewUrl = event.target.result as string
          setProfileImageUrl(previewUrl)
          // Update user profile image in localStorage
          localStorage.setItem('userProfileImage', previewUrl)
          updateUser({ profileImage: previewUrl })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePreferencesChange = (field: string, value: string) => {
    setPreferences((prev) => {
      const updated = { ...prev, [field]: value }
      localStorage.setItem(`user${field.charAt(0).toUpperCase() + field.slice(1)}`, value)
      return updated
    })
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
        phone: personalInfo.phone,
        address: personalInfo.address,
        city: personalInfo.city,
        state: personalInfo.state,
        zipCode: personalInfo.zipCode,
        country: personalInfo.country,
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
            <Input id="firstName" value={personalInfo.firstName} onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" value={personalInfo.lastName} onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={personalInfo.email} onChange={(e) => handlePersonalInfoChange("email", e.target.value)} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={personalInfo.phone} onChange={(e) => handlePersonalInfoChange("phone", e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={personalInfo.address} onChange={(e) => handlePersonalInfoChange("address", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" value={personalInfo.city} onChange={(e) => handlePersonalInfoChange("city", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" value={personalInfo.state} onChange={(e) => handlePersonalInfoChange("state", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input id="zipCode" value={personalInfo.zipCode} onChange={(e) => handlePersonalInfoChange("zipCode", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" value={personalInfo.country} onChange={(e) => handlePersonalInfoChange("country", e.target.value)} />
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
              onValueChange={(value) => handlePreferencesChange("language", value)}
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
              onValueChange={(value) => handlePreferencesChange("dateFormat", value)}
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
              onValueChange={(value) => handlePreferencesChange("timeFormat", value)}
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

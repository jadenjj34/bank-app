"use client"

import { useUser } from "@/hooks/use-user"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, Award } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function ProfileHeader() {
  const { user } = useUser()

  if (!user) {
    return null
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.profileImage || "/placeholder.svg"} alt="Profile" />
            <AvatarFallback>
              {user.firstName?.charAt(0) || ""}
              {user.lastName?.charAt(0) || "JD"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              {user.tier === "premium" && (
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium inline-flex items-center">
                  <Award className="h-3 w-3 mr-1" />
                  Premium Client
                </span>
              )}
            </div>
            <p className="text-muted-foreground">Net Worth: {formatCurrency(user.netWorth)}</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.address}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-right text-sm text-muted-foreground">
            <div>
              <span>Customer Since:</span>
              <span className="ml-2 font-medium">January 2019</span>
            </div>
            <div>
              <span>Customer ID:</span>
              <span className="ml-2 font-medium">HB12345678</span>
            </div>
            <div>
              <span>Last Login:</span>
              <span className="ml-2 font-medium">Today, 10:45 AM</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


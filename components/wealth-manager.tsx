import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Phone, Video } from "lucide-react"

export default function WealthManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Wealth Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-lg font-semibold text-white">JB</span>
            </div>
            <div>
              <h3 className="font-semibold">James Blackwood</h3>
              <p className="text-sm text-muted-foreground">Senior Wealth Manager</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Video className="mr-2 h-4 w-4" />
              Video Call
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Phone className="mr-2 h-4 w-4" />
              Direct Line
            </Button>
          </div>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm">
              Next scheduled review: <span className="font-medium">April 15, 2025</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

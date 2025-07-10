"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, DollarSign, Plus, Star, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function InterviewerDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "interviewer")) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) return <div>Loading...</div>
  if (!user || user.role !== "interviewer") return null

  const upcomingInterviews = [
    {
      id: 1,
      type: "System Design",
      candidate: "John Doe",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "confirmed",
    },
    {
      id: 2,
      type: "Data Structures & Algorithms",
      candidate: "Jane Smith",
      date: "2024-01-16",
      time: "10:00 AM",
      status: "confirmed",
    },
  ]

  const completedInterviews = [
    {
      id: 1,
      type: "Frontend Development",
      candidate: "Alice Johnson",
      date: "2024-01-10",
      rating: 4.8,
      status: "completed",
    },
  ]

  return (
    <DashboardLayout
      title="Interviewer Dashboard"
      description="Manage your interview schedule and track your performance"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 upcoming</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Out of 5.0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,200</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your availability and interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => router.push("/interviewer/availability")}>
                <Plus className="mr-2 h-4 w-4" />
                Set Availability
              </Button>
              <Button variant="outline" onClick={() => router.push("/interviewer/interviews")}>
                <Calendar className="mr-2 h-4 w-4" />
                View Schedule
              </Button>
              <Button variant="outline" onClick={() => router.push("/interviewer/feedback")}>
                <Star className="mr-2 h-4 w-4" />
                Submit Feedback
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>Your scheduled interview sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{interview.type}</h3>
                      <p className="text-sm text-gray-600">with {interview.candidate}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {interview.date} at {interview.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">{interview.status}</Badge>
                    <Button size="sm" variant="outline">
                      Start Interview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Interviews</CardTitle>
            <CardDescription>Your completed interview sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Star className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{interview.type}</h3>
                      <p className="text-sm text-gray-600">with {interview.candidate}</p>
                      <p className="text-xs text-gray-500">{interview.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="font-medium text-green-600">{interview.rating}/5.0</div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Feedback
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

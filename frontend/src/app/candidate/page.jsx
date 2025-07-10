"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Plus, Star, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CandidateDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "candidate")) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== "candidate") return null;

  const upcomingInterviews = [
    {
      id: 1,
      type: "System Design",
      interviewer: "Sarah Chen",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "confirmed",
    },
    {
      id: 2,
      type: "Data Structures & Algorithms",
      interviewer: "Mike Johnson",
      date: "2024-01-18",
      time: "10:00 AM",
      status: "pending",
    },
  ];

  const pastInterviews = [
    {
      id: 1,
      type: "Frontend Development",
      interviewer: "Alex Rodriguez",
      date: "2024-01-10",
      score: 8.5,
      status: "completed",
    },
  ];

  return (
    <DashboardLayout title="Candidate Dashboard" description="Manage your interviews and track your progress">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Next: Jan 15, 2:00 PM</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5</div>
              <p className="text-xs text-muted-foreground">Out of 10</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Available to download</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with your next interview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => router.push("/candidate/book")}>
                <Plus className="mr-2 h-4 w-4" />
                Book New Interview
              </Button>
              <Button variant="outline" onClick={() => router.push("/candidate/interviews")}>
                <Calendar className="mr-2 h-4 w-4" />
                View All Interviews
              </Button>
              <Button variant="outline" onClick={() => router.push("/candidate/reports")}>
                <FileText className="mr-2 h-4 w-4" />
                Download Reports
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
                      <p className="text-sm text-gray-600">with {interview.interviewer}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {interview.date} at {interview.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={interview.status === "confirmed" ? "default" : "secondary"}>
                      {interview.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Past Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Interviews</CardTitle>
            <CardDescription>Your completed interview sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{interview.type}</h3>
                      <p className="text-sm text-gray-600">with {interview.interviewer}</p>
                      <p className="text-xs text-gray-500">{interview.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="font-medium text-green-600">{interview.score}/10</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Report
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, Video, FileText, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CandidateInterviewsPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || user.role !== "candidate") {
    router.push("/auth/login");
    return null;
  }

  const upcomingInterviews = [
    {
      id: 1,
      type: "System Design",
      interviewer: "Sarah Chen",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "90 min",
      status: "confirmed",
      meetingLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: 2,
      type: "Data Structures & Algorithms",
      interviewer: "Mike Johnson",
      date: "2024-01-18",
      time: "10:00 AM",
      duration: "60 min",
      status: "pending",
      meetingLink: null,
    },
  ];

  const pastInterviews = [
    {
      id: 1,
      type: "Frontend Development",
      interviewer: "Alex Rodriguez",
      date: "2024-01-10",
      time: "3:00 PM",
      duration: "60 min",
      status: "completed",
      score: 8.5,
      reportAvailable: true,
    },
    {
      id: 2,
      type: "Backend Development",
      interviewer: "Lisa Wang",
      date: "2024-01-05",
      time: "11:00 AM",
      duration: "60 min",
      status: "completed",
      score: 7.8,
      reportAvailable: true,
    },
  ];

  return (
    <DashboardLayout title="My Interviews" description="Manage your interview schedule and view past sessions">
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Ready for your next interview?</h3>
                <p className="text-gray-600">Book a new technical interview session</p>
              </div>
              <Button onClick={() => router.push("/candidate/book")}> <Plus className="mr-2 h-4 w-4" /> Book New Interview </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({upcomingInterviews.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastInterviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingInterviews.length > 0 ? (
              upcomingInterviews.map((interview) => (
                <Card key={interview.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold">{interview.type}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" /> <span>{interview.interviewer}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" /> <span>{interview.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" /> <span>{interview.time} ({interview.duration})</span>
                            </div>
                          </div>
                          <Badge variant={interview.status === "confirmed" ? "default" : "secondary"}>{interview.status}</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {interview.meetingLink && (
                          <Button size="sm" onClick={() => window.open(interview.meetingLink, "_blank")}> <Video className="mr-2 h-4 w-4" /> Join Meeting </Button>
                        )}
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming interviews</h3>
                    <p className="text-gray-600 mb-4">Book your next technical interview to get started</p>
                    <Button onClick={() => router.push("/candidate/book")}> <Plus className="mr-2 h-4 w-4" /> Book Interview </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastInterviews.length > 0 ? (
              pastInterviews.map((interview) => (
                <Card key={interview.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold">{interview.type}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" /> <span>{interview.interviewer}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" /> <span>{interview.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" /> <span>{interview.time} ({interview.duration})</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">Completed</Badge>
                            <span className="text-sm font-medium text-green-600">Score: {interview.score}/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {interview.reportAvailable && (
                          <Button size="sm" onClick={() => router.push(`/candidate/reports/${interview.id}`)}>
                            <FileText className="mr-2 h-4 w-4" /> View Report
                          </Button>
                        )}
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No past interviews</h3>
                    <p className="text-gray-600">Your completed interviews will appear here</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

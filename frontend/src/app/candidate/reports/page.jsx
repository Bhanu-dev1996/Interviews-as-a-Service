"use client"

import { useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Download, Eye, Calendar, User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CandidateReportsPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== "candidate") {
      router.push("/auth/login")
    }
  }, [user, router])

  if (!user || user.role !== "candidate") {
    return null
  }


  const reports = [
    {
      id: 1,
      interviewType: "Frontend Development",
      interviewer: "Alex Rodriguez",
      date: "2024-01-10",
      overallScore: 8.5,
      categories: {
        "Technical Skills": 9.0,
        "Problem Solving": 8.5,
        Communication: 8.0,
        "Code Quality": 8.5,
      },
      feedback:
        "Strong technical foundation with excellent React knowledge. Good problem-solving approach and clean code structure.",
      status: "available",
    },
    {
      id: 2,
      interviewType: "Backend Development",
      interviewer: "Lisa Wang",
      date: "2024-01-05",
      overallScore: 7.8,
      categories: {
        "System Design": 8.0,
        "Database Knowledge": 7.5,
        "API Design": 8.0,
        "Problem Solving": 7.5,
      },
      feedback:
        "Good understanding of backend concepts. Could improve on database optimization and error handling strategies.",
      status: "available",
    },
  ]

  const handleDownloadReport = (reportId) => {
    console.log(`Downloading report ${reportId}`)
  }

  const handleViewReport = (reportId) => {
    router.push(`/candidate/reports/${reportId}`)
  }

  return (
    <DashboardLayout title="Interview Reports" description="View and download your detailed interview feedback">
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reports.length}</div>
              <p className="text-xs text-muted-foreground">Available for download</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Badge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(reports.reduce((acc, report) => acc + report.overallScore, 0) / reports.length).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Out of 10.0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Latest Report</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Jan 10</div>
              <p className="text-xs text-muted-foreground">Frontend Development</p>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{report.interviewType}</CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{report.interviewer}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{report.date}</span>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{report.overallScore}</div>
                    <div className="text-sm text-gray-500">Overall Score</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category Scores */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(report.categories).map(([category, score]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{category}</span>
                        <span className="text-gray-600">{score}/10</span>
                      </div>
                      <Progress value={score * 10} className="h-2" />
                    </div>
                  ))}
                </div>

                {/* Feedback Summary */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Interviewer Feedback</h4>
                  <p className="text-sm text-gray-700">{report.feedback}</p>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button onClick={() => handleViewReport(report.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Full Report
                  </Button>
                  <Button variant="outline" onClick={() => handleDownloadReport(report.id)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {reports.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reports available</h3>
                <p className="text-gray-600 mb-4">Complete your first interview to receive detailed feedback</p>
                <Button onClick={() => router.push("/candidate/book")}>Book Your First Interview</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

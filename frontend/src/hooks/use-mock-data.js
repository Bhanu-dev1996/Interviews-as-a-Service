"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"

// Custom hook for managing mock data
export function useMockInterviews() {
  const { user } = useAuth()
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadInterviews()
    }
  }, [user])

  const loadInterviews = () => {
    setLoading(true)

    setTimeout(() => {
      const mockInterviews = JSON.parse(localStorage.getItem("interviewhub_interviews") || "[]")

      let filteredInterviews = []
      if (user?.role === "candidate") {
        filteredInterviews = mockInterviews.filter(i => i.candidateId === user.id)
      } else if (user?.role === "interviewer") {
        filteredInterviews = mockInterviews.filter(i => i.interviewerId === user.id)
      } else {
        filteredInterviews = mockInterviews
      }

      setInterviews(filteredInterviews)
      setLoading(false)
    }, 500)
  }

  return { interviews, loading, refreshInterviews: loadInterviews }
}

export function useMockReports() {
  const { user } = useAuth()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && user.role === "candidate") {
      loadReports()
    }
  }, [user])

  const loadReports = () => {
    setLoading(true)

    setTimeout(() => {
      const mockReports = JSON.parse(localStorage.getItem("interviewhub_reports") || "[]")
      const filteredReports = mockReports.filter(r => r.candidateId === user?.id)

      setReports(filteredReports)
      setLoading(false)
    }, 500)
  }

  return { reports, loading, refreshReports: loadReports }
}

export function useMockAnalytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = () => {
    setLoading(true)

    setTimeout(() => {
      const mockAnalytics = {
        totalUsers: 1234,
        activeInterviewers: 89,
        monthlyRevenue: 12450,
        monthlyInterviews: 67,
        chartData: [
          { name: "Jan", interviews: 45, revenue: 2250 },
          { name: "Feb", interviews: 52, revenue: 2600 },
          { name: "Mar", interviews: 48, revenue: 2400 },
          { name: "Apr", interviews: 61, revenue: 3050 },
          { name: "May", interviews: 55, revenue: 2750 },
          { name: "Jun", interviews: 67, revenue: 3350 },
        ],
      }

      setAnalytics(mockAnalytics)
      setLoading(false)
    }, 500)
  }

  return { analytics, loading }
}

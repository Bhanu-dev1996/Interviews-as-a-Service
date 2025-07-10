"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { mockAPI } from "@/lib/api"

export default function BookInterviewPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [selectedType, setSelectedType] = useState("")
  const [selectedInterviewer, setSelectedInterviewer] = useState("")
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [loading, setLoading] = useState(false)

  const interviewTypes = [
    { id: "dsa", name: "Data Structures & Algorithms", duration: "60 min", price: "$50" },
    { id: "system-design", name: "System Design", duration: "90 min", price: "$75" },
    { id: "frontend", name: "Frontend Development", duration: "60 min", price: "$50" },
    { id: "backend", name: "Backend Development", duration: "60 min", price: "$50" },
    { id: "fullstack", name: "Full Stack Development", duration: "90 min", price: "$75" },
  ]

  const interviewers = [
    {
      id: "1",
      name: "Sarah Chen",
      specialties: ["System Design", "Backend"],
      rating: 4.9,
      experience: "8 years",
      company: "Google",
      avatar: "SC",
    },
    {
      id: "2",
      name: "Mike Johnson",
      specialties: ["DSA", "Frontend"],
      rating: 4.8,
      experience: "6 years",
      company: "Meta",
      avatar: "MJ",
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      specialties: ["Full Stack", "System Design"],
      rating: 4.7,
      experience: "10 years",
      company: "Netflix",
      avatar: "AR",
    },
  ]

  const availableSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]

  const handleBooking = async () => {
    if (!selectedType || !selectedInterviewer || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to book your interview.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const selectedTypeData = interviewTypes.find((t) => t.id === selectedType)
      const selectedInterviewerData = interviewers.find((i) => i.id === selectedInterviewer)

      await mockAPI.bookInterview({
        candidateId: user?.id,
        interviewerId: selectedInterviewer,
        type: selectedTypeData?.name,
        date: selectedDate.toLocaleDateString(),
        time: selectedTime,
        duration: selectedTypeData?.duration,
        interviewer: selectedInterviewerData?.name,
      })

      toast({
        title: "Interview Booked!",
        description: "Your interview has been successfully scheduled. You'll receive a confirmation email shortly.",
      })

      setTimeout(() => {
        router.push("/candidate")
      }, 2000)
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your interview. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user || user.role !== "candidate") {
    router.push("/auth/login")
    return null
  }

  return (
    <DashboardLayout title="Book Interview" description="Schedule your technical interview session">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Interview Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>1. Select Interview Type</CardTitle>
            <CardDescription>Choose the type of technical interview you'd like to schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {interviewTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedType === type.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <h3 className="font-medium">{type.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">{type.duration}</span>
                    <span className="font-semibold text-blue-600">{type.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interviewer Selection */}
        {selectedType && (
          <Card>
            <CardHeader>
              <CardTitle>2. Choose Your Interviewer</CardTitle>
              <CardDescription>Select from our pool of experienced technical interviewers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interviewers.map((interviewer) => (
                  <div
                    key={interviewer.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedInterviewer === interviewer.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedInterviewer(interviewer.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-blue-600 text-white">{interviewer.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{interviewer.name}</h3>
                          <p className="text-sm text-gray-600">
                            {interviewer.experience} at {interviewer.company}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{interviewer.rating}</span>
                            <span className="text-sm text-gray-500">rating</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {interviewer.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Date and Time Selection */}
        {selectedInterviewer && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>3. Select Date</CardTitle>
                <CardDescription>Choose your preferred interview date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) =>
                    date < new Date() || date.getDay() === 0 || date.getDay() === 6
                  }
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Select Time</CardTitle>
                <CardDescription>Available time slots for your selected date</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedTime === slot ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setSelectedTime(slot)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Please select a date first</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Booking Summary */}
        {selectedType && selectedInterviewer && selectedDate && selectedTime && (
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Review your interview details before confirming</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Interview Type:</span>
                  <span>{interviewTypes.find((t) => t.id === selectedType)?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Interviewer:</span>
                  <span>{interviewers.find((i) => i.id === selectedInterviewer)?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Date:</span>
                  <span>{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Time:</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Duration:</span>
                  <span>{interviewTypes.find((t) => t.id === selectedType)?.duration}</span>
                </div>
                <div className="flex justify-between items-center py-2 text-lg font-semibold">
                  <span>Total Cost:</span>
                  <span className="text-blue-600">
                    {interviewTypes.find((t) => t.id === selectedType)?.price}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <Button onClick={handleBooking} className="flex-1" disabled={loading}>
                  {loading ? "Booking..." : "Confirm Booking"}
                </Button>
                <Button variant="outline" onClick={() => router.push("/candidate")}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

const MOCK_DELAY = 1000;

const INTERVIEWS_KEY = "interviewhub_interviews";
const REPORTS_KEY = "interviewhub_reports";
const AVAILABILITY_KEY = "interviewhub_availability";

const initializeMockData = () => {
  if (!localStorage.getItem(INTERVIEWS_KEY)) {
    const mockInterviews = [
      {
        id: "1",
        candidateId: "1",
        interviewerId: "2",
        type: "System Design",
        date: "2024-01-15",
        time: "2:00 PM",
        duration: "90 min",
        status: "confirmed",
        meetingLink: "https://meet.google.com/abc-defg-hij",
      },
      {
        id: "2",
        candidateId: "1",
        interviewerId: "2",
        type: "Data Structures & Algorithms",
        date: "2024-01-18",
        time: "10:00 AM",
        duration: "60 min",
        status: "pending",
        meetingLink: null,
      },
    ];
    localStorage.setItem(INTERVIEWS_KEY, JSON.stringify(mockInterviews));
  }

  if (!localStorage.getItem(REPORTS_KEY)) {
    const mockReports = [
      {
        id: "1",
        interviewId: "1",
        candidateId: "1",
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
    ];
    localStorage.setItem(REPORTS_KEY, JSON.stringify(mockReports));
  }
};

export const mockAPI = {
  init: () => {
    initializeMockData();
  },

  getInterviews: async (userId, role) => {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
    const interviews = JSON.parse(localStorage.getItem(INTERVIEWS_KEY) || "[]");

    if (role === "candidate") {
      return interviews.filter((i) => i.candidateId === userId);
    } else if (role === "interviewer") {
      return interviews.filter((i) => i.interviewerId === userId);
    }
    return interviews;
  },

  bookInterview: async (interviewData) => {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
    const interviews = JSON.parse(localStorage.getItem(INTERVIEWS_KEY) || "[]");

    const newInterview = {
      id: Date.now().toString(),
      ...interviewData,
      status: "confirmed",
    };

    interviews.push(newInterview);
    localStorage.setItem(INTERVIEWS_KEY, JSON.stringify(interviews));
    return newInterview;
  },

  getReports: async (candidateId) => {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
    const reports = JSON.parse(localStorage.getItem(REPORTS_KEY) || "[]");
    return reports.filter((r) => r.candidateId === candidateId);
  },

  getInterviewers: async () => {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
    return [
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
    ];
  },

  getAnalytics: async () => {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
    return {
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
    };
  },
};

if (typeof window !== "undefined") {
  mockAPI.init();
}

export default mockAPI;

import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (userData) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout"),
  refreshToken: () => api.post("/auth/refresh"),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data) => api.put("/users/profile", data),
  getUsers: () => api.get("/users"),
  getUserById: (id) => api.get(`/users/${id}`),
};

// Interview API calls
export const interviewAPI = {
  getInterviews: () => api.get("/interviews"),
  getInterviewById: (id) => api.get(`/interviews/${id}`),
  bookInterview: (data) => api.post("/interviews", data),
  updateInterview: (id, data) => api.put(`/interviews/${id}`, data),
  cancelInterview: (id) => api.delete(`/interviews/${id}`),
  getAvailableSlots: (interviewerId, date) =>
    api.get(`/interviews/availability/${interviewerId}?date=${date}`),
};

// Interviewer API calls
export const interviewerAPI = {
  getInterviewers: () => api.get("/interviewers"),
  getInterviewerById: (id) => api.get(`/interviewers/${id}`),
  setAvailability: (data) => api.post("/interviewers/availability", data),
  getAvailability: () => api.get("/interviewers/availability"),
  submitFeedback: (interviewId, feedback) =>
    api.post(`/interviews/${interviewId}/feedback`, feedback),
};

// Report API calls
export const reportAPI = {
  getReports: () => api.get("/reports"),
  getReportById: (id) => api.get(`/reports/${id}`),
  downloadReport: (id) =>
    api.get(`/reports/${id}/download`, {
      responseType: "blob",
    }),
};

// Admin API calls
export const adminAPI = {
  getAnalytics: () => api.get("/admin/analytics"),
  getUsers: () => api.get("/admin/users"),
  approveInterviewer: (id) => api.put(`/admin/interviewers/${id}/approve`),
  rejectInterviewer: (id) => api.put(`/admin/interviewers/${id}/reject`),
  getPlatformSettings: () => api.get("/admin/settings"),
  updatePlatformSettings: (data) => api.put("/admin/settings", data),
};

export default api;

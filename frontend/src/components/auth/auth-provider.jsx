"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext(undefined)

// Keys for localStorage
const USERS_KEY = "interviewhub_users"
const CURRENT_USER_KEY = "interviewhub_current_user"

// Initialize demo users into localStorage
const initializeDemoUsers = () => {
  const existingUsers = localStorage.getItem(USERS_KEY)
  if (!existingUsers) {
    const demoUsers = [
      {
        id: "1",
        email: "candidate@demo.com",
        password: "password",
        name: "John Candidate",
        role: "candidate",
      },
      {
        id: "2",
        email: "interviewer@demo.com",
        password: "password",
        name: "Sarah Interviewer",
        role: "interviewer",
      },
      {
        id: "3",
        email: "admin@demo.com",
        password: "password",
        name: "Admin User",
        role: "admin",
      },
    ]
    localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers))
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    initializeDemoUsers()

    const currentUser = localStorage.getItem(CURRENT_USER_KEY)
    if (currentUser) {
      try {
        setUser(JSON.parse(currentUser))
      } catch (error) {
        localStorage.removeItem(CURRENT_USER_KEY)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
      const foundUser = users.find((u) => u.email === email)

      if (!foundUser) {
        throw new Error("User not found")
      }

      const userToLogin = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      }

      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToLogin))
      setUser(userToLogin)

      switch (userToLogin.role) {
        case "admin":
          router.push("/admin")
          break
        case "interviewer":
          router.push("/interviewer")
          break
        default:
          router.push("/candidate")
      }
    } catch (error) {
      throw new Error("Login failed")
    }
  }

  const register = async (email, password, name, role) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]")

      if (users.find((u) => u.email === email)) {
        throw new Error("User already exists")
      }

      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name,
        role,
      }

      users.push(newUser)
      localStorage.setItem(USERS_KEY, JSON.stringify(users))

      const userToLogin = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      }

      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToLogin))
      setUser(userToLogin)

      switch (userToLogin.role) {
        case "admin":
          router.push("/admin")
          break
        case "interviewer":
          router.push("/interviewer")
          break
        default:
          router.push("/candidate")
      }
    } catch (error) {
      throw new Error("Registration failed")
    }
  }

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY)
    setUser(null)
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Calendar, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 animate-fade-in">
      {/* Header */}
      <header className="border-b backdrop-blur-lg bg-white/60 shadow-sm sticky top-0 z-50 transition duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 group">
            <img src="/interviewhub-logo.svg" alt="InterviewHub Logo" className="h-[36px] w-[100%]" />
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="hover:underline">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg transition">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 bg-transparent animate-fade-in delay-100">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 animate-pulse" variant="secondary">
            Trusted by 500+ Companies
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Scale Technical Hiring with
            <span className="text-blue-600"> Expert Interviewers</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Connect with experienced interviewers, streamline hiring, and receive high-quality candidate assessments.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/register">
              <Button size="lg" className="px-8 shadow-md hover:scale-105 transition">
                Start Hiring <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/register?role=interviewer">
              <Button
                size="lg"
                variant="outline"
                className="px-8 bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50 transition"
              >
                Become an Interviewer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for Technical Interviews</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tools to conduct, manage, and assess interviews—designed for modern hiring workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
              icon: <Users className="h-10 w-10 text-blue-600 mb-2" />,
              title: "Expert Interviewers",
              description: "Access seasoned technical interviewers",
              items: ["Vetted professionals", "Multiple tech stacks", "Real-world experience"]
            }, {
              icon: <Calendar className="h-10 w-10 text-blue-600 mb-2" />,
              title: "Smart Scheduling",
              description: "Book effortlessly with calendar sync",
              items: ["Real-time availability", "Automated reminders", "Calendar sync"]
            }, {
              icon: <FileText className="h-10 w-10 text-blue-600 mb-2" />,
              title: "Detailed Reports",
              description: "Structured feedback with scores",
              items: ["Structured feedback", "Category-wise scoring", "PDF export"]
            }].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.items.map((text, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Join hundreds of forward-thinking teams using InterviewHub to make faster, smarter hiring decisions.
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="px-8 bg-white text-indigo-700 hover:bg-indigo-50 transition">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 animate-fade-in-up delay-200">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/interviewhub-logo-white.svg" alt="InterviewHub Logo" className="h-[36px] w-[100%]" />
          </div>
          <p className="text-gray-400">© 2025 InterviewHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

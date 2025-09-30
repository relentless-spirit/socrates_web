"use client"

// import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import BiographySection from "@/components/biography-section"
import PhilosophySection from "@/components/philosophy-section"
import ContributionsSection from "@/components/contributions-section"
import QuotesSection from "@/components/quotes-section"
import ApplicationsSection from "@/components/applications-section"
import QuizSection from "@/components/quiz-section"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation/>
            <main>
                <HeroSection />
                <BiographySection />
                <PhilosophySection />
                <ContributionsSection />
                <QuotesSection />
                <ApplicationsSection />
                <QuizSection />
            </main>
            <Footer />
            <Chatbot />
        </div>
    )
}

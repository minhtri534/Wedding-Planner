"use client";

import { useState } from "react";
import LandingPage from "@/components/layout/LandingPage";
import Dashboard from "@/components/features/dashboard/Dashboard";
import OnboardingWizard from "@/components/features/onboarding/OnboardingWizard";

export default function Home() {
  const [view, setView] = useState<"landing" | "dashboard" | "onboarding">("landing");
  const [targetTab, setTargetTab] = useState<"budget" | "bridal" | "guests">("budget");
  const [preferences, setPreferences] = useState<any>(null); // State for onboarding data

  const handleNavigate = (feature: "budget" | "bridal" | "guests") => {
    setTargetTab(feature);
    setView("dashboard");
    window.scrollTo(0, 0);
  };

  const handleStart = () => {
    setView("onboarding");
    window.scrollTo(0, 0);
  };

  const handleOnboardingComplete = (data: any) => {
    // Process Onboarding Data
    setPreferences({
        budget: Number(data.budget.replace(/,/g, '')),
        guests: Number(data.guestCount),
        location: data.location,
        vibe: data.vibeTags[0] || "Modern" // Take first tag or default
    });
    
    setView("dashboard");
    setTargetTab("budget");
    window.scrollTo(0, 0);
  };

  const handleBackToLanding = () => {
    setView("landing");
    window.scrollTo(0, 0);
  };

  return (
    <main className="min-h-screen bg-white">
      {view === "landing" && (
        <LandingPage onNavigate={handleNavigate} onStart={handleStart} />
      )}
      
      {view === "onboarding" && (
        <OnboardingWizard onComplete={handleOnboardingComplete} />
      )}
      
      {view === "dashboard" && (
        <Dashboard 
          initialTab={targetTab} 
          onBack={handleBackToLanding} 
          initialPreferences={preferences}
        />
      )}
    </main>
  );
}

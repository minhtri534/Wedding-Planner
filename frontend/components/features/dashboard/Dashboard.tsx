"use client";

import { useState, useEffect } from "react";
import BudgetPlanner from "@/components/features/budget/BudgetPlanner";
import BridalStylist from "@/components/features/bridal/BridalStylist";
import GuestManager from "@/components/features/guest/GuestManager";
import AIChatButton from "@/components/features/chat/AIChatButton";
import AuthModal from "@/components/features/auth/AuthModal";
import PricingModal from "@/components/features/pricing/PricingModal";
import TimelineManager from "@/components/features/timeline/TimelineManager";
import { LayoutDashboard, Crown, CalendarCheck } from "lucide-react";

interface DashboardPreferences {
    budget?: number;
    guests?: number;
    location?: string;
    vibe?: string;
}

interface DashboardProps {
  initialTab?: "budget" | "bridal" | "guests" | "timeline";
  onBack: () => void;
  initialPreferences?: DashboardPreferences;
}

export default function Dashboard({ initialTab = "budget", onBack, initialPreferences }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"budget" | "bridal" | "guests" | "timeline">(initialTab);
  const [authOpen, setAuthOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [user, setUser] = useState<{email: string} | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    // Check local storage for token on load
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("user_email");
    if (token && email) {
      setUser({ email });
    }
  }, []);

  const handleLoginSuccess = (token: string, email: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user_email", email);
    setUser({ email });
    setAuthOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    setUser(null);
    window.location.reload(); // Refresh to clear state
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 relative animate-in fade-in duration-500">
      <AIChatButton />
      {authOpen && <AuthModal onLoginSuccess={handleLoginSuccess} onClose={() => setAuthOpen(false)} />}
      
      {/* Header */}
      <header className="bg-white border-b border-slate-100 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 cursor-pointer" onClick={onBack}>
            <div className="p-2 bg-indigo-50 rounded-lg">
                <LayoutDashboard className="w-5 h-5 text-indigo-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Wedding<span className="text-indigo-600">Architect</span>
            </h1>
          </div>

          <nav className="flex gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setActiveTab("budget")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "budget"
                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              Planner
            </button>
            <button
              onClick={() => setActiveTab("bridal")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "bridal"
                  ? "bg-white text-rose-600 shadow-sm ring-1 ring-rose-100"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              Bridal Studio
            </button>
             <button
              onClick={() => setActiveTab("guests")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "guests"
                  ? "bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              Invites & RSVP
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "timeline"
                  ? "bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              Timeline
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
                onClick={() => setPricingOpen(true)}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:shadow-lg transition-transform hover:-translate-y-0.5"
            >
                <Crown className="w-3 h-3" />
                GO PREMIUM
            </button>

            {user ? (
                <div className="text-xs bg-slate-100 px-3 py-1.5 rounded-full text-slate-600 flex items-center gap-2 border border-slate-200">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="font-medium">{user.email}</span>
                    <button onClick={handleLogout} className="text-rose-500 hover:text-rose-700 ml-2 font-bold hover:underline">
                        Logout
                    </button>
                </div>
            ) : (
                <button 
                  onClick={() => setAuthOpen(true)}
                  className="text-sm bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-all font-medium shadow-lg shadow-slate-900/10"
                >
                  Sign In / Save
                </button>
            )}
          </div>
        </div>
      </header>
      
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} onLoginSuccess={handleLoginSuccess} />}
      <PricingModal isOpen={pricingOpen} onClose={() => setPricingOpen(false)} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {activeTab === "budget" && "Financial Intelligence"}
            {activeTab === "bridal" && "Bridal Atelier"}
            {activeTab === "guests" && "Guest Experience"}
            {activeTab === "timeline" && "Master Checklist"}
          </h2>
          <p className="text-slate-500">
            {activeTab === "budget" && "Track spending, manage vendors, and stay on timeline."}
            {activeTab === "bridal" && "Curate your perfect look with AI-powered recommendations."}
            {activeTab === "guests" && "Manage your guest list, invitations, and seating charts."}
            {activeTab === "timeline" && "Your step-by-step roadmap to the perfect day."}
          </p>
        </div>

        {/* Dynamic Component Rendering */}
        <div className="min-h-[600px] mt-6">
           {activeTab === "budget" && (
             <BudgetPlanner 
               initialBudget={initialPreferences?.budget} 
               initialGuests={initialPreferences?.guests} 
             />
           )}
           {activeTab === "bridal" && (
             <BridalStylist 
                initialVibe={initialPreferences?.vibe}
                initialBudget={initialPreferences?.budget}
             />
           )}
           {activeTab === "guests" && (
             <GuestManager 
                initialGuests={initialPreferences?.guests}
                initialLocation={initialPreferences?.location}
                initialVibe={initialPreferences?.vibe}
             />
           )}
           {activeTab === "timeline" && (
             <TimelineManager />
           )}
        </div>
      </div>
      
      <AIChatButton 
        context={{
            budget: initialPreferences?.budget,
            guests: initialPreferences?.guests,
            vibe: initialPreferences?.vibe,
            location: initialPreferences?.location
        }}
      />
    </div>
  );
}
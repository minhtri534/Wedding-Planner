"use client";

import { useState, useEffect } from "react";

interface TimelineTask {
  month_due: number;
  task_name: string;
  category: string;
  is_critical: boolean;
}

interface WeddingTimeline {
  tasks: TimelineTask[];
  planning_velocity: string;
}

interface BudgetCategory {
  category_name: string;
  allocated_amount: number;
  percentage: number;
  reasoning: string;
  risk_factor: string;
}

interface BudgetPlan {
  total_budget: number;
  guest_count: number;
  cost_per_guest: number;
  categories: BudgetCategory[];
  contingency_fund: number;
  ai_suggestions: string[];
}

interface BudgetPlannerProps {
  initialBudget?: number;
  initialGuests?: number;
}

export default function BudgetPlanner({ initialBudget = 30000, initialGuests = 100 }: BudgetPlannerProps) {
  const [budget, setBudget] = useState(initialBudget);
  const [guests, setGuests] = useState(initialGuests);
  const [season, setSeason] = useState("Summer");
  const [months, setMonths] = useState(12);
  const [plan, setPlan] = useState<BudgetPlan | null>(null);
  const [timeline, setTimeline] = useState<WeddingTimeline | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Sync if props change via parent state
    setBudget(initialBudget);
    setGuests(initialGuests);
  }, [initialBudget, initialGuests]);

  // Load existing project on mount (optional) or via button
  const handleLoad = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please Login to load your project.");
        return;
    }
    try {
        const res = await fetch("http://localhost:8000/project/latest", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await res.json();
        if (data.status === "loaded") {
            setBudget(data.preferences.total_budget);
            setGuests(data.preferences.guest_count);
            setSeason(data.preferences.season);
            setPlan(data.budget_plan);
            setTimeline(data.timeline);
            alert("Project Loaded Successfully!");
        } else {
            alert("No saved projects found for this account.");
        }
    } catch (e) {
        console.error(e);
        alert("Failed to load project.");
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please Login to save your project.");
        return;
    }
    if (!plan) return;
    setSaving(true);
    try {
        const payload = {
            preferences: {
                total_budget: budget,
                guest_count: guests,
                location: "New York", 
                season: season,
                vibe: "Modern" // simplified
            },
            budget_plan: plan,
            timeline: timeline
        };

        const res = await fetch("http://localhost:8000/project/save", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
        
        if (res.ok) alert("Project Saved to Cloud!");
        else alert("Save failed. Session may be expired.");
    } catch (e) {
        console.error(e);
        alert("Save failed.");
    } finally {
        setSaving(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // 1. Fetch Budget
      const resBudget = await fetch("http://localhost:8000/planning/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total_budget: budget,
          guest_count: guests,
          months_until_wedding: months,
          location: "New York",
          season: season,
          vibe: "Modern",
          priorities: { "Photography": "High", "Venue & Catering": "Medium" }
        }),
      });
      if (!resBudget.ok) throw new Error("Failed to fetch plan");
      const dataBudget = await resBudget.json();
      setPlan(dataBudget);

      // 2. Fetch Timeline
      const resTimeline = await fetch("http://localhost:8000/planning/timeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total_budget: budget,
          guest_count: guests,
          months_until_wedding: months,
          season: season,
          vibe: "Modern",
          priorities: { "Photography": "High" }
        }),
      });
      if (resTimeline.ok) {
        const dataTimeline = await resTimeline.json();
        setTimeline(dataTimeline);
      }

    } catch (error) {
       console.error(error);
       alert("API Error. Ensure Backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Total Budget ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400">$</span>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full pl-8 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Guest Count</label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Months To Go</label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">Season</label>
             <select 
               value={season}
               onChange={(e) => setSeason(e.target.value)}
               className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
             >
                <option value="Spring">Spring</option>
                <option value="Summer">Summer (Peak)</option>
                <option value="Autumn">Autumn (Peak)</option>
                <option value="Winter">Winter (Value)</option>
             </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-slate-800 transition-all disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {loading ? "Processing Financial Models..." : "Generate Smart Budget"}
        </button>

        <div className="flex gap-4 mt-4">
            <button onClick={handleSave} disabled={!plan || saving} className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50">
                {saving ? "Saving..." : "Save Project"}
            </button>
            <button onClick={handleLoad} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-300">
                Load Last Project
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Budget */}
        {plan && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-left-4">
            <h3 className="text-xl font-bold mb-6 text-slate-800">Optimized Allocation</h3>
            <div className="space-y-4">
              {plan.categories.map((cat) => (
                <div key={cat.category_name} className="group">
                  <div className="flex justify-between items-center text-sm pb-1">
                    <span className="font-medium text-slate-700">{cat.category_name}</span>
                    <span className="font-bold text-slate-900">${cat.allocated_amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${cat.category_name.includes("Venue") ? "bg-slate-800" : "bg-slate-400"}`}
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{cat.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right: Timeline */}
        {timeline && (
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-right-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Critical Timeline</h3>
                    <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                        {timeline.planning_velocity} Mode
                    </span>
                </div>
                
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {timeline.tasks.sort((a,b) => b.month_due - a.month_due).map((task, idx) => (
                         <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            {/* Icon */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-xs font-bold text-slate-600">
                                {task.month_due}m
                            </div>
                            
                            {/* Card */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-slate-700 text-sm">{task.task_name}</span>
                                    {task.is_critical && <span className="w-2 h-2 rounded-full bg-rose-500" title="Critical Path"></span>}
                                </div>
                                <span className="text-xs text-slate-400 uppercase font-semibold">{task.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

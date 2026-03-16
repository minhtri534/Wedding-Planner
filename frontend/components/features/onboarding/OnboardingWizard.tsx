"use client";

import { useState } from "react";
import { ArrowLeft, Check, Sparkles, Building2, Users } from "lucide-react";

interface OnboardingData {
    vision: string;
    budget: string;
    guestCount: string;
    location: string;
    vibeTags: string[];
    priorities: string[];
}

interface OnboardingWizardProps {
  onComplete: (data: OnboardingData) => void;
}

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    vision: "",
    budget: "",
    guestCount: "",
    location: "",
    vibeTags: [] as string[],
    priorities: [] as string[]
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Final step logic
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        onComplete(data);
      }, 3000); // Fake processing time
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleDataChange = (key: string, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const toggleSelection = (key: "vibeTags" | "priorities", item: string, limit?: number) => {
    setData(prev => {
      const current = prev[key];
      if (current.includes(item)) {
        return { ...prev, [key]: current.filter(i => i !== item) };
      }
      if (limit && current.length >= limit) return prev;
      return { ...prev, [key]: [...current, item] };
    });
  };

  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <Sparkles className="w-16 h-16 text-indigo-600 mb-6 animate-spin-slow" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Your Vision...</h2>
        <div className="space-y-2 text-slate-500 text-lg">
          <p className="animate-pulse">Optimizing cashflow structure...</p>
          <p className="animate-pulse delay-75">Scanning bridal trends...</p>
          <p className="animate-pulse delay-150">Predicting guest attendance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-3xl mx-auto min-h-screen px-6 py-12 flex flex-col justify-between">
        {/* Header / Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {step > 1 ? (
              <button onClick={handleBack} className="text-slate-500 hover:text-slate-900 flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
            ) : <div />}
            <div className="text-sm font-medium text-slate-400">Step {step} of 5</div>
          </div>
          
          <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Dynamic Step Content */}
        <div className="flex-1 animate-in slide-in-from-right-8 fade-in duration-300">
          
          {/* STEP 1: VISION */}
          {step === 1 && (
            <div className="space-y-8 text-center max-w-2xl mx-auto">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Close your eyes. What do you see?</h1>
                <p className="text-slate-500 text-lg">Every perfect wedding starts with a feeling, not a spreadsheet.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { id: "intimate", title: "Intimate & Cozy", desc: "Under 50 guests, focus on connection.", icon: "🕯️" },
                  { id: "party", title: "Vibrant Party", desc: "Dancing, festival vibes, memorable.", icon: "🎉" },
                  { id: "luxury", title: "Grand & Luxury", desc: "Impeccable details, impressive scale.", icon: "✨" }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleDataChange("vision", option.id)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all hover:scale-105 ${
                      data.vision === option.id 
                        ? "border-indigo-600 bg-indigo-50 shadow-lg" 
                        : "border-slate-100 hover:border-indigo-200"
                    }`}
                  >
                    <div className="text-4xl mb-4">{option.icon}</div>
                    <h3 className="font-bold text-slate-900 mb-2">{option.title}</h3>
                    <p className="text-sm text-slate-500">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: ANCHORS */}
          {step === 2 && (
            <div className="space-y-8 max-w-lg mx-auto">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Laying the Foundation</h1>
                <p className="text-slate-500">Don't worry about precision yet. AI will help optimize these numbers later.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Budget (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input 
                      type="number" 
                      value={data.budget}
                      onChange={(e) => handleDataChange("budget", e.target.value)}
                      placeholder="30,000"
                      className="w-full pl-8 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-lg"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">We'll help you spend this effectively.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Guest Count</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="number" 
                      value={data.guestCount}
                      onChange={(e) => handleDataChange("guestCount", e.target.value)}
                      placeholder="150"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Dream Location</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      value={data.location}
                      onChange={(e) => handleDataChange("location", e.target.value)}
                      placeholder="New York, NY"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PARAMETERS */}
          {step === 3 && (
             <div className="space-y-8 text-center max-w-2xl mx-auto">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Define Your Aesthetic</h1>
                <p className="text-slate-500 text-lg">If your wedding was a movie, what genre would it be?</p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {["Modern", "Classic", "Rustic", "Beach", "Minimalist", "Garden", "Vintage", "Bohemian", "Industrial", "Romantic"].map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleSelection("vibeTags", tag)}
                    className={`px-6 py-3 rounded-full border transition-all ${
                      data.vibeTags.includes(tag)
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105"
                        : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

           {/* STEP 4: TRADE-OFFS */}
           {step === 4 && (
             <div className="space-y-8 max-w-2xl mx-auto">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">What is Non-Negotiable?</h1>
                <p className="text-slate-500 text-lg">Pick 3 top priorities. We will allocate budget heavily here.</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: "food", label: "Food & Drink 🍷", sub: "Gourmet dining experience is key." },
                  { id: "fashion", label: "Fashion & Beauty 👗", sub: "Looking my absolute best." },
                  { id: "photo", label: "Memories (Photo/Video) 📸", sub: "Capturing every moment perfectly." },
                  { id: "music", label: "Music & Vibe 🎵", sub: "Keeping the dance floor packed." },
                  { id: "decor", label: "Decor & Florals 🌸", sub: "Stunning visual environment." }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleSelection("priorities", item.id, 3)}
                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                      data.priorities.includes(item.id)
                        ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-900">{item.label}</div>
                      <div className="text-sm text-slate-500">{item.sub}</div>
                    </div>
                    {data.priorities.includes(item.id) && (
                      <div className="bg-emerald-500 text-white p-1 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-slate-400">
                {data.priorities.length}/3 selected
              </p>
            </div>
          )}

           {/* STEP 5: REVIEW (Handled by isProcessing state above, acts as transition) */}
           {step === 5 && (
             <div className="text-center max-w-lg mx-auto space-y-8">
               <h1 className="text-3xl font-bold text-slate-900">Ready to build?</h1>
               <p className="text-slate-500 text-lg">
                 We have everything we need to generate your initial blueprint. You can always adjust later.
               </p>
               
               <div className="bg-slate-50 p-6 rounded-2xl text-left space-y-4 text-slate-600">
                 <p><strong>Vision:</strong> {data.vision}</p>
                 <p><strong>Budget:</strong> ${data.budget}</p>
                 <p><strong>Guests:</strong> {data.guestCount} in {data.location}</p>
                 <p><strong>Vibe:</strong> {data.vibeTags.join(", ")}</p>
                 <p><strong>Top Priorities:</strong> {data.priorities.join(", ")}</p>
               </div>
             </div>
           )}

        </div>

        {/* Footer Actions */}
        <div className="pt-8 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !data.vision) ||
              (step === 2 && (!data.budget || !data.guestCount))
            }
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl ${
              (step === 1 && !data.vision) || (step === 2 && (!data.budget || !data.guestCount))
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-1"
            }`}
          >
            {step === 5 ? "Generate Blueprints" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
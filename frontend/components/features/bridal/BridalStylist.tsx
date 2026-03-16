"use client";

import { useState } from "react";

interface BridalRecommendation {
  dress_silhouette: string;
  fabric_choice: string;
  neckline: string;
  makeup_palette: string;
  accessories_tip: string;
  estimated_cost: string;
  visual_prompt: string;
}

interface BridalStylistProps {
  initialVibe?: string;
  initialBudget?: number;
}

export default function BridalStylist({ initialVibe = "Modern", initialBudget = 30000 }: BridalStylistProps) {
  // Estimate dress budget as approx 5-8% of total budget if not explicitly set separately
  const derivedDressBudget = initialBudget ? Math.round(initialBudget * 0.08) : 2000;

  const [profile, setProfile] = useState({
    body_shape: "Hourglass",
    skin_tone: "Fair (Cool Undertone)",
    vibe: initialVibe,
    budget_for_dress: derivedDressBudget
  });
  
  const [recommendation, setRecommendation] = useState<BridalRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const generateStyle = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/planning/bridal-style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      setRecommendation(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-rose-50">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500 mb-6 font-serif">
          AI Bridal Atelier
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Body Shape</label>
            <select 
              value={profile.body_shape}
              onChange={(e) => setProfile({...profile, body_shape: e.target.value})}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-200 outline-none"
            >
              {["Hourglass", "Pear", "Rectangle", "Inverted Triangle", "Round"].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Skin Tone</label>
            <select 
              value={profile.skin_tone}
              onChange={(e) => setProfile({...profile, skin_tone: e.target.value})}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-200 outline-none"
            >
              {[
                "Fair (Cool Undertone)", "Fair (Warm Undertone)", 
                "Medium (Neutral)", "Olive", 
                "Dark (Cool)", "Dark (Warm)"
              ].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Wedding Vibe</label>
            <select 
              value={profile.vibe}
              onChange={(e) => setProfile({...profile, vibe: e.target.value})}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-200 outline-none"
            >
              {[
                "Modern", "Classic", "Rustic", "Beach", "Minimalist", 
                "Garden", "Vintage", "Bohemian", "Industrial", "Romantic"
              ].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Dress Budget ($)</label>
            <input
              type="number"
              value={profile.budget_for_dress}
              onChange={(e) => setProfile({...profile, budget_for_dress: Number(e.target.value)})}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-200 outline-none"
            />
          </div>
        </div>

        <button
          onClick={generateStyle}
          disabled={loading}
          className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
        >
          {loading ? "Designing Profile..." : "Analyze My Style"}
        </button>
      </div>

      {recommendation && (
         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8">
            {/* Dress Logic */}
            <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Implementation Strategy</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <span className="block text-slate-500 text-xs uppercase font-bold">Recommended Silhouette</span>
                        <span className="text-slate-900 font-medium text-lg">{recommendation.dress_silhouette}</span>
                    </div>
                     <div className="p-4 bg-slate-50 rounded-lg">
                        <span className="block text-slate-500 text-xs uppercase font-bold">Fabric Platform</span>
                        <span className="text-slate-900 font-medium">{recommendation.fabric_choice}</span>
                    </div>
                     <div className="p-4 bg-slate-50 rounded-lg">
                        <span className="block text-slate-500 text-xs uppercase font-bold">Neckline Architecture</span>
                        <span className="text-slate-900 font-medium">{recommendation.neckline}</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <span className="block text-slate-500 text-xs uppercase font-bold">Cost Estimate</span>
                        <span className="text-emerald-600 font-bold">{recommendation.estimated_cost}</span>
                    </div>
                </div>
                <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                     <span className="block text-amber-600 text-xs uppercase font-bold mb-1">Accessory Suggestion</span>
                     <p className="text-slate-800">{recommendation.accessories_tip}</p>
                </div>
            </div>

            {/* Makeup Logic */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-center">
                 <h3 className="text-lg font-bold text-rose-200 mb-4">Beauty Palette</h3>
                 <p className="text-slate-300 text-sm leading-relaxed">
                    Based on your <span className="text-rose-300 font-semibold">{profile.skin_tone}</span> profile:
                 </p>
                 <div className="mt-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <p className="font-serif italic text-lg text-rose-100">"{recommendation.makeup_palette}"</p>
                 </div>
            </div>
         </div>
      )}
    </div>
  );
}

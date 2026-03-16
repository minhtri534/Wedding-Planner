"use client";

import { useState, useEffect } from "react";

interface GuestManagerProps {
  initialGuests?: number;
  initialLocation?: string;
  initialVibe?: string;
}

export default function GuestManager({ initialGuests = 150, initialLocation = "Napa Valley", initialVibe = "Rustic" }: GuestManagerProps) {
  const [guestCount, setGuestCount] = useState(initialGuests);
  const [location, setLocation] = useState(initialLocation);
  const [vibe, setVibe] = useState(initialVibe);
  const [season, setSeason] = useState("Summer");
  const [generatedInvite, setGeneratedInvite] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setGuestCount(initialGuests);
    setLocation(initialLocation);
    // Simple mapping for vibe tags to enum
    if (initialVibe.toLowerCase().includes("modern")) setVibe("Modern");
    else if (initialVibe.toLowerCase().includes("beach")) setVibe("Rustic"); // Close enough
    else if (initialVibe.toLowerCase().includes("luxury")) setVibe("Luxury");
    else if (initialVibe.toLowerCase().includes("classic")) setVibe("Classic");
    else setVibe("Rustic"); // Default fallback
  }, [initialGuests, initialLocation, initialVibe]);

  const generateInvite = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/planning/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            vibe: vibe,
            guest_count: guestCount,
            location: location,
            season: season
        })
      });
      
      if (!res.ok) throw new Error("Failed to generate invite");

      const data = await res.json();
      setGeneratedInvite(data);
    } catch (e) {
      console.error(e);
      alert("Failed to generate invite. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 h-fit">
        <h3 className="text-xl font-bold mb-6 text-slate-800">Guest List & Invites</h3>
        
        <div className="space-y-4 mb-6">
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Guest List Size</label>
            <input type="number" value={guestCount} onChange={e => setGuestCount(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-slate-400" />
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-slate-400" />
             </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Season</label>
              <select value={season} onChange={(e) => setSeason(e.target.value)} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-slate-400">
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Autumn">Autumn</option>
                  <option value="Winter">Winter</option>
              </select>
             </div>
           </div>

            <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">Invite Vibe</label>
             <select value={vibe} onChange={(e) => setVibe(e.target.value)} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-slate-400">
                <option value="Modern">Modern Minimalist</option>
                <option value="Rustic">Rustic / Outdoors</option>
                <option value="Luxury">Black Tie Luxury</option>
                <option value="Classic">Classic Traditional</option>
             </select>
          </div>
        </div>

        <button onClick={generateInvite} disabled={loading} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
          {loading ? "Drafting Copy..." : "Generate Invite Preview"}
        </button>
      </div>

      {/* Preview Section */}
      <div className="space-y-6">
        {generatedInvite ? (
            <>
            {/* The Invite Card */}
            <div className={`p-10 rounded-xl shadow-2xl text-center flex flex-col justify-center items-center min-h-[400px] transition-all duration-500 ${
                vibe === 'Modern' ? 'bg-white border-4 border-black font-sans' : 
                vibe === 'Rustic' ? 'bg-[#f8f5f2] border-2 border-amber-200 font-serif' : 
                vibe === 'Luxury' ? 'bg-slate-950 text-white border border-gold-400 font-serif italic' : 
                'bg-white border-double border-4 border-slate-300'
            }`}>
                <p className="text-xs uppercase tracking-[0.3em] opacity-60 mb-8">Save The Date</p>
                <h2 className={`text-3xl md:text-5xl mb-6 ${vibe === 'Luxury' ? 'text-amber-100' : 'text-slate-800'}`}>
                    Jane & John
                </h2>
                <div className={`w-16 h-px mb-8 ${vibe === 'Luxury' ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                <p className={`text-lg leading-relaxed max-w-sm ${vibe === 'Luxury' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {generatedInvite.invite_text}
                </p>
                <button className={`mt-12 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                     vibe === 'Luxury' ? 'bg-white text-black hover:bg-amber-50' : 'bg-black text-white hover:bg-slate-800'
                }`}>
                    RSVP
                </button>
            </div>

            {/* Smart Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <span className="block text-emerald-600 text-xs font-bold uppercase mb-1">Predicted Attendance</span>
                    <span className="text-2xl font-bold text-slate-800">{generatedInvite.estimated_acceptance_rate}%</span>
                    <p className="text-xs text-slate-500 mt-1">Based on location & season</p>
                </div>
                 <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <span className="block text-blue-600 text-xs font-bold uppercase mb-1">Send Deadline</span>
                    <span className="text-2xl font-bold text-slate-800">{generatedInvite.rsvp_deadline_suggestion}</span>
                </div>
            </div>
            </>
        ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-8 text-slate-400 text-center">
                Select your parameters to see AI-generated invitation visualization.
            </div>
        )}
      </div>
    </div>
  );
}

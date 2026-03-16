import React from 'react';
import { ArrowRight, Wallet, Sparkles, Users, Calendar, LayoutDashboard } from "lucide-react";

interface LandingPageProps {
  onNavigate: (feature: 'budget' | 'bridal' | 'guests') => void;
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onStart }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
            <LayoutDashboard className="w-6 h-6 text-indigo-600" />
            <span>Wedding<span className="text-indigo-600">Architect</span></span>
          </div>
          <div className="flex gap-4">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900">Log In</button>
            <button 
              onClick={onStart} 
              className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Wedding Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-tight">
            Wedding planning is chaos. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              We are the structure.
            </span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Stop guessing. Start executing. The first intelligent operating system designed to manage your budget, style, and guests with data-driven precision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={onStart}
              className="group flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Start Planning Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 text-slate-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-100 transition-colors">
              How it works
            </button>
          </div>
        </div>
      </section>

      {/* The Compass - Feature Cards */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Compass</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Three pillars of a perfect event. Choose where to start your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Budget Card */}
            <div 
              onClick={() => onNavigate('budget')}
              className="group cursor-pointer p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wallet className="w-32 h-32 text-emerald-600 rotate-12" />
              </div>
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Financial Intelligence</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Master your milestones. Smart allocation algorithms that adapt to your total spend.
              </p>
              <div className="flex items-center text-emerald-600 font-medium group-hover:translate-x-2 transition-transform">
                Open Planner <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Bridal Card */}
            <div 
              onClick={() => onNavigate('bridal')}
              className="group cursor-pointer p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-900/5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="w-32 h-32 text-rose-600 -rotate-12" />
              </div>
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-rose-600 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bridal Atelier</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Expert styling system. Find the perfect look based on skin tone and body analysis.
              </p>
              <div className="flex items-center text-rose-600 font-medium group-hover:translate-x-2 transition-transform">
                Enter Studio <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Guest Card */}
            <div 
              onClick={() => onNavigate('guests')}
              className="group cursor-pointer p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users className="w-32 h-32 text-indigo-600 rotate-6" />
              </div>
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Guest Experience</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Smart drafting and prediction. Manage invites and RSVPs with data precision.
              </p>
              <div className="flex items-center text-indigo-600 font-medium group-hover:translate-x-2 transition-transform">
                Manage List <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-400 font-medium mb-8">TRUSTED BY PLANNERS AT</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {/* Placeholders for logos - using text for now */}
            <span className="text-xl font-bold text-slate-600">VOGUE</span>
            <span className="text-xl font-bold text-slate-600">BRIDES</span>
            <span className="text-xl font-bold text-slate-600">TheKnot</span>
            <span className="text-xl font-bold text-slate-600">MarthaStewart</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
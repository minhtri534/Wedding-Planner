"use client";

import { Check, X, Star, Crown, Zap } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
        >
            <X className="w-5 h-5 text-slate-500" />
        </button>

        <div className="p-8 md:p-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-slate-900 mb-4 font-serif">Choose Your Wedding Experience</h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    Unlock the full power of AI to plan your dream wedding flawlessly. 
                    From advanced styling to premium invites.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Free Plan */}
                <div className="border border-slate-200 rounded-2xl p-8 flex flex-col hover:border-slate-300 transition-colors">
                    <div className="mb-6">
                        <div className="text-slate-900 font-bold text-xl mb-2">Freemium</div>
                        <div className="text-slate-500 text-sm">Essential tools for DIY couples</div>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-slate-900">0đ</span>
                        <span className="text-slate-500"> / forever</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-slate-600">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <span>Basic Budget Planning</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-600">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <span>Timeline Management</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-600">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <span>Simple Standard Invites</span>
                        </li>
                         <li className="flex items-center gap-3 text-slate-400">
                            <X className="w-5 h-5 flex-shrink-0" />
                            <span>AI Bridal Assistant</span>
                        </li>
                         <li className="flex items-center gap-3 text-slate-400">
                            <X className="w-5 h-5 flex-shrink-0" />
                            <span>Premium Exports</span>
                        </li>
                    </ul>
                    <button className="w-full py-3 rounded-xl font-semibold border-2 border-slate-900 text-slate-900 hover:bg-slate-50 transition-colors">
                        Current Plan
                    </button>
                </div>

                {/* One-Time Package (Featured) */}
                <div className="relative border-2 border-rose-500 bg-slate-900 rounded-2xl p-8 flex flex-col shadow-2xl transform scale-105 z-10">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <Crown className="w-4 h-4" /> Most Popular
                    </div>
                    <div className="mb-6">
                        <div className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                           Wedding Package
                        </div>
                        <div className="text-slate-400 text-sm">Perfect for a single wedding project</div>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-white">899k</span>
                        <span className="text-slate-400"> / one-time</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                         <li className="flex items-center gap-3 text-white">
                            <div className="bg-rose-500/20 p-1 rounded-full">
                                <Check className="w-4 h-4 text-rose-400 flex-shrink-0" />
                            </div>
                            <span>Everything in Free</span>
                        </li>
                        <li className="flex items-center gap-3 text-white">
                            <div className="bg-rose-500/20 p-1 rounded-full">
                                <Zap className="w-4 h-4 text-rose-400 flex-shrink-0" />
                            </div>
                            <span><strong>AI Bridal Assistant</strong> (Unlimited)</span>
                        </li>
                        <li className="flex items-center gap-3 text-white">
                            <div className="bg-rose-500/20 p-1 rounded-full">
                                <Star className="w-4 h-4 text-rose-400 flex-shrink-0" />
                            </div>
                            <span>Premium Invite Exports (PDF/Print)</span>
                        </li>
                        <li className="flex items-center gap-3 text-white">
                            <div className="bg-rose-500/20 p-1 rounded-full">
                                <Check className="w-4 h-4 text-rose-400 flex-shrink-0" />
                            </div>
                            <span>Detailed Vendor Reports</span>
                        </li>
                    </ul>
                    <button className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:from-rose-600 hover:to-orange-600 transition-all shadow-lg shadow-rose-500/25">
                        Get Lifetime Access
                    </button>
                </div>

                {/* Subscription */}
                <div className="border border-slate-200 rounded-2xl p-8 flex flex-col hover:border-indigo-300 transition-colors bg-slate-50/50">
                    <div className="mb-6">
                        <div className="text-slate-900 font-bold text-xl mb-2">Pro Subscription</div>
                        <div className="text-slate-500 text-sm">For Planners & Long-term use</div>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-slate-900">199k</span>
                        <span className="text-slate-500"> / month</span>
                        <div className="text-xs text-indigo-600 mt-1 font-semibold">
                            or 1.499k / year (Save 37%)
                        </div>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-slate-600">
                            <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                            <span>All Premium Features</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-600">
                            <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                            <span>Manage Multiple Projects</span>
                        </li>
                         <li className="flex items-center gap-3 text-slate-600">
                            <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                            <span>Priority Support</span>
                        </li>
                    </ul>
                    <button className="w-full py-3 rounded-xl font-semibold bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors">
                        Subscribe Monthly
                    </button>
                    <button className="w-full mt-3 py-2 text-sm text-slate-500 hover:text-indigo-600 underline">
                        Switch to Yearly Billing
                    </button>
                </div>
            </div>

            <div className="mt-12 text-center">
                 <p className="text-sm text-slate-400">
                    Secure payment via Credit Card, Momo, or Bank Transfer. 
                    <br/>Money-back guarantee within 7 days.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
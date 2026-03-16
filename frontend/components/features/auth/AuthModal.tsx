"use client";

import { useState } from "react";

interface AuthModalProps {
  onLoginSuccess: (token: string, email: string) => void;
  onClose: () => void;
}

export default function AuthModal({ onLoginSuccess, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/auth/token" : "/auth/register";
      let body: any;
      let headers: any = {};

      if (isLogin) {
        // OAuth2PasswordRequestForm expects form-data
        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);
        body = formData;
        headers = { "Content-Type": "application/x-www-form-urlencoded" };
      } else {
        body = JSON.stringify({ email, password });
        headers = { "Content-Type": "application/json" };
      }

      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: "POST",
        headers: headers,
        body: body,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Authentication failed");
      }

      // Success
      if (data.access_token) {
        onLoginSuccess(data.access_token, email);
        onClose();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-slate-500 mb-6">
          {isLogin ? "Log in to access your wedding plans." : "Sign up to start planning your dream wedding."}
        </p>

        {error && (
          <div className="bg-rose-50 text-rose-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-all disabled:opacity-70"
          >
            {loading ? "Please wait..." : (isLogin ? "Log In" : "Sign Up")}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-900 font-bold hover:underline"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}

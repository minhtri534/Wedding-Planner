"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Bot, User } from "lucide-react";

interface ChatMessage {
    id: string;
    sender: "user" | "ai";
    text: string;
}

interface AIChatButtonProps {
    context?: {
        budget?: number;
        guests?: number;
        vibe?: string;
        location?: string;
        season?: string;
    };
}

export default function AIChatButton({ context }: AIChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "ai", text: "Hello! I'm your wedding AI. Ask me about your budget, style, or timeline!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
        const res = await fetch("http://localhost:8000/chat/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: userMsg.text,
                context: context || {}
            })
        });

        if (!res.ok) throw new Error("Failed to get response");

        const data = await res.json();
        const aiMsg: ChatMessage = { 
            id: (Date.now() + 1).toString(), 
            sender: "ai", 
            text: typeof data.response === 'string' ? data.response : data.response.response // Handle potential nesting
        };
        setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
        console.error(e);
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: "ai", text: "Sorry, I'm having trouble connecting to the brain base."}]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 border border-slate-700 group flex items-center gap-2"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        {!isOpen && <span className="font-semibold pr-2 hidden group-hover:block transition-all duration-300">Ask AI</span>}
        
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6 group-hover:text-emerald-400 transition-colors" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[90vw] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Wedding AI Assistant</h3>
                <div className="flex items-center gap-1.5 opacity-80">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    <span className="text-xs">Context Aware</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === "ai" ? "bg-slate-200" : "bg-indigo-100"}`}>
                        {msg.sender === "ai" ? <Bot className="w-4 h-4 text-slate-600" /> : <User className="w-4 h-4 text-indigo-600" />}
                   </div>
                   <div className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${
                       msg.sender === "ai" 
                         ? "bg-white text-slate-600 border border-slate-100 rounded-tl-none" 
                         : "bg-indigo-600 text-white rounded-tr-none"
                   }`}>
                      {msg.text}
                   </div>
                </div>
            ))}
            {isTyping && (
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 flex gap-1 items-center">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="relative flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask regarding budget, invites..." 
                className="w-full pl-4 pr-12 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

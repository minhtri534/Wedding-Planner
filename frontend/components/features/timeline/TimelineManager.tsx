"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Clock, AlertCircle, Calendar } from "lucide-react";

interface TimelineTask {
    month_due: number;
    task_name: string;
    category: string;
    is_critical: boolean;
}

interface TimelineResponse {
    tasks: TimelineTask[];
    planning_velocity: string;
}

interface TimelineManagerProps {
    initialMonths?: number;
}

export default function TimelineManager({ initialMonths = 12 }: TimelineManagerProps) {
    const [timeline, setTimeline] = useState<TimelineResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);

    useEffect(() => {
        fetchTimeline();
    }, [initialMonths]);

    const fetchTimeline = async () => {
        setLoading(true);
        try {
             // We reuse the same endpoint but might separate it later
             const res = await fetch("http://localhost:8000/planning/timeline", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    total_budget: 0, // Dummy
                    guest_count: 0, // Dummy
                    location: "Unknown",
                    season: "Summer",
                    months_until_wedding: initialMonths,
                    vibe: "Modern",
                    priorities: {}
                })
            });
            const data = await res.json();
            setTimeline(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const toggleTask = (taskName: string) => {
        if (completedTasks.includes(taskName)) {
            setCompletedTasks(prev => prev.filter(t => t !== taskName));
        } else {
            setCompletedTasks(prev => [...prev, taskName]);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Generating your personalized roadmap...</div>;
    if (!timeline) return null;

    // Group tasks by Timeframe
    const tasksByTime = timeline.tasks.reduce((acc, task) => {
        const timeKey = task.month_due === 0 ? "Wedding Day" : 
                        task.month_due === 1 ? "1 Month Before" :
                        `${task.month_due} Months Before`;
        if (!acc[timeKey]) acc[timeKey] = [];
        acc[timeKey].push(task);
        return acc;
    }, {} as Record<string, TimelineTask[]>);

    // Sort time keys descending (12 months -> 0 months)
    const sortedKeys = Object.keys(tasksByTime).sort((a, b) => {
        if (a === "Wedding Day") return 1;
        if (b === "Wedding Day") return -1;
        const numA = parseInt(a);
        const numB = parseInt(b);
        return numB - numA;
    });

    const progress = Math.round((completedTasks.length / timeline.tasks.length) * 100) || 0;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header / Progress */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-50">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-indigo-600" />
                            Master Checklist
                        </h2>
                        <p className="text-slate-500">
                            Velocity: <span className="font-semibold text-indigo-600">{timeline.planning_velocity}</span>
                        </p>
                    </div>
                     <div className="text-right">
                        <div className="text-3xl font-bold text-slate-900">{progress}%</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wide">Ready</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div 
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-6">
                {sortedKeys.map(timeKey => (
                    <div key={timeKey} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="font-bold text-slate-700">{timeKey}</h3>
                            <span className="text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">
                                {tasksByTime[timeKey].length} Tasks
                            </span>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {tasksByTime[timeKey].map((task) => {
                                const isDone = completedTasks.includes(task.task_name);
                                return (
                                    <div 
                                        key={task.task_name}
                                        onClick={() => toggleTask(task.task_name)}
                                        className={`px-6 py-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors ${isDone ? 'opacity-50' : ''}`}
                                    >
                                        <div className={`flex-shrink-0 transition-colors ${isDone ? 'text-emerald-500' : 'text-slate-300'}`}>
                                            {isDone ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className={`font-medium text-slate-900 ${isDone ? 'line-through text-slate-400' : ''}`}>
                                                {task.task_name}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                                                    {task.category}
                                                </span>
                                                {task.is_critical && (
                                                    <span className="text-xs text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" /> Critical
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
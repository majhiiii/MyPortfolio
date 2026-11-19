"use client";

import React, { useState } from "react";
import { Calendar, Clock, User, CheckCircle2, AlertCircle, ArrowRight, Copy, Check } from "lucide-react";

interface GanttTask {
  id: string;
  name: string;
  resource: string;
  startDay: number; // 1 to 14
  duration: number; // days
  progress: number; // 0 to 100
  status: "Completed" | "In Progress" | "Scheduled";
  color: string;
  salesforceObj: string;
}

const INITIAL_TASKS: GanttTask[] = [
  {
    id: "task-1",
    name: "B2B Cart cc_hk_Order Pricing Hook",
    resource: "Rakesh Majhi (Lead Dev)",
    startDay: 1,
    duration: 4,
    progress: 100,
    status: "Completed",
    color: "#0176D3",
    salesforceObj: "cc_hk_Order · Apex Class",
  },
  {
    id: "task-2",
    name: "Agentforce Customer Service Agent",
    resource: "Rakesh Majhi (Lead Dev)",
    startDay: 4,
    duration: 5,
    progress: 85,
    status: "In Progress",
    color: "#7C3AED",
    salesforceObj: "Agentforce Topic · Experience Cloud",
  },
  {
    id: "task-3",
    name: "In-House Outlook Add-in PKCE Release",
    resource: "Frontend Specialist",
    startDay: 3,
    duration: 6,
    progress: 90,
    status: "In Progress",
    color: "#00A38C",
    salesforceObj: "ConnectedApp · Office.js",
  },
  {
    id: "task-4",
    name: "Stripe & CyberSource Webhook Gateway",
    resource: "Integration Engineer",
    startDay: 7,
    duration: 5,
    progress: 40,
    status: "In Progress",
    color: "#F59E0B",
    salesforceObj: "FastAPI Middleware · REST",
  },
  {
    id: "task-5",
    name: "Health Cloud Patient Referral Flow",
    resource: "Salesforce Admin",
    startDay: 9,
    duration: 4,
    progress: 0,
    status: "Scheduled",
    color: "#EF4444",
    salesforceObj: "HealthCloudGA__EhrPatient__c",
  },
];

export function GanttChartDemo() {
  const [tasks, setTasks] = useState<GanttTask[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<GanttTask>(INITIAL_TASKS[1]);
  const [copied, setCopied] = useState(false);

  const days = Array.from({ length: 14 }, (_, i) => i + 1);

  const handleTaskClick = (task: GanttTask) => {
    setSelectedTask(task);
  };

  const handleReschedule = (taskId: string, deltaDays: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newStart = Math.min(Math.max(1, t.startDay + deltaDays), 14 - t.duration + 1);
          const updated = { ...t, startDay: newStart };
          if (selectedTask.id === taskId) setSelectedTask(updated);
          return updated;
        }
        return t;
      })
    );
  };

  const handleCopyDml = () => {
    const payload = {
      event: "Apex_Gantt_Schedule_Update",
      timestamp: new Date().toISOString(),
      record: {
        recordId: "08p" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        taskName: selectedTask.name,
        targetSObject: selectedTask.salesforceObj,
        scheduledStart: `2026-11-${String(selectedTask.startDay + 10).padStart(2, "0")}T09:00:00Z`,
        estimatedDurationHours: selectedTask.duration * 8,
        completionPercent: selectedTask.progress,
        status: selectedTask.status,
      },
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 font-mono text-xs text-white/90">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-white/80">
          <Calendar className="w-4 h-4 text-[#E8A317]" />
          <span className="font-semibold text-sm">Gantt Dispatch &amp; Schedule Console</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-white/60">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Completed</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>In Progress</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Scheduled</span>
          </span>
        </div>
      </div>

      {/* Main Gantt Timeline Grid */}
      <div className="rounded-[14px] bg-[#0A0D1A] border border-white/15 overflow-x-auto shadow-inner">
        <div className="min-w-[700px] p-3.5 space-y-3">
          
          {/* Day Header Row */}
          <div className="grid grid-cols-12 gap-1 border-b border-white/10 pb-2 text-[10px] text-white/50">
            <div className="col-span-4 pl-2 font-semibold uppercase tracking-wider">
              Project Task / Salesforce Work Order
            </div>
            <div className="col-span-8 grid grid-cols-14 gap-1 text-center">
              {days.map((d) => (
                <span key={d} className="py-0.5 rounded-xs bg-white/5 text-[9px]">
                  D{d}
                </span>
              ))}
            </div>
          </div>

          {/* Task Timeline Rows */}
          <div className="space-y-2">
            {tasks.map((task) => {
              const isSelected = selectedTask.id === task.id;
              const leftPercent = ((task.startDay - 1) / 14) * 100;
              const widthPercent = (task.duration / 14) * 100;

              return (
                <div
                  key={task.id}
                  onClick={() => handleTaskClick(task)}
                  className={`grid grid-cols-12 gap-1 items-center p-2 rounded-md transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white/10 border border-white/30 shadow-xs"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {/* Task Meta Left */}
                  <div className="col-span-4 space-y-0.5 pr-2">
                    <div className="font-semibold text-xs text-white truncate">
                      {task.name}
                    </div>
                    <div className="text-[10px] text-white/50 truncate flex items-center gap-1.5">
                      <User className="w-3 h-3 text-[#E8A317]" />
                      <span>{task.resource}</span>
                    </div>
                  </div>

                  {/* 14-Day Timeline Bar */}
                  <div className="col-span-8 relative h-7 bg-white/5 rounded-md flex items-center px-1">
                    {/* Gantt Bar */}
                    <div
                      className="absolute h-5 rounded-md flex items-center px-2 text-[10px] font-bold text-white shadow-xs transition-all select-none overflow-hidden"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                        backgroundColor: task.color,
                      }}
                    >
                      <div
                        className="absolute inset-0 bg-white/20"
                        style={{ width: `${task.progress}%` }}
                      />
                      <span className="relative z-10 truncate text-[9px] drop-shadow-xs">
                        {task.progress}% · {task.duration}d
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Selected Task Inspector & Live Apex DML Console */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
        
        {/* Task Inspector Card */}
        <div className="md:col-span-6 p-3.5 rounded-[14px] bg-[#14182E] border border-white/10 space-y-2.5">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-semibold text-xs text-white">Task Inspector</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/20" style={{ color: selectedTask.color }}>
              {selectedTask.status}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-white/50">Target SObject:</span>
              <span className="font-semibold text-white">{selectedTask.salesforceObj}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Scheduled Start:</span>
              <span className="text-white">Day {selectedTask.startDay} of 14</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Duration:</span>
              <span className="text-white">{selectedTask.duration} days ({selectedTask.duration * 8}h)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Completion:</span>
              <span className="font-bold text-[#E8A317]">{selectedTask.progress}%</span>
            </div>
          </div>

          {/* Quick Reschedule Actions */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
            <span className="text-[10px] text-white/50">Reschedule:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleReschedule(selectedTask.id, -1)}
                className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] text-white cursor-pointer"
              >
                &larr; -1 Day
              </button>
              <button
                onClick={() => handleReschedule(selectedTask.id, 1)}
                className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] text-white cursor-pointer"
              >
                +1 Day &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Live Apex DML Payload Output */}
        <div className="md:col-span-6 p-3.5 rounded-[14px] bg-[#0A0D1A] border border-white/10 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[10px] text-white/50">
            <span>LIVE APEX DML DISPATCH PAYLOAD</span>
            <button
              onClick={handleCopyDml}
              className="flex items-center gap-1 text-[#E8A317] hover:underline cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy Payload"}</span>
            </button>
          </div>

          <pre className="text-[10px] text-emerald-400/90 font-mono leading-relaxed overflow-x-auto p-2 rounded bg-black/40">
{`// Apex Trigger: WorkOrderSchedule_Trigger
ServiceAppointment apt = new ServiceAppointment(
  Id = '${selectedTask.id}',
  SchedStartTime = Datetime.now().addDays(${selectedTask.startDay}),
  Duration = ${selectedTask.duration * 8},
  Status = '${selectedTask.status}'
);
update apt; // 200 OK`}
          </pre>

          <div className="text-[10px] text-white/40 pt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Bi-directional LWC &harr; Apex Controller Sync</span>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { Users, Award, IndianRupee, User, Bell, Send } from 'lucide-react';
import { Student, Notice } from '../types';

interface PrincipalDeckProps {
  students: Student[];
  notices: Notice[];
  onAddNotice: (notice: Notice) => void;
  onGenerateReceipt: (student: Student) => void;
  onSimulateWhatsApp: (student: Student) => void;
  onMarkPaid: (studentId: string) => void;
}

export const PrincipalDeck: React.FC<PrincipalDeckProps> = ({
  students,
  notices,
  onAddNotice,
  onGenerateReceipt,
  onSimulateWhatsApp,
  onMarkPaid,
}) => {
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedFeeFilter, setSelectedFeeFilter] = useState('All');
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('Exam Circular');
  const [noticeContent, setNoticeContent] = useState('');

  const filtered = useMemo(() => {
    return students.filter(s => {
      if (selectedClass !== 'All' && s.class !== selectedClass) return false;
      if (selectedFeeFilter !== 'All' && s.feeStatus !== selectedFeeFilter) return false;
      return true;
    });
  }, [students, selectedClass, selectedFeeFilter]);

  const handleNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim()) return;
    onAddNotice({
      id: Date.now(),
      title: noticeTitle.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      category: noticeCategory,
      priority: 'High',
      content: noticeContent.trim() || 'Official school circular published.'
    });
    setNoticeTitle('');
    setNoticeContent('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>👨‍💼</span>
            <span>Principal Operations Deck</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Institutional metrics, fee pipelines, and universal broadcast telemetry.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Session Live: 2026-27</span>
        </div>
      </div>

      {/* 4 Compact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl backdrop-blur flex items-center space-x-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Total Students</span>
            <div className="text-2xl font-black text-white mt-0.5">1,420</div>
            <span className="text-[10px] text-emerald-400 font-mono font-medium">100% CBSE Cap</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl backdrop-blur flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Attendance Avg</span>
            <div className="text-2xl font-black text-white mt-0.5">94.2%</div>
            <span className="text-[10px] text-emerald-400 font-mono font-medium">↑ 1.8% this week</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl backdrop-blur flex items-center space-x-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Fee Pipeline</span>
            <div className="text-xl font-black text-white mt-0.5">₹18.4L <span className="text-xs text-slate-500 font-normal">/ 20.5L</span></div>
            <span className="text-[10px] text-amber-400 font-mono font-medium">₹2.1L Pending</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl backdrop-blur flex items-center space-x-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl">
            <User className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Active Faculty</span>
            <div className="text-2xl font-black text-white mt-0.5">58</div>
            <span className="text-[10px] text-slate-400 font-mono font-medium">Pupil Ratio 1:24</span>
          </div>
        </div>
      </div>

      {/* Fee Recovery & Collections Table */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-indigo-400" />
              <span>Fee Recovery & Receipts Pipeline</span>
            </h3>
            <p className="text-xs text-slate-400">Manage dues, trigger automated parent WhatsApp reminders, and issue official receipts.</p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-xl focus:outline-none"
            >
              <option value="All">All Grades</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>

            <select
              value={selectedFeeFilter}
              onChange={(e) => setSelectedFeeFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-xl focus:outline-none"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Due">Due</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Roster */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-semibold border-y border-slate-800">
              <tr>
                <th className="px-4 py-3">Student & Cohort</th>
                <th className="px-4 py-3">Parent Contact</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Balance</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action Gateways</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map(st => {
                const bal = st.feeAmount - st.paidAmount;
                return (
                  <tr key={st.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-4 py-3">
                      <div className="font-bold text-white text-sm">{st.name}</div>
                      <span className="text-[11px] text-slate-400 font-mono">Class {st.class}-{st.sec} • Roll #{st.rollNo}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-mono">
                      {st.phone}
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-slate-200">
                      ₹{st.feeAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold">
                      {bal > 0 ? (
                        <span className="text-rose-400">₹{bal.toLocaleString('en-IN')}</span>
                      ) : (
                        <span className="text-emerald-400">Nil</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        st.feeStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                        st.feeStatus === 'Due' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                        'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}>
                        {st.feeStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                      {st.feeStatus !== 'Paid' && (
                        <button
                          onClick={() => onMarkPaid(st.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-semibold text-xs transition"
                        >
                          Mark Paid
                        </button>
                      )}
                      <button
                        onClick={() => onGenerateReceipt(st)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition"
                      >
                        Receipt Slip
                      </button>
                      {st.feeStatus !== 'Paid' && (
                        <button
                          onClick={() => onSimulateWhatsApp(st)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-sm"
                        >
                          WhatsApp 📲
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notice Board Broadcaster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Bell className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Broadcast Universal Notice</h3>
              <p className="text-xs text-slate-400">Instantly appears on Parent & Student portal</p>
            </div>
          </div>

          <form onSubmit={handleNoticeSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Headline / Title *</label>
              <input
                type="text"
                required
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                placeholder="e.g. CBSE Term-1 Pre-Board Advisory & Practical Schedule"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={noticeCategory}
                  onChange={(e) => setNoticeCategory(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  <option value="Exam Circular">Exam Circular</option>
                  <option value="Academic">Academic</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Holiday">Holiday Notification</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Priority</label>
                <div className="px-3 py-2 bg-slate-800/80 rounded-xl border border-slate-700 text-rose-400 font-semibold">
                  High Priority Broadcast
                </div>
              </div>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Instructions / Description</label>
              <textarea
                rows={2}
                value={noticeContent}
                onChange={(e) => setNoticeContent(e.target.value)}
                placeholder="Enter circular details, exam reporting time, and necessary items..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition shadow-lg shadow-indigo-600/30 flex items-center space-x-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Publish Broadcast</span>
            </button>
          </form>
        </div>

        {/* Live Notices Feed */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Live Circulars ({notices.length})</span>
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {notices.map(n => (
              <div key={n.id} className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60 space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">{n.category}</span>
                  <span className="text-slate-400 font-mono">{n.date}</span>
                </div>
                <h4 className="text-xs font-bold text-white">{n.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

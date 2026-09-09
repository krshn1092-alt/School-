import React, { useState, useMemo } from 'react';
import { Sparkles, Search, X, Award, Calendar, IndianRupee, FileText, BookOpen, Download, Bell } from 'lucide-react';
import { Student, Notice, CbseResource } from '../types';

interface ParentStudentHubProps {
  students: Student[];
  notices: Notice[];
  resources: CbseResource[];
  onOpenReportCard: (student: Student) => void;
  onOpenFeeReceipt: (student: Student) => void;
  onDownloadResource: (resource: CbseResource) => void;
}

export const ParentStudentHub: React.FC<ParentStudentHubProps> = ({
  students,
  notices,
  resources,
  onOpenReportCard,
  onOpenFeeReceipt,
  onDownloadResource,
}) => {
  const [searchClass, setSearchClass] = useState('10');
  const [searchSec, setSearchSec] = useState('A');
  const [searchRoll, setSearchRoll] = useState('1');

  const [verifiedStudent, setVerifiedStudent] = useState<Student | null>(() => {
    return students.find(s => s.class === '10' && s.sec === 'A' && s.rollNo === 1) || null;
  });

  const [searchError, setSearchError] = useState<string | null>(null);

  const [resourceClass, setResourceClass] = useState('10');
  const [resourceSubject, setResourceSubject] = useState('All');

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanRoll = Number(searchRoll.trim());
    const match = students.find(s =>
      s.class === searchClass &&
      s.sec.toUpperCase() === searchSec.toUpperCase() &&
      (s.rollNo === cleanRoll || s.id.toLowerCase() === searchRoll.trim().toLowerCase())
    );

    if (match) {
      setVerifiedStudent(match);
      setResourceClass(match.class);
      setSearchError(null);
    } else {
      setVerifiedStudent(null);
      setSearchError(`No student record found for Class ${searchClass}-${searchSec} with Roll / ID "${searchRoll}". Please verify Class, Section and Roll Number.`);
    }
  };

  const quickFill = (cls: string, sec: string, roll: number) => {
    setSearchClass(cls);
    setSearchSec(sec);
    setSearchRoll(String(roll));
    const match = students.find(s => s.class === cls && s.sec === sec && s.rollNo === roll);
    if (match) {
      setVerifiedStudent(match);
      setResourceClass(match.class);
      setSearchError(null);
    }
  };

  const filteredResources = useMemo(() => {
    return resources.filter(r => {
      if (r.class !== resourceClass) return false;
      if (resourceSubject !== 'All' && r.subject !== resourceSubject) return false;
      return true;
    });
  }, [resources, resourceClass, resourceSubject]);

  return (
    <div className="space-y-8">
      {/* Search / Verification Card */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0f172a] to-indigo-950/40 rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-2xl space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CBSE Parent & Student Verification Gateway</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            Dynamic Student Progress Lookup (छात्र विवरण पोर्टल)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Authenticate using your ward's Class, Section, and Roll Number to unlock customized report cards, attendance logs, and fee slips.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              1. Select Class
            </label>
            <select
              value={searchClass}
              onChange={(e) => setSearchClass(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="9" className="bg-slate-900 text-white">Class 9th (IX)</option>
              <option value="10" className="bg-slate-900 text-white">Class 10th (X)</option>
              <option value="11" className="bg-slate-900 text-white">Class 11th (XI)</option>
              <option value="12" className="bg-slate-900 text-white">Class 12th (XII)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              2. Select Section
            </label>
            <select
              value={searchSec}
              onChange={(e) => setSearchSec(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="A" className="bg-slate-900 text-white">Section A</option>
              <option value="B" className="bg-slate-900 text-white">Section B</option>
              <option value="C" className="bg-slate-900 text-white">Section C</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              3. Roll / Admission No
            </label>
            <input
              type="text"
              required
              value={searchRoll}
              onChange={(e) => setSearchRoll(e.target.value)}
              placeholder="e.g. 1, 2, 3 or Adm No"
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>View Record</span>
            </button>
          </div>
        </form>

        {/* Quick Try Sample Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 text-[11px] font-mono">⚡ Quick Test:</span>
          <button
            type="button"
            onClick={() => quickFill('10', 'A', 1)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] transition"
          >
            Aarav (10-A, #1)
          </button>
          <button
            type="button"
            onClick={() => quickFill('10', 'A', 2)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] transition"
          >
            Ananya (10-A, #2)
          </button>
          <button
            type="button"
            onClick={() => quickFill('10', 'A', 3)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] transition"
          >
            Devansh (10-A, #3 - Due)
          </button>
          <button
            type="button"
            onClick={() => quickFill('9', 'B', 5)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] transition"
          >
            Diya (9-B, #5)
          </button>
          <button
            type="button"
            onClick={() => quickFill('12', 'A', 1)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] transition"
          >
            Tanvi (12-A, #1)
          </button>
        </div>

        {/* Fallback Not Found Box */}
        {searchError && (
          <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center space-x-3">
            <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl shrink-0">
              <X className="w-5 h-5" />
            </div>
            <div>
              <strong className="block font-bold">Student Record Not Found</strong>
              <span>{searchError}</span>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Child Dashboard */}
      {verifiedStudent && (
        <div className="space-y-8">
          {/* 1. Verified Child Profile Header */}
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-xl shadow-indigo-500/20 border-2 border-indigo-400/30 shrink-0">
                  {verifiedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {verifiedStudent.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Verified Scholar
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-indigo-300 mt-0.5">
                    Class {verifiedStudent.class}-{verifiedStudent.sec} • Roll No: {verifiedStudent.rollNo} • Adm: {verifiedStudent.id}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Father: <strong className="text-slate-200">{verifiedStudent.fatherName}</strong> • House: <strong className="text-slate-200">{verifiedStudent.house} House</strong>
                  </p>
                </div>
              </div>

              {/* Quick Telemetry Pills & Report Card Action */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700/60 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Attendance</span>
                  <strong className="text-emerald-400 text-sm sm:text-base font-mono">{verifiedStudent.attendanceRate}%</strong>
                </div>

                <div className="bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700/60 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Fee Clearance</span>
                  <strong className={`text-sm sm:text-base font-mono ${
                    verifiedStudent.feeStatus === 'Paid' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {verifiedStudent.feeStatus}
                  </strong>
                </div>

                <button
                  onClick={() => onOpenReportCard(verifiedStudent)}
                  className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-indigo-600/30 flex items-center space-x-2"
                >
                  <Award className="w-4 h-4" />
                  <span>📄 View Official CBSE Report Card</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Grid: Attendance Calendar & Fee Portal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Monthly Attendance Breakdown */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Monthly Attendance Breakdown (Term 1)</h4>
                    <p className="text-xs text-slate-400">Total sessions held: 116 | Present: {Math.round((verifiedStudent.attendanceRate / 100) * 116)} Days</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {verifiedStudent.attendanceRate}% Cumulative
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 block mb-2">Past 24 Academic Days Ledger (Green = Present, Red = Absent):</span>
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 font-mono text-[10px] text-center">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const isAbsent = (i === 4 || (verifiedStudent.attendanceRate < 90 && i === 12));
                    return (
                      <div
                        key={i}
                        title={`Day ${i + 1}: ${isAbsent ? 'Absent' : 'Present'}`}
                        className={`py-1.5 rounded-lg border font-semibold ${
                          isAbsent
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        D{i + 1}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Fee Clearance & Slip Trigger */}
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <IndianRupee className="w-5 h-5 text-amber-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Term 1 Fee Ledger</h4>
                    <p className="text-xs text-slate-400">Delhi Public Academy Bursar Gateway</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Total Composite Fee:</span>
                    <span className="text-white font-bold">₹{verifiedStudent.feeAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Verified Paid:</span>
                    <span className="text-emerald-400 font-bold">₹{verifiedStudent.paidAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-1.5">
                    <span>Balance Outstanding:</span>
                    <span className={verifiedStudent.feeAmount - verifiedStudent.paidAmount > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      ₹{(verifiedStudent.feeAmount - verifiedStudent.paidAmount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenFeeReceipt(verifiedStudent)}
                className="w-full mt-4 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow"
              >
                <FileText className="w-4 h-4" />
                <span>Download Official Fee Receipt Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CBSE Digital Learning Vault (Class-filtered) */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>CBSE Digital Learning Vault (Class {resourceClass})</span>
            </h3>
            <p className="text-xs text-slate-400">Official NCERT theory digests, solved 10-year previous questions, and 2026 blueprints.</p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <div className="flex rounded-xl bg-slate-800 p-1 border border-slate-700">
              {['9', '10', '11', '12'].map(cls => (
                <button
                  key={cls}
                  onClick={() => setResourceClass(cls)}
                  className={`px-3 py-1 rounded-lg font-bold transition ${
                    resourceClass === cls ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>

            <select
              value={resourceSubject}
              onChange={(e) => setResourceSubject(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-xl focus:outline-none"
            >
              <option value="All" className="bg-slate-900 text-white">All Subjects</option>
              <option value="Science" className="bg-slate-900 text-white">Science / Physics</option>
              <option value="Mathematics" className="bg-slate-900 text-white">Mathematics</option>
              <option value="Social Science" className="bg-slate-900 text-white">Social Science</option>
              <option value="English" className="bg-slate-900 text-white">English</option>
            </select>
          </div>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map(res => (
            <div key={res.id} className="bg-slate-800/50 rounded-2xl border border-slate-700/60 p-5 flex flex-col justify-between hover:border-indigo-500/50 transition">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                    {res.subject} • Class {res.class}
                  </span>
                  <span className="text-slate-400">{res.size}</span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{res.title}</h4>
                <p className="text-xs text-indigo-400 font-semibold">{res.type}</p>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{res.description}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">{res.code}</span>
                <button
                  onClick={() => onDownloadResource(res)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Active School Notice Board (Parent Feed) */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Central Circulars & Notice Feed</h3>
              <p className="text-xs text-slate-400">Official broadcasts from the Principal's Desk</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">● LIVE BROADCAST</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {notices.map(n => (
            <div key={n.id} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/60 space-y-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">{n.category}</span>
                <span className="text-slate-400 font-mono">{n.date}</span>
              </div>
              <h4 className="text-xs font-bold text-white">{n.title}</h4>
              <p className="text-[11px] text-slate-400">{n.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

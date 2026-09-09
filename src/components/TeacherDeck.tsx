import React, { useState, useMemo } from 'react';
import { Check, Award, Shield } from 'lucide-react';
import { Student } from '../types';
import { getCbseGrade } from '../data';

interface TeacherDeckProps {
  students: Student[];
  onAttendanceToggle: (studentId: string, status: 'P' | 'A' | 'L') => void;
  onMarksUpdate: (studentId: string, field: 'pt' | 'practical' | 'notebook', value: number) => void;
  onSubmitAttendance: () => void;
}

export const TeacherDeck: React.FC<TeacherDeckProps> = ({
  students,
  onAttendanceToggle,
  onMarksUpdate,
  onSubmitAttendance,
}) => {
  const [selectedCohort, setSelectedCohort] = useState('10-A');
  const [activeMode, setActiveMode] = useState<'attendance' | 'marks'>('attendance');

  const cohortList = useMemo(() => {
    return students.filter(s => `${s.class}-${s.sec}` === selectedCohort);
  }, [students, selectedCohort]);

  return (
    <div className="space-y-8">
      {/* Header & Cohort Selection */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>👩‍🏫</span>
            <span>Teacher Workspace & Academic Engine</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Daily one-tap attendance lock and Continuous and Comprehensive Evaluation (CCE) gradebook.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <span className="text-slate-400 font-medium block text-[10px]">Active Cohort:</span>
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="bg-transparent font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="10-A" className="bg-slate-900 text-white">Class 10-A (Secondary)</option>
              <option value="10-B" className="bg-slate-900 text-white">Class 10-B (Secondary)</option>
              <option value="9-A" className="bg-slate-900 text-white">Class 9-A (Foundation)</option>
              <option value="9-B" className="bg-slate-900 text-white">Class 9-B (Foundation)</option>
              <option value="11-A" className="bg-slate-900 text-white">Class 11-A (Senior Science)</option>
              <option value="12-A" className="bg-slate-900 text-white">Class 12-A (Senior Science)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveMode('attendance')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
            activeMode === 'attendance'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>One-Tap Attendance Grid</span>
        </button>

        <button
          onClick={() => setActiveMode('marks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
            activeMode === 'marks'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Internal Assessment Submitter</span>
        </button>
      </div>

      {/* Mode 1: Attendance Grid */}
      {activeMode === 'attendance' && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Daily Attendance Roster: Class {selectedCohort}</h3>
              <p className="text-xs text-slate-400">One-tap [P - Present], [A - Absent], [L - Late]. Absent students trigger SMS notifications.</p>
            </div>
            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="text-emerald-400">P: {cohortList.filter(s => s.attendance === 'P').length}</span>
              <span className="text-rose-400">A: {cohortList.filter(s => s.attendance === 'A').length}</span>
              <span className="text-amber-400">L: {cohortList.filter(s => s.attendance === 'L').length}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-semibold border-y border-slate-800">
                <tr>
                  <th className="px-4 py-3">Roll & Scholar</th>
                  <th className="px-4 py-3">Parent Contact</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right">Rapid Toggle [P / A / L]</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {cohortList.map(st => (
                  <tr key={st.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-4 py-3">
                      <div className="font-bold text-white text-sm">{st.name}</div>
                      <span className="text-[11px] text-slate-400 font-mono">Roll #{st.rollNo} • Adm: {st.id}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-300">
                      {st.phone}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {st.attendance === 'P' && <span className="px-2.5 py-1 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px]">✓ Present</span>}
                      {st.attendance === 'A' && <span className="px-2.5 py-1 rounded-full font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[11px]">✕ Absent (SMS)</span>}
                      {st.attendance === 'L' && <span className="px-2.5 py-1 rounded-full font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px]">◷ Late</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex rounded-xl bg-slate-800 p-1 border border-slate-700">
                        <button
                          onClick={() => onAttendanceToggle(st.id, 'P')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            st.attendance === 'P' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-emerald-400'
                          }`}
                        >
                          P
                        </button>
                        <button
                          onClick={() => onAttendanceToggle(st.id, 'A')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            st.attendance === 'A' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-rose-400'
                          }`}
                        >
                          A
                        </button>
                        <button
                          onClick={() => onAttendanceToggle(st.id, 'L')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            st.attendance === 'L' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-amber-400'
                          }`}
                        >
                          L
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-800">
            <button
              onClick={onSubmitAttendance}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-600/30 flex items-center space-x-1.5"
            >
              <Shield className="w-4 h-4" />
              <span>Submit & Lock Daily Attendance</span>
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: Marks & CCE Evaluator */}
      {activeMode === 'marks' && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white">CBSE Continuous and Comprehensive Evaluation: Class {selectedCohort}</h3>
            <p className="text-xs text-slate-400">Periodic Tests (40 Marks), Practical/Lab (30 Marks), Notebook Portfolio (10 Marks). Scale auto-computes CBSE 8-Point Rubric.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-semibold border-y border-slate-800">
                <tr>
                  <th className="px-4 py-3">Roll & Name</th>
                  <th className="px-4 py-3 text-center">PT (Max 40)</th>
                  <th className="px-4 py-3 text-center">Lab (Max 30)</th>
                  <th className="px-4 py-3 text-center">Notebook (Max 10)</th>
                  <th className="px-4 py-3 text-center">Total (80)</th>
                  <th className="px-4 py-3 text-center">Norm % (100)</th>
                  <th className="px-4 py-3 text-center">CBSE Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {cohortList.map(st => {
                  const tot = (st.pt || 0) + (st.practical || 0) + (st.notebook || 0);
                  const pct = Math.round((tot / 80) * 100);
                  const gradeObj = getCbseGrade(pct);
                  return (
                    <tr key={st.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3 font-bold text-white">
                        {st.name} <span className="block text-[10px] font-normal text-slate-400">Roll #{st.rollNo}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="40"
                          value={st.pt}
                          onChange={(e) => onMarksUpdate(st.id, 'pt', Number(e.target.value))}
                          className="w-16 text-center py-1 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:border-indigo-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={st.practical}
                          onChange={(e) => onMarksUpdate(st.id, 'practical', Number(e.target.value))}
                          className="w-16 text-center py-1 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:border-indigo-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={st.notebook}
                          onChange={(e) => onMarksUpdate(st.id, 'notebook', Number(e.target.value))}
                          className="w-16 text-center py-1 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:border-indigo-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-black text-indigo-400 text-sm">
                        {tot}
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-white text-sm">
                        {pct}%
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${gradeObj.badgeClass}`}>
                          {gradeObj.grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

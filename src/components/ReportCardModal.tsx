import React from 'react';
import { X, Printer } from 'lucide-react';
import { Student } from '../types';
import { getCbseGrade } from '../data';

interface ReportCardModalProps {
  student: Student;
  onClose: () => void;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl max-w-3xl w-full p-6 sm:p-8 border border-slate-300 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 no-print p-1 rounded-lg"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div id="printable-area" className="space-y-6">
          {/* Header Watermark */}
          <div className="text-center border-b-2 border-indigo-950 pb-4">
            <div className="flex justify-center items-center space-x-2 mb-1">
              <span className="text-2xl">⚜️</span>
              <h2 className="text-2xl font-black text-indigo-950 tracking-wider">
                DELHI PUBLIC ACADEMY
              </h2>
            </div>
            <p className="text-xs font-semibold text-slate-700">CENTRAL BOARD OF SECONDARY EDUCATION, NEW DELHI</p>
            <p className="text-[11px] text-slate-500 font-mono">AFFILIATION NO: 2130982 • SCHOOL CODE: 70192</p>
            <div className="mt-3 inline-block px-4 py-1 rounded bg-indigo-950 text-white font-mono text-xs font-bold uppercase tracking-wider">
              OFFICIAL CCE SCHOLASTIC PERFORMANCE REPORT CARD • TERM 1 (2026-27)
            </div>
          </div>

          {/* Student Info Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-100 p-4 rounded-2xl border border-slate-300 text-xs">
            <div>
              <span className="text-slate-500 block">Student Name:</span>
              <strong className="text-slate-900 text-sm font-bold">{student.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Roll & Cohort:</span>
              <strong className="text-slate-900 text-sm font-bold">Roll #{student.rollNo} • Class {student.class}-{student.sec}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Admission No:</span>
              <strong className="text-slate-900 font-mono">{student.id}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Term Attendance:</span>
              <strong className="text-emerald-700 text-sm font-bold">{student.attendanceRate}%</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Father's Name:</span>
              <strong className="text-slate-800">{student.fatherName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Mother's Name:</span>
              <strong className="text-slate-800">{student.motherName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Date of Birth:</span>
              <strong className="text-slate-800 font-mono">{student.dob}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Assigned House:</span>
              <strong className="text-indigo-900 font-bold">{student.house} House</strong>
            </div>
          </div>

          {/* Marks Table */}
          <div className="overflow-x-auto border border-slate-300 rounded-2xl">
            <table className="w-full text-xs text-left divide-y divide-slate-300">
              <thead className="bg-indigo-950 text-white uppercase text-[10px] font-semibold">
                <tr>
                  <th className="px-3 py-2.5">Subject & Code</th>
                  <th className="px-3 py-2.5 text-center">PT (40)</th>
                  <th className="px-3 py-2.5 text-center">Lab/Pract (30)</th>
                  <th className="px-3 py-2.5 text-center">Notebook (10)</th>
                  <th className="px-3 py-2.5 text-center">Total (80)</th>
                  <th className="px-3 py-2.5 text-center">Equiv (100)</th>
                  <th className="px-3 py-2.5 text-center">CBSE Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {(student.subjects || [
                  { name: 'Science (086)', pt: student.pt, lab: student.practical, nb: student.notebook },
                  { name: 'Mathematics (041)', pt: Math.max(20, student.pt - 1), lab: 28, nb: 10 },
                  { name: 'Social Science (087)', pt: Math.max(22, student.pt - 2), lab: 27, nb: 9 },
                  { name: 'English Lang (184)', pt: Math.max(25, student.pt + 1), lab: 28, nb: 10 },
                  { name: 'Comp Applications (417)', pt: 39, lab: 29, nb: 10 }
                ]).map((sub, idx) => {
                  const tot = sub.pt + sub.lab + sub.nb;
                  const equiv = Math.round((tot / 80) * 100);
                  const gradeObj = getCbseGrade(equiv);
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-3 py-2 font-bold text-slate-900">{sub.name}</td>
                      <td className="px-3 py-2 text-center font-mono">{sub.pt}</td>
                      <td className="px-3 py-2 text-center font-mono">{sub.lab}</td>
                      <td className="px-3 py-2 text-center font-mono">{sub.nb}</td>
                      <td className="px-3 py-2 text-center font-mono font-bold text-indigo-950">{tot}</td>
                      <td className="px-3 py-2 text-center font-mono font-bold">{equiv}%</td>
                      <td className="px-3 py-2 text-center">
                        <span className="px-2 py-0.5 rounded font-bold text-xs bg-slate-100 text-slate-800 border border-slate-300">
                          {gradeObj.grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Remarks & Signatures */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 text-xs">
            <span className="font-bold text-slate-800 block mb-1">Mentor Qualitative Assessment:</span>
            <p className="text-slate-600 italic">
              "{student.name} demonstrates superior cognitive engagement, disciplined classroom conduct, and consistent inquiry in Atal Tinkering Lab modules. Recommended for academic honors."
            </p>
          </div>

          <div className="pt-4 flex justify-between items-end text-xs text-slate-600 border-t border-slate-300">
            <div className="text-center">
              <div className="w-28 border-b border-slate-400 mb-1"></div>
              <span>Class Teacher</span>
            </div>
            <div className="text-center">
              <div className="w-28 border-b border-slate-400 mb-1"></div>
              <span>Exam Controller</span>
            </div>
            <div className="text-center">
              <div className="w-28 border-b border-slate-400 mb-1"></div>
              <span className="font-bold text-indigo-950">Principal</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-3 no-print">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-900 text-white text-xs font-bold hover:bg-indigo-800 transition shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Report Card</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

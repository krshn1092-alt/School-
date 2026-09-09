import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Student, Notice, CbseResource } from './types';
import { INITIAL_STUDENTS, INITIAL_NOTICES, CBSE_RESOURCES } from './data';
import { PrincipalDeck } from './components/PrincipalDeck';
import { TeacherDeck } from './components/TeacherDeck';
import { ParentStudentHub } from './components/ParentStudentHub';
import { ReportCardModal } from './components/ReportCardModal';
import { FeeReceiptModal } from './components/FeeReceiptModal';
import { WhatsAppModal } from './components/WhatsAppModal';

export default function App() {
  const [activeRole, setActiveRole] = useState<'admin' | 'teacher' | 'student'>(() => {
    return (localStorage.getItem('eduvista_role') as 'admin' | 'teacher' | 'student') || 'student';
  });

  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('eduvista_students_v3');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    try {
      const saved = localStorage.getItem('eduvista_notices_v3');
      return saved ? JSON.parse(saved) : INITIAL_NOTICES;
    } catch {
      return INITIAL_NOTICES;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [feeReceiptStudent, setFeeReceiptStudent] = useState<Student | null>(null);
  const [whatsAppModalStudent, setWhatsAppModalStudent] = useState<Student | null>(null);
  const [reportCardStudent, setReportCardStudent] = useState<Student | null>(null);

  useEffect(() => {
    localStorage.setItem('eduvista_role', activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem('eduvista_students_v3', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('eduvista_notices_v3', JSON.stringify(notices));
  }, [notices]);

  const showToast = (msg: string, duration = 3500) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), duration);
  };

  const handleAttendanceToggle = (studentId: string, status: 'P' | 'A' | 'L') => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, attendance: status } : s));
  };

  const handleMarksUpdate = (studentId: string, field: 'pt' | 'practical' | 'notebook', value: number) => {
    const maxVal = field === 'notebook' ? 10 : (field === 'practical' ? 30 : 40);
    const num = Math.max(0, Math.min(maxVal, isNaN(value) ? 0 : value));
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updated = { ...s, [field]: num };
        if (updated.subjects && updated.subjects[0]) {
          const key = field === 'notebook' ? 'nb' : (field === 'practical' ? 'lab' : 'pt');
          updated.subjects[0] = { ...updated.subjects[0], [key]: num };
        }
        return updated;
      }
      return s;
    }));
  };

  const handleMarkFeePaid = (studentId: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, feeStatus: 'Paid', paidAmount: s.feeAmount };
      }
      return s;
    }));
    showToast('Payment confirmed! Ledger updated to PAID with official tax receipt.');
  };

  const handleDownloadResource = (res: CbseResource) => {
    const textContent = `DELHI PUBLIC ACADEMY (CBSE AFFILIATED #2130982)\n\nRESOURCE: ${res.title}\nCODE: ${res.code}\nCLASS: Class ${res.class}\nSUBJECT: ${res.subject}\n\nSUMMARY & NOTES:\n${res.description}\n\n-- Verified CBSE 2026 Academic Standard --`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${res.code}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded verified CBSE resource: ${res.title}`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col text-slate-100 bg-[#090d16]">
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-indigo-500/40 flex items-center space-x-3 transition-all backdrop-blur-md">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0">
            <Check className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
            {toastMessage}
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Sticky Institutional Bar & Role Switcher */}
      <header className="sticky top-0 z-40 bg-[#0c1322]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Institutional Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-500/20 border border-indigo-400/30 shrink-0">
              DP
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  <span>DELHI PUBLIC ACADEMY</span>
                  <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    CBSE #2130982
                  </span>
                </h1>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                EDUVISTA CBSE ACADEMIC ENGINE 2026 • Term 1 Live
              </p>
            </div>
          </div>

          {/* Role-Pill Switcher */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700/60 shadow-inner">
            <button
              id="pill-principal"
              onClick={() => setActiveRole('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeRole === 'admin'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>👨‍💼</span>
              <span>Principal</span>
            </button>

            <button
              id="pill-teacher"
              onClick={() => setActiveRole('teacher')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeRole === 'teacher'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>👩‍🏫</span>
              <span>Teacher</span>
            </button>

            <button
              id="pill-parent"
              onClick={() => setActiveRole('student')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeRole === 'student'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>🎓</span>
              <span>Parent & Student</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 w-full flex-1">
        {activeRole === 'admin' && (
          <PrincipalDeck
            students={students}
            notices={notices}
            onAddNotice={(n) => {
              setNotices(prev => [n, ...prev]);
              showToast(`Universal Circular "${n.title}" broadcasted to Student Portal.`);
            }}
            onGenerateReceipt={(st) => setFeeReceiptStudent(st)}
            onSimulateWhatsApp={(st) => setWhatsAppModalStudent(st)}
            onMarkPaid={handleMarkFeePaid}
          />
        )}

        {activeRole === 'teacher' && (
          <TeacherDeck
            students={students}
            onAttendanceToggle={handleAttendanceToggle}
            onMarksUpdate={handleMarksUpdate}
            onSubmitAttendance={() => {
              const absents = students.filter(s => s.attendance === 'A').length;
              showToast(`Attendance registry locked. ${absents} automated SMS alerts logged to parents.`);
            }}
          />
        )}

        {activeRole === 'student' && (
          <ParentStudentHub
            students={students}
            notices={notices}
            resources={CBSE_RESOURCES}
            onOpenReportCard={(st) => setReportCardStudent(st)}
            onOpenFeeReceipt={(st) => setFeeReceiptStudent(st)}
            onDownloadResource={handleDownloadResource}
          />
        )}
      </main>

      {/* Modals */}
      {reportCardStudent && (
        <ReportCardModal
          student={reportCardStudent}
          onClose={() => setReportCardStudent(null)}
        />
      )}

      {feeReceiptStudent && (
        <FeeReceiptModal
          student={feeReceiptStudent}
          onClose={() => setFeeReceiptStudent(null)}
        />
      )}

      {whatsAppModalStudent && (
        <WhatsAppModal
          student={whatsAppModalStudent}
          onClose={() => setWhatsAppModalStudent(null)}
          onSend={() => {
            const name = whatsAppModalStudent.name;
            setWhatsAppModalStudent(null);
            showToast(`WhatsApp reminder dispatched to ${name}'s parents via DPA API Gateway!`);
          }}
        />
      )}
    </div>
  );
}

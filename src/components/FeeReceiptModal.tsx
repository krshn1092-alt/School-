import React from 'react';
import { X, Printer } from 'lucide-react';
import { Student } from '../types';

interface FeeReceiptModalProps {
  student: Student;
  onClose: () => void;
}

export const FeeReceiptModal: React.FC<FeeReceiptModalProps> = ({ student, onClose }) => {
  const balance = student.feeAmount - student.paidAmount;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-300 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 no-print p-1 rounded-lg"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div id="printable-area" className="space-y-4">
          <div className="text-center border-b border-slate-300 pb-3">
            <h3 className="text-lg font-black text-indigo-950 uppercase">DELHI PUBLIC ACADEMY</h3>
            <p className="text-[11px] text-slate-500 font-mono">CBSE AFFILIATION #2130982 • FEE COLLECTION COUNTER</p>
            <div className="mt-2 inline-block px-3 py-0.5 rounded bg-slate-100 font-mono text-[11px] font-bold">
              TERM-1 ACADEMIC FEE SLIP • 2026-27
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div><span className="text-slate-400 block">RECEIPT NO:</span> <strong>DPA/26/FEE/{student.rollNo + 2010}</strong></div>
            <div><span className="text-slate-400 block">DATE:</span> <strong>06-Sep-2026</strong></div>
            <div><span className="text-slate-400 block">STUDENT:</span> <strong>{student.name}</strong></div>
            <div><span className="text-slate-400 block">COHORT:</span> <strong>Class {student.class}-{student.sec} (#{student.rollNo})</strong></div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <div className="flex justify-between p-2.5 bg-slate-100 font-semibold border-b border-slate-200">
              <span>Fee Particulars</span>
              <span>Amount (INR)</span>
            </div>
            <div className="p-2.5 space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between"><span>Tuition & Smart Classroom LMS</span><span>₹24,000.00</span></div>
              <div className="flex justify-between"><span>CBSE Laboratory & Science Tinkering</span><span>₹6,500.00</span></div>
              <div className="flex justify-between"><span>Library, Sports & Co-Curricular</span><span>₹8,000.00</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold text-xs text-indigo-950">
                <span>Total Term Fee</span><span>₹{student.feeAmount.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="flex justify-between font-bold text-xs text-emerald-700">
                <span>Amount Paid</span><span>₹{student.paidAmount.toLocaleString('en-IN')}.00</span>
              </div>
              {balance > 0 && (
                <div className="flex justify-between font-bold text-xs text-rose-700">
                  <span>Balance Due</span><span>₹{balance.toLocaleString('en-IN')}.00</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
            <span>Status: <strong className="uppercase text-emerald-700 font-mono">{student.feeStatus}</strong></span>
            <span className="italic font-serif">Accounts Department Verified</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2 no-print">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-900 text-white text-xs font-bold hover:bg-indigo-800 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Slip</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

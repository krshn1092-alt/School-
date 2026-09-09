import React from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { Student } from '../types';

interface WhatsAppModalProps {
  student: Student;
  onClose: () => void;
  onSend: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ student, onClose, onSend }) => {
  const balance = student.feeAmount - student.paidAmount;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl text-slate-100">
        <div className="flex items-center space-x-3 text-emerald-400 mb-4">
          <div className="p-2.5 bg-emerald-500/20 rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">WhatsApp Reminder Gateway</h3>
            <p className="text-xs text-slate-400">Automated Parent Engagement System</p>
          </div>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs space-y-2 mb-4 font-mono">
          <p className="text-emerald-400 font-semibold">TO: {student.phone} ({student.fatherName})</p>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-300 leading-relaxed font-sans text-xs">
            "Respected Parent, Greetings from <strong>Delhi Public Academy (CBSE #2130982)</strong>. A balance fee of <strong>₹{balance.toLocaleString('en-IN')}</strong> is pending for your ward <strong>{student.name} (Class {student.class}-{student.sec})</strong>. Kindly pay via the Parent Student-Finder portal before 15th Sep."
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={onSend}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Dispatch WhatsApp Alert</span>
          </button>
        </div>
      </div>
    </div>
  );
};

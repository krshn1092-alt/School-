import { Student, Notice, CbseResource, CbseGradeInfo } from './types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'DPA-2021-882',
    rollNo: 1,
    name: 'Aarav Sharma',
    fatherName: 'Rajesh Sharma',
    motherName: 'Sunita Sharma',
    class: '10',
    sec: 'A',
    house: 'Aryabhata',
    dob: '14-Aug-2010',
    phone: '+91 98765 43210',
    feeStatus: 'Paid',
    feeAmount: 38500,
    paidAmount: 38500,
    attendanceRate: 96.4,
    attendance: 'P',
    pt: 38,
    practical: 28,
    notebook: 10,
    subjects: [
      { name: 'Science (086)', pt: 38, lab: 28, nb: 10 },
      { name: 'Mathematics Standard (041)', pt: 39, lab: 29, nb: 10 },
      { name: 'Social Science (087)', pt: 36, lab: 27, nb: 9 },
      { name: 'English Language & Lit (184)', pt: 37, lab: 28, nb: 10 },
      { name: 'Information Technology (417)', pt: 40, lab: 30, nb: 10 }
    ]
  },
  {
    id: 'DPA-2021-883',
    rollNo: 2,
    name: 'Ananya Verma',
    fatherName: 'Sanjay Verma',
    motherName: 'Poonam Verma',
    class: '10',
    sec: 'A',
    house: 'Tagore',
    dob: '03-Dec-2010',
    phone: '+91 98111 22334',
    feeStatus: 'Paid',
    feeAmount: 38500,
    paidAmount: 38500,
    attendanceRate: 98.1,
    attendance: 'P',
    pt: 39,
    practical: 29,
    notebook: 10,
    subjects: [
      { name: 'Science (086)', pt: 39, lab: 29, nb: 10 },
      { name: 'Mathematics Standard (041)', pt: 40, lab: 30, nb: 10 },
      { name: 'Social Science (087)', pt: 38, lab: 28, nb: 10 },
      { name: 'English Language & Lit (184)', pt: 38, lab: 29, nb: 10 },
      { name: 'Information Technology (417)', pt: 39, lab: 29, nb: 10 }
    ]
  },
  {
    id: 'DPA-2021-884',
    rollNo: 3,
    name: 'Devansh Singhal',
    fatherName: 'Alok Singhal',
    motherName: 'Meenakshi Singhal',
    class: '10',
    sec: 'A',
    house: 'Raman',
    dob: '19-Jan-2010',
    phone: '+91 99887 66554',
    feeStatus: 'Due',
    feeAmount: 38500,
    paidAmount: 20000,
    attendanceRate: 89.5,
    attendance: 'A',
    pt: 34,
    practical: 25,
    notebook: 9,
    subjects: [
      { name: 'Science (086)', pt: 34, lab: 25, nb: 9 },
      { name: 'Mathematics Standard (041)', pt: 32, lab: 24, nb: 8 },
      { name: 'Social Science (087)', pt: 35, lab: 26, nb: 9 },
      { name: 'English Language & Lit (184)', pt: 33, lab: 25, nb: 8 },
      { name: 'Information Technology (417)', pt: 36, lab: 27, nb: 9 }
    ]
  },
  {
    id: 'DPA-2021-885',
    rollNo: 4,
    name: 'Isha Nair',
    fatherName: 'K.G. Nair',
    motherName: 'Lalitha Nair',
    class: '10',
    sec: 'A',
    house: 'Ashoka',
    dob: '22-Jul-2010',
    phone: '+91 97654 32190',
    feeStatus: 'Overdue',
    feeAmount: 38500,
    paidAmount: 0,
    attendanceRate: 93.0,
    attendance: 'P',
    pt: 37,
    practical: 27,
    notebook: 10,
    subjects: [
      { name: 'Science (086)', pt: 37, lab: 27, nb: 10 },
      { name: 'Mathematics Standard (041)', pt: 36, lab: 26, nb: 9 },
      { name: 'Social Science (087)', pt: 37, lab: 28, nb: 10 },
      { name: 'English Language & Lit (184)', pt: 38, lab: 28, nb: 10 },
      { name: 'Information Technology (417)', pt: 38, lab: 28, nb: 10 }
    ]
  },
  {
    id: 'DPA-2021-886',
    rollNo: 5,
    name: 'Kabir Patel',
    fatherName: 'Vikram Patel',
    motherName: 'Geeta Patel',
    class: '10',
    sec: 'A',
    house: 'Aryabhata',
    dob: '11-Nov-2010',
    phone: '+91 94567 12345',
    feeStatus: 'Paid',
    feeAmount: 38500,
    paidAmount: 38500,
    attendanceRate: 91.2,
    attendance: 'L',
    pt: 31,
    practical: 24,
    notebook: 8,
    subjects: [
      { name: 'Science (086)', pt: 31, lab: 24, nb: 8 },
      { name: 'Mathematics Standard (041)', pt: 30, lab: 23, nb: 8 },
      { name: 'Social Science (087)', pt: 32, lab: 25, nb: 8 },
      { name: 'English Language & Lit (184)', pt: 34, lab: 26, nb: 8 },
      { name: 'Information Technology (417)', pt: 35, lab: 26, nb: 9 }
    ]
  },
  {
    id: 'DPA-2021-890',
    rollNo: 1,
    name: 'Meera Iyer',
    fatherName: 'R.K. Iyer',
    motherName: 'Kavita Iyer',
    class: '10',
    sec: 'B',
    house: 'Tagore',
    dob: '05-Sep-2010',
    phone: '+91 93456 78901',
    feeStatus: 'Paid',
    feeAmount: 38500,
    paidAmount: 38500,
    attendanceRate: 95.0,
    attendance: 'P',
    pt: 36,
    practical: 28,
    notebook: 9,
    subjects: [
      { name: 'Science (086)', pt: 36, lab: 28, nb: 9 },
      { name: 'Mathematics Standard (041)', pt: 37, lab: 27, nb: 9 },
      { name: 'Social Science (087)', pt: 36, lab: 27, nb: 9 },
      { name: 'English Language & Lit (184)', pt: 38, lab: 28, nb: 10 },
      { name: 'Information Technology (417)', pt: 39, lab: 29, nb: 9 }
    ]
  },
  {
    id: 'DPA-2021-891',
    rollNo: 2,
    name: 'Pranav Saxena',
    fatherName: 'Dr. Mukul Saxena',
    motherName: 'Dr. Renu Saxena',
    class: '10',
    sec: 'B',
    house: 'Raman',
    dob: '28-Feb-2010',
    phone: '+91 91234 56789',
    feeStatus: 'Due',
    feeAmount: 38500,
    paidAmount: 18500,
    attendanceRate: 92.4,
    attendance: 'P',
    pt: 33,
    practical: 26,
    notebook: 8,
    subjects: [
      { name: 'Science (086)', pt: 33, lab: 26, nb: 8 },
      { name: 'Mathematics Standard (041)', pt: 34, lab: 26, nb: 9 },
      { name: 'Social Science (087)', pt: 33, lab: 25, nb: 8 },
      { name: 'English Language & Lit (184)', pt: 35, lab: 27, nb: 9 },
      { name: 'Information Technology (417)', pt: 37, lab: 28, nb: 9 }
    ]
  },
  {
    id: 'DPA-2022-710',
    rollNo: 1,
    name: 'Riya Sengupta',
    fatherName: 'Subhash Sengupta',
    motherName: 'Maitreyi Sengupta',
    class: '9',
    sec: 'A',
    house: 'Ashoka',
    dob: '17-Apr-2011',
    phone: '+91 98712 34567',
    feeStatus: 'Paid',
    feeAmount: 34200,
    paidAmount: 34200,
    attendanceRate: 94.8,
    attendance: 'P',
    pt: 35,
    practical: 27,
    notebook: 9,
    subjects: [
      { name: 'Science (086)', pt: 35, lab: 27, nb: 9 },
      { name: 'Mathematics (041)', pt: 36, lab: 28, nb: 9 },
      { name: 'Social Science (087)', pt: 34, lab: 26, nb: 9 },
      { name: 'English (184)', pt: 37, lab: 28, nb: 10 },
      { name: 'Hindi Course A (002)', pt: 38, lab: 29, nb: 10 }
    ]
  },
  {
    id: 'DPA-2022-742',
    rollNo: 5,
    name: 'Diya Malhotra',
    fatherName: 'Sunil Malhotra',
    motherName: 'Vandana Malhotra',
    class: '9',
    sec: 'B',
    house: 'Tagore',
    dob: '09-Oct-2011',
    phone: '+91 98321 65498',
    feeStatus: 'Paid',
    feeAmount: 34200,
    paidAmount: 34200,
    attendanceRate: 97.2,
    attendance: 'P',
    pt: 37,
    practical: 28,
    notebook: 9,
    subjects: [
      { name: 'Science (086)', pt: 37, lab: 28, nb: 9 },
      { name: 'Mathematics (041)', pt: 38, lab: 29, nb: 10 },
      { name: 'Social Science (087)', pt: 36, lab: 27, nb: 9 },
      { name: 'English (184)', pt: 39, lab: 29, nb: 10 },
      { name: 'Sanskrit (122)', pt: 39, lab: 29, nb: 10 }
    ]
  },
  {
    id: 'DPA-2020-512',
    rollNo: 1,
    name: 'Siddharth Rao',
    fatherName: 'C.N. Rao',
    motherName: 'Shalini Rao',
    class: '11',
    sec: 'A',
    house: 'Raman',
    dob: '12-Mar-2009',
    phone: '+91 99123 45678',
    feeStatus: 'Overdue',
    feeAmount: 42000,
    paidAmount: 10000,
    attendanceRate: 84.5,
    attendance: 'A',
    pt: 29,
    practical: 22,
    notebook: 7,
    subjects: [
      { name: 'Physics (042)', pt: 29, lab: 22, nb: 7 },
      { name: 'Chemistry (043)', pt: 31, lab: 24, nb: 8 },
      { name: 'Mathematics (041)', pt: 28, lab: 21, nb: 7 },
      { name: 'English Core (301)', pt: 35, lab: 27, nb: 9 },
      { name: 'Computer Science (083)', pt: 33, lab: 25, nb: 8 }
    ]
  },
  {
    id: 'DPA-2019-320',
    rollNo: 1,
    name: 'Tanvi Kapoor',
    fatherName: 'Harish Kapoor',
    motherName: 'Anita Kapoor',
    class: '12',
    sec: 'A',
    house: 'Tagore',
    dob: '30-May-2008',
    phone: '+91 98234 56781',
    feeStatus: 'Paid',
    feeAmount: 46000,
    paidAmount: 46000,
    attendanceRate: 99.0,
    attendance: 'P',
    pt: 40,
    practical: 30,
    notebook: 10,
    subjects: [
      { name: 'Physics (042)', pt: 40, lab: 30, nb: 10 },
      { name: 'Chemistry (043)', pt: 39, lab: 29, nb: 10 },
      { name: 'Mathematics (041)', pt: 40, lab: 30, nb: 10 },
      { name: 'English Core (301)', pt: 39, lab: 29, nb: 10 },
      { name: 'Computer Science (083)', pt: 40, lab: 30, nb: 10 }
    ]
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 1,
    title: 'CBSE Class 10 & 12 Pre-Board Term-1 Datesheet Finalized',
    date: '06 Sep 2026',
    category: 'Exam Circular',
    priority: 'High',
    content: 'The comprehensive date sheet for the upcoming CBSE Class X & XII Pre-Board examinations has been finalized. Morning session begins promptly at 09:30 AM.'
  },
  {
    id: 2,
    title: 'Atal Tinkering Lab Innovation Challenge 2026',
    date: '04 Sep 2026',
    category: 'Academic',
    priority: 'Normal',
    content: 'All science stream students are requested to register project abstracts by Friday. Outstanding prototypes will represent DPA at the Regional CBSE Science Fair.'
  },
  {
    id: 3,
    title: 'Term-1 Fee Clearance Advisory for Digital LMS Access',
    date: '01 Sep 2026',
    category: 'Administrative',
    priority: 'High',
    content: 'Parents are requested to verify their fee clearance status to ensure uninterrupted access to the digital learning LMS and admit card generation.'
  }
];

export const CBSE_RESOURCES: CbseResource[] = [
  {
    id: 'R1',
    class: '10',
    subject: 'Science',
    title: 'Chapter 1: Chemical Reactions & Equations',
    type: 'Detailed Theory Notes PDF',
    size: '3.4 MB',
    code: 'SCI-X-CH01-2026',
    description: 'NCERT Exemplar solutions, chemical balancing algorithms, oxidation-reduction flowcharts, and 50 conceptual HOTS.'
  },
  {
    id: 'R2',
    class: '10',
    subject: 'Science',
    title: '10-Year CBSE PYQs (2016-2026) Solved Compendium',
    type: 'Previous Year Questions with Marking Scheme',
    size: '8.1 MB',
    code: 'SCI-X-PYQ-MASTER',
    description: 'Chapter-wise previous 10 years board questions with official CBSE step-marking rubrics and common examiner error alerts.'
  },
  {
    id: 'R3',
    class: '10',
    subject: 'Science',
    title: 'Sample Question Paper 2026 (Official Blueprint)',
    type: 'Official Board Blueprint & Mock Papers',
    size: '2.8 MB',
    code: 'CBSE-SQP-2026-X',
    description: 'Strictly aligned with 50% competency-based case study questions, assertion-reasoning drill, and 3 full-length answer sheets.'
  },
  {
    id: 'R4',
    class: '10',
    subject: 'Mathematics',
    title: 'Real Numbers & Polynomials Master Formula Bank',
    type: 'Formula Sheets & Quick Revision',
    size: '1.9 MB',
    code: 'MATH-X-CH01-02',
    description: 'Fundamental theorem of arithmetic proofs, zero-factor theorems, and graph parabola interpretations.'
  },
  {
    id: 'R5',
    class: '10',
    subject: 'Social Science',
    title: 'Rise of Nationalism in Europe & India Map Work',
    type: 'Atlas & Cartography Guides',
    size: '4.5 MB',
    code: 'SST-X-HIST-MAP',
    description: 'High-res geographical loci, treaty chronologies (Treaty of Vienna 1815), and Congress sessions mapping.'
  },
  {
    id: 'R6',
    class: '10',
    subject: 'English',
    title: 'First Flight & Footprints Prose Analytical Digest',
    type: 'Literary Analytical Summary',
    size: '2.2 MB',
    code: 'ENG-X-LIT-REV',
    description: 'Character sketches, poetic devices taxonomy, letter to the editor formal formats, and analytical paragraph frameworks.'
  },
  {
    id: 'R7',
    class: '9',
    subject: 'Science',
    title: 'Matter in Our Surroundings & Kinematics',
    type: 'Detailed Theory Notes PDF',
    size: '3.1 MB',
    code: 'SCI-IX-CH01',
    description: 'Derivations of three equations of motion and kinetic particle model visualizations.'
  },
  {
    id: 'R8',
    class: '11',
    subject: 'Science',
    title: 'Vectors & Kinematics Advanced Derivations',
    type: 'CBSE Advanced Notes',
    size: '5.2 MB',
    code: 'PHY-XI-VEC',
    description: 'Dot & cross product applications, projectile trajectory equations, and relative velocity paradigms.'
  },
  {
    id: 'R9',
    class: '12',
    subject: 'Science',
    title: 'Electrostatics & Current Electricity Board Booster',
    type: 'Formula Sheets & Derivations',
    size: '6.4 MB',
    code: 'PHY-XII-ELECTRO',
    description: "Gauss's law derivations, capacitor dielectric problems, and Kirchhoff's loop analyses."
  }
];

export function getCbseGrade(marks: number): CbseGradeInfo {
  if (marks >= 91) return { grade: 'A1', point: '10.0', badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
  if (marks >= 81) return { grade: 'A2', point: '9.0', badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
  if (marks >= 71) return { grade: 'B1', point: '8.0', badgeClass: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' };
  if (marks >= 61) return { grade: 'B2', point: '7.0', badgeClass: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' };
  if (marks >= 51) return { grade: 'C1', point: '6.0', badgeClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
  if (marks >= 41) return { grade: 'C2', point: '5.0', badgeClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
  if (marks >= 33) return { grade: 'D', point: '4.0', badgeClass: 'text-orange-400 bg-orange-500/10 border-orange-500/30' };
  return { grade: 'E', point: 'Needs Improvement', badgeClass: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
}

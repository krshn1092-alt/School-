export interface SubjectMark {
  name: string;
  pt: number;
  lab: number;
  nb: number;
}

export interface Student {
  id: string;
  rollNo: number;
  name: string;
  fatherName: string;
  motherName: string;
  class: string;
  sec: string;
  house: string;
  dob: string;
  phone: string;
  feeStatus: 'Paid' | 'Due' | 'Overdue';
  feeAmount: number;
  paidAmount: number;
  attendanceRate: number;
  attendance: 'P' | 'A' | 'L';
  pt: number;
  practical: number;
  notebook: number;
  subjects?: SubjectMark[];
}

export interface Notice {
  id: number;
  title: string;
  date: string;
  category: string;
  priority: 'High' | 'Normal' | 'Urgent';
  content: string;
}

export interface CbseResource {
  id: string;
  class: string;
  subject: string;
  title: string;
  type: string;
  size: string;
  code: string;
  description: string;
}

export interface CbseGradeInfo {
  grade: string;
  point: string;
  badgeClass: string;
}

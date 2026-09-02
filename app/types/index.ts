export interface User {
  id: string;
  email: string;
  role: "admin" | "principal" | "teacher" | "operator" | "finance";
  name: string;
  phone?: string;
  avatar?: string;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  authorId?: string;
  image?: string;
  category?: string;
  tags?: string[];
  published: boolean;
  viewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  classId: string;
  className?: string;
  enrollmentDate: Date;
  parentName?: string;
  parentPhone?: string;
  nisn?: string; // Nomor Induk Siswa Nasional
  nisn_backup?: string;
  gender?: 'M' | 'F';
  birthDate?: Date;
  status?: 'active' | 'graduated' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PPDBApplication {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  address: string;
  birthDate: Date;
  nisn?: string;
  parentName?: string;
  parentPhone?: string;
  documents: string[];
  status: "pending" | "approved" | "rejected" | "waitlist";
  score?: number;
  notes?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendance {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  date: Date;
  status: "present" | "absent" | "sick" | "permission";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName?: string;
  score: number;
  semester: number;
  year: number;
  gradeType: "UTS" | "UAS" | "assignment" | "participation";
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  semester: number;
  credits?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  nip?: string; // Nomor Induk Pegawai
  qualification?: string;
  subjects?: string[];
  classes?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Class {
  id: string;
  name: string;
  code: string;
  level: number; // 1-6 untuk SD
  capacity: number;
  currentStudents?: number;
  homeTeacherId?: string;
  homeTeacherName?: string;
  academicYear: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialRecord {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  date: Date;
  attachments?: string[];
  approvedBy?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

export interface Inventory {
  id: string;
  name: string;
  code: string;
  category: string;
  quantity: number;
  condition: "excellent" | "good" | "fair" | "poor";
  location: string;
  purchaseDate?: Date;
  cost?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  targetId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalStudents: number;
  totalPPDBApplications: number;
  totalArticles: number;
  totalUsers: number;
  pendingApplications: number;
  totalAttendance?: number;
  averageScore?: number;
  monthlyIncome?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

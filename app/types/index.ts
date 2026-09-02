export interface User {
  id: string;
  email: string;
  role: "admin" | "principal" | "teacher" | "operator" | "finance";
  name: string;
  createdAt: Date;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  image?: string;
  published: boolean;
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
  enrollmentDate: Date;
}

export interface PPDBApplication {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  address: string;
  birthDate: Date;
  documents: string[];
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

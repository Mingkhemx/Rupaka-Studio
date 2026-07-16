import React from 'react';
// Admin types extending base types with admin-specific fields

export interface AdminPortfolioItem {
  id: string;
  title: string;
  category: 'poster' | 'banner' | 'kemasan';
  image: string;
  description: string;
  price: string;
  features: string[];
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface AdminBlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  content: string;
  readTime: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface AdminTestimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface AdminFaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminOrder {
  id: string;
  clientName: string;
  clientEmail: string;
  projectType: 'poster' | 'logo' | 'website' | 'custom';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  amount: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalPortfolios: number;
  totalBlogs: number;
  totalTestimonials: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
}

export interface AdminAuthToken {
  email: string;
  token: string;
  expiresAt: number;
}

export interface ColumnConfig {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'number' | 'select' | 'rating' | 'file' | 'array';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: (value: any) => string | null;
}

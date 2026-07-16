export interface PortfolioItem {
  id: string;
  title: string;
  category: 'poster' | 'logo' | 'website' | 'custom';
  image: string;
  description: string;
  price: string;
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  content: string;
  author: string;
  readTime: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  avatarUrl?: string;
  rating: number;
}

export interface DesignEstimateRequest {
  designType: 'poster' | 'logo' | 'website' | 'custom';
  style: 'minimalist' | 'bold' | 'classic' | 'playful';
  delivery: 'regular' | 'express';
  notes: string;
  brandName: string;
  phone: string;
}

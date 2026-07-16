// LocalStorage management service for admin data

import {
  AdminPortfolioItem,
  AdminBlogPost,
  AdminTestimonial,
  AdminFaqItem,
  AdminOrder,
  AdminStats,
  AdminAuthToken
} from './types';
import { PORTFOLIO_ITEMS, BLOG_POSTS, TESTIMONIAL_ITEMS, FAQ_ITEMS } from '../data';

const STORAGE_KEYS = {
  auth: 'admin_auth',
  portfolios: 'admin_portfolios',
  blogs: 'admin_blogs',
  testimonials: 'admin_testimonials',
  faqs: 'admin_faqs',
  orders: 'admin_orders'
};

// Initialize with mock data if storage is empty
export function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.portfolios)) {
    const portfolios: AdminPortfolioItem[] = PORTFOLIO_ITEMS.map((item, index) => ({
      ...item,
      status: index === 0 ? 'draft' : 'published',
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    }));
    localStorage.setItem(STORAGE_KEYS.portfolios, JSON.stringify(portfolios));
  }

  if (!localStorage.getItem(STORAGE_KEYS.blogs)) {
    const blogs: AdminBlogPost[] = BLOG_POSTS.map((item) => ({
      ...item,
      status: 'published',
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    }));
    localStorage.setItem(STORAGE_KEYS.blogs, JSON.stringify(blogs));
  }

  if (!localStorage.getItem(STORAGE_KEYS.testimonials)) {
    const testimonials: AdminTestimonial[] = TESTIMONIAL_ITEMS.map((item) => ({
      ...item,
      status: 'published',
      createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    }));
    localStorage.setItem(STORAGE_KEYS.testimonials, JSON.stringify(testimonials));
  }

  if (!localStorage.getItem(STORAGE_KEYS.faqs)) {
    const faqs: AdminFaqItem[] = FAQ_ITEMS.map((item, index) => ({
      ...item,
      order: index,
      createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    }));
    localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(faqs));
  }

  if (!localStorage.getItem(STORAGE_KEYS.orders)) {
    const mockOrders: AdminOrder[] = [
      {
        id: 'order-001',
        clientName: 'PT Sinar Terang',
        clientEmail: 'admin@sinarterang.com',
        projectType: 'logo',
        status: 'completed',
        amount: 'Rp 150.000',
        notes: 'Logo dengan konsep modern minimalis',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'order-002',
        clientName: 'Kopi Janji Jogja',
        clientEmail: 'owner@kopijanjijogja.com',
        projectType: 'poster',
        status: 'in_progress',
        amount: 'Rp 75.000',
        notes: 'Poster promosi menu spesial',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'order-003',
        clientName: 'Catering Mama',
        clientEmail: 'catering@mama.com',
        projectType: 'custom',
        status: 'pending',
        amount: 'Rp 200.000',
        notes: 'Paket desain lengkap untuk UMKM',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(mockOrders));
  }
}

// Auth services
export function login(email: string, password: string): { success: boolean; token?: string; error?: string } {
  if (email === 'admin@rupaka.com' && password === 'admin123') {
    const token = btoa(`${email}:${Date.now()}`);
    const authData: AdminAuthToken = {
      email,
      token,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    };
    localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(authData));
    return { success: true, token };
  }
  return { success: false, error: 'Invalid credentials' };
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.auth);
}

export function isAuthenticated(): boolean {
  const auth = localStorage.getItem(STORAGE_KEYS.auth);
  if (!auth) return false;
  try {
    const authData: AdminAuthToken = JSON.parse(auth);
    return authData.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export function getAuthToken(): AdminAuthToken | null {
  const auth = localStorage.getItem(STORAGE_KEYS.auth);
  if (!auth) return null;
  try {
    return JSON.parse(auth);
  } catch {
    return null;
  }
}

// Portfolio services
export function getPortfolios(): AdminPortfolioItem[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.portfolios);
  return data ? JSON.parse(data) : [];
}

export function addPortfolio(item: Omit<AdminPortfolioItem, 'id' | 'createdAt' | 'updatedAt'>) {
  const portfolios = getPortfolios();
  const newItem: AdminPortfolioItem = {
    ...item,
    id: `port-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  portfolios.push(newItem);
  localStorage.setItem(STORAGE_KEYS.portfolios, JSON.stringify(portfolios));
  return newItem;
}

export function updatePortfolio(id: string, updates: Partial<AdminPortfolioItem>) {
  const portfolios = getPortfolios();
  const index = portfolios.findIndex(p => p.id === id);
  if (index !== -1) {
    portfolios[index] = {
      ...portfolios[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.portfolios, JSON.stringify(portfolios));
    return portfolios[index];
  }
  return null;
}

export function deletePortfolio(id: string) {
  const portfolios = getPortfolios();
  const filtered = portfolios.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.portfolios, JSON.stringify(filtered));
}

// Blog services
export function getBlogs(): AdminBlogPost[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.blogs);
  return data ? JSON.parse(data) : [];
}

export function addBlog(item: Omit<AdminBlogPost, 'id' | 'createdAt' | 'updatedAt'>) {
  const blogs = getBlogs();
  const newItem: AdminBlogPost = {
    ...item,
    id: `blog-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  blogs.push(newItem);
  localStorage.setItem(STORAGE_KEYS.blogs, JSON.stringify(blogs));
  return newItem;
}

export function updateBlog(id: string, updates: Partial<AdminBlogPost>) {
  const blogs = getBlogs();
  const index = blogs.findIndex(b => b.id === id);
  if (index !== -1) {
    blogs[index] = {
      ...blogs[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.blogs, JSON.stringify(blogs));
    return blogs[index];
  }
  return null;
}

export function deleteBlog(id: string) {
  const blogs = getBlogs();
  const filtered = blogs.filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.blogs, JSON.stringify(filtered));
}

// Testimonial services
export function getTestimonials(): AdminTestimonial[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.testimonials);
  return data ? JSON.parse(data) : [];
}

export function addTestimonial(item: Omit<AdminTestimonial, 'id' | 'createdAt' | 'updatedAt'>) {
  const testimonials = getTestimonials();
  const newItem: AdminTestimonial = {
    ...item,
    id: `test-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  testimonials.push(newItem);
  localStorage.setItem(STORAGE_KEYS.testimonials, JSON.stringify(testimonials));
  return newItem;
}

export function updateTestimonial(id: string, updates: Partial<AdminTestimonial>) {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  if (index !== -1) {
    testimonials[index] = {
      ...testimonials[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.testimonials, JSON.stringify(testimonials));
    return testimonials[index];
  }
  return null;
}

export function deleteTestimonial(id: string) {
  const testimonials = getTestimonials();
  const filtered = testimonials.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEYS.testimonials, JSON.stringify(filtered));
}

// FAQ services
export function getFaqs(): AdminFaqItem[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.faqs);
  return data ? JSON.parse(data) : [];
}

export function addFaq(item: Omit<AdminFaqItem, 'id' | 'createdAt' | 'updatedAt'>) {
  const faqs = getFaqs();
  const newItem: AdminFaqItem = {
    ...item,
    id: `faq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  faqs.push(newItem);
  localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(faqs));
  return newItem;
}

export function updateFaq(id: string, updates: Partial<AdminFaqItem>) {
  const faqs = getFaqs();
  const index = faqs.findIndex(f => f.id === id);
  if (index !== -1) {
    faqs[index] = {
      ...faqs[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(faqs));
    return faqs[index];
  }
  return null;
}

export function deleteFaq(id: string) {
  const faqs = getFaqs();
  const filtered = faqs.filter(f => f.id !== id);
  localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(filtered));
}

export function reorderFaqs(faqs: AdminFaqItem[]) {
  localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(faqs));
}

// Order services
export function getOrders(): AdminOrder[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.orders);
  return data ? JSON.parse(data) : [];
}

export function addOrder(item: Omit<AdminOrder, 'id' | 'createdAt' | 'updatedAt'>) {
  const orders = getOrders();
  const newItem: AdminOrder = {
    ...item,
    id: `order-${String(orders.length + 1).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  orders.push(newItem);
  localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
  return newItem;
}

export function updateOrder(id: string, updates: Partial<AdminOrder>) {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index] = {
      ...orders[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
    return orders[index];
  }
  return null;
}

export function deleteOrder(id: string) {
  const orders = getOrders();
  const filtered = orders.filter(o => o.id !== id);
  localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(filtered));
}

// Stats services
export function getStats(): AdminStats {
  return {
    totalPortfolios: getPortfolios().length,
    totalBlogs: getBlogs().length,
    totalTestimonials: getTestimonials().length,
    totalOrders: getOrders().length,
    pendingOrders: getOrders().filter(o => o.status === 'pending').length,
    completedOrders: getOrders().filter(o => o.status === 'completed').length
  };
}

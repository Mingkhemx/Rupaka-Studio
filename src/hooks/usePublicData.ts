import { useEffect, useState } from 'react';
import { BLOG_POSTS, FAQ_ITEMS, PORTFOLIO_ITEMS, TESTIMONIAL_ITEMS } from '../data';
import { getBlogs, getFaqs, getPortfolios, getTestimonials } from '../admin/services';
import type { AdminBlogPost, AdminFaqItem, AdminPortfolioItem, AdminTestimonial } from '../admin/types';
import { isFirebaseConfigured } from '../lib/firebase';

function published<T extends { status?: string }>(items: T[]): T[] {
  return items.filter((item) => item.status !== 'draft');
}

export function usePublicPortfolios() {
  const [items, setItems] = useState<AdminPortfolioItem[]>(PORTFOLIO_ITEMS as AdminPortfolioItem[]);
  const [loading, setLoading] = useState(isFirebaseConfigured());

  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    getPortfolios()
      .then((data) => setItems(published(data)))
      .catch(() => setItems(PORTFOLIO_ITEMS as AdminPortfolioItem[]))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}

export function usePublicBlogs() {
  const [items, setItems] = useState<AdminBlogPost[]>(BLOG_POSTS as AdminBlogPost[]);
  const [loading, setLoading] = useState(isFirebaseConfigured());

  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    getBlogs()
      .then((data) => setItems(published(data)))
      .catch(() => setItems(BLOG_POSTS as AdminBlogPost[]))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}

export function usePublicTestimonials() {
  const [items, setItems] = useState<AdminTestimonial[]>(TESTIMONIAL_ITEMS as AdminTestimonial[]);
  const [loading, setLoading] = useState(isFirebaseConfigured());

  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    getTestimonials()
      .then((data) => setItems(published(data)))
      .catch(() => setItems(TESTIMONIAL_ITEMS as AdminTestimonial[]))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}

export function usePublicFaqs() {
  const [items, setItems] = useState<AdminFaqItem[]>(
    FAQ_ITEMS.map((item, index) => ({
      ...item,
      order: index,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
  );
  const [loading, setLoading] = useState(isFirebaseConfigured());

  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    getFaqs()
      .then((data) => setItems(data.sort((a, b) => a.order - b.order)))
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}

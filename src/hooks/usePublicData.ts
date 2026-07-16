import { useEffect, useState } from 'react';
import { BLOG_POSTS, FAQ_ITEMS, PORTFOLIO_ITEMS, TESTIMONIAL_ITEMS } from '../data';
import { getBlogs, getFaqs, getPortfolios, getTestimonials } from '../admin/services';
import type { AdminBlogPost, AdminFaqItem, AdminPortfolioItem, AdminTestimonial } from '../admin/types';
import { isFirebaseConfigured } from '../lib/firebase';

function published<T extends { status?: string }>(items: T[]): T[] {
  return items.filter((item) => item.status !== 'draft');
}

export function usePublicPortfolios() {
  const [items, setItems] = useState<AdminPortfolioItem[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured());

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setItems(PORTFOLIO_ITEMS as AdminPortfolioItem[]);
      setLoading(false);
      return;
    }

    getPortfolios()
      .then((data) => setItems(published(data)))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}

export function usePublicBlogs() {
  const [items, setItems] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured());

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setItems(BLOG_POSTS as AdminBlogPost[]);
      setLoading(false);
      return;
    }

    getBlogs()
      .then((data) => setItems(published(data)))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}

export function usePublicTestimonials() {
  const [items, setItems] = useState<AdminTestimonial[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured());

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setItems(TESTIMONIAL_ITEMS as AdminTestimonial[]);
      setLoading(false);
      return;
    }

    getTestimonials()
      .then((data) => setItems(published(data)))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}

export function usePublicFaqs() {
  const [items, setItems] = useState<AdminFaqItem[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured());

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setItems(FAQ_ITEMS.map((item, index) => ({
        ...item,
        order: index,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })));
      setLoading(false);
      return;
    }

    getFaqs()
      .then((data) => setItems(data.sort((a, b) => a.order - b.order)))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}

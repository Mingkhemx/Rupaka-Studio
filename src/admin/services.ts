import {
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  query,
  orderBy,
} from 'firebase/firestore';
import {
  AdminPortfolioItem,
  AdminBlogPost,
  AdminTestimonial,
  AdminFaqItem,
  AdminOrder,
  AdminStats,
} from './types';
import { PORTFOLIO_ITEMS, BLOG_POSTS, TESTIMONIAL_ITEMS, FAQ_ITEMS } from '../data';
import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from '../lib/firebase';

const COLLECTIONS = {
  portfolios: 'portfolios',
  blogs: 'blogs',
  testimonials: 'testimonials',
  faqs: 'faqs',
  orders: 'orders',
} as const;

function nowIso() {
  return new Date().toISOString();
}

function mapDoc<T extends { id: string }>(id: string, data: Record<string, unknown>): T {
  return { id, ...data } as T;
}

async function getCollection<T extends { id: string }>(name: string): Promise<T[]> {
  const db = getFirebaseDb();
  const snapshot = await getDocs(collection(db, name));
  return snapshot.docs.map((item) => mapDoc<T>(item.id, item.data()));
}

async function seedIfEmpty() {
  const db = getFirebaseDb();
  const portfolioSnap = await getDocs(collection(db, COLLECTIONS.portfolios));
  if (!portfolioSnap.empty) return;

  const batch = writeBatch(db);
  const timestamp = nowIso();

  PORTFOLIO_ITEMS.forEach((item, index) => {
    const id = `port-${index + 1}`;
    batch.set(doc(db, COLLECTIONS.portfolios, id), {
      ...item,
      status: index === 0 ? 'draft' : 'published',
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  });

  BLOG_POSTS.forEach((item, index) => {
    const id = `blog-${index + 1}`;
    batch.set(doc(db, COLLECTIONS.blogs, id), {
      ...item,
      status: 'published',
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  });

  TESTIMONIAL_ITEMS.forEach((item, index) => {
    const id = `test-${index + 1}`;
    batch.set(doc(db, COLLECTIONS.testimonials, id), {
      ...item,
      status: 'published',
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  });

  FAQ_ITEMS.forEach((item, index) => {
    const id = `faq-${index + 1}`;
    batch.set(doc(db, COLLECTIONS.faqs, id), {
      ...item,
      order: index,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  });

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
      updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
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
      updatedAt: timestamp,
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
      updatedAt: timestamp,
    },
  ];

  mockOrders.forEach((order) => {
    batch.set(doc(db, COLLECTIONS.orders, order.id), order);
  });

  await batch.commit();
}

export async function initializeStorage() {
  if (!isFirebaseConfigured()) return;
  await seedIfEmpty();
}

function firebaseAuthError(error: unknown): string {
  const code = (error as { code?: string })?.code;
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email atau password salah';
    case 'auth/too-many-requests':
      return 'Terlalu banyak percobaan login. Coba lagi nanti.';
    case 'auth/invalid-email':
      return 'Format email tidak valid';
    default:
      return 'Login gagal. Periksa koneksi dan coba lagi.';
  }
}

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured()) {
    return { success: false, error: 'Firebase belum dikonfigurasi. Isi file .env terlebih dahulu.' };
  }

  try {
    const auth = getFirebaseAuth();
    await signInWithEmailAndPassword(auth, email, password);
    await initializeStorage();
    return { success: true };
  } catch (error) {
    return { success: false, error: firebaseAuthError(error) };
  }
}

export async function logout() {
  if (!isFirebaseConfigured()) return;
  await signOut(getFirebaseAuth());
}

export function getCurrentUser(): User | null {
  if (!isFirebaseConfigured()) return null;
  return getFirebaseAuth().currentUser;
}

export async function getPortfolios(): Promise<AdminPortfolioItem[]> {
  if (!isFirebaseConfigured()) return [];
  await seedIfEmpty();
  return getCollection<AdminPortfolioItem>(COLLECTIONS.portfolios);
}

export async function addPortfolio(
  item: Omit<AdminPortfolioItem, 'id' | 'createdAt' | 'updatedAt'>
): Promise<AdminPortfolioItem> {
  const db = getFirebaseDb();
  const id = `port-${Date.now()}`;
  const timestamp = nowIso();
  const newItem: AdminPortfolioItem = {
    ...item,
    id,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  await setDoc(doc(db, COLLECTIONS.portfolios, id), newItem);
  return newItem;
}

export async function updatePortfolio(
  id: string,
  updates: Partial<AdminPortfolioItem>
): Promise<AdminPortfolioItem | null> {
  const db = getFirebaseDb();
  const ref = doc(db, COLLECTIONS.portfolios, id);
  const payload = { ...updates, updatedAt: nowIso() };
  await updateDoc(ref, payload);
  const portfolios = await getPortfolios();
  return portfolios.find((item) => item.id === id) ?? null;
}

export async function deletePortfolio(id: string) {
  const db = getFirebaseDb();
  await deleteDoc(doc(db, COLLECTIONS.portfolios, id));
}

export async function getBlogs(): Promise<AdminBlogPost[]> {
  if (!isFirebaseConfigured()) return [];
  await seedIfEmpty();
  return getCollection<AdminBlogPost>(COLLECTIONS.blogs);
}

export async function addBlog(
  item: Omit<AdminBlogPost, 'id' | 'createdAt' | 'updatedAt'>
): Promise<AdminBlogPost> {
  const db = getFirebaseDb();
  const id = `blog-${Date.now()}`;
  const timestamp = nowIso();
  const newItem: AdminBlogPost = {
    ...item,
    id,
    date: item.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  await setDoc(doc(db, COLLECTIONS.blogs, id), newItem);
  return newItem;
}

export async function updateBlog(
  id: string,
  updates: Partial<AdminBlogPost>
): Promise<AdminBlogPost | null> {
  const db = getFirebaseDb();
  const ref = doc(db, COLLECTIONS.blogs, id);
  const payload = { ...updates, updatedAt: nowIso() };
  await updateDoc(ref, payload);
  const blogs = await getBlogs();
  return blogs.find((item) => item.id === id) ?? null;
}

export async function deleteBlog(id: string) {
  const db = getFirebaseDb();
  await deleteDoc(doc(db, COLLECTIONS.blogs, id));
}

export async function getTestimonials(): Promise<AdminTestimonial[]> {
  if (!isFirebaseConfigured()) return [];
  await seedIfEmpty();
  return getCollection<AdminTestimonial>(COLLECTIONS.testimonials);
}

export async function addTestimonial(
  item: Omit<AdminTestimonial, 'id' | 'createdAt' | 'updatedAt'>
): Promise<AdminTestimonial> {
  const db = getFirebaseDb();
  const id = `test-${Date.now()}`;
  const timestamp = nowIso();
  const newItem: AdminTestimonial = {
    ...item,
    id,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  await setDoc(doc(db, COLLECTIONS.testimonials, id), newItem);
  return newItem;
}

export async function updateTestimonial(
  id: string,
  updates: Partial<AdminTestimonial>
): Promise<AdminTestimonial | null> {
  const db = getFirebaseDb();
  const ref = doc(db, COLLECTIONS.testimonials, id);
  const payload = { ...updates, updatedAt: nowIso() };
  await updateDoc(ref, payload);
  const testimonials = await getTestimonials();
  return testimonials.find((item) => item.id === id) ?? null;
}

export async function deleteTestimonial(id: string) {
  const db = getFirebaseDb();
  await deleteDoc(doc(db, COLLECTIONS.testimonials, id));
}

export async function getFaqs(): Promise<AdminFaqItem[]> {
  if (!isFirebaseConfigured()) return [];
  await seedIfEmpty();
  const db = getFirebaseDb();
  const snapshot = await getDocs(query(collection(db, COLLECTIONS.faqs), orderBy('order', 'asc')));
  return snapshot.docs.map((item) => mapDoc<AdminFaqItem>(item.id, item.data()));
}

export async function addFaq(
  item: Omit<AdminFaqItem, 'id' | 'createdAt' | 'updatedAt'>
): Promise<AdminFaqItem> {
  const db = getFirebaseDb();
  const id = `faq-${Date.now()}`;
  const timestamp = nowIso();
  const newItem: AdminFaqItem = {
    ...item,
    id,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  await setDoc(doc(db, COLLECTIONS.faqs, id), newItem);
  return newItem;
}

export async function updateFaq(
  id: string,
  updates: Partial<AdminFaqItem>
): Promise<AdminFaqItem | null> {
  const db = getFirebaseDb();
  const ref = doc(db, COLLECTIONS.faqs, id);
  const payload = { ...updates, updatedAt: nowIso() };
  await updateDoc(ref, payload);
  const faqs = await getFaqs();
  return faqs.find((item) => item.id === id) ?? null;
}

export async function deleteFaq(id: string) {
  const db = getFirebaseDb();
  await deleteDoc(doc(db, COLLECTIONS.faqs, id));
}

export async function reorderFaqs(faqs: AdminFaqItem[]) {
  const db = getFirebaseDb();
  const batch = writeBatch(db);
  const timestamp = nowIso();

  faqs.forEach((item, index) => {
    batch.update(doc(db, COLLECTIONS.faqs, item.id), {
      order: index,
      updatedAt: timestamp,
    });
  });

  await batch.commit();
}

export async function getOrders(): Promise<AdminOrder[]> {
  if (!isFirebaseConfigured()) return [];
  await seedIfEmpty();
  return getCollection<AdminOrder>(COLLECTIONS.orders);
}

export async function addOrder(
  item: Omit<AdminOrder, 'id' | 'createdAt' | 'updatedAt'>
): Promise<AdminOrder> {
  const orders = await getOrders();
  const db = getFirebaseDb();
  const id = `order-${String(orders.length + 1).padStart(3, '0')}`;
  const timestamp = nowIso();
  const newItem: AdminOrder = {
    ...item,
    id,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  await setDoc(doc(db, COLLECTIONS.orders, id), newItem);
  return newItem;
}

export async function updateOrder(
  id: string,
  updates: Partial<AdminOrder>
): Promise<AdminOrder | null> {
  const db = getFirebaseDb();
  const ref = doc(db, COLLECTIONS.orders, id);
  const payload = { ...updates, updatedAt: nowIso() };
  await updateDoc(ref, payload);
  const orders = await getOrders();
  return orders.find((item) => item.id === id) ?? null;
}

export async function deleteOrder(id: string) {
  const db = getFirebaseDb();
  await deleteDoc(doc(db, COLLECTIONS.orders, id));
}

export async function getStats(): Promise<AdminStats> {
  const [portfolios, blogs, testimonials, orders] = await Promise.all([
    getPortfolios(),
    getBlogs(),
    getTestimonials(),
    getOrders(),
  ]);

  return {
    totalPortfolios: portfolios.length,
    totalBlogs: blogs.length,
    totalTestimonials: testimonials.length,
    totalOrders: orders.length,
    pendingOrders: orders.filter((order) => order.status === 'pending').length,
    completedOrders: orders.filter((order) => order.status === 'completed').length,
  };
}

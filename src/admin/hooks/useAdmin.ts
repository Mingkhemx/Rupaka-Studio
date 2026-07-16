import { useState, useCallback, useMemo } from 'react';

// ─── Toast ───────────────────────────────────────────────────────────────────

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: Toast['type'] = 'info', duration = 3000) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      setToasts(prev => [...prev, { id, message, type, duration }]);
      if (duration > 0) {
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
      }
      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
}

// ─── Pagination ───────────────────────────────────────────────────────────────

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export function usePagination(initialItemsPerPage = 10) {
  const [state, setState] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: initialItemsPerPage,
    totalItems: 0
  });

  const setTotalItems = useCallback((total: number) => {
    setState(prev => (prev.totalItems === total ? prev : { ...prev, totalItems: total, currentPage: 1 }));
  }, []);

  const goToPage = useCallback((page: number) => {
    setState(prev => {
      const maxPage = Math.max(1, Math.ceil(prev.totalItems / prev.itemsPerPage));
      const next = Math.max(1, Math.min(page, maxPage));
      return prev.currentPage === next ? prev : { ...prev, currentPage: next };
    });
  }, []);

  const nextPage = useCallback(() => {
    setState(prev => {
      const maxPage = Math.max(1, Math.ceil(prev.totalItems / prev.itemsPerPage));
      return prev.currentPage >= maxPage ? prev : { ...prev, currentPage: prev.currentPage + 1 };
    });
  }, []);

  const prevPage = useCallback(() => {
    setState(prev =>
      prev.currentPage <= 1 ? prev : { ...prev, currentPage: prev.currentPage - 1 }
    );
  }, []);

  const setItemsPerPage = useCallback((items: number) => {
    setState(prev => ({ ...prev, itemsPerPage: items, currentPage: 1 }));
  }, []);

  const totalPages = Math.max(1, Math.ceil(state.totalItems / state.itemsPerPage));
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;

  return {
    ...state,
    totalPages,
    startIndex,
    endIndex,
    setTotalItems,
    goToPage,
    nextPage,
    prevPage,
    setItemsPerPage
  };
}

// ─── Search ───────────────────────────────────────────────────────────────────

export function useSearch<T>(items: T[], fields: (keyof T)[], query: string = '') {
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(item =>
      fields.some(field => String(item[field] ?? '').toLowerCase().includes(q))
    );
  }, [items, fields, query]);

  return { results };
}

// ─── Sort ─────────────────────────────────────────────────────────────────────

export function useSort<T>(items: T[]) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const toggleSort = useCallback(
    (key: keyof T) => {
      if (sortKey === key) {
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(key);
        setSortOrder('asc');
      }
    },
    [sortKey]
  );

  const sorted = useMemo(() => {
    if (!sortKey) return items;
    return [...items].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = aVal < bVal ? -1 : 1;
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  }, [items, sortKey, sortOrder]);

  return { sorted, sortKey, sortOrder, toggleSort };
}

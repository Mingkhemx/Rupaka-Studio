import { useState, useCallback } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) => {
    const id = `toast-${Date.now()}`;
    const toast: Toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);

    if (duration) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
}

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    isDestructive?: boolean;
  } | null>(null);

  const confirm = useCallback((cfg: Parameters<typeof setConfig>[0]) => {
    setConfig(cfg);
    setIsOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    config?.onConfirm();
    setIsOpen(false);
    setConfig(null);
  }, [config]);

  const handleCancel = useCallback(() => {
    config?.onCancel?.();
    setIsOpen(false);
    setConfig(null);
  }, [config]);

  return {
    isOpen,
    config,
    confirm,
    handleConfirm,
    handleCancel
  };
}

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
    setState(prev => ({ ...prev, totalItems: total }));
  }, []);

  const goToPage = useCallback((page: number) => {
    setState(prev => ({
      ...prev,
      currentPage: Math.max(1, Math.min(page, Math.ceil(prev.totalItems / prev.itemsPerPage)))
    }));
  }, []);

  const nextPage = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPage: Math.min(prev.currentPage + 1, Math.ceil(prev.totalItems / prev.itemsPerPage))
    }));
  }, []);

  const prevPage = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPage: Math.max(1, prev.currentPage - 1)
    }));
  }, []);

  const setItemsPerPage = useCallback((items: number) => {
    setState(prev => ({
      ...prev,
      itemsPerPage: items,
      currentPage: 1
    }));
  }, []);

  const totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
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

export function useSearch<T>(items: T[], searchableFields: (keyof T)[], query: string = '') {
  const results = query.trim() === '' ? items : items.filter(item =>
    searchableFields.some(field => {
      const value = item[field];
      return String(value).toLowerCase().includes(query.toLowerCase());
    })
  );

  return { results };
}

export function useSort<T>(items: T[]) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sorted = sortKey
    ? [...items].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        const comparison = aVal < bVal ? -1 : 1;
        return sortOrder === 'asc' ? comparison : -comparison;
      })
    : items;

  return { sorted, sortKey, sortOrder, toggleSort };
}

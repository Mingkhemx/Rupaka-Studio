import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import type { Toast as ToastType } from '../hooks/useAdmin';

interface ToastItemProps {
  key?: string;
  toast: ToastType;
  onClose: (id: string) => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const config = {
    success: {
      bg: '#16a34a',
      Icon: CheckCircle
    },
    error: {
      bg: '#dc2626',
      Icon: AlertCircle
    },
    info: {
      bg: '#2563eb',
      Icon: Info
    }
  }[toast.type];

  const Icon = config.Icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.95 }}
      transition={{ duration: 0.22 }}
      style={{
        background: config.bg,
        color: '#fff',
        borderRadius: 10,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        minWidth: 260,
        maxWidth: 380,
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        marginBottom: 8,
        pointerEvents: 'all'
      }}
    >
      <Icon style={{ width: 18, height: 18, flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.8)',
          cursor: 'pointer',
          padding: 2,
          display: 'flex',
          alignItems: 'center'
        }}
        aria-label="Close notification"
      >
        <X style={{ width: 16, height: 16 }} />
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 99999,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onClose={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Named export for backward compat
export { ToastItem as Toast };

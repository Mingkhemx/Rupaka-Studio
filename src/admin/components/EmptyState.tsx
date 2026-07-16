import { motion } from 'motion/react';
import { Inbox, Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-6xl mb-4 opacity-20">
        {icon || <Inbox className="w-24 h-24" />}
      </div>
      <h3 className="text-xl font-semibold text-text-dark mb-2">{title}</h3>
      <p className="text-muted-grey mb-6 text-center max-w-sm">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-accent-orange hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {action.label}
        </button>
      )}
    </motion.div>
  );
}

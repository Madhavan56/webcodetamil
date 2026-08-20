import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onDismiss: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const colors = {
  success: 'bg-success/10 border-success/30 text-success',
  error: 'bg-error/10 border-error/30 text-error',
  info: 'bg-primary/10 border-primary/30 text-primary',
};

export const Toast = ({ type, message, onDismiss, duration: _duration }: ToastProps) => {
  const Icon = icons[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={cn(
          'flex items-start gap-3 px-4 py-3.5 rounded-xl border shadow-lg backdrop-blur',
          colors[type]
        )}
        role="alert"
        aria-live="polite"
      >
        <div className="flex-shrink-0 mt-0.5">
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-body-sm font-medium flex-1">{message}</p>
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors text-textMuted hover:text-text"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

interface ToastContainerProps {
  toasts: { id: string; type: 'success' | 'error' | 'info'; message: string; duration?: number }[];
  onDismiss: (id: string) => void;
}

export const ToastContainer = ({ toasts, onDismiss }: ToastContainerProps) => {
  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none" aria-live="polite" aria-atomic="true">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto w-full max-w-sm">
            <Toast
              type={toast.type}
              message={toast.message}
              onDismiss={() => onDismiss(toast.id)}
              duration={toast.duration}
            />
          </div>
        ))}
      </div>
    </AnimatePresence>
  );
};

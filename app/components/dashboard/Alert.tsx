'use client';

import { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type AlertType = 'error' | 'success' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  duration?: number;
}

const icons = {
  error: <XCircle className="text-red-600" size={24} />,
  success: <CheckCircle className="text-green-600" size={24} />,
  warning: <AlertCircle className="text-yellow-600" size={24} />,
  info: <Info className="text-blue-600" size={24} />,
};

const styles = {
  error: 'bg-red-50 border-red-200 text-red-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

export function Alert({ type, title, message, onClose, duration = 5000 }: AlertProps) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`border-l-4 p-4 rounded-lg flex gap-4 ${styles[type]}`}>
      {icons[type]}
      <div className="flex-1">
        {title && <h3 className="font-semibold mb-1">{title}</h3>}
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>
      )}
    </div>
  );
}

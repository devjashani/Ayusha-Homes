import React, { useEffect } from 'react';
import { Bell, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-white border border-[#DDE3E2] rounded-xl shadow-lg text-sm text-[#1F292A] transition-all duration-200 animate-in fade-in slide-in-from-bottom-3"
    >
      <div className="w-8 h-8 rounded-full bg-[#336E87]/10 flex items-center justify-center text-[#336E87] shrink-0">
        <Bell className="w-4 h-4" />
      </div>
      <span className="font-medium">{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 p-1 text-[#5A6D6C] hover:text-[#1F292A] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#336E87]"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};


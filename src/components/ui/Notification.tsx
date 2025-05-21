import { useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

export function Notification({ message, type, duration = 5000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Color styles based on type
  const bgColor = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
  }[type];

  return isVisible ? (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded shadow-md border-l-4 ${bgColor} max-w-md transition-all`}
    >
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>
  ) : null;
}

import { createContext, useContext, useState, useCallback, useRef } from "react";
import { CheckCircledIcon, CrossCircledIcon, InfoCircledIcon, ExclamationTriangleIcon, Cross1Icon } from "@radix-ui/react-icons";

const ToastContext = createContext(null);

const VARIANTS = {
  success: {
    bg: "bg-emerald-600",
    icon: CheckCircledIcon,
  },
  error: {
    bg: "bg-red-600",
    icon: CrossCircledIcon,
  },
  warning: {
    bg: "bg-amber-500",
    icon: ExclamationTriangleIcon,
  },
  info: {
    bg: "bg-blue-600",
    icon: InfoCircledIcon,
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  const show = useCallback((text, type = "info", duration = 3000) => {
    const id = ++counterRef.current;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      {/* Toast stack — bottom-right, stacks upward */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => {
          const variant = VARIANTS[toast.type] || VARIANTS.info;
          const Icon = variant.icon;
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center gap-3 ${variant.bg} text-white px-4 py-3 rounded-2xl shadow-xl text-sm font-medium min-w-[240px] max-w-[340px] animate-slide-up`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 leading-snug">{toast.text}</span>
              <button
                onClick={() => dismiss(toast.id)}
                className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              >
                <Cross1Icon className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

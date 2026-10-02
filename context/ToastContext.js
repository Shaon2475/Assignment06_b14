"use client";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, Info, AlertCircle } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(1);

  const toast = useCallback((message, type = "success") => {
    const id = nextId.current++;
    setToasts((prev) => [...prev.slice(-2), { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  const icons = {
    success: <CheckCircle2 size={18} className="text-lime" />,
    info: <Info size={18} className="text-sky-400" />,
    error: <AlertCircle size={18} className="text-red-400" />,
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast-in pointer-events-auto flex items-center gap-2 rounded-xl border border-[#2b303d] bg-[#1f242d] px-4 py-3 text-sm font-medium text-white shadow-lg"
          >
            {icons[t.type]}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

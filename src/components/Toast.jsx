import { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);

  function show(text) {
    setMessage(text);
    setTimeout(() => setMessage(null), 2500);
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {message && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

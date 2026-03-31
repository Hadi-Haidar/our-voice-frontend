import { createContext, useState, useCallback } from "react";
import ConfirmModal from "../components/ConfirmModal";
import { useLanguage } from "../hooks/useLanguage";

export const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
    const { isRTL } = useLanguage();
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: "",
        message: "",
        confirmText: "",
        cancelText: "",
        isLoading: false,
    });

    const [resolver, setResolver] = useState(null);

    const confirm = useCallback((options) => {
        return new Promise((resolve) => {
            setModalState({
                isOpen: true,
                title: options.title || "",
                message: options.message || "",
                confirmText: options.confirmText || "",
                cancelText: options.cancelText || "",
                isLoading: false,
            });
            setResolver(() => resolve);
        });
    }, []);

    const handleConfirm = useCallback(() => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
        if (resolver) resolver(true);
    }, [resolver]);

    const handleCancel = useCallback(() => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
        if (resolver) resolver(false);
    }, [resolver]);

    return (
        <ConfirmContext.Provider value={confirm}>
            {children}
            <ConfirmModal
                isOpen={modalState.isOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                title={modalState.title}
                message={modalState.message}
                confirmText={modalState.confirmText}
                cancelText={modalState.cancelText}
                isLoading={modalState.isLoading}
                isRTL={isRTL}
            />
        </ConfirmContext.Provider>
    );
}

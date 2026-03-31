import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { CategoryIcon } from "./CategoryIcon";

export default function CustomSelect({ options, value, onChange, placeholder, isRTL, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (val) => {
        onChange(val);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className || ""}`} ref={containerRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 text-gray-900 dark:text-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 py-3 ${isRTL ? "pr-4 pl-3" : "pl-4 pr-3"} outline-none transition-all shadow-sm`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    {selectedOption ? (
                        <>
                            {selectedOption.icon && (
                                <CategoryIcon name={selectedOption.icon} className="h-4 w-4 shrink-0 text-red-500" />
                            )}
                            <span className="truncate text-sm font-medium">{selectedOption.label}</span>
                        </>
                    ) : (
                        <span className="truncate text-sm text-gray-400">{placeholder}</span>
                    )}
                </div>
                <ChevronDownIcon
                    className={`h-5 w-5 text-gray-500 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown Options */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Mobile Backdrop */}
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm sm:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown / Bottom Sheet */}
                        <m.div
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="fixed bottom-0 left-0 right-0 z-[70] max-h-[70vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-2 pb-8
                                       sm:absolute sm:bottom-auto sm:left-auto sm:right-auto sm:w-full sm:mt-2 sm:rounded-xl sm:shadow-xl sm:shadow-gray-200/50 dark:sm:shadow-none sm:border sm:border-gray-100 dark:sm:border-gray-800 sm:p-1.5 sm:max-h-64 sm:pb-1.5"
                            role="listbox"
                        >
                            {/* Mobile Drag Handle */}
                            <div className="w-full flex justify-center py-3 sm:hidden">
                                <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full" />
                            </div>

                            <div className="flex flex-col gap-1">
                                {options.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        role="option"
                                        aria-selected={value === option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className={`flex items-center gap-3 w-full text-left px-4 py-3.5 sm:px-3 sm:py-2.5 rounded-xl sm:rounded-lg transition-colors text-base sm:text-sm font-medium
                                            ${value === option.value
                                                ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-800"
                                            }
                                        `}
                                    >
                                        {option.icon ? (
                                            <CategoryIcon name={option.icon} className={`h-5 w-5 sm:h-4 sm:w-4 shrink-0 ${value === option.value ? "text-red-600 dark:text-red-400" : "text-gray-400"}`} />
                                        ) : (
                                            <div className="h-5 w-5 sm:h-4 sm:w-4 shrink-0" />
                                        )}
                                        <span className="flex-1 truncate">{option.label}</span>
                                        {value === option.value && (
                                            <CheckIcon className="h-5 w-5 sm:h-4 sm:w-4 shrink-0" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </m.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

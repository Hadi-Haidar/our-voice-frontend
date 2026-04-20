import { useState, useRef, useEffect } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
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
                className={`w-full flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 text-gray-900 dark:text-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 py-2.5 ${isRTL ? "pr-4 pl-3" : "pl-4 pr-3"} outline-none transition-all`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-2 overflow-hidden">
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
                    className={`h-4 w-4 text-gray-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown — same style on ALL screen sizes */}
            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={`
                            absolute z-50 w-full mt-2 bg-white dark:bg-gray-900
                            border border-gray-100 dark:border-gray-800
                            rounded-xl overflow-hidden
                            shadow-lg shadow-black/5 dark:shadow-black/30
                            ${isRTL ? "right-0" : "left-0"}
                        `}
                        role="listbox"
                    >
                        {/* Scrollable list — max 5 items visible, then scroll */}
                        <div className="relative">
                            <div className="p-1.5 flex flex-col gap-0.5 max-h-[210px] overflow-y-auto overscroll-contain scroll-smooth">
                                {options.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        role="option"
                                        aria-selected={value === option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${isRTL ? "text-right" : "text-left"}
                                            ${value === option.value
                                                ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}
                                        `}
                                    >
                                        {option.icon ? (
                                            <CategoryIcon
                                                name={option.icon}
                                                className={`h-4 w-4 shrink-0 ${value === option.value ? "text-red-500" : "text-gray-400"}`}
                                            />
                                        ) : (
                                            <div className="h-4 w-4 shrink-0" />
                                        )}
                                        <span className="flex-1 truncate">{option.label}</span>
                                        {value === option.value && (
                                            <CheckIcon className="h-4 w-4 shrink-0 text-red-500" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Fade hint — only visible when list overflows */}
                            {options.length > 4 && (
                                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-900 to-transparent rounded-b-xl" />
                            )}
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}

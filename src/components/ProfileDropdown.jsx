import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    PersonIcon,
    GearIcon,
    ExitIcon,
    ChevronDownIcon,
    ImageIcon
} from "@radix-ui/react-icons";
import { useLanguage } from "../hooks/useLanguage";

export default function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { t, isRTL } = useLanguage();

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { label: t("nav.avatar"), icon: ImageIcon, to: "/profile/avatar" },
        { label: t("nav.settings"), icon: GearIcon, to: "/settings" },
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-1.5 pe-3 transition hover:bg-gray-50 dark:hover:bg-gray-900 shadow-sm"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <PersonIcon className="h-5 w-5" />
                </div>
                <ChevronDownIcon className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className={`absolute mt-2 w-56 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-xl ring-1 ring-black/5 z-[9999] ${isRTL ? "left-0" : "right-0"}`}
                    >
                        {/* User Info Header */}
                        <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 mb-1">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Hadi Haidar</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">hadi@example.com</p>
                        </div>

                        {/* Menu Items */}
                        <div className="space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Logout */}
                        <div className="mt-1 border-t border-gray-100 dark:border-gray-800 pt-1">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    // Handle logout logic here
                                }}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                            >
                                <ExitIcon className="h-4 w-4" />
                                <span>{t("nav.logout")}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
